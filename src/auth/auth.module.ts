import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JWTStrategy } from "src/strategy/jwt.strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [ConfigModule, PassportModule, HttpModule],
    controllers: [AuthController],
    providers: [AuthService, JWTStrategy],
    exports: [AuthService],
})
export class AuthModule {}
