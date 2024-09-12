import {
    Controller, Post, Body,
    HttpCode, HttpStatus, Inject, HttpException
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { UserAuthService } from './user.auth.service';
import { SWAGGER_TAG_USER_AUTH } from './user.auth.constant';
import { SignInDto, RegistryDto, AccessDto } from './user.auth.dto';
import { AccountDto, Account, EmployeeDto, Employee } from 'src/modules/hr';
import { HttpErrorMessage, ROLES } from 'src/common';

@ApiTags(SWAGGER_TAG_USER_AUTH)
@Controller()
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
    // @ApiBody({ type: SignInDto })
    async signIn(@Body() signInDto: SignInDto): Promise<void> {
    // Promise<AccessDto> {
        try {
            // const { username, email, password } = signInDto;
            // return this.userAuthService.signIn({username: '', email: '', password: ''});
            return;
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
    @ApiQuery({ 
        name: 'role', enum: ROLES, 
        // isArray: true 
    })
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
