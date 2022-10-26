import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { JWTStrategy } from "src/strategy/jwt.strategy";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [AuthModule, ConfigModule, HttpModule],
    exports: [UserService],
    providers: [UserService, AuthService, JWTStrategy],
    controllers: [UserController],
})
export class UserModule {}
