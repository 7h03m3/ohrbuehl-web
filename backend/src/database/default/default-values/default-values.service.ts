import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { Role } from '../../../shared/enums/role.enum';
import { ShootingRangePriceEntity } from '../../entities/shooting-range-price.entity';
import { ShootingRangePriceTypeEnum } from '../../../shared/enums/shooting-range-price-type.enum';
import { OrganizationEntity } from '../../entities/organization.entity';
import { EventCategoryEntity } from '../../entities/event-category.entity';

@Injectable()
export class DefaultValuesService {
  public async loadDefaultUsers(repository: Repository<UserEntity>) {
    const entity = new UserEntity();
    entity.userName = 'admin';
    entity.firstName = '';
    entity.lastName = '';
    entity.password = '$2b$10$2mIynFxnRczL2vBE9msevOnz4XEcRBSnaBfrcy4zsO7edy47Ve/7K';
    entity.roles = Role.Admin;
    await repository.save(entity);
  }

  public async loadDefaultShootingRangePrices(repository: Repository<ShootingRangePriceEntity>) {
    await this.addNewShootingRangePrice(
      'Position A',
      'Für obligatorische und freiwillige Übungen sowie Freundschaftsschiessen der Verbandsvereine.\n(inkl. Matchschützenvereinigung Winterthur und Einzelschüetzen.',
      0.25,
      ShootingRangePriceTypeEnum.Section_300m,
      repository,
    );

    await this.addNewShootingRangePrice(
      'Position B',
      'Für das Eidg. Feldschiessen.',
      0.21,
      ShootingRangePriceTypeEnum.Section_300m,
      repository,
    );

    await this.addNewShootingRangePrice(
      'Position C',
      'Für Verbandsvereine die einen Jungschützenkurs durchführen.\nEs darf nur auf den für JS Kurs bestellten Scheiben nur Übungen geschossen werden, die im Zusammenhang mit dem JS Kurs stehen.',
      0.15,
      ShootingRangePriceTypeEnum.Section_300m,
      repository,
    );

    await this.addNewShootingRangePrice(
      'Position D 1',
      'Für Schiessanlässe der Gruppe B für Verbandsvereine.',
      0.27,
      ShootingRangePriceTypeEnum.Section_300m,
      repository,
    );

    await this.addNewShootingRangePrice(
      'Position D 2',
      'Für Schiessanlässe Gruppe B, Anlässe der Schweizerischen und Kantonalen Matchvereinigung sowie Kantonal und Bezirksschützenverbände.',
      0.32,
      ShootingRangePriceTypeEnum.Section_300m,
      repository,
    );

    await this.addNewShootingRangePrice(
      'Position E',
      'Für sämtliche andere Schiessanlässe, wie Firmen- und Bankschiessen.',
      0.33,
      ShootingRangePriceTypeEnum.Section_300m,
      repository,
    );
  }

  public async loadDefaultOrganization(repository: Repository<OrganizationEntity>) {
    await this.addNewOrganization('Einzelschützen', 'EiSchü', false, '#D5DBDB', true, true, true, true, repository);
    await this.addNewOrganization(
      'Arbeiterschiessverein Winterthur',
      'ASV',
      true,
      '#E6B0AA',
      true,
      false,
      false,
      false,
      repository,
    );

    await this.addNewOrganization(
      'Stadtschützen Winterthur',
      'Stadts.',
      true,
      '#D7BDE2',
      true,
      false,
      true,
      true,
      repository,
    );

    await this.addNewOrganization(
      'Standschützen Oberwinterthur',
      'StS Oberi.',
      true,
      '#A9CCE3',
      true,
      false,
      false,
      false,
      repository,
    );

    await this.addNewOrganization(
      'Schützenverein Wülflingen',
      'SVW',
      true,
      '#A3E4D7',
      true,
      false,
      false,
      false,
      repository,
    );

    await this.addNewOrganization(
      'Feldschützengesellschaft Winterthur',
      'FSGW',
      true,
      '#A9DFBF',
      true,
      false,
      false,
      false,
      repository,
    );

    await this.addNewOrganization(
      'Eisenbahnerschützen Winterthur',
      'ESW',
      false,
      '#F9E79F',
      true,
      true,
      true,
      true,
      repository,
    );

    await this.addNewOrganization('Pistolenklub Seen', 'PKS', false, '#AED6F1', false, false, true, true, repository);
    await this.addNewOrganization('Militär', 'MIL', false, '#D2B4DE', true, true, true, true, repository);
    await this.addNewOrganization('Matchschützen', 'Match', false, '#AEB6BF', true, false, false, false, repository);
    await this.addNewOrganization('Ohrbühlvereine', 'Ohrbühl', false, '#FAD7A0', true, false, false, false, repository);
  }

  public async loadDefaultEventCategories(repository: Repository<EventCategoryEntity>) {
    await this.addNewEventCategory('Allgemein', 'Allg.', repository);
    await this.addNewEventCategory('Bundesübung (Gewehr)', 'BU', repository);
    await this.addNewEventCategory('Bundesübung (Pistole)', 'BUP', repository);
    await this.addNewEventCategory('Feldschiessen', 'FS', repository);
    await this.addNewEventCategory('Nachschiesskurs', 'NSK', repository);
  }

  private async addNewEventCategory(name: string, abbreviation: string, repository: Repository<EventCategoryEntity>) {
    const entity = new EventCategoryEntity();
    entity.name = name;
    entity.abbreviation = abbreviation;
    await repository.save(entity);
  }

  private async addNewOrganization(
    name: string,
    abbreviation: string,
    native: boolean,
    color: string,
    distance_300m: boolean,
    distance_100m: boolean,
    distance_50m: boolean,
    distance_25m: boolean,
    repository: Repository<OrganizationEntity>,
  ) {
    const entity = new OrganizationEntity();
    entity.name = name;
    entity.abbreviation = abbreviation;
    entity.native = native;
    entity.color = color;
    entity.distance_300m = distance_300m;
    entity.distance_100m = distance_100m;
    entity.distance_50m = distance_50m;
    entity.distance_25m = distance_25m;

    await repository.save(entity);
  }

  private async addNewShootingRangePrice(
    name: string,
    description: string,
    price: number,
    type: ShootingRangePriceTypeEnum,
    repository: Repository<ShootingRangePriceEntity>,
  ) {
    const entity = new ShootingRangePriceEntity();
    entity.name = name;
    entity.description = description;
    entity.price = price;
    entity.type = type;
    await repository.save(entity);
  }
}
