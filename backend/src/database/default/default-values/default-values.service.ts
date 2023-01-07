import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { Role } from '../../../shared/enums/role.enum';
import { ShootingRangePriceEntity } from '../../entities/shooting-range-price.entity';
import { ShootingRangePriceTypeEnum } from '../../../shared/enums/shooting-range-price-type.enum';
import { OrganizationEntity } from '../../entities/organization.entity';
import { EventCategoryEntity } from '../../entities/event-category.entity';
import { EventShiftCategoryEntity } from '../../entities/event-shift-category.entity';

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
      'Für obligatorische und freiwillige Übungen sowie Freundschaftsschiessen der Verbandsvereine.\n(inkl. Matchschützenvereinigung Winterthur und Einzelschützen.)',
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

    await this.addNewShootingRangePrice(
      'Militär',
      'Für sämtliche militärische Schiessanlässe',
      0.3,
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
      '#A9CCE3',
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
      '#FF816D',
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
      '#A9DFBF',
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
      '#FFED6D',
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
      '#D7BDE2',
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

    await this.addNewOrganization('Edelweiss Long Range', 'ELR', true, '#A2FF33', true, true, true, true, repository);
    await this.addNewOrganization('Pistolenklub Seen', 'PKS', false, '#AED6F1', false, false, true, true, repository);
    await this.addNewOrganization('Militär', 'MIL', false, '#D2B4DE', true, true, true, true, repository);
    await this.addNewOrganization(
      'Matchschützen Winterthur',
      'Match',
      false,
      '#AEB6BF',
      true,
      false,
      false,
      false,
      repository,
    );
    await this.addNewOrganization('Ohrbühlverband', 'Ohrbühl', false, '#FAD7A0', true, false, false, false, repository);
    await this.addNewOrganization(
      'Zürcher Schiesssportverband',
      'ZHSV',
      false,
      '#33C1FF',
      true,
      true,
      true,
      true,
      repository,
    );
  }

  public async loadDefaultEventCategories(repository: Repository<EventCategoryEntity>) {
    await this.addNewEventCategory('Allgemein', 'Allg.', repository);
    await this.addNewEventCategory('Bundesübung (Gewehr)', 'BU', repository);
    await this.addNewEventCategory('Bundesübung (Pistole)', 'BUP', repository);
    await this.addNewEventCategory('Feldschiessen', 'FS', repository);
    await this.addNewEventCategory('Nachschiesskurs', 'NSK', repository);
  }

  public async loadDefaultEventShiftCategories(repository: Repository<EventShiftCategoryEntity>) {
    await this.addNewEventShiftCategory('Admin. Chef', 'EDV', 0, repository);
    await this.addNewEventShiftCategory('Türsteher', 'TH', 1, repository);
    await this.addNewEventShiftCategory('Standblatt', 'SB', 2, repository);
    await this.addNewEventShiftCategory('Abgabe DB/LA', 'DB', 3, repository);
    await this.addNewEventShiftCategory('Kasse', 'KA', 4, repository);
    await this.addNewEventShiftCategory('Munition', 'MU', 4, repository);
    await this.addNewEventShiftCategory('Standchef', 'SC', 5, repository);
    await this.addNewEventShiftCategory('Schützenmeister', 'SM', 6, repository);
    await this.addNewEventShiftCategory('Warner', 'WN', 7, repository);
  }

  private async addNewEventShiftCategory(
    name: string,
    abbreviation: string,
    position: number,
    repository: Repository<EventShiftCategoryEntity>,
  ) {
    const entity = new EventShiftCategoryEntity();
    entity.name = name;
    entity.abbreviation = abbreviation;
    entity.position = position;
    await repository.save(entity);
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
