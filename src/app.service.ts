import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Welcome to MEET APIs, visit <a href='/doc'>documentation</a>!";
  }
}
