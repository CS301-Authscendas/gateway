import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { USER_ENDPOINTS } from "./user.constants";
import { errorHandler } from "./user.util";

const USER_PREFIX = "user";
const ORGANIZATION_PREFIX = "organization";

@Injectable()
export class UserService {
    private BASE_URL;
    constructor(private readonly httpService: HttpService, configService: ConfigService) {
        // this.BASE_URL = configService.get("BASE_USER_URL");
        this.BASE_URL =
            process.env.NODE_ENV === "production"
                ? configService.get("PROD_USER_URL")
                : configService.get("BASE_USER_URL");
    }

    async getDetailsFromEmail(email: string) {
        try {
            const resp = await this.httpService.axiosRef.get(`${this.BASE_URL}/${USER_PREFIX}/${email}`);
            return resp?.data;
        } catch (error) {
            errorHandler(error);
        }
    }

    async fetchUsersByOrg(organizationId: string) {
        try {
            const resp = await this.httpService.axiosRef.get(
                `${this.BASE_URL}/${USER_PREFIX}/${USER_ENDPOINTS.GET_USERS_FROM_ORG}/${organizationId}`,
            );
            return resp?.data;
        } catch (error) {
            errorHandler(error);
        }
    }

    async updateUserDetails(requestBody: object) {
        try {
            const resp = await this.httpService.axiosRef.put(`${this.BASE_URL}/${USER_PREFIX}`, requestBody);
            return resp?.data;
        } catch (error) {
            errorHandler(error);
        }
    }

    async deleteUser(email: string) {
        try {
            const resp = await this.httpService.axiosRef.delete(`${this.BASE_URL}/${USER_PREFIX}/${email}`);
            return resp?.data;
        } catch (error) {
            errorHandler(error);
        }
    }

    async fetchOrganizationsByList(requestBody: object) {
        try {
            const resp = await this.httpService.axiosRef.post(
                `${this.BASE_URL}/${ORGANIZATION_PREFIX}/${USER_ENDPOINTS.FETCH_ORGANIZATIONS}`,
                requestBody,
            );
            return resp?.data;
        } catch (error) {
            errorHandler(error);
        }
    }
}
