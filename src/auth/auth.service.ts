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
            const resp = await this.httpService.axiosRef.post(AUTH_ENDPOINTS.SIGNUP, requestBody);
            return resp?.data;
        } catch (error) {
            errorHandler(error);
        }
    }

    async login(requestBody: object) {
        try {
            const resp = await this.httpService.axiosRef.post(AUTH_ENDPOINTS.LOGIN, requestBody);
            return resp?.data;
        } catch (error) {
            errorHandler(error);
        }
    }

    async generate2FAToken(email: string) {
        try {
            const resp = await this.httpService.axiosRef.get(`${AUTH_ENDPOINTS.GENERATE_2FA}/${email}`);
            return resp?.data;
        } catch (error) {
            errorHandler(error);
        }
    }

    async validate2FAToken(requestBody: object) {
        try {
            const resp = await this.httpService.axiosRef.post(AUTH_ENDPOINTS.VALIDATE_2FA, requestBody);
            return resp?.data;
        } catch (error) {
            errorHandler(error);
        }
    }

    async ssoLogin() {
        try {
            const resp = await this.httpService.axiosRef.get(AUTH_ENDPOINTS.SSO_LOGIN);
            return resp?.data;
        } catch (error) {
            errorHandler(error);
        }
    }

    async ssoCallback(code: string) {
        try {
            const resp = await this.httpService.axiosRef.get(`${AUTH_ENDPOINTS.SSO_CALLBACK}?code=${code}`);
            return resp?.data;
        } catch (error) {
            errorHandler(error);
        }
    }

    async userSignUpStatus(id: string) {
        try {
            const resp = await this.httpService.axiosRef.get(`${AUTH_ENDPOINTS.USER_SIGNUP_STATUS}/${id}`);
            return resp?.data;
        } catch (error) {
            errorHandler(error);
        }
    }
}
