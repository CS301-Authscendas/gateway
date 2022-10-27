import { Body, Controller, Get, Param, Post, Put, Request, Response, UseGuards } from "@nestjs/common";
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
        return await this.userService.fetchOrganizationsByList(requestBody);
    }

    // TODO: ensure user has owner or admin privileges
    // Endpoint to render list of users on the home screen
    @Get("fetch-users-list/:organizationId")
    async fetchUsersListByOrganization(@Param("organizationId") organizationId: string) {
        return await this.userService.fetchUsersByOrg(organizationId);
    }

    // TODO: ensure user has at least admin:edit privileges
    // Endpoint to edit user information
    @Put("edit-user-details")
    async editUserDetails(@Body() requestBody: object) {
        return await this.userService.updateUserDetails(requestBody);
    }
}
