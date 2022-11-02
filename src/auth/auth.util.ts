import { HttpException, InternalServerErrorException, Logger } from "@nestjs/common";

export function errorHandler(logger: Logger, error: any) {
    if (error.code === "ECONNREFUSED") {
        throw new InternalServerErrorException("Auth microservice error.");
    }

    logger.log(error?.response?.data);
    throw new HttpException(error?.response?.data, error?.response?.status);
}
