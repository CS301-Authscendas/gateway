import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { USER_ENDPOINTS } from "./user.constants";
import { OrganizationResponse, UserResponse } from "./user.dto";
import { errorHandler } from "./user.util";

const USER_PREFIX = "user";
const ORGANIZATION_PREFIX = "organization";

@Injectable()
export class UserService {
    private BASE_USER_URL: string;
    private logger: Logger = new Logger(UserService.name);

    constructor(private readonly httpService: HttpService, configService: ConfigService) {
        this.BASE_USER_URL =
            configService.get("NODE_ENV") === "production"
                ? configService.get("PRODUCTION_ORGANIZATION_URL") ?? ""
                : configService.get("BASE_ORGANIZATION_URL") ?? "";

        this.logger.log(this.BASE_USER_URL);
    }

    async getDetailsFromEmail(email: string) {
        try {
            const resp = await this.httpService.axiosRef.get<UserResponse>(
                `${this.BASE_USER_URL}/${USER_PREFIX}/${email}`,
            );
            return resp?.data;
        } catch (error) {
            errorHandler(this.logger, error);
        }
    }

    async fetchUsersByOrg(organizationId: string) {
        try {
            const resp = await this.httpService.axiosRef.get<UserResponse[]>(
                `${this.BASE_USER_URL}/${USER_PREFIX}/${USER_ENDPOINTS.GET_USERS_FROM_ORG}/${organizationId}`,
            );
            return resp?.data;
        } catch (error) {
            errorHandler(this.logger, error);
        }
    }

    async updateUserDetails(requestBody: object) {
        try {
            const resp = await this.httpService.axiosRef.put<boolean>(
                `${this.BASE_USER_URL}/${USER_PREFIX}`,
                requestBody,
            );
            return resp?.data;
        } catch (error) {
            errorHandler(this.logger, error);
        }
    }

    async deleteUser(email: string) {
        try {
            const resp = await this.httpService.axiosRef.delete(`${this.BASE_USER_URL}/${USER_PREFIX}/${email}`);
            return resp?.data;
        } catch (error) {
            errorHandler(this.logger, error);
        }
    }

    async fetchOrganizationsByList(requestBody: object) {
        try {
            const resp = await this.httpService.axiosRef.post<OrganizationResponse[]>(
                `${this.BASE_USER_URL}/${ORGANIZATION_PREFIX}/${USER_ENDPOINTS.FETCH_ORGANIZATIONS}`,
                requestBody,
            );
            return resp?.data;
        } catch (error) {
            errorHandler(this.logger, error);
        }
    }
}
