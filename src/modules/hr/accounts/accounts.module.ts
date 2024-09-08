import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountDto } from './accounts.dto';
import { Account } from './accounts.entity';
// import { EntityListenerFactory, QueryRunnerFactory } from 'src/common';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([Account])
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
        // }
    ],
    exports: [
        AccountsService,
        AccountDto, Account,
        TypeOrmModule,
    ]
})
export class AccountsModule {}
