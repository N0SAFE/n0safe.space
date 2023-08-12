import { IsDefined, IsObject, ValidateNested } from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class ProjectsRessourceDeleteBodyDto extends BaseDto {}

export class ProjectsRessourceDeleteQueryDto extends BaseDto {}

export class ProjectsRessourceDeleteDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProjectsRessourceDeleteBodyDto)
  private _body: ProjectsRessourceDeleteBodyDto = new ProjectsRessourceDeleteBodyDto({})

  public get body (): ProjectsRessourceDeleteBodyDto {
    return this._body || new ProjectsRessourceDeleteBodyDto({})
  }

  public set body (value: ProjectsRessourceDeleteBodyDto | undefined) {
    this._body = new ProjectsRessourceDeleteBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProjectsRessourceDeleteQueryDto)
  private _query: ProjectsRessourceDeleteQueryDto = new ProjectsRessourceDeleteQueryDto({})

  public get query (): ProjectsRessourceDeleteQueryDto {
    return this._query || new ProjectsRessourceDeleteQueryDto({})
  }

  public set query (value: ProjectsRessourceDeleteQueryDto | undefined) {
    this._query = new ProjectsRessourceDeleteQueryDto(value || {})
  }
}
