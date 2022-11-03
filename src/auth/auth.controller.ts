import { Body, Controller, Get, Param, Post, Query, Response, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response as Res } from "express";
import { JwtAuthGuard } from "../guard/jwt.guard";
import { UserResponse } from "../user/user.dto";
import { AUTH_ENDPOINTS } from "./auth.constants";
import { GenericAuthResponse, JwtResponse } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post(AUTH_ENDPOINTS.SIGNUP)
    @ApiBody({ type: GenericAuthResponse })
    async signUp(@Body() requestBody: object): Promise<GenericAuthResponse> {
        return await this.authService.signup(requestBody);
    }

    @Post(AUTH_ENDPOINTS.LOGIN)
    @ApiBody({ type: GenericAuthResponse })
    async logIn(@Body() requestBody: object): Promise<GenericAuthResponse> {
        return await this.authService.login(requestBody);
    }

    @Get(`${AUTH_ENDPOINTS.GENERATE_2FA}/:email`)
    @ApiBody({ type: GenericAuthResponse })
    @ApiResponse({ status: 200 })
    async generate2FA(@Param("email") email: string): Promise<GenericAuthResponse> {
        return await this.authService.generate2FAToken(email);
    }

    @Post(AUTH_ENDPOINTS.VALIDATE_2FA)
    @ApiBody({ type: UserResponse })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 401, description: "Invalid or expired 2FA token." })
    async validate2FA(@Body() requestBody: object): Promise<UserResponse> {
        return await this.authService.validate2FAToken(requestBody);
    }

    @Post(`${AUTH_ENDPOINTS.GENERATE_JWT}/:email`)
    @ApiBody({ type: JwtResponse })
    async generateJWTToken(@Param("email") email: string): Promise<JwtResponse> {
        return await this.authService.generateJwtToken(email);
    }

    @UseGuards(JwtAuthGuard)
    @Get(AUTH_ENDPOINTS.VALIDATE_JWT)
    @ApiBearerAuth()
    @ApiBody({ type: UserResponse })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 401, description: "Invalid JWT token." })
    validateJwtToken(@Response() res: Res) {
        return res.send({ message: "JWT token is valid!" });
    }

    @Get(AUTH_ENDPOINTS.SSO_LOGIN)
    @ApiResponse({ status: 403 })
    async ssoLogin(@Response() res: Res) {
        return res.redirect(await this.authService.ssoLogin());
    }

    @Get(`${AUTH_ENDPOINTS.SSO_CALLBACK}`)
    @ApiResponse({ status: 403 })
    @ApiResponse({ status: 401, description: "Consent was not provided to web application." })
    async ssoCallback(@Query("code") authCode: string, @Response() res: Res) {
        return res.redirect(await this.authService.ssoCallback(authCode));
    }

    @Get(`${AUTH_ENDPOINTS.USER_SIGNUP_STATUS}/:id`)
    @ApiBody({ type: String })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 400, description: "User has already signed up!" })
    async userSignUpStatus(@Param("id") id: string): Promise<string> {
        return await this.authService.userSignUpStatus(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(`${AUTH_ENDPOINTS.VALIDATE_LOGIN_METHOD}`)
    @ApiBody({ type: Boolean })
    @ApiResponse({ status: 200 })
    async checkUserLoginMethod(): Promise<boolean> {
        return true;
    }
}
