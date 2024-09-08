import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/modules/base';
import { Project } from '../projects';

@Entity({
    name: 'erp_tasks'
})
export class Task extends BaseEntity {

    @Column()
    title: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    progress: number;

    @Column()
    priority: number;

    @Column('text', { 
        array: true, 
        default: [] 
    })
    tags: Array<string>;

    @Column()
    assigneeId: string;

    @Column()
    assignerId: string;

    @Column(() => Project)
    projectId: string

    @OneToOne(() => Task)
    parentTaskId: string;
    
}