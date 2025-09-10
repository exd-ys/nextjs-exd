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
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  LockClosedIcon,
  UserCircleIcon,
  UserIcon,
} from '@heroicons/react/20/solid'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as Yup from 'yup'
import WebsiteAnimation from './../../../../public/animations/website-animation.json'
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
    email: '',
    password: '',
    confirmPassword: '',
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
    <>
      <div className='from-primary-50 to-primary-50 my-auto flex items-center bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] via-primary-100 sm:h-screen'>
        <div className='flex h-full w-screen flex-col items-center justify-between gap-16 p-8 sm:gap-0 sm:p-16'>
          <header className='header w-full text-left'>
            <img
              alt='logo'
              className='mr-auto h-10 w-auto'
              src={'/images/underscore-code-logo.svg'}
            />
          </header>

          <section className='flex w-full flex-col items-center justify-center gap-8 sm:flex-row'>
            <div className='section-left animate__animated animate__slideInLeft flex h-full flex-col items-center justify-center sm:w-full md:w-6/12'>
              <div className='px-0 text-center md:px-4 lg:px-24'>
                <Lottie
                  autoplay
                  loop
                  animationData={WebsiteAnimation}
                  className='w-10/12'
                />
                <h1 className='mb-2 mt-12 text-h3 leading-tight tracking-wide text-secondary'>
                  Dive into the Speed and Elegance of Underscore Code Design
                  System!
                </h1>
              </div>
            </div>

            <div className='section-right w-full px-0 sm:w-full sm:px-8 md:w-6/12'>
              <div className='animate__animated animate__slideInRight grid-row-2 grid h-full w-full rounded-lg bg-secondary-white bg-opacity-60 p-12 shadow-lg sm:w-11/12'>
                <div className=''>
                  <div hidden={!isError}>
                    <div className='flex h-full w-full flex-col justify-center gap-12'>
                      <Alert
                        variant={
                          alertType === 'error' ? 'destructive' : 'default'
                        }
                      >
                        {alertMessage}
                      </Alert>
                      <div className='flex justify-center'>
                        <Button
                          type='button'
                          variant='default'
                          size='default'
                          onClick={navigateFromAlert}
                        >
                          <ArrowLeftIcon className='mr-2 h-4 w-4' />
                          {alertButton}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div hidden={isError}>
                    <h1 className='mb-3 text-h2 font-semibold text-secondary'>
                      Create new account
                    </h1>

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
                        isSubmitting,
                      }) => (
                        <Form noValidate>
                          {/* Full Name */}
                          <div className='mb-6'>
                            <Label
                              htmlFor='fullName'
                              className='block text-sm mb-2 font-bold text-secondary'
                            >
                              Full Name
                            </Label>
                            <div className='relative'>
                              <UserIcon className='absolute left-3 top-3 h-4 w-4 text-secondary' />
                              <Input
                                id='fullName'
                                name='fullName'
                                placeholder='Enter full name...'
                                className='pl-10'
                                value={values.fullName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                            {touched.fullName && errors.fullName && (
                              <p className='text-sm text-destructive mt-1'>
                                {errors.fullName}
                              </p>
                            )}
                          </div>

                          {/* Email Address */}
                          <div className='mb-6'>
                            <Label
                              htmlFor='email'
                              className='block text-sm mb-2 font-bold text-secondary'
                            >
                              Email Address
                            </Label>
                            <div className='relative'>
                              <UserCircleIcon className='absolute left-3 top-3 h-4 w-4 text-secondary' />
                              <Input
                                id='email'
                                name='email'
                                type='email'
                                placeholder='Enter email address...'
                                className='pl-10'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                            {touched.email && errors.email && (
                              <p className='text-sm text-destructive mt-1'>
                                {errors.email}
                              </p>
                            )}
                          </div>

                          {/* Password */}
                          <div className='mb-6'>
                            <Label
                              htmlFor='password'
                              className='block text-sm mb-2 font-bold text-secondary'
                            >
                              Password
                            </Label>
                            <div className='relative'>
                              <LockClosedIcon className='absolute left-3 top-3 h-4 w-4 text-secondary' />
                              <Input
                                id='password'
                                name='password'
                                type='password'
                                placeholder='Enter password...'
                                className='pl-10'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                            {touched.password && errors.password && (
                              <p className='text-sm text-destructive mt-1'>
                                {errors.password}
                              </p>
                            )}
                          </div>

                          {/* Confirm Password */}
                          <div className='mb-6'>
                            <Label
                              htmlFor='confirmPassword'
                              className='block text-sm mb-2 font-bold text-secondary'
                            >
                              Confirm Password
                            </Label>
                            <div className='relative'>
                              <LockClosedIcon className='absolute left-3 top-3 h-4 w-4 text-secondary' />
                              <Input
                                id='confirmPassword'
                                name='confirmPassword'
                                type='password'
                                placeholder='Enter password...'
                                className='pl-10'
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                            {touched.confirmPassword &&
                              errors.confirmPassword && (
                                <p className='text-sm text-destructive mt-1'>
                                  {errors.confirmPassword}
                                </p>
                              )}
                          </div>

                          {/* Sign Up Button */}
                          <div className='mb-6'>
                            <Button
                              type='submit'
                              variant='default'
                              size='lg'
                              className='w-full'
                              disabled={isLoading}
                            >
                              {isLoading ? 'Signing Up...' : 'Sign Up'}
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                    <div className='flex w-full items-center justify-center text-secondary '>
                      <label htmlFor=''>Already a member?</label>
                      <Button
                        type='button'
                        variant='link'
                        size='default'
                        onClick={() => navigateToLogin()}
                      >
                        <ArrowLeftIcon className='mr-2 h-4 w-4' />
                        Login here
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className='powered-by w-full text-left text-secondary-400'>
            Powered by _code | v1.0
          </footer>
        </div>
      </div>
    </>
  )
}

export default SignUp
