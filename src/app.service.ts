import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as DTO from 'src/dto/dto';
import * as dayjs from 'dayjs';
import { lastValueFrom } from 'rxjs';
import * as URL from './url';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async getParsedCovidData(query: DTO.GetCovidDataReqQueryDTO) {
    const result = new DTO.GetCovidDataResDTO();
    try {
      const searchStartDate = dayjs(query.searchDate).format('YYYYMMDD');
      const searchEndDate = dayjs(query.searchDate)
        .add(1, 'day')
        .format('YYYYMMDD');

      const urlParams = new URLSearchParams();
      urlParams.set('startCreateDt', searchStartDate);
      urlParams.set('endCreateDt', searchEndDate);

      const url =
        process.env.BE2_API_URL + URL.GET_COVID_19_DATA + '?' + urlParams;

      const requestURL = await this.httpService.get(url);
      const requestResult = await lastValueFrom(requestURL);

      const resultDatas = requestResult.data.data.items.item;

      const searchDateData = resultDatas[0];
      const prevDateData = resultDatas[1];

      const deathCntDiff = searchDateData.deathCnt - prevDateData.deathCnt;
      const decideCntDiff = searchDateData.decideCnt - prevDateData.decideCnt;

      result.code = HttpStatus.OK;
      result.message = '데이터 조회 성공';
      result.payload = { deathCount: deathCntDiff, decideCount: decideCntDiff };

      return result;
    } catch (error) {
      result.code = HttpStatus.CONFLICT;
      result.message = '데이터 조회 실패';
      throw result;
    }
  }
}
