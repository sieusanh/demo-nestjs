import { Module, Global } from '@nestjs/common';
import { EntityListenerService } from './factory.entity.listener';
import { QueryRunnerService } from './factory.query.runner';

@Global()
@Module({
    exports: [
        EntityListenerService, 
        QueryRunnerService
    ]
})
export class FactoryModule { }
