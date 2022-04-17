import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AppService } from './app.service';
import * as DTO from 'src/dto/dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/parse')
  @ApiOperation({ summary: '코로나 19 감염 데이터 조회' })
  @ApiResponse({
    type: DTO.GetCovidDataResDTO,
    status: HttpStatus.OK,
  })
  // @ApiResponse({
  //   type: DTO.GetCovidDataResDTO,
  //   status: HttpStatus.OK,
  //   description: '',
  // })
  async getParsedCovidData(
    @Res() res: Response,
    @Query() query: DTO.GetCovidDataReqQueryDTO,
  ) {
    const result = await this.appService.getParsedCovidData(query);
    res.status(result.code).json(result);
  }
}
