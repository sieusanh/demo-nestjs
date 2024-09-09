import { Injectable } from '@nestjs/common';
import { IsString, Matches, IsEnum, IsEmail, IsNumber, IsArray, IsOptional } from 'class-validator';
import { BaseDto } from 'src/modules/base';
import { Id } from 'src/common';
import { GENDERS, ROLES } from 'src/common';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class EmployeeDto extends BaseDto {
    @IsString()
    @Matches(/^[a-zA-Z ]+$/)
    @ApiProperty()
    name: string = '';

    @IsString()
    @Matches(/^[+ 0-9]{8,18}$/)
    @IsOptional()
    @ApiProperty()
    phone?: string = '';
    
    @IsString()
    @IsOptional()
    @ApiProperty()
    avatar?: string = '';

    @IsString()
    @IsEmail()
    @IsOptional()
    @ApiProperty()
    email?: string = '';

    @IsString()
    @IsEnum(Object.values(GENDERS))
    @IsOptional()
    @ApiProperty()
    gender?: string = GENDERS.MALE;

    @IsString()
    @IsOptional()
    @ApiProperty()
    birthDay?: string = '';

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    salary?: number = 0;

    @IsString()
    @IsEnum(Object.values(ROLES))
    @IsOptional()
    @ApiProperty()
    role?: string = ROLES.MEMBER;

    @IsString()
    @IsOptional()
    @ApiProperty()
    managerId?: number = 0;

    @IsString()
    @IsOptional()
    @ApiProperty()
    positionId: Id = '';

    @IsString()
    @IsOptional()
    @ApiProperty()
    departmentId: Id = '';

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    @ApiProperty()
    projectIds?: Array<Id> = [];
}
