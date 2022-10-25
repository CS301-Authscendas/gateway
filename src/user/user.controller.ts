import { Controller, Get, UseGuards, Request, Response, Param } from "@nestjs/common";
import { Request as Req, Response as Res } from "express";
import { JwtAuthGuard } from "src/guard/jwt.guard";

@Controller("user")
@UseGuards(JwtAuthGuard)
export class UserController {
    @Get()
    getOwnDetails(@Request() req: Req, @Response() res: Res) {
        return res.json({ data: req.user });
    }

    // TODO: ensure user has sufficient privileges
    @Get(":email")
    async getDetailsFromEmail(@Param("email") email: string) {
        // TODO: Implement
    }
}
