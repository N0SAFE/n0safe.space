import { IsDefined, IsObject, ValidateNested } from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class ProcessesRessourcePostBodyDto extends BaseDto {}

export class ProcessesRessourcePostQueryDto extends BaseDto {}

export class ProcessesRessourcePostDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProcessesRessourcePostBodyDto)
  private _body: ProcessesRessourcePostBodyDto = new ProcessesRessourcePostBodyDto({})

  public get body (): ProcessesRessourcePostBodyDto {
    return this._body || new ProcessesRessourcePostBodyDto({})
  }

  public set body (value: ProcessesRessourcePostBodyDto | undefined) {
    this._body = new ProcessesRessourcePostBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProcessesRessourcePostQueryDto)
  private _query: ProcessesRessourcePostQueryDto = new ProcessesRessourcePostQueryDto({})

  public get query (): ProcessesRessourcePostQueryDto {
    return this._query || new ProcessesRessourcePostQueryDto({})
  }

  public set query (value: ProcessesRessourcePostQueryDto | undefined) {
    this._query = new ProcessesRessourcePostQueryDto(value || {})
  }
}
