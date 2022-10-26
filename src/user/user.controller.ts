import { Controller, Get, UseGuards, Request, Response, Param, Post, Body } from "@nestjs/common";
import { Request as Req, Response as Res } from "express";
import { JwtAuthGuard } from "src/guard/jwt.guard";

@Controller("user")
@UseGuards(JwtAuthGuard)
export class UserController {
    @Get()
    getOwnDetails(@Request() req: Req, @Response() res: Res) {
        return res.json({ data: req.user });
    }

    // TODO: ensure user has at least user privileges
    @Get(":email")
    async getDetailsFromEmail(@Param("email") email: string) {
        // TODO: Implement
    }

    // Takes in an array of organization ID and return the corresponding names
    @Post("fetch-organizations")
    async fetchOrganizations(@Body() requestBody: object) {
        // TODO: Implement
    }

    // TODO: ensure user has admin:view privileges
    // Endpoint to render list of users on the home screen
    @Get("fetch-users-list")
    async fetchUsersList() {
        // TODO: Implement
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
