import { Body, Controller, Get, Param, Post, Put, Response, UseGuards } from "@nestjs/common";
import { Response as Res } from "express";
import { JwtAuthGuard } from "src/guard/jwt.guard";
import { User } from "./user.decorator";
import { UserService } from "./user.service";

@Controller("user")
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getOwnDetails(@User() user: object, @Response() res: Res) {
        return res.json({ data: user });
    }

    // TODO: ensure user has at least user privileges
    @Get(":email")
    async getDetailsFromEmail(@Param("email") email: string) {
        return await this.userService.getDetailsFromEmail(email);
    }

    // Takes in an array of organization ID and return the corresponding names
    // request: {ids: ["orgid1, orgid2 ..."]}
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
