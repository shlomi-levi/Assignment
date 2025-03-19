import {
    integer,
    pgTable,
    real,
    timestamp,
    varchar,
    check,
    primaryKey,
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
        id: integer().primaryKey(),
        movie_id: integer().references(() => movies.id, { onDelete: "cascade" }),
        theater: varchar({ length: 70 }),
        start_time: timestamp({ precision: 6, withTimezone: true }),
        end_time: timestamp({ precision: 6, withTimezone: true }),
        price: real().notNull(),
    },
    (table) => [
        check(
            "end_time_greater_than_start",
            sql`${table.end_time} > ${table.start_time}`
        ),
    ]
);

export const bookings = pgTable(
    "bookings",
    {
        showtime_id: integer().references(() => showtimes.id, { onDelete: "cascade" }),
        seat_number: integer().notNull(),
    },
    (table) => [primaryKey({ columns: [table.showtime_id, table.seat_number] })]
);
