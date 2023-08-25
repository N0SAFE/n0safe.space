import { IsDefined, IsObject, ValidateNested } from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class ProcessesRessourceGetBodyDto extends BaseDto {}

export class ProcessesRessourceGetQueryDto extends BaseDto {}

export class ProcessesRessourceGetDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProcessesRessourceGetBodyDto)
  private _body: ProcessesRessourceGetBodyDto = new ProcessesRessourceGetBodyDto({})

  public get body (): ProcessesRessourceGetBodyDto {
    return this._body || new ProcessesRessourceGetBodyDto({})
  }

  public set body (value: ProcessesRessourceGetBodyDto | undefined) {
    this._body = new ProcessesRessourceGetBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProcessesRessourceGetQueryDto)
  private _query: ProcessesRessourceGetQueryDto = new ProcessesRessourceGetQueryDto({})

  public get query (): ProcessesRessourceGetQueryDto {
    return this._query || new ProcessesRessourceGetQueryDto({})
  }

  public set query (value: ProcessesRessourceGetQueryDto | undefined) {
    this._query = new ProcessesRessourceGetQueryDto(value || {})
  }
}
