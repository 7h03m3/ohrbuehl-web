import { Module } from "@nestjs/common";
import { UsersController } from "./users/users.controller";
import { UsersModule } from "../database/users/users.module";
import { AuthController } from "./auth/auth.controller";
import { AuthModule } from "../auth/auth.module";
import { OrganizationsController } from "./organizations/organizations.controller";
import { BulletPricesController } from "./bullet-prices/bullet-prices.controller";
import { OrganizationsModule } from "../database/organizations/organizations.module";
import { BulletPriceModule } from "../database/bullet-price/bullet-price.module";

@Module({
  imports: [UsersModule, OrganizationsModule, BulletPriceModule, AuthModule],
  providers: [],
  controllers: [UsersController, AuthController, OrganizationsController, BulletPricesController],
  exports: []
})
export class ControllerModule {
}
