import {
    Controller, Post, Body,
    HttpCode, HttpStatus, Inject
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserAuthService } from './user.auth.service';
import { MODULE_USER_AUTH } from './user.auth.constant';
import { SignInDto, RegistryDto, AccessDto } from './user.auth.dto';
import { AccountDto, Account, EmployeeDto, Employee } from 'src/modules/hr';
// import { AccountDto, Account } from 'src/modules/hr/accounts';
// import { AccountDto } from 'src/modules/hr/accounts/accounts.dto';
// import { Account } from 'src/modules/hr/accounts/accounts.entity';


@ApiTags(MODULE_USER_AUTH)
@Controller(MODULE_USER_AUTH)
export class UserAuthController {   
    
    // private accountDto: AccountDto

    // @Inject('AccountDto') accountDto: AccountDto


    constructor(
        private userAuthService: UserAuthService,
        // private accountDto: AccountDto,

        @Inject('AccountDto') private accountDto: AccountDto,
        @Inject('AccountEntity') private accountEntity: Account,
        @Inject('EmployeeDto') private employeeDto: EmployeeDto,
        @Inject('EmployeeEntity') private employeeEntity: Employee,
        
    ) {
        // this.accountDto = accountDto;
    }

    // @Post()
    // register(@Body() createAccountDto: CreateAccountDto, @Res() res: Response) {
    //   try {
    //     const { email, password } = createAccountDto;
    //     if (!email) {
    //       throw new BadRequestException('Email required.')
    //     }
    //     if (!password) {
    //       throw new BadRequestException('Password required.')
    //     }
    //     if (typeof email != 'string' || !email.includes('@')) {
    //       throw new BadRequestException('Invalid email.')
    //     }
    //     if (typeof password != 'string') {
    //       throw new BadRequestException('Invalid password.')
    //     }

    //     const isExistedEmail = this.accountsService.isExistedEmail(email);
    //     if (isExistedEmail) {
    //       throw new BadRequestException('Existed email.');
    //     }

    //     this.accountsService.register(createAccountDto);
    //     res.status(HttpStatus.CREATED).send();

    //   } catch (error) {
    //     throw new InternalServerErrorException('Error happen when registering new user.')
    //   }
    // }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    signIn(@Body() signInDto: SignInDto): Promise<AccessDto> {
        return this.userAuthService.signIn(signInDto);
    }
 
    @Post('register')
    @HttpCode(HttpStatus.NO_CONTENT)
    register(@Body() registryDto: RegistryDto) {
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
            console.log('=========== loigiz ', err)
        }
    }

    // @Post('login')
    // @HttpCode(HttpStatus.OK)
    // signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    //     res.status(200).json({res: 'ok'})
    // }

    
}
