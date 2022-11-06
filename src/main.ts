import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    app.enableCors();
    app.setGlobalPrefix("/v1");

    const config = new DocumentBuilder().setTitle("Authcendas API").setVersion("1.0").addBearerAuth().build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("v1/docs", app, document);

    const port = configService.get("PORT");
    Logger.log("Starting service on PORT --- " + port);
    await app.listen(port ?? 3000);
}
bootstrap();
