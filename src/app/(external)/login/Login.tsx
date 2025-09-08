'use client'

import { FIELD_ERROR_MESSAGES } from '@/_shared/constants/errors/form-validation.constants'
import { DEFAULT_EMAIL_PATTERN_REGEX } from '@/_shared/constants/patterns.constant'
import { ValidationHelper } from '@/_shared/helpers/validation.helper'
import Alert from '@/components/core/alert/alert'
import Button from '@/components/core/button/button'
import FormField from '@/components/core/forms/form-fields/form-field'
import FormGroup from '@/components/core/forms/form-group/form-group'
import FormLabel from '@/components/core/forms/form-label/form-label'
import { LockClosedIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as Yup from 'yup'
import WebsiteAnimation from './../../../../public/animations/website-animation.json'
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required(FIELD_ERROR_MESSAGES['required']('Email Address'))
    .matches(
      DEFAULT_EMAIL_PATTERN_REGEX,
      FIELD_ERROR_MESSAGES['email']('Email Address')
    ),
  password: Yup.string().required(FIELD_ERROR_MESSAGES['required']('Password')),
})

const validate = (values: any) => {
  ValidationHelper.validate(values, validationSchema)
}

interface Props { }

const loginFormInitialValue = {
  email: '',
  password: '',
}

const Login: NextPage<Props> = ({ }) => {
  // const authService = container.get<IAuthService>(
  //   CONTAINER_IDENTIFIER.IAUTH_SERVICE
  // );
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [alertType, setAlertType] = useState<
    'default' | 'success' | 'warning' | 'error'
  >('default')
  const [alertMessage, setAlertMessage] = useState<string>('')

  const showAlert = (
    alertType: 'default' | 'success' | 'warning' | 'error',
    message: string
  ) => {
    setAlertMessage(message)
    setAlertType(alertType)
    setIsError(true)
  }

  const hideAlert = () => {
    setAlertMessage('')
    setIsError(false)
  }

  const handleSubmit = async (values: any) => {
    hideAlert()
    setIsLoading(true)

    // authService
    //   .signInWithEmail({
    //     email: values.email,
    //     password: values.password,
    //     rememberMe: values.rememberMe as boolean,
    //   })
    //   .then((res: any) => {
    //     setIsLoading(false);
    //     if (res.success) {
    //       router.push('/home');
    //     } else {
    //       showAlert('error', ERROR_MESSAGES[res?.errorCode!]);
    //     }
    //   });
  }

  const navigateToSignUp = async () => {
    router.push('/sign-up')
  }

  return (
    <div className='gird-my-auto from-primary-50 to-primary-50 flex items-center bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] via-primary-100 sm:h-screen'>
      <div className='flex h-full w-screen flex-col items-center justify-between gap-16 p-8 sm:gap-0 sm:p-16'>
        <header className='header w-full text-left'>
          <Image
            unoptimized
            height={'100'}
            width={'100'}
            src={'/images/underscore-code-logo.svg'}
            alt={'logo'}
          />
        </header>
        <section className='flex w-full flex-col justify-center gap-8 sm:flex-row'>
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

          <div className='section-right animate__animated animate__slideInRight px-0 sm:w-full sm:px-8  md:w-6/12 md:px-16'>
            <div className=' grid-row-2 grid h-full w-full rounded-lg bg-secondary-white bg-opacity-60 p-12 shadow-lg sm:w-11/12	'>
              <h1 className='mb-3 text-h2 font-semibold text-secondary-black'>
                Get started
              </h1>
              <div className='flex-1'>
                <Formik
                  initialValues={loginFormInitialValue}
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
                      {/* Email */}
                      <FormGroup theme='primary'>
                        <FormLabel fontbold for='email' theme='secondary'>
                          Email Address
                        </FormLabel>
                        <FormField
                          theme={`${touched.email && errors.email ? 'error' : 'default'
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
                        <FormLabel fontbold for='password' theme='secondary'>
                          Password
                        </FormLabel>
                        <FormField
                          theme={`${touched.password && errors.password
                            ? 'error'
                            : 'default'
                            }`}
                          errorMessage={errors.password ? errors.password : ''}
                          placeholder='Enter password...'
                          fieldtype='password'
                          name='password'
                          fullWidth
                          leftIcon
                          lefticonblock={<LockClosedIcon />}
                        />
                      </FormGroup>

                      <div className='my-2' hidden={!isError}>
                        <Alert
                          theme='inline'
                          showalert={isError}
                          type={alertType}
                        >
                          {alertMessage}
                        </Alert>
                      </div>

                      {/* Sign In Button */}
                      <FormGroup theme='primary'>
                        <Button
                          fullWidth
                          isLoading={isLoading}
                          buttontype='submit'
                          theme='secondary'
                          label='Sign In'
                          size='lg'
                        ></Button>
                      </FormGroup>

                      <div className='flex w-full items-center justify-center text-secondary '>
                        <label htmlFor=''>Not yet registered?</label>
                        <Button
                          buttontype='button'
                          theme='link'
                          label='Sign up!'
                          size='md'
                          onClick={() => navigateToSignUp()}
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </section>
        <footer className='powered-by w-full text-left text-secondary-400'>
          _code v1.0
        </footer>
      </div>
    </div>
  )
}

export default Login
