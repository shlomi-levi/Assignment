CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"showtime_id" integer NOT NULL,
	"seat_number" integer NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "bookings_showtime_id_seat_number_unique" UNIQUE("showtime_id","seat_number")
);
--> statement-breakpoint
CREATE TABLE "movies" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "movies_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(60) NOT NULL,
	"genre" varchar(30) NOT NULL,
	"duration" integer NOT NULL,
	"rating" real NOT NULL,
	"release_year" integer NOT NULL,
	CONSTRAINT "duration_check" CHECK ("movies"."duration" > 0),
	CONSTRAINT "rating_check" CHECK ("movies"."rating" >= 1 and "movies"."rating" <= 10)
);
--> statement-breakpoint
CREATE TABLE "showtimes" (
	"id" serial PRIMARY KEY NOT NULL,
	"movie_id" integer NOT NULL,
	"theater" varchar(70) NOT NULL,
	"start_time" timestamp (6) with time zone NOT NULL,
	"end_time" timestamp (6) with time zone NOT NULL,
	"price" real NOT NULL,
	CONSTRAINT "end_time_greater_than_start" CHECK ("showtimes"."end_time" > "showtimes"."start_time")
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_showtime_id_showtimes_id_fk" FOREIGN KEY ("showtime_id") REFERENCES "public"."showtimes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "showtimes" ADD CONSTRAINT "showtimes_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE no action;