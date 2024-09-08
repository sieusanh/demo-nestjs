import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/modules/base';
import { EmployeeDto } from './employees.dto';
import { EmployeesService } from './employees.service';
import { Employee } from './employees.entity';
import { MODULE_EMPLOYEE } from './employees.constant';


@ApiTags(MODULE_EMPLOYEE)
@Controller(MODULE_EMPLOYEE)
export class EmployeesController extends BaseController<EmployeeDto, Employee> {

    constructor(
        private employeesService: EmployeesService,
        private employeeDto: EmployeeDto,
        private employee: Employee
    ) { 
        super(employeesService, employeeDto, employee);
    }
    
}
