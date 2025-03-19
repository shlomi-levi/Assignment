import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { ShowtimesModule } from './showtimes/showtimes.module';
import { BookingsModule } from './bookings/bookings.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [MoviesModule, ShowtimesModule, BookingsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
