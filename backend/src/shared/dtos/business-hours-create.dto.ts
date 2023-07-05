export class BusinessHoursCreateDto {
  public id: number;
  public start: number;
  public end: number;
  public public: boolean;
  public enableReservation: boolean;
  public comment: string;

  constructor() {
    this.id = 0;
    this.start = Date.now();
    this.end = Date.now();
    this.public = false;
    this.enableReservation = false;
    this.comment = '';
  }
}
