import { IsString, IsInt, IsNumber, IsNotEmpty } from "class-validator";

export class CreateMovieDto {
    @IsString({ message: "movie title must be a string" })
    @IsNotEmpty({ message: "movie title can not be empty" })
    title: string;

    @IsString({ message: "movie genre must be a string" })
    genre: string;

    @IsInt({ message: "movie duration must be an integer" })
    duration: number;

    @IsNumber(undefined, { message: "movie rating must be a number" })
    rating: number;

    @IsInt({ message: "movie releaseYear must be an integer" })
    releaseYear: number;
}
