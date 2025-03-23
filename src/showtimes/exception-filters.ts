import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { Response } from "express";

const OVERLAPPING_VIOLATION = "23P01";
const MOVIE_ID_DOESNT_EXIST_VIOLATION = "23503";
const END_TIME_GREATER_THAN_START_VIOLATION = "23514";

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
                case OVERLAPPING_VIOLATION:
                    message = "Overlapping showtimes for the same theater";
                    break;

                case MOVIE_ID_DOESNT_EXIST_VIOLATION:
                    message = "There is no movie with this id";
                    break;

                case END_TIME_GREATER_THAN_START_VIOLATION:
                    message = "Showtime end time must be after the start time";
                    break;
            }
        }

        response.status(status).json({
            statusCode: status,
            message,
        });
    }
}
