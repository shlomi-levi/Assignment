import { Injectable } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { DatabaseService } from "src/database/database.service";
import { bookings } from "src/database/schema";

@Injectable()
export class BookingsService {
    constructor(private readonly databaseService: DatabaseService) {}

    async create(createBookingDto: CreateBookingDto) {
        const [showtime_id, seat_number, user_id] = [
            createBookingDto.showtimeId,
            createBookingDto.seatNumber,
            createBookingDto.userId,
        ];

        const res = await this.databaseService.db
            .insert(bookings)
            .values({
                showtime_id,
                seat_number,
                user_id,
            })
            .returning({ bookingId: bookings.id });

        return res;
    }
}
