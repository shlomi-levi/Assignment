import { IsInt, IsNumber, IsString, IsISO8601 } from "class-validator";

export class CreateShowtimeDto {
    @IsInt({ message: "movieId must be an integer" })
    movieId: number;

    @IsNumber(undefined, { message: "price must be a number" })
    price: number;

    @IsString({ message: "theater must be a string" })
    theater: string;

    @IsISO8601(undefined, { message: "startTime must be in ISO8601 format" })
    startTime: string;

    @IsISO8601(undefined, { message: "endTime must be in ISO8601 format" })
    endTime: string;
}
