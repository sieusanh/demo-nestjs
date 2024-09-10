import { BaseDto } from './base.dto';
import { BaseEntity } from './base.entity';
import { QueryParams, PathParams, Id } from 'src/common';
import { FindManyOptions, FindOptionsWhere, 
    UpdateResult, DeleteResult } from 'typeorm';

export interface Controller<Dto extends BaseDto> {
    create(dto: Dto): Promise<Dto>;
    findAll(query: QueryParams, res: Response): Promise<Dto[]>;
    findOne(pathParams: PathParams): Promise<Dto>;
    update(id: Id, dto: Dto): Promise<UpdateResult>
    remove(id: Id): Promise<DeleteResult>;
}

export interface Service<Entity extends BaseEntity> {
    create(entity: Entity): Promise<Entity>;
    findAll(criteria: FindManyOptions<Entity>): Promise<Entity[]>;

    findOne(where: FindOptionsWhere<Entity> 
        | FindOptionsWhere<Entity>[]): Promise<Entity | null>;

    findById(id: Id): Promise<Entity | null>;

    update(criteria: FindOptionsWhere<Entity>, 
        entity: Entity): Promise<UpdateResult>;
        
    updateById(id: Id, entity: Entity): Promise<UpdateResult>;
    deleteById(id: Id): Promise<DeleteResult>;
}
