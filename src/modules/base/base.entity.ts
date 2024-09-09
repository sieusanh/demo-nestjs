import { Entity, Column, PrimaryGeneratedColumn, ObjectLiteral } from 'typeorm';
import { STATUS, Id } from 'src/common';
// import { Id } from 'src/common';
import { BaseDto } from './base.dto';

@Entity()
export class BaseEntity implements ObjectLiteral {

    @PrimaryGeneratedColumn({
        name: 'id'
    })
    primaryKey: number;

    @Column({
        unique: true,
        nullable: false,
        name: 'key'
    })
    id: Id;

    @Column({ 
        // type: 'smallint',
        type: 'enum',
        enum: STATUS,
        default: STATUS.ACTIVE
    })
    status: number;

    @Column({ 
        type: 'varchar',
        default: ''
    })
    createdBy: string;

    @Column({ 
        type: 'varchar',
        default: ''
    })
    updatedBy: string;

    @Column({ 
        type: 'timestamptz', 
        default: () => 'CURRENT_TIMESTAMP' 
    })
    createdAt: Date;

    @Column({ 
        type: 'timestamptz', 
        default: () => 'CURRENT_TIMESTAMP' 
    })
    updatedAt: Date;


    createFromDto<Dto extends BaseDto>(dto: Dto) {
        for (const key of Object.keys(dto)) {
            this[key] = dto[key];
        }

        return this;
    }
}
