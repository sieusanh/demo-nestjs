import { Module, Global } from '@nestjs/common';
import { EntityListenerService } from './entity-listener.factory';
import { QueryRunnerService } from './query-runner.factory';

@Global()
@Module({
    exports: [
        EntityListenerService, 
        QueryRunnerService
    ]
})
export class FactoryModule { }
