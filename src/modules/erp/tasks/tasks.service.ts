import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/modules/base';
import { Task } from '.';

@Injectable()
export class TasksService extends BaseService<Task> {
    constructor(
        @InjectRepository(Task)
        protected tasksRepository: Repository<Task>
    ) {
        super(tasksRepository)
    }
    
}