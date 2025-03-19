import { Controller, Post, Body, ValidationPipe } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";

@Controller("bookings")
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}

    @Post()
    create(@Body(ValidationPipe) createBookingDto: CreateBookingDto) {
        return this.bookingsService.create(createBookingDto);
    }
}
