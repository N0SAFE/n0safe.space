import { IsDefined, IsObject, ValidateNested } from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class ProcessesRessourceDeleteBodyDto extends BaseDto {}

export class ProcessesRessourceDeleteQueryDto extends BaseDto {}

export class ProcessesRessourceDeleteDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProcessesRessourceDeleteBodyDto)
  private _body: ProcessesRessourceDeleteBodyDto = new ProcessesRessourceDeleteBodyDto({})

  public get body(): ProcessesRessourceDeleteBodyDto {
    return this._body || new ProcessesRessourceDeleteBodyDto({})
  }

  public set body(value: ProcessesRessourceDeleteBodyDto | undefined) {
    this._body = new ProcessesRessourceDeleteBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProcessesRessourceDeleteQueryDto)
  private _query: ProcessesRessourceDeleteQueryDto = new ProcessesRessourceDeleteQueryDto({})

  public get query(): ProcessesRessourceDeleteQueryDto {
    return this._query || new ProcessesRessourceDeleteQueryDto({})
  }

  public set query(value: ProcessesRessourceDeleteQueryDto | undefined) {
    this._query = new ProcessesRessourceDeleteQueryDto(value || {})
  }
}
