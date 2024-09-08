import { Injectable } from '@nestjs/common';
import { QueryParams } from './query.params';
import { FindOneOptions, FindManyOptions } from 'typeorm';

@Injectable()
export class QueryParser {

    parseFindOneQuery(queryParams: QueryParams): FindOneOptions {
        const findOneOptions: FindOneOptions = {};
        console.log('=============** queryParams ', queryParams)
        console.log('=============** findOneOptions ', findOneOptions)

        return findOneOptions;
    }

    parseFindManyQuery(queryParams: QueryParams): FindManyOptions {
        const findManyOptions: FindManyOptions = {};
        console.log('=============** queryParams ', queryParams)
        console.log('=============** findManyOptions ', findManyOptions)

        return findManyOptions;
    }
}
