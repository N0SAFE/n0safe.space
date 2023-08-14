import { IsDefined, IsObject, ValidateNested } from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class ProjectsRessourceGetCollectionBodyDto extends BaseDto {}

export class ProjectsRessourceGetCollectionQueryDto extends BaseDto {}

export class ProjectsRessourceGetCollectionDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProjectsRessourceGetCollectionBodyDto)
  private _body: ProjectsRessourceGetCollectionBodyDto = new ProjectsRessourceGetCollectionBodyDto(
    {}
  )

  public get body(): ProjectsRessourceGetCollectionBodyDto {
    return this._body || new ProjectsRessourceGetCollectionBodyDto({})
  }

  public set body(value: ProjectsRessourceGetCollectionBodyDto | undefined) {
    this._body = new ProjectsRessourceGetCollectionBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProjectsRessourceGetCollectionQueryDto)
  private _query: ProjectsRessourceGetCollectionQueryDto =
    new ProjectsRessourceGetCollectionQueryDto({})

  public get query(): ProjectsRessourceGetCollectionQueryDto {
    return this._query || new ProjectsRessourceGetCollectionQueryDto({})
  }

  public set query(value: ProjectsRessourceGetCollectionQueryDto | undefined) {
    this._query = new ProjectsRessourceGetCollectionQueryDto(value || {})
  }
}
