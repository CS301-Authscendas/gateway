import { BadRequestException, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader: string = request.header("Authorization");
        const loginMethod: string = request.header("login-method");
        if (!loginMethod) {
            throw new BadRequestException("Login method is unspecified!");
        }

        if (!authHeader) {
            throw new BadRequestException("JWT token is missing.");
        }

        request.user = await this.authService.validateJwtToken(authHeader, loginMethod);
        return true;
    }
}
