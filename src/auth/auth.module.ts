import { HttpModule } from "@nestjs/axios";
import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { LoginMethodMiddleware } from "../middleware/login-method.middleware";
import { JWTStrategy } from "../strategy/jwt.strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [ConfigModule, PassportModule, HttpModule],
    controllers: [AuthController],
    providers: [AuthService, JWTStrategy],
    exports: [AuthService],
})
export class AuthModule {
    async configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoginMethodMiddleware)
            .forRoutes({ path: "auth/validate-login-method", method: RequestMethod.GET });
    }
}
