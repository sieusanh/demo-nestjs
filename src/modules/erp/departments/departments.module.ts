import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsService } from './departments.service';
import { Department } from './departments.entity';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Department])],
    providers: [DepartmentsService],
    // exports: [DepartmentsService]
})
export class DepartmentsModule {}
