import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/modules/base';
import { AccountsService } from './accounts.service';
import { AccountDto } from './accounts.dto';
import { Account } from './accounts.entity';
import { SWAGGER_TAG_ACCOUNT, API_BODY_EXAMPLE } from './accounts.constant';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags(SWAGGER_TAG_ACCOUNT)
@ApiBearerAuth()
@Controller()
export class AccountsController extends BaseController<AccountDto, Account> {

    constructor(
        accountsService: AccountsService,
        accountDto: AccountDto, 
        account: Account,
        // @Inject('ApiBodyExample') apiBodyExample: Object
    ) { 
        // console.log('=============== AccountsController apiBodyExample ', apiBodyExample)
        super(accountsService, accountDto, account, API_BODY_EXAMPLE);
        // this.setApiBodyExample(apiBodyExample);
    }   
}
