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
        const partialEntity: QueryDeepPartialEntity<Entity> 
            = entity as QueryDeepPartialEntity<Entity>; 
        const result = this.baseRepository
            .insert(partialEntity)
            .then(res => res.raw[0])
            .catch(err => err);
        return result;
    }

    // async createMany(entities: Entity[]): Promise<void> {
    //     const func = async function () {
    //         await this.queryRunnerFactory.save(entities[0]);
    //         await this.queryRunnerFactory.save(entities[1]);
    //     }
    //     await this.queryRunnerFactory.wrapTransaction(func);
    // }

    findAll(criteria: FindManyOptions<Entity>): Promise<Entity[]> {
        const result = this.baseRepository
            .findAndCount(criteria)
            .then(([data, count]) => [data, count])
            .catch(err => err);
        return result;
    }

    findOne(options: FindOneOptions<Entity>): 
        Promise<Entity | null> {
        // const criteria: FindOneOptions<Entity> = { where };
        const result = this.baseRepository
            .findOne(options)
            .then(res => res)
            .catch(err => err);
        return result;
    }   

    findById(id: Id): Promise<Entity | null> {
        const options: FindOneOptions<Entity> = {
            where: {
              id,
            } as FindOptionsWhere<Entity>,
        };
        const result = this.baseRepository
            .findOne(options)
            .then(res => res)
            .catch(err => err);
        return result;
    }

    update(
        criteria: FindOptionsWhere<Entity>, 
        entity: Entity
    ): Promise<UpdateResult> {
        const partialEntity: QueryDeepPartialEntity<Entity> 
            = entity as QueryDeepPartialEntity<Entity>; 

        const result = this.baseRepository
            .update(criteria, partialEntity)
            .then(res => res)
            .catch(err => err);
        return result; 
    }

    updateById(
        id: Id, 
        entity: Entity
    ): Promise<UpdateResult> {
        const where: FindOptionsWhere<Entity> = {
            id
        } as FindOptionsWhere<Entity>;

        const partialEntity: QueryDeepPartialEntity<Entity> 
            = entity as QueryDeepPartialEntity<Entity>; 

        const result = this.baseRepository
            .update(where, partialEntity)
            .then(res => res)
            .catch(err => err);
        return result; 
    }

    deleteById(id: Id): Promise<DeleteResult> {
        const where: FindOptionsWhere<Entity> = {
            id
        } as FindOptionsWhere<Entity>;

        const result = this.baseRepository
            .delete(where)
            .then(res => res)
            .catch(err => err);
        return result;
    }
}

