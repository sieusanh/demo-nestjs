import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Employee } from 'src/modules/hr';
import { Employee } from './employees.entity';
import { BaseService } from 'src/modules/base/base.service';


@Injectable()
export class EmployeesService extends BaseService<Employee>{
  constructor(
    @InjectRepository(Employee)
    protected employeesRepository: Repository<Employee>
  ) {
    super(employeesRepository);
  }
  
}