import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { AccountsService, Account, Employee } from 'src/modules/hr';
import { AccountsService } from 'src/modules/hr/accounts/accounts.service';
import { Account } from 'src/modules/hr/accounts/accounts.entity';
import { EmployeesService } from 'src/modules/hr/employees/employees.service';
import { Employee } from 'src/modules/hr/employees/employees.entity';
import { FindOptionsWhere } from 'typeorm';
import { Id, ErrorMessage } from 'src/common';
import { SignInDto } from './user.auth.dto';

interface LoginInfos {
    username: string;
    employeeId: Id;
    role?: string;
    projectIds?: Array<Id>;
    departmentId: Id;
}

type AccessInfo = {
    access_token: string
}

@Injectable()
export class UserAuthService {
    constructor(
        private accountsService: AccountsService, 
        private employeesService: EmployeesService,
        private jwtService: JwtService
    ) {}

    async signIn({username, email, password: pass}: SignInDto): Promise<AccessInfo> {
        try {
            // Account        
            const whereAccount: FindOptionsWhere<Account>[] = [
                ...(username ? [{ username }] : []),
                ...(email ? [{ email }] : [])
            ];
            const account = await this.accountsService.findOne(whereAccount);
            if (!account) {
                throw new UnauthorizedException();
            }

            const { username: accUsername, password = '', employeeId = '' } = account;

            if (password != pass) {
                throw new UnauthorizedException();
            }

            // Employee
            const whereEmployee: FindOptionsWhere<Employee> = {
                id: employeeId
            };

            const employee = await this.employeesService.findOne(whereEmployee);
            if (!employee) {
                throw new NotFoundException();
            }
            const { role, projectIds, departmentId } = employee;

            // Generate access token
            const jwtPayload: LoginInfos = {
                username: accUsername, 
                employeeId, role,
                projectIds, 
                departmentId
            }

            const accessToken: string = await this.jwtService.signAsync(jwtPayload);

            return {
                access_token: accessToken
            }
        } catch (err) {
            throw err;
        }
    }

    async register(accountEntity: Account, employeeEntity: Employee): Promise<void> {

        try {
            // Employee
            const { phone, email } = employeeEntity;
            const whereEmployee: FindOptionsWhere<Employee>[] = [
                { phone },
                { email }
            ];
            const employee = await this.employeesService.findOne(whereEmployee);
            if (employee) {
                throw new BadRequestException(`Employee ${ErrorMessage.EXISTED_POSTFIX}`);
            }

            const insertedEmployee = await this.employeesService.create(employeeEntity);

            // Account
            const { username, employeeId } = accountEntity;

            const whereAccount: FindOptionsWhere<Account>[] = [
                { username },
                { email }, 
                { employeeId } 
            ];
            const account = await this.accountsService.findOne(whereAccount);
            
            if (account) {
                throw new BadRequestException(`Account ${ErrorMessage.EXISTED_POSTFIX}`);
            }
            
            accountEntity['employeeId'] = insertedEmployee?.id || '';
            await this.accountsService.create(accountEntity);
            
        } catch (err) {
            throw err;
        }
    }
}