import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/modules/base';

@Entity({
    name: 'erp_departments'
})
export class Department extends BaseEntity {

    @Column()
    name: string;

    @Column()
    managerId: string;
}
