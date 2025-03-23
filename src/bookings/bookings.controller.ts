import { Controller, Post, Body, UseFilters } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { PostExceptionFilter } from "./exception-filter";

@Controller("bookings")
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}

    @Post()
    @UseFilters(PostExceptionFilter)
    create(@Body() createBookingDto: CreateBookingDto) {
        return this.bookingsService.create(createBookingDto);
    }
}
