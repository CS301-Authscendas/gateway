import { HttpModule } from "@nestjs/axios";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "../auth/auth.module";
import { AuthService } from "../auth/auth.service";
import { PermissionGuard } from "../guard/permissions.guard";
import { LoginMethodMiddleware } from "../middleware/login-method.middleware";
import { JWTStrategy } from "../strategy/jwt.strategy";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [AuthModule, ConfigModule, HttpModule],
    exports: [UserService],
    providers: [UserService, AuthService, JWTStrategy, PermissionGuard],
    controllers: [UserController],
})
export class UserModule implements NestModule {
    async configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoginMethodMiddleware)
            .exclude(
                { path: "v1/user", method: RequestMethod.GET },
                { path: "v1/user/:email", method: RequestMethod.GET },
                { path: "v1/user/fetch-organizations", method: RequestMethod.POST },
            )
            .forRoutes(UserController);
    }
}
