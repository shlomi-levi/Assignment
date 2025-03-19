import { Injectable } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class MoviesService {
    constructor(private readonly databaseService: DatabaseService) {}

    create(createMovieDto: CreateMovieDto) {
        return "This action adds a new movie";
    }

    findAll() {
        return `This action returns all movies`;
    }

    update(id: number, updateMovieDto: UpdateMovieDto) {
        return `This action updates a #${id} movie`;
    }

    remove(id: number) {
        return `This action removes a #${id} movie`;
    }
}
