import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AUTH_ENDPOINTS } from "./auth.constants";
import { errorHandler } from "./auth.util";

@Injectable()
export class AuthService {
    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

    async signup(requestBody: object) {
        try {
            return await this.httpService.axiosRef.post(AUTH_ENDPOINTS.SIGNUP, requestBody);
        } catch (error) {
            errorHandler(error);
        }
    }

    async login(requestBody: object) {
        try {
            return await this.httpService.axiosRef.post(AUTH_ENDPOINTS.LOGIN, requestBody);
        } catch (error) {
            errorHandler(error);
        }
    }

    async generate2FAToken(email: string) {
        try {
            return await this.httpService.axiosRef.get(`${AUTH_ENDPOINTS.GENERATE_2FA}/${email}`);
        } catch (error) {
            errorHandler(error);
        }
    }

    async validate2FAToken(requestBody: object) {
        try {
            return await this.httpService.axiosRef.post(AUTH_ENDPOINTS.VALIDATE_2FA, requestBody);
        } catch (error) {
            errorHandler(error);
        }
    }

    async ssoLogin() {
        try {
            return await this.httpService.axiosRef.get(AUTH_ENDPOINTS.SSO_LOGIN);
        } catch (error) {
            errorHandler(error);
        }
    }

    async ssoCallback(code: string) {
        try {
            return await this.httpService.axiosRef.get(`${AUTH_ENDPOINTS.SSO_CALLBACK}?code=${code}`);
        } catch (error) {
            errorHandler(error);
        }
    }

    async userSignUpStatus(id: string) {
        try {
            return await this.httpService.axiosRef.get(`${AUTH_ENDPOINTS.USER_SIGNUP_STATUS}/${id}`);
        } catch (error) {
            errorHandler(error);
        }
    }
}
