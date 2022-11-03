import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserResponse } from "../user/user.dto";
import { AUTH_ENDPOINTS } from "./auth.constants";
import { GenericAuthResponse, JwtResponse } from "./auth.dto";
import { errorHandler } from "./auth.util";

@Injectable()
export class AuthService {
    private BASE_AUTH_URL: string;
    private logger: Logger = new Logger(AuthService.name);

    constructor(private readonly httpService: HttpService, configService: ConfigService) {
        this.BASE_AUTH_URL =
            configService.get("NODE_ENV") === "production"
                ? configService.get("PRODUCTION_AUTH_URL") ?? ""
                : configService.get("BASE_AUTH_URL") ?? "";

        this.BASE_AUTH_URL += "/auth";
        this.logger.log(this.BASE_AUTH_URL);
    }

    async signup(requestBody: object) {
        try {
            const resp = await this.httpService.axiosRef.post<GenericAuthResponse>(
                `${this.BASE_AUTH_URL}/${AUTH_ENDPOINTS.SIGNUP}`,
                requestBody,
            );
            return resp?.data;
        } catch (error) {
            errorHandler(this.logger, error);
        }
    }

    async login(requestBody: object) {
        try {
            const resp = await this.httpService.axiosRef.post<GenericAuthResponse>(
                `${this.BASE_AUTH_URL}/${AUTH_ENDPOINTS.LOGIN}`,
                requestBody,
            );
            return resp?.data;
        } catch (error) {
            errorHandler(this.logger, error);
        }
    }

    async generate2FAToken(email: string) {
        try {
            const resp = await this.httpService.axiosRef.get<GenericAuthResponse>(
                `${this.BASE_AUTH_URL}/${AUTH_ENDPOINTS.GENERATE_2FA}/${email}`,
            );
            return resp?.data;
        } catch (error) {
            errorHandler(this.logger, error);
        }
    }

    async validate2FAToken(requestBody: object) {
        try {
            const resp = await this.httpService.axiosRef.post<UserResponse>(
                `${this.BASE_AUTH_URL}/${AUTH_ENDPOINTS.VALIDATE_2FA}`,
                requestBody,
            );
            return resp?.data;
        } catch (error) {
            errorHandler(this.logger, error);
        }
    }

    async generateJwtToken(email: string) {
        try {
            const resp = await this.httpService.axiosRef.get<JwtResponse>(
                `${this.BASE_AUTH_URL}/${AUTH_ENDPOINTS.GENERATE_JWT}/${email}`,
            );
            return resp?.data;
        } catch (error) {
            errorHandler(this.logger, error);
        }
    }

    async validateJwtToken(token: string, loginMethod: string) {
        const data = {
            token: token,
            loginMethod: loginMethod,
        };

        try {
            const resp = await this.httpService.axiosRef.post(
                `${this.BASE_AUTH_URL}/${AUTH_ENDPOINTS.VALIDATE_JWT}`,
                data,
            );
            return resp?.data;
        } catch (error) {
            errorHandler(this.logger, error);
        }
    }

    async validateUserCredentials(email: string, password: string) {
        const data = {
            email: email,
            password: password,
        };

        try {
            const resp = await this.httpService.axiosRef.post(
                `${this.BASE_AUTH_URL}/${AUTH_ENDPOINTS.VALIDATE_JWT}`,
                data,
            );
            return resp?.data;
        } catch (error) {
            errorHandler(this.logger, error);
        }
    }

    async ssoLogin() {
        try {
            const resp = await this.httpService.axiosRef.get(`${this.BASE_AUTH_URL}/${AUTH_ENDPOINTS.SSO_LOGIN}`);
            return resp?.data?.redirectUrl;
        } catch (error) {
            errorHandler(this.logger, error);
        }
    }

    async ssoCallback(code: string) {
        try {
            const resp = await this.httpService.axiosRef.get(
                `${this.BASE_AUTH_URL}/${AUTH_ENDPOINTS.SSO_CALLBACK}?code=${code}`,
            );
            return resp?.data;
        } catch (error) {
            errorHandler(this.logger, error);
        }
    }

    async userSignUpStatus(id: string) {
        try {
            const resp = await this.httpService.axiosRef.get<string>(
                `${this.BASE_AUTH_URL}/${AUTH_ENDPOINTS.USER_SIGNUP_STATUS}/${id}`,
            );
            return resp?.data;
        } catch (error) {
            errorHandler(this.logger, error);
        }
    }

    async checkUserLoginMethod(orgId: string, loginMethod: string): Promise<boolean> {
        const data = {
            organizationId: orgId,
            loginMethod: loginMethod,
        };

        try {
            await this.httpService.axiosRef.post(`${this.BASE_AUTH_URL}/${AUTH_ENDPOINTS.VALIDATE_LOGIN_METHOD}`, data);
            return true;
        } catch (error) {
            errorHandler(this.logger, error);
        }
        return false;
    }
}
