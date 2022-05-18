import { Controller, Get } from '@nestjs/common';
import { CommonService } from '../services/common.service';

@Controller()
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get()
  getHello(): string {
    return this.commonService.getHello();
  }
}
