import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/modules/base';


@Entity({
    name: 'erp_positions'
})
export class Position extends BaseEntity {

    @Column()
    name: string;

    @Column('text', { 
        array: true,
        default: [] 
    })
    skills?: Array<string>;

}
