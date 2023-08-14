import { IsDefined, IsObject, ValidateNested } from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class ProcessesRessourcePatchBodyDto extends BaseDto {}

export class ProcessesRessourcePatchQueryDto extends BaseDto {}

export class ProcessesRessourcePatchDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProcessesRessourcePatchBodyDto)
  private _body: ProcessesRessourcePatchBodyDto = new ProcessesRessourcePatchBodyDto({})

  public get body(): ProcessesRessourcePatchBodyDto {
    return this._body || new ProcessesRessourcePatchBodyDto({})
  }

  public set body(value: ProcessesRessourcePatchBodyDto | undefined) {
    this._body = new ProcessesRessourcePatchBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProcessesRessourcePatchQueryDto)
  private _query: ProcessesRessourcePatchQueryDto = new ProcessesRessourcePatchQueryDto({})

  public get query(): ProcessesRessourcePatchQueryDto {
    return this._query || new ProcessesRessourcePatchQueryDto({})
  }

  public set query(value: ProcessesRessourcePatchQueryDto | undefined) {
    this._query = new ProcessesRessourcePatchQueryDto(value || {})
  }
}
