import { Module } from "@nestjs/common";
import { BulletPriceService } from "./bullet-price.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BulletPriceEntity } from "../entities/bullet-price.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BulletPriceEntity])],
  providers: [BulletPriceService],
  controllers: [],
  exports: [BulletPriceService]
})
export class BulletPriceModule {
}
