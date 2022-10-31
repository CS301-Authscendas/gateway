import { ApiProperty } from "@nestjs/swagger";

export interface I2FAToken {
    expiry: Date;
    token: string;
}

export interface IEmailDTO {
    email: string;
}

export interface ISet2FASecretDTO {
    email: string;
    secret: TwoFATokenObj;
}

export enum EStatus {
    PENDING = "pending",
    APPROVED = "approved",
}

export enum EUserScopes {
    AdminDelete = "admin-delete",
    AdminWrite = "admin-write",
    AdminRead = "admin-read",
    User = "user",
}

export class Role {
    @ApiProperty()
    organizationId: string;

    @ApiProperty({ enum: EUserScopes, isArray: true })
    permission: EUserScopes[];
}

export class TwoFATokenObj {
    @ApiProperty()
    token: string;

    @ApiProperty()
    creationDate: number;
}

export class UserResponse {
    @ApiProperty()
    id: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password?: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    birthDate: string;

    @ApiProperty({ type: TwoFATokenObj })
    twoFATokenObj?: TwoFATokenObj | null;

    @ApiProperty({ type: [Role] })
    roles: Role[];

    @ApiProperty()
    phoneNumber?: string;

    @ApiProperty()
    updatedAt: number;
}

export class OrganizationResponse {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    jwkToken: string;

    @ApiProperty()
    authMethod: string[];

    @ApiProperty()
    updatedAt: number;
}
