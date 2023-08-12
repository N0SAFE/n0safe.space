import { IsDefined, IsObject, ValidateNested } from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class ProcessesRessourcePutBodyDto extends BaseDto {}

export class ProcessesRessourcePutQueryDto extends BaseDto {}

export class ProcessesRessourcePutDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProcessesRessourcePutBodyDto)
  private _body: ProcessesRessourcePutBodyDto = new ProcessesRessourcePutBodyDto({})

  public get body (): ProcessesRessourcePutBodyDto {
    return this._body || new ProcessesRessourcePutBodyDto({})
  }

  public set body (value: ProcessesRessourcePutBodyDto | undefined) {
    this._body = new ProcessesRessourcePutBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProcessesRessourcePutQueryDto)
  private _query: ProcessesRessourcePutQueryDto = new ProcessesRessourcePutQueryDto({})

  public get query (): ProcessesRessourcePutQueryDto {
    return this._query || new ProcessesRessourcePutQueryDto({})
  }

  public set query (value: ProcessesRessourcePutQueryDto | undefined) {
    this._query = new ProcessesRessourcePutQueryDto(value || {})
  }
}
