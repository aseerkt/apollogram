import { ValidationError } from 'class-validator'
import { FieldError } from '../types.js'

export const formatErrors = (errors: ValidationError[]) => {
  let formatedErrors: FieldError[] = []
  errors.forEach(({ property, constraints }) => {
    formatedErrors.push({
      path: property,
      message: Object.values(constraints!)[0],
    })
  })
  return formatedErrors
}
