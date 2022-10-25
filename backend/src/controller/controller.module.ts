import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersModule } from "../database/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [UsersModule, AuthModule],
  providers: [],
  controllers: [UsersController, AuthController],
  exports: []
})
export class ControllerModule {
}
