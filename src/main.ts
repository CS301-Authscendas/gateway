import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    app.enableCors();
    app.setGlobalPrefix("/api");

    const port = configService.get("PORT");
    Logger.log("Starting service on PORT --- " + port);
    await app.listen(port ?? 3000);
}
bootstrap();
