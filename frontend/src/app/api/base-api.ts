import { environment } from '../../environments/environment';

export class BaseApi {
  protected url = '';

  constructor(url: string) {
    this.url = environment.backendBaseUrl + url;
  }
}
