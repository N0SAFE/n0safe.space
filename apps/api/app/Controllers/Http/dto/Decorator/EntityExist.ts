import { registerDecorator, ValidatorConstraint, ValidationArguments } from 'class-validator'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'

@ValidatorConstraint({ async: true })
export class EntityExistConstraint {
  public async validate(value: number | number[], args: ValidationArguments) {
    const [relatedModel] = args.constraints
    if (!Array.isArray(value)) {
      if (typeof value === 'number') {
        value = [value]
      } else {
        return true
      }
    }
    const relatedModelInstance = await relatedModel.findMany(value)
    return relatedModelInstance.length === value.length
  }
}

export function EntityExist(model: typeof BaseModel) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'entityExist',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [model],
      options: {
        message: (validationArguments) => {
          if (!Array.isArray(validationArguments.value)) {
            return `the instance of ${model.name} with id ${validationArguments.value} does not exist`
          }
          return `one of the instance of ${model.name} with ids [${validationArguments.value.join(
            ', '
          )}] does not exist`
        },
      },
      validator: EntityExistConstraint,
    })
  }
}
