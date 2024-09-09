import { AccountDto, EmployeeDto } from 'src/modules/hr';
import { IntersectionType, OmitType } from '@nestjs/mapped-types';
import { PartialType, PickType } from '@nestjs/swagger';

export class SignInDto extends IntersectionType(
    // @ApiProperty()
    PartialType(
        PickType(AccountDto, ['username', 'email'] as const)
    ), 
    PickType(
        AccountDto, ['password'] as const
    )
) { }

export class RegistryDto extends IntersectionType(
    OmitType(AccountDto, ['employeeId', 'lastLoginAt'] as const), 
    OmitType(EmployeeDto, ['email'] as const)
) {}

export class AccessDto {
    access_token: string
}
