import { ApiProperty } from "@nestjs/swagger";

export class GenericAuthResponse {
    @ApiProperty()
    message: string;
}

export class JwtResponse {
    @ApiProperty()
    token: string;
}
