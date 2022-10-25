import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "admin",
      password: "12345",
      database: "ohrbuehl-web",
      entities: [User],
      synchronize: true
    }),
    UsersModule
  ]
})
export class DatabaseModule {
}
