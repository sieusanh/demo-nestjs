import { Injectable } from '@nestjs/common';
import { BaseDto } from 'src/modules/base';
import { IsString, IsInt } from 'class-validator';

@Injectable()
export class ProjectDto extends BaseDto {

    @IsString()
    name: string;

    @IsString()
    managerId: string;

    @IsInt()
    amount: number;
}
