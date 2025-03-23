import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateShowtimeDto } from "./dto/create-showtime.dto";
import { UpdateShowtimeDto } from "./dto/update-showtime.dto";
import { DatabaseService } from "src/database/database.service";
import { showtimes } from "src/database/schema";
import { eq } from "drizzle-orm";

@Injectable()
export class ShowtimesService {
    constructor(private readonly databaseService: DatabaseService) {}

    async create(createShowtimeDto: CreateShowtimeDto) {
        const [movie_id, theater, start_time, end_time, price] = [
            createShowtimeDto.movieId,
            createShowtimeDto.theater,
            new Date(createShowtimeDto.startTime),
            new Date(createShowtimeDto.endTime),
            createShowtimeDto.price,
        ];

        const res = await this.databaseService.db
            .insert(showtimes)
            .values({
                movie_id,
                theater,
                price,
                start_time,
                end_time,
            })
            .returning();

        return res;
    }

    async findOne(id: number) {
        const res = await this.databaseService.db
            .select()
            .from(showtimes)
            .where(eq(showtimes.id, id));

        if (!res.length)
            throw new HttpException(
                "There is no showtime with this ID",
                HttpStatus.NOT_FOUND
            );

        return res;
    }

    async update(id: number, updateShowtimeDto: UpdateShowtimeDto) {
        const res = await this.databaseService.db
            .update(showtimes)
            .set(updateShowtimeDto)
            .where(eq(showtimes.id, id));

        if (!res.rowCount)
            throw new HttpException(
                "There is no showtime with this ID",
                HttpStatus.NOT_FOUND
            );
    }

    async remove(id: number) {
        const res = await this.databaseService.db
            .delete(showtimes)
            .where(eq(showtimes.id, id));

        if (!res.rowCount)
            throw new HttpException(
                "There is no showtime with this ID",
                HttpStatus.NOT_FOUND
            );
    }
}
