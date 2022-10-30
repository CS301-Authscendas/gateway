import { Body, Controller, Get, Param, Post, Response, UseGuards } from "@nestjs/common";
import { Response as Res } from "express";
import { JwtAuthGuard } from "../guard/jwt.guard";
import { AUTH_ENDPOINTS } from "./auth.constants";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post(AUTH_ENDPOINTS.SIGNUP)
    async signUp(@Body() requestBody: object) {
        const resp = await this.authService.signup(requestBody);
        return resp;
    }

    @Post(AUTH_ENDPOINTS.LOGIN)
    async logIn(@Body() requestBody: object) {
        return await this.authService.login(requestBody);
    }

    @Get(`${AUTH_ENDPOINTS.GENERATE_2FA}/:email`)
    async generate2FA(@Param("email") email: string) {
        return await this.authService.generate2FAToken(email);
    }

    @Post(AUTH_ENDPOINTS.VALIDATE_2FA)
    async validate2FA(@Body() requestBody: object) {
        return await this.authService.validate2FAToken(requestBody);
    }

    @Post(`${AUTH_ENDPOINTS.GENERATE_JWT}/:email`)
    async generateJWTToken(@Param("email") email: string) {
        return await this.authService.generateJwtToken(email);
    }

    @UseGuards(JwtAuthGuard)
    @Get(AUTH_ENDPOINTS.VALIDATE_JWT)
    validateJwtToken(@Response() res: Res) {
        return res.send({ message: "JWT token is valid!" });
    }

    @Get(AUTH_ENDPOINTS.SSO_LOGIN)
    async ssoLogin() {
        return await this.authService.ssoLogin();
    }

    @Get(`${AUTH_ENDPOINTS.SSO_CALLBACK}/:code`)
    async ssoCallback(@Param("code") code: string) {
        return await this.authService.ssoCallback(code);
    }

    @Get(`${AUTH_ENDPOINTS.USER_SIGNUP_STATUS}/:id`)
    async userSignUpStatus(@Param("id") id: string) {
        return await this.authService.userSignUpStatus(id);
    }
}
