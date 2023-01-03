export class EventCategoryCreateDto {
  name: string;
  abbreviation: string;

  constructor() {
    this.name = '';
    this.abbreviation = '';
  }
}
