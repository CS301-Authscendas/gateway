import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { DemoModule } from "./demo/demo.module";
import { UserModule } from "./user/user.module";

@Module({
    imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true }), UserModule, AuthModule, DemoModule],
    controllers: [AppController],
})
export class AppModule {}
