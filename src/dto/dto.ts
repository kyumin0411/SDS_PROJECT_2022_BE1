import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class GetCovidDataReqQueryDTO {
  @ApiProperty({ description: '검색 날짜 (2022-01-01)' })
  searchDate: string;
}

export class GetCovidDataResPayloadDTO {
  @ApiProperty({ description: '확진자 수', type: Number })
  decideCount: number;
  @ApiProperty({ description: '사망자 수', type: Number })
  deathCount: number;
}

export class GetCovidDataResDTO {
  @ApiProperty({ description: '결과 code', type: Number })
  code: number = HttpStatus.OK;
  @ApiProperty({ description: '결과 message', type: String })
  message: string;
  @ApiProperty({
    description: '결과 데이터 payload',
    type: GetCovidDataResPayloadDTO,
  })
  payload: GetCovidDataResPayloadDTO;
}
