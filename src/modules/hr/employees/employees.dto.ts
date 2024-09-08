import { Injectable } from '@nestjs/common';
import { IsString, Matches, IsEnum, IsEmail, IsNumber, IsArray, IsOptional } from 'class-validator';
import { BaseDto } from 'src/modules/base';
import { Id } from 'src/common';
import { GENDERS, ROLES } from 'src/common';

@Injectable()
export class EmployeeDto extends BaseDto {
    @IsString()
    @Matches(/^[a-zA-Z ]+$/)
    name: string = '';

    @IsString()
    @Matches(/^[+ 0-9]{8,18}$/)
    @IsOptional()
    phone?: string = '';
    
    @IsString()
    @IsOptional()
    avatar?: string = '';

    @IsString()
    @IsEmail()
    @IsOptional()
    email?: string = '';

    @IsString()
    @IsEnum(Object.values(GENDERS))
    @IsOptional()
    gender?: string = GENDERS.MALE;

    @IsString()
    @IsOptional()
    birthDay?: string = '';

    @IsNumber()
    @IsOptional()
    salary?: number = 0;

    @IsString()
    @IsEnum(Object.values(ROLES))
    @IsOptional()
    role?: string = ROLES.MEMBER;

    @IsString()
    @IsOptional()
    managerId?: number = 0;

    @IsString()
    @IsOptional()
    positionId: Id = '';

    @IsString()
    @IsOptional()
    departmentId: Id = '';

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    projectIds?: Array<Id> = [];
}
