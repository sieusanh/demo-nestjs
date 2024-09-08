import { Entity, Column, OneToOne, OneToMany } from 'typeorm';
import { Department, Project, Position } from 'src/modules/erp';
import { BaseEntity } from 'src/modules/base/base.entity';
import { Id } from 'src/common';

@Entity({
    name: 'hr_employees'
})
export class Employee extends BaseEntity {

    @Column()
    name: string;

    @Column({
        unique: true
    })
    phone?: string;

    @Column()
    avatar?: string;

    @Column({
        unique: true
    })
    email?: string;

    @Column()
    gender?: string;

    @Column()
    birthDay?: Date;

    @Column()
    salary?: number;

    @Column()
    role?: string;

    @OneToOne(() => Employee)
    managerId?: number;

    @OneToOne(() => Position)
    positionId: Id;

    // @OneToOne(() => Department)
    departmentId: Id;
    
    @Column('text', { 
        array: true,
        default: [] 
    })
    @OneToMany(() => Project, (project) => project.id)
    projectIds?: Array<Id>;
}
