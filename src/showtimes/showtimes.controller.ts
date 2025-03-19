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
import { ShowtimesService } from "./showtimes.service";
import { CreateShowtimeDto } from "./dto/create-showtime.dto";
import { UpdateShowtimeDto } from "./dto/update-showtime.dto";

@Controller("showtimes")
export class ShowtimesController {
    constructor(private readonly showtimesService: ShowtimesService) {}

    @Post()
    create(@Body(ValidationPipe) createShowtimeDto: CreateShowtimeDto) {
        return this.showtimesService.create(createShowtimeDto);
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number) {
        return this.showtimesService.findOne(+id);
    }

    @Patch(":id")
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body(ValidationPipe) updateShowtimeDto: UpdateShowtimeDto
    ) {
        return this.showtimesService.update(+id, updateShowtimeDto);
    }

    @Delete(":id")
    remove(@Param("id", ParseIntPipe) id: number) {
        return this.showtimesService.remove(+id);
    }
}
