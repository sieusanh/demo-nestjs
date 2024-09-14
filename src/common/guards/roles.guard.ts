import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    console.log('======== context.getHandler() ', context.getHandler())
    const roles = this.reflector.get(Roles, context.getHandler());
    console.log('======== roles ', roles)

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return matchRoles(roles, user.roles);
  }
}

function matchRoles(roles: string[], userRoles: string[]) {
  const roleSet = new Set(roles);
  const userRoleSet = new Set(userRoles);
  const hasCommonRole = [...userRoleSet].some(item => roleSet.has(item));
  return hasCommonRole;
}
