import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from '../../shared/dtos/user-create.dto';
import { DefaultValuesService } from '../default/default-values/default-values.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private defaultValues: DefaultValuesService,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.usersRepository.count();
    if (count == 0) {
      await this.defaultValues.loadDefaultUsers(this.usersRepository);
    }
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find({
      select: {
        id: true,
        userName: true,
        firstName: true,
        lastName: true,
        roles: true,
        password: false,
      },
    });
  }

  findOne(id: number): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<UserEntity> | undefined {
    return this.usersRepository.findOneBy({ userName: name });
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createUser(userCreateDto: UserCreateDto, hashedPassword: string): Promise<UserEntity> {
    const entity = new UserEntity();
    entity.userName = userCreateDto.userName;
    entity.firstName = userCreateDto.firstName;
    entity.lastName = userCreateDto.lastName;
    entity.password = hashedPassword;
    entity.roles = userCreateDto.roles;

    await this.usersRepository.save(entity);

    return entity;
  }

  async updateUser(user: UserEntity): Promise<any> {
    await this.usersRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
        userName: user.userName,
      })
      .where('id = :id', { id: user.id })
      .execute();
  }

  async updateUserWithPassword(user: UserEntity, hashedPassword: string): Promise<any> {
    await this.usersRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
        userName: user.userName,
        password: hashedPassword,
      })
      .where('id = :id', { id: user.id })
      .execute();
  }
}
