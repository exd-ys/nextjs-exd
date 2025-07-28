import * as Yup from 'yup'
import { ValidationError } from 'yup'

export type FormErrors = Record<string, string[]>

export class ValidationHelper {
  static validate<T>(
    values: T,
    validationSchema: Yup.Schema<T>
  ): FormErrors | undefined {
    try {
      validationSchema.validateSync(values, { abortEarly: false })
    } catch (err: any) {
      const errors: FormErrors = {}

      err.inner.forEach((error: ValidationError) => {
        const { path, message } = error
        if (path && !errors[path]) {
          errors[path] = [message]
        } else {
          if (path) {
            errors[path].push(message)
          }
        }
      })

      return errors
    }
  }
}
