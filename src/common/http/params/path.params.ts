
import { IsNumberString, IsString, IsNotEmpty } from 'class-validator';
import { Id } from 'src/common';

export class PathParams {

    @IsString()
    @IsNotEmpty()
    id?: Id;
    
}
