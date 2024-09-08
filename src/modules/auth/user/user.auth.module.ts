import { Module } from '@nestjs/common';
import { UserAuthService } from './user.auth.service';
import { UserAuthController } from './user.auth.controller';
// import { AccountsModule, AccountsService, EmployeesModule, EmployeesService } from 'src/modules/hr';
import { AccountsModule } from 'src/modules/hr/accounts/accounts.module';
// import { AccountDto } from 'src/modules/hr/accounts/accounts.dto';e
import { EmployeesModule } from 'src/modules/hr/employees/employees.module';
import { AccountDto, Account, EmployeeDto, Employee } from 'src/modules/hr';

import { JWT_SECRET } from './user.auth.constant';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: JWT_SECRET,
            signOptions: {
                expiresIn: '60s'
            }
        }),
        AccountsModule,
        EmployeesModule
    ],
    providers: [
        UserAuthService, 
        {
            provide: 'AccountDto',
            useClass: AccountDto
        },
        {
            provide: 'AccountEntity',
            useClass: Account
        },
        {
            provide: 'EmployeeDto',
            useClass: EmployeeDto
        },
        {
            provide: 'EmployeeEntity',
            useClass: Employee
        }
    ],
    controllers: [UserAuthController],
})
export class UserAuthModule { }
