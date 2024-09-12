import {
    Controller, Get, Post, Put, Delete,
    Body, Query,
    Req, Res,
    Header,
    HttpCode, HttpStatus, Param, Redirect,
    HttpException,

} from '@nestjs/common';
import { Request, Response, response } from 'express';
import { ApiOperation, ApiBody } from '@nestjs/swagger';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { Id, QueryParams, QueryParser, PathParams, HttpErrorMessage } from 'src/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ValidationPipe } from 'src/common/pipe';
import { Roles } from 'src/common';
import { BaseDto, BaseEntity, BaseService } from '.';

@ApiHeader({
    name: 'X-MyHeader',
    description: 'Custom header'
})
// @ApiTags()
// @Controller()
export class BaseController<
    Dto extends BaseDto, 
    Entity extends BaseEntity
> {
    private queryParser: QueryParser;

    constructor(
        private baseService: BaseService<Entity>,
        private baseDto: Dto,
        private baseEntity: Entity
    ) {  
        this.queryParser = new QueryParser();
    }

    @Post()
    // @Header('Cache-Control', 'none')
    @HttpCode(HttpStatus.CREATED)
    // @Roles(['admin'])
    @ApiOperation({ summary: `Create` })
    @ApiBody({
        description: 'Dto'
    }) 
    async create(
        // @Body(new ValidationPipe())
        @Body()
        dto: Dto,

        // @Res() res: Response
    ): Promise<Dto> {
        try {
            this.baseEntity.createFromDto(dto);

            const result = this.baseService
                .create(this.baseEntity)
                .then(res => {
                    const dto = this.baseDto.createFromEntity(res);
                    return dto;
                })
                .catch(err => err);

            return result;
            // res.status(HttpStatus.CREATED).json(data);
        } catch (error) {
            throw new HttpException(
                HttpErrorMessage.CREATE, 
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: `findAll` })
    async findAll(
        @Query() query: QueryParams,
        @Res({ passthrough: true }) res: Response
    ) {
        try {
            const parsedQuery = this.queryParser.parseFindManyQuery(query);

            const result = this.baseService.findAll(parsedQuery);

            return result;
        } catch (err) {
            throw new HttpException(
                HttpErrorMessage.NOT_FOUND, 
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
    @ApiOperation({ summary: `findOne` })
    findOne(
        @Param() pathParams: PathParams,
        @Res({ passthrough: true }) res: Response
    ) {
        try {
            const { id } = pathParams;

            const data = this.baseService.findById(id!);

            return data;

        } catch (error) {
            throw new HttpException(
                HttpErrorMessage.NOT_FOUND, 
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: `update` })
    update(
        @Param('id') id: Id,
        @Body() dto: Dto,
    ) {
        try {
            this.baseEntity.createFromDto(dto);
            return this.baseService.updateById(id, this.baseEntity);

        } catch (error) {
            throw new HttpException(
                HttpErrorMessage.UPDATE, 
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: `remove` })
    async remove(
        @Param('id') id: Id
    ) {
        try {
            return this.baseService.deleteById(id);
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
