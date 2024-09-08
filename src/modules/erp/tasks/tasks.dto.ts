import { BaseDto } from 'src/modules/base';
import { IsString, IsInt } from 'class-validator';

export class TaskDto extends BaseDto {
    @IsString()
    title: string;

    startDate?: Date;
    endDate?: Date;

    @IsInt()
    progress?: number;
    priority?: string;
    tags?: Array<string>;
    assigneeId?: string;
    assignerId?: string;
    projectId?: string;
    parentTaskId?: string;
}
