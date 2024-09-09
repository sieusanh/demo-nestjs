import { Injectable } from '@nestjs/common';
import { IsString, IsEmail, IsNotEmpty, IsDate, IsOptional } from 'class-validator';
import { BaseDto } from 'src/modules/base';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class AccountDto extends BaseDto {

    @ApiProperty()
    @IsString()
    username: string = '';

    @ApiProperty()
    @IsString()
    @IsEmail()
    email?: string = '';

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string = '';

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    employeeId: string = '';
    
    @ApiProperty()
    @IsDate()
    lastLoginAt?: Date = new Date();
}
