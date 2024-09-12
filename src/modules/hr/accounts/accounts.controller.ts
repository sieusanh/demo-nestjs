import { Controller} from '@nestjs/common';
import { BaseController } from 'src/modules/base';
import { AccountsService } from './accounts.service';
import { AccountDto } from './accounts.dto';
import { Account } from './accounts.entity';
import { SWAGGER_TAG_ACCOUNT } from './accounts.constant';
import { ApiTags } from '@nestjs/swagger';



@ApiTags(SWAGGER_TAG_ACCOUNT)
@Controller()
export class AccountsController extends BaseController<AccountDto, Account> {
    constructor(
        accountsService: AccountsService,
        accountDto: AccountDto, 
        account: Account
    ) { 
        super(accountsService, accountDto, account);
    }   

}
