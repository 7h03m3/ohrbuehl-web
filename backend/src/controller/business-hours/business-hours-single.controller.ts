import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BusinessHoursHelperService } from './helpers/business-hours-helper.service';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { BusinessHourEntity } from '../../database/entities/business-hour.entity';
import { BusinessHourReservationEntity } from '../../database/entities/business-hour-reservation.entity';
import { BusinessHourReservationDto } from '../../shared/dtos/business-hour-reservation.dto';

@Controller('business-hours/single/')
export class BusinessHoursSingleController {
  constructor(private businessHours: BusinessHoursHelperService) {}

  @Roles(Role.Admin, Role.SingleShooter)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('event-limit/')
  public async getEventLimit(): Promise<number> {
    return this.businessHours.getSingleShooterEventLimit();
  }

  @Roles(Role.Admin, Role.SingleShooter)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('list/upcoming')
  public async getReservationDates(@Request() req: any): Promise<BusinessHourEntity[]> {
    const list = await this.businessHours.getReservationDates();
    const date = new Date(Date.now());
    const reservations = await this.businessHours.getReservationsByUserAndYear(req.user.id, date.getFullYear());

    return list.filter((current) => {
      const reservation = reservations.filter((reservation) => {
        return reservation.businessHourId == current.id;
      });

      return reservation.length < this.businessHours.getSingleShooterEventLimit();
    });
  }

  @Roles(Role.Admin, Role.SingleShooter)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('next/:userId')
  public async getNextReservations(
    @Param('userId') userId: number,
    @Request() req: any,
  ): Promise<BusinessHourReservationEntity[]> {
    this.checkUser(userId, req);
    return this.businessHours.getNextReservationsByUser(userId);
  }

  @Roles(Role.Admin, Role.SingleShooter)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('list/:userId/:year')
  public async getAllReservationsOfYear(
    @Param('userId') userId: number,
    @Param('year') year: number,
    @Request() req: any,
  ): Promise<BusinessHourReservationEntity[]> {
    this.checkUser(userId, req);
    return this.businessHours.getReservationsByUserAndYear(userId, year);
  }

  @Roles(Role.Admin, Role.SingleShooter)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: number, @Request() req: any): Promise<any> {
    await this.checkAccess(id, req);
    return this.businessHours.deleteReservation(id);
  }

  @Roles(Role.Admin, Role.SingleShooter)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post('')
  public async addReservation(
    @Body() dto: BusinessHourReservationDto,
    @Request() req: any,
  ): Promise<BusinessHourReservationEntity> {
    dto.ownerId = req.user.id;

    const existingReservation = await this.businessHours.getReservationsByUserAndBusinessHour(
      dto.ownerId,
      dto.businessHourId,
    );

    if (existingReservation.length >= this.businessHours.getSingleShooterEventLimit()) {
      const errorMessage = 'Limit of reservation already reached at this point in time';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const businessHour = await this.businessHours.getById(dto.businessHourId);
    this.checkTime(businessHour);

    return this.businessHours.addReservation(dto);
  }

  @Roles(Role.Admin, Role.SingleShooter)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put('')
  public async updateReservation(
    @Body() dto: BusinessHourReservationDto,
    @Request() req: any,
  ): Promise<BusinessHourReservationEntity> {
    await this.checkAccess(dto.id, req);

    return this.businessHours.updateReservation(dto);
  }

  private async checkAccess(reservationId: number, req: any) {
    if (req.user.roles != Role.SingleShooter) {
      return;
    }

    const reservationEntity = await this.businessHours.getReservationById(reservationId);

    this.checkUser(reservationEntity.ownerId, req);
    this.checkTime(reservationEntity.businessHour);
  }

  private checkUser(userId: number, req: any) {
    if (req.user.roles != Role.SingleShooter) {
      return;
    }

    if (userId != req.user.id) {
      const errorMessage = 'access denied to reservation';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  private checkTime(businessHour: BusinessHourEntity) {
    if (!this.businessHours.is24HoursBefore(businessHour.start)) {
      const errorMessage = "reservation action can't performed, because time limit reached";
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }
}
