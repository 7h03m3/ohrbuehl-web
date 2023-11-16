import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultValuesService } from '../default/default-values/default-values.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { OrganizationEntity } from '../entities/organization.entity';
import { UserDto } from '../../shared/dtos/user.dto';
import { UserCreateDto } from '../../shared/dtos/user-create.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private defaultValues: DefaultValuesService,
    private organizationService: OrganizationsService,
  ) {}

  public async onApplicationBootstrap() {
    const count = await this.usersRepository.count();
    if (count == 0) {
      await this.defaultValues.loadDefaultUsers(this.usersRepository);
    }
  }

  public findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find({
      select: {
        id: true,
        userName: true,
        firstName: true,
        lastName: true,
        roles: true,
        password: false,
      },
      relations: {
        assignedOrganization: true,
      },
    });
  }

  public findOne(id: number): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ id });
  }

  public findOneUser(id: number): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: {
        id: id,
      },
      select: {
        id: true,
        userName: true,
        firstName: true,
        lastName: true,
        roles: true,
        password: false,
        email: true,
        mobile: true,
        street: true,
        zip: true,
        location: true,
      },
    });
  }

  public async findOneByUsername(username: string): Promise<UserEntity> | undefined {
    return this.usersRepository.findOneBy({ userName: username });
  }

  public async findOneByEmail(email: string): Promise<UserEntity> | undefined {
    return this.usersRepository.findOneBy({ email: email });
  }

  public async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  public async createUser(dto: UserCreateDto): Promise<UserEntity> {
    const entity = new UserEntity();
    entity.loadDto(dto);

    return await this.createUserByEntity(entity);
  }

  public async createUserByEntity(entity: UserEntity): Promise<UserEntity> {
    entity.assignedOrganization = await this.getOrganization(entity.assignedOrganizationId);

    await this.usersRepository.save(entity);

    return entity;
  }

  public async updateUser(user: UserDto): Promise<any> {
    const organization = await this.getOrganization(user.assignedOrganizationId);

    await this.usersRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        street: user.street,
        zip: user.zip,
        location: user.location,
        email: user.email,
        mobile: user.mobile,
        roles: user.roles,
        assignedOrganization: organization,
      })
      .where('id = :id', { id: user.id })
      .execute();
  }

  public async updateAccountInformation(user: UserDto): Promise<any> {
    await this.usersRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        firstName: user.firstName,
        lastName: user.lastName,
        street: user.street,
        zip: user.zip,
        location: user.location,
        mobile: user.mobile,
      })
      .where('id = :id', { id: user.id })
      .execute();
  }

  public async updateUserWithPassword(user: UserDto): Promise<any> {
    const organization = await this.getOrganization(user.assignedOrganizationId);

    await this.usersRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        firstName: user.firstName,
        lastName: user.lastName,
        street: user.street,
        zip: user.zip,
        location: user.location,
        email: user.email,
        mobile: user.mobile,
        roles: user.roles,
        userName: user.userName,
        password: user.password,
        assignedOrganization: organization,
      })
      .where('id = :id', { id: user.id })
      .execute();
  }

  public async updatePassword(userId: number, newHashedPassword: string): Promise<any> {
    return await this.usersRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        password: newHashedPassword,
      })
      .where('id = :id', { id: userId })
      .execute();
  }

  private async getOrganization(organizationId: number): Promise<OrganizationEntity | null> {
    if (organizationId != 0) {
      const organization = await this.organizationService.findOne(organizationId);
      if (organization == undefined) {
        const errorMessage = 'organization with id ' + organizationId.toString() + ' not found';
        throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
      }

      return organization;
    } else {
      return null;
    }
  }
}
