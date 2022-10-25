import { HttpException, InternalServerErrorException } from "@nestjs/common";

export function errorHandler(error: any) {
    if (error.code === "ECONNREFUSED") {
        throw new InternalServerErrorException("Auth microservice error.");
    }

    throw new HttpException(error?.response?.data, error?.response?.status);
}
