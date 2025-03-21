import { Injectable } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { DatabaseService } from "src/database/database.service";
import { movies } from "src/database/schema";
import { eq } from "drizzle-orm";

@Injectable()
export class MoviesService {
    constructor(private readonly databaseService: DatabaseService) {}

    async create(createMovieDto: CreateMovieDto) {
        const { title, genre, duration, rating } = createMovieDto;
        const release_year = createMovieDto.releaseYear;

        try {
            const res = await this.databaseService.db
                .insert(movies)
                .values({
                    title,
                    genre,
                    duration,
                    rating,
                    release_year,
                })
                .returning();

            return res;
        } catch (e) {
            console.log(e);
        }
    }

    async findAll() {
        return this.databaseService.db.select().from(movies);
    }

    async update(movieTitle: string, updateMovieDto: UpdateMovieDto) {
        const res = await this.databaseService.db
            .update(movies)
            .set(updateMovieDto)
            .where(eq(movies.title, movieTitle));

        console.log(1);
    }

    async remove(movieTitle: string) {
        this.databaseService.db.delete(movies).where(eq(movies.title, movieTitle));
    }
}
