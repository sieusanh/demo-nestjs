import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesController } from './employees.controller' ;
import { EmployeesService } from './employees.service';
import { EmployeeDto } from './employees.dto';
import { Employee } from './employees.entity';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([Employee])
    ],
    controllers: [EmployeesController],
    providers: [EmployeesService, EmployeeDto, Employee],
    exports: [
        EmployeesService, 
        EmployeeDto, Employee,
        TypeOrmModule
    ]
})
export class EmployeesModule { }
