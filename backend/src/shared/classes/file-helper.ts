import { Injectable } from '@nestjs/common';

@Injectable()
export class FileHelper {
  public getRandomFilename(): string {
    const crypto = require('crypto');
    return crypto.randomBytes(20).toString('hex');
  }
}
