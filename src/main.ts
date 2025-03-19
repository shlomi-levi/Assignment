import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { testConnection, pool } from "./db/db";

const closeResources = async () => {
    try {
        await pool.end();
        server.close();

        process.exit(0);
    } catch (error) {
        console.error("error during disconnection", error);
        process.exit(1);
    }
};

async function bootstrap() {
    await testConnection();
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}

bootstrap();
