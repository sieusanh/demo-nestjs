import {
    Get, Post, Put, Delete,
    Body, Query,
    Req, Res,
    Header,
    HttpCode, HttpStatus, Param, Redirect,
    HttpException,
    Inject
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiOperation, ApiBody, ApiHeader, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { Id, QueryParams, QueryParser, PathParams, HttpErrorMessage } from 'src/common';
import { ValidationPipe } from 'src/common/pipe';
import { RolesGuard } from 'src/common';
import { BaseDto, BaseEntity, BaseService } from '.';
import { BaseApiBody } from 'src/common/decorator';

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
    public apiBodyExample: Object;

    constructor(
        private baseService: BaseService<Entity>,
        private baseDto: Dto,
        private baseEntity: Entity,
        apiBodyExample: Object
    ) {  
        this.queryParser = new QueryParser();
        this.apiBodyExample = apiBodyExample;
        console.log('============ kiki ', this?.['apiBodyExample']!)
    }

    // setApiBodyExample(apiBodyExample: Object) {
    //     console.log('=========== inside apiBodyExample ', apiBodyExample)
    //     this.apiBodyExample = apiBodyExample;
    //     console.log('=========== zzz apiBodyExample', this?.['apiBodyExample'])
    // }

    @Post()
    // @Header('Cache-Control', 'none')
    @HttpCode(HttpStatus.CREATED)
    // @RolesGuard(['admin'])

    @ApiOperation({ summary: `Create` })
    // @ApiBody({
    //     // a: {
    //     //     description: 'Body Creating',
    //     //     // examples: this?.['apiBodyExample'],
    //     examples: {
    //         a: {
    //             value: {
    //                 prop1: 'val1'
    //             }
                
    //         }
    //     }
    // })
    @ApiBody({
        description: 'Body',
        // examples: this?.['apiBodyExample'],
        examples: {
            // 'Case 1': {
            //     value: {
            //         prop1: 'val1',
            //         prop2: 'val2'
            //     }
            // },
            'Case 2': {
                // value: getSchemaPath(this?.['apiBodyExample']!)
                value: undefined
            }
        }
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
