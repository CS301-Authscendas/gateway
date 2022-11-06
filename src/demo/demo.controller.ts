import { Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DemoService } from "./demo.service";

@Controller("demo")
@ApiTags("demo")
export class DemoController {
    constructor(private readonly demoService: DemoService) {}

    @Post("trigger-email")
    async triggerEmail() {
        return this.demoService.triggerEmail();
    }

    @Post("trigger-seed")
    async triggerUserSeeding() {
        return this.demoService.triggerUserSeeding();
    }
}
