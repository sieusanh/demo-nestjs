import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './departments.entity';
import { BaseService } from 'src/modules/base';

@Injectable()
export class DepartmentsService extends BaseService<Department> {
    constructor(
        @InjectRepository(Department)
        protected departmentsRepository: Repository<Department>
    ) {
        super(departmentsRepository);
    }

}