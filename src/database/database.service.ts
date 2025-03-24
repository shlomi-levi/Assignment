import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import "dotenv/config";

const DATABASE_URL = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private pool = new Pool({ connectionString: DATABASE_URL });
    public db = drizzle(this.pool);

    async onModuleInit() {
        try {
            await migrate(this.db, { migrationsFolder: "drizzle/" });
            await this.db.execute(`SELECT 1`);

            /* A hacky way to add this constraint, since drizzle doesn't support tables constraints */
            await this.db.transaction(async (tx) => {
                await tx.execute(
                    `ALTER TABLE showtimes DROP CONSTRAINT IF EXISTS no_overlapping_showtimes`
                );
                await tx.execute(`ALTER TABLE showtimes 
                ADD CONSTRAINT no_overlapping_showtimes 
                EXCLUDE USING gist (
                    theater WITH =,
                    tstzrange(start_time, end_time, '[]') WITH &&
                )`);
            });
        } catch (error) {
            console.log("Databse connection failed", error);
            process.exit(1);
        }
    }

    async onModuleDestroy() {
        await this.pool.end();
    }

    async onApplicationShutdown() {
        await this.pool.end();
    }
}
