import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { PERMISSIONS_KEY } from "../utils/decorators/permissions.decorator";

export enum Permission {
    User = "user",
    AdminRead = "admin-read",
    AdminEdit = "admin-edit",
    AdminDelete = "admin-delete",
}

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const request: Request = context.switchToHttp().getRequest();
        const user: any = request.user;
        const roles: { organizationId: string; permission: string }[] = user?.userDetails?.roles;
        const orgId: string = request.headers["organization-id"] as string;

        const userPermissions = roles.filter((orgPermission) => {
            return orgPermission.organizationId === orgId;
        });

        if (userPermissions.length === 0) {
            throw new UnauthorizedException("User does not have sufficient permission to carry out this request.");
        }

        return requiredRoles.some((role) => userPermissions[0]["permission"].includes(role));
    }
}
