'use client'

import {
  FIELD_ERROR_MESSAGES,
  PASSWORD_MIN_LENGTH,
} from '@/_shared/constants/errors/form-validation.constants'
import { DEFAULT_EMAIL_PATTERN_REGEX } from '@/_shared/constants/patterns.constant'
import {
  PASSWORD_VALIDATION_HAS_LOWERCASE,
  PASSWORD_VALIDATION_HAS_NUMBER,
  PASSWORD_VALIDATION_HAS_SPECIAL_CHARACTER,
  PASSWORD_VALIDATION_HAS_UPPERCASE,
} from '@/_shared/constants/validations/password-validation.constant'
import { PasswordRequirement } from '@/_shared/enums/validations'
import { ValidationHelper } from '@/_shared/helpers/validation.helper'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Form, Formik } from 'formik'
import { CheckCircle, Eye, EyeOff, XCircle } from 'lucide-react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as Yup from 'yup'
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const passwordField = 'Password'
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required(
    FIELD_ERROR_MESSAGES['required']('Full Name')
  ),
  email: Yup.string()
    .required(FIELD_ERROR_MESSAGES['required']('Email Address'))
    .matches(
      DEFAULT_EMAIL_PATTERN_REGEX,
      FIELD_ERROR_MESSAGES['email']('Email Address')
    ),
  password: Yup.string()
    .required(FIELD_ERROR_MESSAGES['required']('Password'))
    .matches(
      PASSWORD_VALIDATION_HAS_LOWERCASE,
      FIELD_ERROR_MESSAGES[PasswordRequirement.lowerCase](passwordField)
    )
    .matches(
      PASSWORD_VALIDATION_HAS_UPPERCASE,
      FIELD_ERROR_MESSAGES[PasswordRequirement.upperCase](passwordField)
    )
    .matches(
      PASSWORD_VALIDATION_HAS_NUMBER,
      FIELD_ERROR_MESSAGES[PasswordRequirement.number](passwordField)
    )
    .matches(
      PASSWORD_VALIDATION_HAS_SPECIAL_CHARACTER,
      FIELD_ERROR_MESSAGES[PasswordRequirement.specialCharacter](passwordField)
    )
    .min(
      PASSWORD_MIN_LENGTH,
      FIELD_ERROR_MESSAGES[PasswordRequirement.length](passwordField)
    ),
  confirmPassword: Yup.string()
    .required(FIELD_ERROR_MESSAGES['required']('Confirm Password'))
    .oneOf(
      [Yup.ref('password')],
      FIELD_ERROR_MESSAGES['mustMatch']('Password')
    ),
})

const validate = (values: any) => {
  ValidationHelper.validate(values, validationSchema)
}

interface Props {}

const SignUp: NextPage<Props> = () => {
  // const authService = container.get<IAuthService>(
  //   CONTAINER_IDENTIFIER.IAUTH_SERVICE
  // );

  const signUpFormInitialValue = {
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  }

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [alertType, setAlertType] = useState<
    'default' | 'success' | 'warning' | 'error'
  >('default')
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [alertButton, setAlertButton] = useState<string>('')

  const showAlert = (
    alertType: 'default' | 'success' | 'warning' | 'error',
    message: string
  ) => {
    setAlertButton(
      alertType === 'success' ? 'Back to login' : 'Please try again?'
    )
    setAlertMessage(message)
    setAlertType(alertType)
    setIsError(true)
  }

  const hideAlert = () => {
    setAlertMessage('')
    setAlertButton('')
    setIsError(false)
  }

  const router = useRouter()

  const handleSubmit = async (values: any) => {
    setIsLoading(true)

    // authService
    //   .signUp({
    //     email: values.email,
    //     name: values.fullName,
    //     password: values.password,
    //   })
    //   .then((res: any) => {
    //     if (res.success) {
    //       showAlert('success', 'User registration successful.');
    //     } else {
    //       showAlert('error', 'User registration failed.');
    //     }
    //     setIsLoading(false);
    //   })
    //   .catch((result) => {
    //     setIsLoading(false);
    //     showAlert('error', 'User registration failed.');
    //     const res = result.response;

    //     if (res.data.errorCode) {
    //       const error = ERROR_MESSAGES[res?.data?.errorCode];
    //     }
    //   });
  }

  const navigateToLogin = async () => {
    router.push('/login')
  }

  const navigateFromAlert = async () => {
    if (alertType === 'success') {
      navigateToLogin()
    } else {
      hideAlert()
    }
  }

  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      {/* Left Side - Sign Up Form */}
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <a href='#' className='flex items-center gap-2 font-medium'>
            <img
              src='/images/ys-new-logo.png'
              alt='logo'
              className='h-[45px] w-auto'
            />
          </a>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            {/* Sign Up Form Card */}
            <Formik
              initialValues={signUpFormInitialValue}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              validate={validate}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
              }) => {
                const [showPassword, setShowPassword] = useState(false)
                // Password requirements
                const passwordChecks = [
                  {
                    label: 'At least one capital letter',
                    valid: /[A-Z]/.test(values.password),
                  },
                  {
                    label: 'At least one number',
                    valid: /[0-9]/.test(values.password),
                  },
                  {
                    label: 'Be at least 8 characters',
                    valid: values.password.length >= 8,
                  },
                ]
                return (
                  <Form noValidate className='flex flex-col gap-6'>
                    <div className='flex flex-col items-center gap-2 text-center'>
                      <h1 className='text-2xl font-bold'>Sign Up</h1>
                      <p className='text-muted-foreground text-sm text-balance'>
                        Create your account to get started.
                      </p>
                    </div>

                    <div className='grid gap-6'>
                      {/* Full Name */}
                      <div className='grid gap-3'>
                        <Label htmlFor='fullName'>Full name</Label>
                        <Input
                          id='fullName'
                          name='fullName'
                          placeholder='Juan Dela Cruz'
                          value={values.fullName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.fullName && touched.fullName && (
                          <p className='text-sm text-destructive'>
                            {errors.fullName}
                          </p>
                        )}
                      </div>
                      {/* Phone Number */}
                      <div className='grid gap-3'>
                        <Label htmlFor='phone'>Phone number</Label>
                        <div className='flex w-full bg-background rounded-md border border-input items-center'>
                          <span className='flex items-center px-3 text-muted-foreground text-sm'>
                            +639
                          </span>
                          <Input
                            id='phone'
                            name='phone'
                            placeholder='00 0000 000'
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className='flex-1 border-none shadow-none focus-visible:ring-0'
                          />
                        </div>
                        {errors.phone && touched.phone && (
                          <p className='text-sm text-destructive'>
                            {errors.phone}
                          </p>
                        )}
                      </div>
                      {/* Email Address */}
                      <div className='grid gap-3'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                          id='email'
                          name='email'
                          type='email'
                          placeholder='name@email.com'
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.email && touched.email && (
                          <p className='text-sm text-destructive'>
                            {errors.email}
                          </p>
                        )}
                      </div>
                      {/* Password */}
                      <div className='grid gap-3'>
                        <Label htmlFor='password'>Enter password</Label>
                        <div className='relative'>
                          <Input
                            id='password'
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter password'
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className='pr-10'
                          />
                          <Button
                            type='button'
                            variant='ghost'
                            size='sm'
                            className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className='w-4 h-4' />
                            ) : (
                              <Eye className='w-4 h-4' />
                            )}
                          </Button>
                        </div>
                        {/* Password strength indicator - color-coded bars */}
                        <div className='flex gap-1 mt-2 h-1'>
                          {(() => {
                            const checks = [
                              /[A-Z]/.test(values.password),
                              /[0-9]/.test(values.password),
                              values.password.length >= 8,
                            ]
                            const strength = checks.filter(Boolean).length
                            let colors = ['bg-muted', 'bg-muted', 'bg-muted']
                            if (strength === 1) {
                              colors = ['bg-yellow-500', 'bg-muted', 'bg-muted'] // yellow
                            } else if (strength === 2) {
                              colors = [
                                'bg-orange-500',
                                'bg-orange-500',
                                'bg-muted',
                              ] // orange
                            } else if (strength === 3) {
                              colors = [
                                'bg-green-500',
                                'bg-green-500',
                                'bg-green-500',
                              ] // green
                            }
                            return colors.map((c, i) => (
                              <span
                                key={i}
                                className={`flex-1 rounded-full ${c}`}
                              ></span>
                            ))
                          })()}
                        </div>
                        {/* Password requirements */}
                        <div className='mt-2 flex flex-col gap-2'>
                          <div className='flex items-center gap-2 text-sm font-normal'>
                            {/[A-Z]/.test(values.password) ? (
                              <CheckCircle className='w-4 h-4 text-green-500' />
                            ) : (
                              <XCircle className='w-4 h-4 text-destructive' />
                            )}
                            <span
                              className={
                                /[A-Z]/.test(values.password)
                                  ? 'text-foreground'
                                  : 'text-muted-foreground'
                              }
                            >
                              At least one capital letter
                            </span>
                          </div>
                          <div className='flex items-center gap-2 text-sm font-normal'>
                            {/[0-9]/.test(values.password) ? (
                              <CheckCircle className='w-4 h-4 text-green-500' />
                            ) : (
                              <XCircle className='w-4 h-4 text-destructive' />
                            )}
                            <span
                              className={
                                /[0-9]/.test(values.password)
                                  ? 'text-foreground'
                                  : 'text-muted-foreground'
                              }
                            >
                              At least one number
                            </span>
                          </div>
                          <div className='flex items-center gap-2 text-sm font-normal'>
                            {values.password.length >= 8 ? (
                              <CheckCircle className='w-4 h-4 text-green-500' />
                            ) : (
                              <XCircle className='w-4 h-4 text-destructive' />
                            )}
                            <span
                              className={
                                values.password.length >= 8
                                  ? 'text-foreground'
                                  : 'text-muted-foreground'
                              }
                            >
                              Be at least 8 characters
                            </span>
                          </div>
                        </div>
                        {errors.password && touched.password && (
                          <p className='text-sm text-destructive'>
                            {errors.password}
                          </p>
                        )}
                      </div>
                      {/* Terms and Conditions */}
                      <div className='flex items-center space-x-2'>
                        <Checkbox
                          id='terms'
                          name='terms'
                          checked={values.terms}
                          onCheckedChange={(checked) =>
                            setFieldValue('terms', checked)
                          }
                        />
                        <Label
                          htmlFor='terms'
                          className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        >
                          I acknowledge that I have read and accept the{' '}
                          <Button
                            variant='link'
                            className='h-auto p-0 underline underline-offset-4'
                            onClick={() => {
                              // Handle terms link
                            }}
                          >
                            Terms and Condition
                          </Button>{' '}
                          and the{' '}
                          <Button
                            variant='link'
                            className='h-auto p-0 underline underline-offset-4'
                            onClick={() => {
                              // Handle privacy policy link
                            }}
                          >
                            Privacy Policy
                          </Button>
                          .
                        </Label>
                      </div>
                      {errors.terms && touched.terms && (
                        <p className='text-sm text-destructive'>
                          {errors.terms}
                        </p>
                      )}

                      {/* Sign Up Button */}
                      <Button
                        type='submit'
                        className='w-full'
                        disabled={isLoading || !values.terms}
                      >
                        {isLoading ? 'Signing Up...' : 'Sign up'}
                      </Button>
                    </div>

                    {/* Login Link */}
                    <div className='text-center text-sm'>
                      Already have an account?{' '}
                      <Button
                        variant='link'
                        className='h-auto p-0 underline underline-offset-4'
                        onClick={() => router.push('/login')}
                      >
                        Log in
                      </Button>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
        <div className='text-center text-sm text-muted-foreground'>
          © 2024 Powered by You_Source
        </div>
      </div>
      <div className='bg-muted relative hidden lg:block'>
        <img
          src='/images/bg-authentication.png'
          alt='Sign up cover'
          className='absolute inset-0 h-full w-full object-cover'
        />
        <div className='absolute bottom-[110px] left-1/2 -translate-x-1/2 text-center text-white w-[370px] z-10'>
          <div className='flex flex-col gap-1 items-center w-full text-center'>
            <h2 className='text-foreground text-2xl font-semibold mb-1 leading-normal'>
              Turn your idea to reality
            </h2>
            <p className='text-foreground text-sm font-normal leading-[1.5]'>
              Consistent quality and experience across all platforms.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
