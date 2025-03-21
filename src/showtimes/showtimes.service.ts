import { Injectable } from "@nestjs/common";
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
            createShowtimeDto.startTime,
            createShowtimeDto.endTime,
            createShowtimeDto.price,
        ];

        const res = await this.databaseService.db.insert(showtimes).values({
            movie_id,
            theater,
            start_time,
            end_time,
            price,
        });
    }

    async findOne(id: number) {
        const res = await this.databaseService.db
            .select()
            .from(showtimes)
            .where(eq(showtimes.id, id));
    }

    async update(id: number, updateShowtimeDto: UpdateShowtimeDto) {
        const res = await this.databaseService.db
            .update(showtimes)
            .set(updateShowtimeDto)
            .where(eq(showtimes.id, id));
    }

    async remove(id: number) {
        const res = await this.databaseService.db
            .delete(showtimes)
            .where(eq(showtimes.id, id));
    }
}
