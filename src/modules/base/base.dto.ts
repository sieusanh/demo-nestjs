import { IsString, IsInt, IsDate, IsEnum, IsOptional } from 'class-validator';
import { STATUS, Id } from 'src/common';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
    
    @IsString()
    @IsOptional()
    @ApiProperty()
    id: Id = '';
    
    @IsInt()
    @IsOptional()
    @IsEnum(STATUS)
    @ApiProperty()
    status: number = 1;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    createdAt: Date = new Date();

    @IsDate()
    @IsOptional()
    @ApiProperty()
    updatedAt: Date = new Date();

    @IsString()
    @IsOptional()
    @ApiProperty()
    createdBy: string = '';

    @IsString()
    @IsOptional()
    @ApiProperty()
    updatedBy: string = '';

    // constructor(...fields: any[]) {
    //     super();
    //     for (const key of Object.keys(this)) {
    //         this[key] = fields[key];
    //     }
    // }

    getProperties() {
        const properties = Object.keys(this);
        return properties;
    }

    createFromEntity<Entity extends BaseEntity>(entity: Entity) {
        for (const key of Object.keys(entity)) {
            this[key] = entity[key];
        }

        return this;
    }

}   
