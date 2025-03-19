import { Injectable } from "@nestjs/common";
import { CreateShowtimeDto } from "./dto/create-showtime.dto";
import { UpdateShowtimeDto } from "./dto/update-showtime.dto";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class ShowtimesService {
    constructor(private readonly databaseService: DatabaseService) {}

    create(createShowtimeDto: CreateShowtimeDto) {
        return "This action adds a new showtime";
    }

    findOne(id: number) {
        return `This action returns a #${id} showtime`;
    }

    update(id: number, updateShowtimeDto: UpdateShowtimeDto) {
        return `This action updates a #${id} showtime`;
    }

    remove(id: number) {
        return `This action removes a #${id} showtime`;
    }
}
