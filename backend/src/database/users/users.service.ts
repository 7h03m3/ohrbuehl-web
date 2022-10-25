import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserCreateDto } from "../../shared/dtos/user-create.dto";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: {
        id: true,
        userName: true,
        firstName: true,
        lastName: true,
        roles: true,
        password: false
      }
    });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<User> | undefined {
    return this.usersRepository.findOneBy({ userName: name });
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createUser(userCreateDto: UserCreateDto, hashedPassword: string): Promise<User> {
    let entity = new User();
    entity.userName = userCreateDto.userName;
    entity.firstName = userCreateDto.firstName;
    entity.lastName = userCreateDto.lastName;
    entity.password = hashedPassword;
    ;
    entity.roles = userCreateDto.roles;

    await this.usersRepository.save(entity);

    return entity;
  }

  async updateUser(user: User): Promise<any> {
    await this.usersRepository.createQueryBuilder()
      .update(User)
      .set({
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
        userName: user.userName
      })
      .where("id = :id", { id: user.id })
      .execute();
  }

  async updateUserWithPassword(user: User, hashedPassword: string): Promise<any> {
    await this.usersRepository.createQueryBuilder()
      .update(User)
      .set({
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
        userName: user.userName,
        password: hashedPassword
      })
      .where("id = :id", { id: user.id })
      .execute();
  }
}
