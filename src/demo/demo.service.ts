import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DemoService {
    private BASE_USER_URL: string;
    private BASE_AUTH_URL: string;
    private logger: Logger = new Logger(DemoService.name);

    constructor(private readonly httpService: HttpService, configService: ConfigService) {
        this.BASE_USER_URL =
            configService.get("NODE_ENV") === "production"
                ? configService.get("PRODUCTION_ORGANIZATION_URL") ?? ""
                : configService.get("BASE_ORGANIZATION_URL") ?? "";

        this.BASE_AUTH_URL =
            configService.get("NODE_ENV") === "production"
                ? configService.get("PRODUCTION_AUTH_URL") ?? ""
                : configService.get("BASE_AUTH_URL") ?? "";
    }

    async triggerEmail() {
        try {
            await this.httpService.axiosRef.get(`${this.BASE_USER_URL}/s3/test-send`);
        } catch (error) {
            Logger.log(error);
        }
    }
}
