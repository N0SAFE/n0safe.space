import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator'
import { BaseDto } from '../BaseDto'
import Domain from 'App/Models/Domain'
import Process from 'App/Models/Process'
import { Type } from 'class-transformer'
import { EntityExist } from '../Decorator/EntityExist'

export class ProjectsRessourcePatchBodyDto extends BaseDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @EntityExist(Domain)
  public domainId: number

  @IsNumber({}, { each: true })
  @IsOptional()
  @EntityExist(Process)
  public processesId: number[]
}

export class ProjectsRessourcePatchQueryDto extends BaseDto {}

export class ProjectsRessourcePatchDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProjectsRessourcePatchBodyDto)
  private _body: ProjectsRessourcePatchBodyDto = new ProjectsRessourcePatchBodyDto({})

  public get body (): ProjectsRessourcePatchBodyDto {
    return this._body || new ProjectsRessourcePatchBodyDto({})
  }

  public set body (value: ProjectsRessourcePatchBodyDto | undefined) {
    this._body = new ProjectsRessourcePatchBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProjectsRessourcePatchQueryDto)
  private _query: ProjectsRessourcePatchQueryDto = new ProjectsRessourcePatchQueryDto({})

  public get query (): ProjectsRessourcePatchQueryDto {
    return this._query || new ProjectsRessourcePatchQueryDto({})
  }

  public set query (value: ProjectsRessourcePatchQueryDto | undefined) {
    this._query = new ProjectsRessourcePatchQueryDto(value || {})
  }
}
