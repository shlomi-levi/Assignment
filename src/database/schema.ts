import {
    integer,
    pgTable,
    real,
    timestamp,
    varchar,
    check,
    primaryKey,
    uuid,
    serial,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

export const movies = pgTable(
    "movies",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        title: varchar({ length: 60 }).notNull(),
        genre: varchar({ length: 30 }).notNull(),
        duration: integer().notNull(),
        rating: real().notNull(),
        release_year: integer().notNull(),
    },
    (table) => [
        check("duration_check", sql`${table.duration} > 0`),
        check("rating_check", sql`${table.rating} >= 1 and ${table.rating} <= 10`),
    ]
);

export const showtimes = pgTable(
    "showtimes",
    {
        id: serial().primaryKey(),
        movie_id: integer()
            .notNull()
            .references(() => movies.id, { onDelete: "cascade" }),
        theater: varchar({ length: 70 }).notNull(),
        start_time: timestamp({ precision: 6, withTimezone: true }).notNull(),
        end_time: timestamp({ precision: 6, withTimezone: true }).notNull(),
        price: real().notNull(),
    },
    (table) => [
        check(
            "end_time_greater_than_start",
            sql`${table.end_time} > ${table.start_time}`
        ),
        // Ensure no overlapping showtimes for the same theater
    ]
);

export const bookings = pgTable(
    "bookings",
    {
        showtime_id: integer()
            .notNull()
            .references(() => showtimes.id, { onDelete: "cascade" }),
        seat_number: integer().notNull(),
        user_id: uuid().notNull(),
    },
    (table) => [
        primaryKey({
            columns: [table.showtime_id, table.seat_number],
        }),
    ]
);
