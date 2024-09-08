import { Injectable } from '@nestjs/common';
import { BaseDto } from 'src/modules/base';
import { IsString } from 'class-validator';

@Injectable()
export class DepartmentDto extends BaseDto {

    @IsString()
    name: string;

    @IsString()
    managerId: string;
}
