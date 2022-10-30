import { HttpModule } from "@nestjs/axios";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { LoginMethodMiddleware } from "src/middleware/login-method.middleware";
import { JWTStrategy } from "src/strategy/jwt.strategy";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [AuthModule, ConfigModule, HttpModule],
    exports: [UserService],
    providers: [UserService, AuthService, JWTStrategy],
    controllers: [UserController],
})
export class UserModule implements NestModule {
    async configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoginMethodMiddleware)
            .exclude(
                { path: "api/user", method: RequestMethod.GET },
                { path: "api/user/:email", method: RequestMethod.GET },
                { path: "api/user/fetch-organizations", method: RequestMethod.POST },
            )
            .forRoutes(UserController);
    }
}
