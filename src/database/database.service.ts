import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import "dotenv/config";

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private pool = new Pool({ connectionString: process.env.DATABASE_URL });
    public db = drizzle(this.pool);

    async onModuleInit() {
        try {
            await migrate(this.db, { migrationsFolder: "drizzle/" });
            await this.db.execute(`SELECT 1`);
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
