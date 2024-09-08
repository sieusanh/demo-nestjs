import { Repository, FindOneOptions, 
    FindManyOptions, FindOptionsWhere,
    InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from './base.entity';
import { Id } from 'src/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Inject, InternalServerErrorException } from '@nestjs/common';
// import { QueryRunnerFactory } from 'src/common';

export class BaseService<Entity extends BaseEntity> {

    // @InjectDataSource()
    // protected dataSource: DataSource;

    // @Inject()
    // queryRunnerFactory: QueryRunnerFactory<Entity>;

    constructor(
        private baseRepository: Repository<Entity>,     
    ) { }

    create(entity: Entity): Promise<Entity> {
        const partialEntity: QueryDeepPartialEntity<Entity> = entity as QueryDeepPartialEntity<Entity>; 
        const result = this.baseRepository.insert(partialEntity).then(res => res.raw[0]);
        return result;
    }

    // async createMany(entities: Entity[]) {
    //     const func = async function () {
    //         await this.queryRunnerFactory.save(entities[0]);
    //         await this.queryRunnerFactory.save(entities[1]);
    //     }
    //     await this.queryRunnerFactory.wrapTransaction(func);
    // }

    findAll(criteria: FindManyOptions<Entity>): Promise<Entity[]> {
        return this.baseRepository.find(criteria);
    }

    findOne(where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]): 
        Promise<Entity | null> {
        const criteria: FindOneOptions<Entity> = {
            where
        };
        return this.baseRepository.findOne(criteria);
    }   

    findById(id: Id): Promise<Entity | null> {
        const options: FindOneOptions<Entity> = {
            where: {
              id,
            } as FindOptionsWhere<Entity>,
        };
        return this.baseRepository.findOne(options);
    }

    update(
        criteria: FindOptionsWhere<Entity>, 
        partialEntity: QueryDeepPartialEntity<Entity>
    ): Promise<UpdateResult> {
        return this.baseRepository.update(criteria, partialEntity); 
    }

    updateById(
        id: Id, 
        partialEntity: QueryDeepPartialEntity<Entity>
    ): Promise<UpdateResult> {
        const where: FindOptionsWhere<Entity> = {
            id
        } as FindOptionsWhere<Entity>;
        return this.baseRepository.update(where, partialEntity); 
    }

    deleteById(id: Id): Promise<DeleteResult> {
        const where: FindOptionsWhere<Entity> = {
            id
        } as FindOptionsWhere<Entity>;
        return this.baseRepository.delete(where);
    }
}

