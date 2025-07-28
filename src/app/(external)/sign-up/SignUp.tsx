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
import Alert from '@/components/core/alert/alert'
import Button from '@/components/core/button/button'
import FormField from '@/components/core/forms/form-fields/form-field'
import FormGroup from '@/components/core/forms/form-group/form-group'
import FormLabel from '@/components/core/forms/form-label/form-label'
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
      <div className='from-primary-50 to-primary-50 my-auto flex items-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] via-primary-100 sm:h-screen'>
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
                      <Alert theme='alert' showalert={isError} type={alertType}>
                        {alertMessage}
                      </Alert>
                      <div className='flex justify-center'>
                        <Button
                          buttontype='button'
                          theme='primary'
                          label={alertButton}
                          leftIcon
                          size='md'
                          onClick={navigateFromAlert}
                        >
                          <ArrowLeftIcon />
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
                        isSubmitting,
                      }) => (
                        <Form noValidate>
                          {/* Full Name */}
                          <FormGroup theme='primary'>
                            <FormLabel
                              fontbold
                              for='fullName'
                              theme='secondary'
                            >
                              Full Name
                            </FormLabel>
                            <FormField
                              theme={`${
                                touched.fullName && errors.fullName
                                  ? 'error'
                                  : 'default'
                              }`}
                              errorMessage={
                                errors.fullName ? errors.fullName : ''
                              }
                              placeholder='Enter full name...'
                              fieldtype='text'
                              name='fullName'
                              fullWidth
                              leftIcon
                              lefticonblock={<UserIcon />}
                            />
                          </FormGroup>

                          {/* Email Address */}
                          <FormGroup theme='primary'>
                            <FormLabel fontbold for='email' theme='secondary'>
                              Email Address
                            </FormLabel>
                            <FormField
                              theme={`${
                                touched.email && errors.email
                                  ? 'error'
                                  : 'default'
                              }`}
                              errorMessage={errors.email ? errors.email : ''}
                              placeholder='Enter email address...'
                              fieldtype='email'
                              name='email'
                              fullWidth
                              leftIcon
                              lefticonblock={<UserCircleIcon />}
                            />
                          </FormGroup>

                          {/* Password */}
                          <FormGroup theme='primary'>
                            <FormLabel
                              fontbold
                              for='password'
                              theme='secondary'
                            >
                              Password
                            </FormLabel>
                            <FormField
                              theme={`${
                                touched.password && errors.password
                                  ? 'error'
                                  : 'default'
                              }`}
                              errorMessage={
                                errors.password ? errors.password : ''
                              }
                              placeholder='Enter password...'
                              fieldtype='password'
                              name='password'
                              fullWidth
                              leftIcon
                              lefticonblock={<LockClosedIcon />}
                            />
                          </FormGroup>

                          {/* Confirm Password */}
                          <FormGroup theme='primary'>
                            <FormLabel
                              fontbold
                              for='confirmPassword'
                              theme='secondary'
                            >
                              Confirm Password
                            </FormLabel>
                            <FormField
                              theme={`${
                                touched.confirmPassword &&
                                errors.confirmPassword
                                  ? 'error'
                                  : 'default'
                              }`}
                              errorMessage={
                                errors.confirmPassword
                                  ? errors.confirmPassword
                                  : ''
                              }
                              placeholder='Enter password...'
                              fieldtype='password'
                              name='confirmPassword'
                              fullWidth
                              leftIcon
                              lefticonblock={<LockClosedIcon />}
                            />
                          </FormGroup>

                          {/* Sign Up Button */}
                          <FormGroup theme='primary'>
                            <Button
                              fullWidth
                              isLoading={isLoading}
                              buttontype='submit'
                              theme='primary'
                              label='Sign Up'
                              size='lg'
                            ></Button>
                          </FormGroup>
                        </Form>
                      )}
                    </Formik>
                    <div className='flex w-full items-center justify-center text-secondary '>
                      <label htmlFor=''>Already a member?</label>
                      <Button
                        buttontype='button'
                        theme='link'
                        label='Login here'
                        size='md'
                        onClick={() => navigateToLogin()}
                      >
                        <ArrowLeftIcon />
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
