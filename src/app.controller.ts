import { HttpService } from "@nestjs/axios";
import { Controller, Get, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Controller()
export class AppController {
    private readonly logger = new Logger(AppController.name);
    private readonly isProdEnvironment: boolean;

    constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {
        this.isProdEnvironment = process.env.NODE_ENV === "production";
    }

    @Get("/healthcheck")
    healthCheck(): string {
        return "Gateway service is awake!";
    }

    @Get("/auth/healthcheck")
    async authHealthCheck(): Promise<string> {
        const AUTH_URL = this.isProdEnvironment
            ? this.configService.get("PRODUCTION_AUTH_URL")
            : this.configService.get("BASE_AUTH_URL");

        this.logger.log("Auth url --- " + AUTH_URL);
        const response = await this.httpService.axiosRef.get(`${AUTH_URL}/healthcheck`);
        return response.data;
    }

    @Get("/organizations/healthcheck")
    async orgHealthCheck(): Promise<string> {
        const ORG_URL = this.isProdEnvironment
            ? this.configService.get("PRODUCTION_ORGANIZATION_URL")
            : this.configService.get("BASE_ORGANIZATION_URL");

        this.logger.log("Org url --- " + ORG_URL);
        const response = await this.httpService.axiosRef.get(`${ORG_URL}/healthcheck`);
        return response.data;
    }
}
