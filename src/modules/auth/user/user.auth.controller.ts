import {
    Controller, Post, Body,
    HttpCode, HttpStatus, Inject, HttpException
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserAuthService } from './user.auth.service';
import { SWAGGER_TAG_USER_AUTH, MODULE_USER_AUTH } from './user.auth.constant';
import { SignInDto, RegistryDto, AccessDto } from './user.auth.dto';
import { AccountDto, Account, EmployeeDto, Employee } from 'src/modules/hr';
import { HttpErrorMessage } from 'src/common';

@ApiTags(SWAGGER_TAG_USER_AUTH)
@Controller(MODULE_USER_AUTH)
export class UserAuthController {   
    constructor(
        private userAuthService: UserAuthService,
        @Inject('AccountDto') private accountDto: AccountDto,
        @Inject('AccountEntity') private accountEntity: Account,
        @Inject('EmployeeDto') private employeeDto: EmployeeDto,
        @Inject('EmployeeEntity') private employeeEntity: Employee,
        
    ) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Account Login' })
    async signIn(@Body() signInDto: SignInDto): Promise<AccessDto> {
        try {
            const { username, email, password } = signInDto;
            return this.userAuthService.signIn({username, email, password});
        } catch (err) {
            throw new HttpException(
                HttpErrorMessage.UNAUTHORIZED, 
                HttpStatus.UNAUTHORIZED
            );
        }
    }
 
    @Post('register')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Account Registration' })
    async register(@Body() registryDto: RegistryDto): Promise<void> {
        try {
            // Account
            for (const key in this.accountDto) {
                this.accountDto[key] = registryDto[key];
            }
            this.accountEntity.createFromDto(this.accountDto);

            // Employee
            for (const key in this.employeeDto) {
                this.employeeDto[key] = registryDto[key];
            }
            this.employeeEntity.createFromDto(this.employeeDto);

            return this.userAuthService.register(this.accountEntity, this.employeeEntity);
        } catch (err) {
            throw new HttpException(
                HttpErrorMessage.CREATE, 
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

}
