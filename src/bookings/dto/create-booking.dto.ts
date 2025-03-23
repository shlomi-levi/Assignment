import { IsInt, Min, Max, IsUUID } from "class-validator";

import "dotenv/config";

const seatNumberErrorMsg =
    "Seat number must be an integer between the values of 1 and " +
    String(process.env.MAX_SEATS_PER_THEATER);

export class CreateBookingDto {
    @IsInt({ message: "showtimeI must be an integer" })
    showtimeId: number;

    @IsInt({ message: seatNumberErrorMsg })
    @Min(1, {
        message: seatNumberErrorMsg,
    })
    @Max(+process.env.MAX_SEATS_PER_THEATER, {
        message: seatNumberErrorMsg,
    })
    seatNumber: number;

    @IsUUID(undefined, {
        message: "userId must be a UUID",
    })
    userId: string;
}
