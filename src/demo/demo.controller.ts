import { Controller, Post } from "@nestjs/common";
import { DemoService } from "./demo.service";

@Controller("demo")
export class DemoController {
    constructor(private readonly demoService: DemoService) {}

    @Post()
    async triggerEmail() {
        return this.demoService.triggerEmail();
    }
}
