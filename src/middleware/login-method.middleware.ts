import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class LoginMethodMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService) {}
    async use(req: Request, _: Response, next: NextFunction) {
        const loginMethod: string = req.header("login-method");
        const orgId: string = req.header("organization-id");
        const result = await this.authService.checkUserLoginMethod(orgId, loginMethod);

        if (result) {
            next();
        }
    }
}
