import { Controller, Post, HttpStatus, HttpCode, Body } from '@nestjs/common';
import { BaseController } from 'src/modules/base';
import { AccountsService } from './accounts.service';
import { AccountDto } from './accounts.dto';
import { Account } from './accounts.entity';
import { SWAGGER_TAG_ACCOUNT, MODULE_ACCOUNT } from './accounts.constant';
import { ApiTags, ApiHeader } from '@nestjs/swagger';



@ApiTags(SWAGGER_TAG_ACCOUNT)
@Controller(MODULE_ACCOUNT)
export class AccountsController extends BaseController<AccountDto, Account> {
    constructor(
        accountsService: AccountsService,
        accountDto: AccountDto, 
        account: Account
    ) { 
        super(accountsService, accountDto, account);
    }   

    @Post('test')
    @HttpCode(HttpStatus.NO_CONTENT)
    test(@Body() accountDto: AccountDto): string {
        return 'This is test endpoint';
    }
}
