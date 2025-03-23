import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { Response } from "express";

const SHOWTIME_ID_DOESNT_EXIST_VIOLATION = "23503";
const SEAT_NUMBER_TAKEN = "23505";

@Catch()
export class PostExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = "Internal server error";

        if (exception["code"]) {
            status = HttpStatus.BAD_REQUEST;

            const exception_code = exception["code"];

            switch (exception_code) {
                case SHOWTIME_ID_DOESNT_EXIST_VIOLATION:
                    message = "There is no showtime with this id";
                    break;

                case SEAT_NUMBER_TAKEN:
                    message = "The selected seat is already taken";
                    break;
            }
        }

        response.status(status).json({
            statusCode: status,
            message,
        });
    }
}
