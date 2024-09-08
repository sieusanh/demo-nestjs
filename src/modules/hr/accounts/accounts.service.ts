import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './accounts.entity';
import { BaseService } from 'src/modules/base/base.service';


@Injectable()
export class AccountsService extends BaseService<Account> {
    constructor(
        @InjectRepository(Account)
        protected accountsRepository: Repository<Account>
    ) {
        super(accountsRepository);
    }

    isExistedEmail(email: string) {
        return false;
    }

}