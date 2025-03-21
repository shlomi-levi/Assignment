import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { ValidatePayloadExistsPipe } from "src/utils";

@Controller("movies")
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get("/all")
    findAll() {
        return this.moviesService.findAll();
    }

    @Post()
    create(@Body() createMovieDto: CreateMovieDto) {
        return this.moviesService.create(createMovieDto);
    }

    @Post("/update/:movieTitle")
    update(
        @Param("movieTitle") movieTitle: string,
        @Body(ValidatePayloadExistsPipe) updateMovieDto: UpdateMovieDto
    ) {
        return this.moviesService.update(movieTitle, updateMovieDto);
    }

    @Delete("/:movieTitle")
    remove(@Param("movieTitle") movieTitle: string) {
        return this.moviesService.remove(movieTitle);
    }
}
