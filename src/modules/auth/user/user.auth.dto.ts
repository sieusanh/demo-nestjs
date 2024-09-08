import { AccountDto, EmployeeDto } from 'src/modules/hr';
import { IntersectionType, OmitType, PickType, PartialType } from '@nestjs/mapped-types';

export class SignInDto extends IntersectionType(
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
