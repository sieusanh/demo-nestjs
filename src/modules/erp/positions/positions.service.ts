import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './positions.entity';
import { BaseService } from 'src/modules/base';

@Injectable()
export class PositionsService extends BaseService<Position> {

    constructor(
        @InjectRepository(Position)
        protected positionsRepository: Repository<Position>
    ) {
        super(positionsRepository);
    }
    
}