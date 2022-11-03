import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { DemoController } from "./demo.controller";
import { DemoService } from "./demo.service";

@Module({
    imports: [HttpModule],
    controllers: [DemoController],
    providers: [DemoService],
})
export class DemoModule {}
