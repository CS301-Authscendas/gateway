import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { errorHandler } from "./user.util";

const USER_PREFIX = "user";
const ORGANIZATION_PREFIX = "organization";

@Injectable()
export class UserService {
    private BASE_URL;
    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {
        this.BASE_URL = configService.get("BASE_USER_URL");
    }

    async getDetailsFromEmail(email: string) {
        try {
            const resp = await this.httpService.axiosRef.get(`${this.BASE_URL}/${USER_PREFIX}/${email}`);
            return resp?.data;
        } catch (error) {
            errorHandler(error);
        }
    }

    async getUsersFromOrg(organizationId: string) {
        try {
            const resp = await this.httpService.axiosRef.get(`${this.BASE_URL}/${USER_PREFIX}/org/${organizationId}`);
            return resp?.data;
        } catch (error) {
            errorHandler(error);
        }
    }
}
