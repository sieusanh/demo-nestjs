import { Module, Global, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountDto } from './accounts.dto';
import { Account } from './accounts.entity';
// import { EntityListenerFactory, QueryRunnerFactory } from 'src/common';
import { API_BODY_EXAMPLE } from './accounts.constant';

@Global()
@Module({
    imports: [
        // forwardRef(() => 
        TypeOrmModule.forFeature([Account])
        // )
    ],
    controllers: [AccountsController],
    providers: [
        AccountsService, 
        AccountDto, 
        Account, 
        // EntityListenerFactory, QueryRunnerFactory
        // {
        //     provide: 'AccountDto',
        //     useClass: AccountDto
        // },
        // {
        //     provide: 'ApiBodyExample',
        //     useValue: API_BODY_EXAMPLE
        // }
    ],
    exports: [
        AccountsService,
        AccountDto, 
        Account,
        // TypeOrmModule,
    ]
})
export class AccountsModule {}
