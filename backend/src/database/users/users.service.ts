import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

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

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
