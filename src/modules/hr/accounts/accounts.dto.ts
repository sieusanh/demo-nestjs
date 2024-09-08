import { Injectable } from '@nestjs/common';
import { IsString, IsEmail, IsNotEmpty, IsDate, IsOptional } from 'class-validator';
import { BaseDto } from 'src/modules/base';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class AccountDto extends BaseDto {

    @IsString()
    @ApiProperty()
    username: string = '';

    @IsString()
    @IsEmail()
    @ApiProperty()
    email?: string = '';

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string = '';

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    employeeId: string = '';

    @IsDate()
    @ApiProperty()
    lastLoginAt?: Date = new Date();
}
