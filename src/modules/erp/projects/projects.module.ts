import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService, Project } from '.';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    providers: [ProjectsService],
    exports: [ProjectsService]
})
export class ProjectsModule { }
