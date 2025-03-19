import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ValidationPipe,
    ParseIntPipe,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";

@Controller("movies")
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Post()
    create(@Body(ValidationPipe) createMovieDto: CreateMovieDto) {
        return this.moviesService.create(createMovieDto);
    }

    @Get()
    findAll() {
        return this.moviesService.findAll();
    }

    @Patch(":id")
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body(ValidationPipe) updateMovieDto: UpdateMovieDto
    ) {
        return this.moviesService.update(id, updateMovieDto);
    }

    @Delete(":id")
    remove(@Param("id", ParseIntPipe) id: number) {
        return this.moviesService.remove(id);
    }
}
