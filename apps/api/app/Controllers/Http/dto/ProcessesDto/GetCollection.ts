import { IsDefined, IsObject, ValidateNested } from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class ProcessesRessourceGetCollectionBodyDto extends BaseDto {}

export class ProcessesRessourceGetCollectionQueryDto extends BaseDto {}

export class ProcessesRessourceGetCollectionDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProcessesRessourceGetCollectionBodyDto)
  private _body: ProcessesRessourceGetCollectionBodyDto =
      new ProcessesRessourceGetCollectionBodyDto({})

  public get body (): ProcessesRessourceGetCollectionBodyDto {
    return this._body || new ProcessesRessourceGetCollectionBodyDto({})
  }

  public set body (value: ProcessesRessourceGetCollectionBodyDto | undefined) {
    this._body = new ProcessesRessourceGetCollectionBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProcessesRessourceGetCollectionQueryDto)
  private _query: ProcessesRessourceGetCollectionQueryDto =
      new ProcessesRessourceGetCollectionQueryDto({})

  public get query (): ProcessesRessourceGetCollectionQueryDto {
    return this._query || new ProcessesRessourceGetCollectionQueryDto({})
  }

  public set query (value: ProcessesRessourceGetCollectionQueryDto | undefined) {
    this._query = new ProcessesRessourceGetCollectionQueryDto(value || {})
  }
}
