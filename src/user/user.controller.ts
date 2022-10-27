import { Body, Controller, Get, Param, Post, Request, Response, UseGuards } from "@nestjs/common";
import { Request as Req, Response as Res } from "express";
import { JwtAuthGuard } from "src/guard/jwt.guard";
import { UserService } from "./user.service";

@Controller("user")
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getOwnDetails(@Request() req: Req, @Response() res: Res) {
        return res.json({ data: req.user });
    }

    // TODO: ensure user has at least user privileges
    @Get(":email")
    async getDetailsFromEmail(@Param("email") email: string) {
        return await this.userService.getDetailsFromEmail(email);
    }

    // Takes in an array of organization ID and return the corresponding names
    @Post("fetch-organizations")
    async fetchOrganizations(@Body() requestBody: object) {
        // TODO: Implement
    }

    // TODO: ensure user has admin:view privileges
    // Endpoint to render list of users on the home screen
    @Get("fetch-users-list/:organizationId")
    async fetchUsersList(@Param("organizationId") organizationId: string) {
        return await this.userService.getUsersFromOrg(organizationId);
    }

    // TODO: ensure user has owner privileges
    // Endpoint to render list of users on the home screen
    @Get("fetch-users-list/:organizationId")
    async fetchUsersListByOrganization(@Param("organizationId") organizationId: string) {
        // TODO: Implement
    }

    // TODO: ensure user has at least admin:edit privileges
    // Endpoint to edit user information
    @Post("edit-user-details")
    async editUserDetails(@Body() requestBody: object) {
        // TODO: Implement
    }
}
