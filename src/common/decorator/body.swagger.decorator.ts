import { applyDecorators } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

type ApiBodyObj = { description?: string, examples?: {}};

export function BaseApiBody({ description, examples }: ApiBodyObj) {
    return applyDecorators(
        ApiBody({
            description, 
            examples
        })
    );
}



function printType<Type>(input: Type): string {
    const result: string = 'Result: ' + input;
    return result;
}

const result: string = printType(123);

console.log({ result })

