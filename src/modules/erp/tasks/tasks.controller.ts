import {
    Controller, Get, Post, Put, Delete,
    Body, Query,
    Req, Res,
    Header,
    HttpCode, HttpStatus, Param, Redirect,
    HttpException, BadRequestException,
    Global
} from '@nestjs/common';
import { Request, Response, response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { QueryParams } from 'src/common';
import { ValidationPipe } from 'src/common/pipe';
import { Roles } from 'src/common';
import { BaseController } from 'src/modules/base';
import { TasksService, 
    TaskDto, Task, MODULE_NAME, SWAGGER_TAG_TASK } from '.';

@ApiTags(SWAGGER_TAG_TASK)
@ApiTags(MODULE_NAME)
@Controller(MODULE_NAME)
export class TasksController extends BaseController<TaskDto, Task> {

    constructor(
        private tasksService: TasksService,
        private taskDto: TaskDto, 
        private task: Task
    ) { 
        super(tasksService, taskDto, task);
    }

    // @Post()
    // // @Header('Cache-Control', 'none')
    // @HttpCode(HttpStatus.CREATED)
    // @Roles(['admin'])
    // create(
    //     // @Body(new ValidationPipe()) createTaskDto: CreateTaskDto, 
    //     @Body() createTaskDto: TaskDto,

    //     @Res() res: Response
    // ) {
    //     try {
    //         // const data = this.tasksService.create(createTaskDto);
    //         // res.status(HttpStatus.CREATED).send();
    //         res.status(HttpStatus.CREATED).json({result: 'haha'});
    //     } catch (error) {
    //         throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    //     }
    // }
}
