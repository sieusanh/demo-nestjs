import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './projects.entity';
import { BaseService } from 'src/modules/base';

@Injectable()
export class ProjectsService extends BaseService<Project> {
    constructor(
        @InjectRepository(Project)
        protected projectsRepository: Repository<Project>
    ) {
        super(projectsRepository);
    }

}
