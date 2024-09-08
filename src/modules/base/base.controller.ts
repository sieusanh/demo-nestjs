import {
    Controller, Get, Post, Put, Delete,
    Body, Query,
    Req, Res,
    Header,
    HttpCode, HttpStatus, Param, Redirect,
    HttpException,

} from '@nestjs/common';
import { Request, Response, response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { Id, QueryParams, QueryParser, PathParams, HttpErrorMessage } from 'src/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ValidationPipe } from 'src/common/pipe';
import { Roles } from 'src/common';
import { BaseDto, BaseEntity, BaseService, ModelMapper } from '.';

export class BaseController<
    Dto extends BaseDto, 
    Entity extends BaseEntity
> {
    private modelMapper: ModelMapper<Dto, Entity>;
    private queryParser: QueryParser;

    constructor(
        private baseService: BaseService<Entity>,
        private baseDto: Dto,
        private baseEntity: Entity,
    ) {  
        this.modelMapper = new ModelMapper(
            this.baseDto, this.baseEntity
        );
        this.queryParser = new QueryParser();
    }

    @Post()
    // @Header('Cache-Control', 'none')
    @HttpCode(HttpStatus.CREATED)
    // @Roles(['admin'])
    async create(
        // @Body(new ValidationPipe()) createTaskDto: CreateTaskDto, 
        @Body() 
        baseDto: Dto,

        @Res() res: Response
    ) {
        try {
            console.log('============ before baseDto ', baseDto)

            this.modelMapper.setDto(baseDto);
            console.log('============ baseDto ', baseDto)

            const baseEntity: Entity = this.modelMapper.convertDtoToEntity()!;
            console.log('============ baseEntity ', baseEntity)
            const data = await this.baseService.create(baseEntity);
            // res.status(HttpStatus.CREATED).send();
            res.status(HttpStatus.CREATED).json(data);
        } catch (error) {
            console.log('============== loigi', error)
            throw new HttpException(
                HttpErrorMessage.CREATE, 
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
        @Query() query: QueryParams,
        @Res({ passthrough: true }) res: Response
    ) {
        try {
            console.log('============= query ', query)
            const parsedQuery = this.queryParser.parseFindManyQuery(query);

            const data = this.baseService.findAll(parsedQuery);

            // res.status(HttpStatus.OK).json([]);
            res.status(HttpStatus.OK).json(data);

        } catch (err) {
            console.log('===== err ', err)
            throw new HttpException(
                HttpErrorMessage.RESOURCE_NOT_FOUND, 
                HttpStatus.INTERNAL_SERVER_ERROR
            );
            
            /*
                throw new BadRequestException('Something bad happened', { 
                    cause: new Error(), 
                    description: 'Some error description' 
                })
                    
                throw new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    error: 'This is a custom message',
                }, HttpStatus.FORBIDDEN, {
                    cause: 'Em sai roi'
                });
            */
        }
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(
        @Param() pathParams: PathParams,
        @Res({ passthrough: true }) res: Response
    ) {
        try {
            const { id } = pathParams;
            console.log('============= id ', id)
            console.log('============= type id ', typeof id)

            const data = this.baseService.findById(id!);

            res.status(HttpStatus.OK).json(data);
        } catch (error) {
            throw new HttpException(
                HttpErrorMessage.RESOURCE_NOT_FOUND, 
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    update(
        @Param('id') id: Id,
        @Body() baseDto: Dto,
        @Res({ passthrough: true }) res: Response
    ) {
        try {
            this.modelMapper.setDto(baseDto);
            const partialEntity: QueryDeepPartialEntity<Entity> = this.modelMapper.convertDtoToPartialEntity()!;
            const data = this.baseService.updateById(id, partialEntity);
            console.log('update ', data)

            res.status(HttpStatus.NO_CONTENT);
        } catch (error) {
            throw new HttpException(
                HttpErrorMessage.UPDATE, 
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Delete(':id')
    async remove(
        @Param('id') id: Id,
        @Res({ passthrough: true }) res: Response
    ) {
        try {
            const data = await this.baseService.deleteById(id);
            console.log('delete ', data)

            res.status(HttpStatus.NO_CONTENT);
        } catch (error) {
            throw new HttpException(
                HttpErrorMessage.DELETE, 
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Get('*')
    @Redirect('https://docs.nestjs.com', 302)
    getDocs(@Query('version') version) {
        if (version && version === '5') {
            return { url: 'https://docs.nestjs.com/v5/' };
        }
    }
}
