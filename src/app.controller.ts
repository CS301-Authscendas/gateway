import { Controller, Get, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Controller()
export class AppController {
    private readonly logger = new Logger(AppController.name);

    constructor(private readonly configService: ConfigService) {}

    @Get("/healthcheck")
    healthCheck(): string {
        return "Gateway service is awake!";
    }

    @Get("/auth/healthcheck")
    authHealthCheck(): string {
        const BASE_AUTH_URL = this.configService.get("BASE_AUTH_URL") + "/auth";

        // TODO: Remove before production deployment.
        this.logger.log("Auth url --- " + BASE_AUTH_URL);
        return "Auth service is awake!";
    }

    @Get("/organizations/healthcheck")
    orgHealthCheck(): string {
        const BASE_USER_URL =
            process.env.NODE_ENV === "production"
                ? this.configService.get("PROD_USER_URL")
                : this.configService.get("BASE_USER_URL");

        // TODO: Remove before production deployment.
        this.logger.log("Org url --- " + BASE_USER_URL);
        return "Org service is awake!";
    }
}
