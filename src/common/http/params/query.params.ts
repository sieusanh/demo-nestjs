import { ApiProperty } from '@nestjs/swagger';

export class QueryParams {
    @ApiProperty()
    offset: number;
    
    @ApiProperty()
    limit: number;

    @ApiProperty()
    sort_by: string;

    @ApiProperty()
    sort_direction: string;
}

