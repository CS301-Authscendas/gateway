import { Body, Controller, Delete, Get, Param, Post, Put, Response, UseGuards } from "@nestjs/common";
import { Response as Res } from "express";
import { JwtAuthGuard } from "../guard/jwt.guard";
import { RequirePermissions } from "../utils/decorators/permissions.decorator";
import { Organization } from "../utils/decorators/organization.decorator";
import { User } from "../utils/decorators/user.decorator";
import { UserService } from "./user.service";
import { PermissionGuard } from "../guard/permissions.guard";

@Controller("user")
@UseGuards(JwtAuthGuard, PermissionGuard)
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
    @Get("fetch/users-list")
    @RequirePermissions("admin-view")
    async fetchUsersListByOrganization(@Organization() organizationId: string) {
        return await this.userService.fetchUsersByOrg(organizationId);
    }

    // TODO: ensure user has at least admin:edit privileges
    // Endpoint to edit user information
    @Put("edit-user-details")
    @RequirePermissions("admin-edit")
    async editUserDetails(@Body() requestBody: object) {
        return await this.userService.updateUserDetails(requestBody);
    }

    @Delete(":email")
    @RequirePermissions("admin-delete")
    async deleteUser(@Param("email") email: string): Promise<void> {
        await this.userService.deleteUser(email);
    }
}
