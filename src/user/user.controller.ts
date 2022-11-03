import { Body, Controller, Delete, Get, Param, Post, Put, Response, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { Response as Res } from "express";
import { JwtAuthGuard } from "../guard/jwt.guard";
import { Permission, PermissionGuard } from "../guard/permissions.guard";
import { Organization } from "../utils/decorators/organization.decorator";
import { RequirePermissions } from "../utils/decorators/permissions.decorator";
import { User } from "../utils/decorators/user.decorator";
import { OrganizationResponse, UserResponse } from "./user.dto";
import { UserService } from "./user.service";

@Controller("user")
@ApiTags("user")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiBody({ type: [UserResponse] })
    getOwnDetails(@User() user: object, @Response() res: Res) {
        return res.json({ data: user });
    }

    @Get(":email")
    @ApiBody({ type: UserResponse })
    async getDetailsFromEmail(@Param("email") email: string): Promise<UserResponse> {
        return await this.userService.getDetailsFromEmail(email);
    }

    // Takes in an array of organization ID and return the corresponding names
    // request: {ids: ["orgid1, orgid2 ..."]}
    @Post("fetch-organizations")
    @ApiBody({ type: [OrganizationResponse] })
    async fetchOrganizations(@Body() requestBody: object): Promise<OrganizationResponse[]> {
        return await this.userService.fetchOrganizationsByList(requestBody);
    }

    // Endpoint to render list of users on the home screen
    @Get("fetch/users-list")
    @RequirePermissions(Permission.AdminRead)
    @ApiBody({ type: [UserResponse] })
    async fetchUsersListByOrganization(@Organization() organizationId: string): Promise<UserResponse[]> {
        return await this.userService.fetchUsersByOrg(organizationId);
    }

    // Endpoint to edit user information
    @Put("edit-user-details")
    @RequirePermissions(Permission.AdminWrite)
    @ApiBody({ type: Boolean })
    async editUserDetails(@Body() requestBody: object): Promise<boolean> {
        return await this.userService.updateUserDetails(requestBody);
    }

    @Delete("myself")
    async deleteMyself(@User() user: object) {
        const email = (user as any)?.userDetails?.email;
        await this.userService.deleteUser(email);
    }

    @Delete(":email")
    @RequirePermissions(Permission.AdminDelete)
    async deleteUser(@Param("email") email: string): Promise<void> {
        await this.userService.deleteUser(email);
    }
}
