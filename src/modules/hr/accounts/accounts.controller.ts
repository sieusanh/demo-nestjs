import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/modules/base';
import { AccountsService } from './accounts.service';
import { AccountDto } from './accounts.dto';
import { Account } from './accounts.entity';
import { SWAGGER_TAG_ACCOUNT, MODULE_ACCOUNT } from './accounts.constant';


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
    
    // @Post()
    // // @Header('Cache-Control', 'none')
    // @HttpCode(HttpStatus.CREATED)
    // create(
    //     // @Body(new ValidationPipe()) createTaskDto: CreateTaskDto, 
    //     @Body() createAccountDto: AccountDto,

    //     @Res() res: Response
    // ) {
    //     try {
    //         console.log('============= createAccountDto ', createAccountDto)
    //         // const data = this.tasksService.create(createTaskDto);
    //         // res.status(HttpStatus.CREATED).send();
    //         res.status(HttpStatus.CREATED).json({result: 'haha'});
    //     } catch (error) {
    //         throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    //     }
    // }
//////
    
}
