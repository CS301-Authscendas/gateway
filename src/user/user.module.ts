import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { JWTStrategy } from "src/strategy/jwt.strategy";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
    imports: [HttpModule],
    exports: [UserService],
    providers: [UserService, JWTStrategy],
    controllers: [UserController],
})
export class UserModule {}
