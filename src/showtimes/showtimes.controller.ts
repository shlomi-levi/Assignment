import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
    UseFilters,
} from "@nestjs/common";
import { ShowtimesService } from "./showtimes.service";
import { CreateShowtimeDto } from "./dto/create-showtime.dto";
import { UpdateShowtimeDto } from "./dto/update-showtime.dto";
import { ValidatePayloadExistsPipe } from "src/utils";
import { PostExceptionFilter } from "./exception-filters";

@Controller("showtimes")
export class ShowtimesController {
    constructor(private readonly showtimesService: ShowtimesService) {}

    @Get("/:id")
    findOne(@Param("id", ParseIntPipe) id: number) {
        return this.showtimesService.findOne(id);
    }

    @Post()
    @UseFilters(PostExceptionFilter)
    create(@Body() createShowtimeDto: CreateShowtimeDto) {
        return this.showtimesService.create(createShowtimeDto);
    }

    @Post("/update/:id")
    @HttpCode(HttpStatus.OK)
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body(ValidatePayloadExistsPipe) updateShowtimeDto: UpdateShowtimeDto
    ) {
        return this.showtimesService.update(+id, updateShowtimeDto);
    }

    @Delete(":id")
    remove(@Param("id", ParseIntPipe) id: number) {
        return this.showtimesService.remove(+id);
    }
}
