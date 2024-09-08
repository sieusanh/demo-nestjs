import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionsService } from './positions.service';
import { Position } from './positions.entity';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([Position]),
    ],
    providers: [PositionsService],
    // exports: [PositionsService]
})
export class PositionsModule { }
