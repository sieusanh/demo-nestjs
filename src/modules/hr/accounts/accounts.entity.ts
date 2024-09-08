import { Entity, Column, OneToOne } from 'typeorm';
import { Employee } from 'src/modules/hr';
import { BaseEntity } from 'src/modules/base';
import { Id } from 'src/common';


@Entity({
    name: 'hr_accounts'
})
export class Account extends BaseEntity {

    @Column({
        unique: true
    })
    username: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column({
        unique: true,
        nullable: false
    })
    @OneToOne(() => Employee)
    employeeId: Id;

    @Column()
    lastLoginAt: Date;
}
