import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from './users.service';
import { DefaultValuesModule } from '../default/default-values/default-values.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), DefaultValuesModule],
  providers: [UsersService],
  controllers: [],
  exports: [UsersService],
})
export class UsersModule {}
