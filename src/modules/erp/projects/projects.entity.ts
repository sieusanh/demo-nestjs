
import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/modules/base';

@Entity({
    name: 'erp_projects'
})
export class Project extends BaseEntity {

    @Column()
    name: string;

    @Column()
    managerId: string;

    @Column()
    amount: number;
}
