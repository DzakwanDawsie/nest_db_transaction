import { Injectable } from "@nestjs/common";
import { TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeormConfigFactory implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): any {
    return {
      type: 'mysql' as any,
      database: process.env.DB_NAME || 'your_database_name',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      synchronize: true,
      migrationsTableName: "migrations",
      entities: ["dist/app/modules/**/*.entity{.ts,.js}"],
      migrations: ["dist/database/migrations/*{.ts,.js}"],
      seeds: ["src/database/seeders/*{.ts,.js}"],
      autoLoadEntities: true,
    }
  }
}

const typeormConfigService = new TypeormConfigFactory;

export default typeormConfigService.createTypeOrmOptions();