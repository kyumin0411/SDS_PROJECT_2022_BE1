import { HttpStatus, Injectable } from '@nestjs/common';
import * as DTO from 'src/dto/dto';

@Injectable()
export class AppService {
  async getParsedCovidData(query: DTO.GetCovidDataReqQueryDTO) {
    const result = new DTO.GetCovidDataResDTO();

    result.code = HttpStatus.OK;
    result.message = '데이터 조회 성공';
    return result;
  }
}
