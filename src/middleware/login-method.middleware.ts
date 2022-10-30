import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class LoginMethodMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService) {}
    async use(req: Request, _: Response, next: NextFunction) {
        const loginMethod: string = req.headers["login-method"] as string;
        const orgId: string = req.headers["organization-id"] as string;
        const result = await this.authService.checkUserLoginMethod(orgId, loginMethod);

        if (result) {
            next();
        }
    }
}
