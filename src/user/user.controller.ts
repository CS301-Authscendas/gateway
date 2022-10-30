import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Request, Response, UseGuards } from "@nestjs/common";
import { Request as Req, Response as Res } from "express";
import { JwtAuthGuard } from "src/guard/jwt.guard";
import { Organization } from "./decorators/organization.decorator";
import { User } from "./decorators/user.decorator";
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
    async fetchUsersListByOrganization(@Organization() organizationId: string) {
        return await this.userService.fetchUsersByOrg(organizationId);
    }

    // TODO: ensure user has at least admin:edit privileges
    // Endpoint to edit user information
    @Put("edit-user-details")
    async editUserDetails(@Body() requestBody: object) {
        return await this.userService.updateUserDetails(requestBody);
    }

    @Delete(":email")
    async deleteUser(@Param("email") email: string): Promise<void> {
        await this.userService.deleteUser(email);
    }
}
