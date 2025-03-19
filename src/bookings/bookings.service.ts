import { Injectable } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class BookingsService {
    constructor(private readonly databaseService: DatabaseService) {}

    create(createBookingDto: CreateBookingDto) {
        return "This action adds a new booking";
    }
}
