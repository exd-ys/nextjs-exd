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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { CheckCircle, Eye, EyeSlash, XCircle } from 'phosphor-react'
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
    <div className="grid min-h-svh lg:grid-cols-2 font-['Inter',sans-serif]">
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-md'>
            {/* Logo at top center */}
            <div className='flex flex-col items-center mb-6'>
              <img
                src='/images/ys-new-logo.png'
                alt='logo'
                className='h-[45px] w-auto mb-2'
              />
            </div>
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
                    {/* Sign Up label and sublabel aligned left */}
                    <div className='flex flex-col gap-1 items-start mb-2'>
                      <h1 className='text-[18px] font-semibold text-[#363636]'>
                        Sign Up
                      </h1>
                      <div className='text-[14px] text-[#868686] font-normal'>
                        Already have an account?{' '}
                        <a
                          href='/login'
                          className='text-[#383ad8] font-semibold'
                        >
                          Log in
                        </a>
                      </div>
                    </div>
                    {/* Full Name */}
                    <div className='flex flex-col gap-1 w-full'>
                      <Label
                        htmlFor='fullName'
                        className='text-[14px] font-semibold text-[#868686]'
                      >
                        Full name
                      </Label>
                      <Input
                        id='fullName'
                        name='fullName'
                        placeholder='Juan Dela Cruz'
                        value={values.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='w-full h-[42px] px-[16px] rounded-[6px] border border-[#d9d9d9] !text-[14px] placeholder:text-[14px] placeholder:text-[#d9d9d9] font-normal'
                      />
                    </div>
                    {/* Phone Number */}
                    <div className='flex flex-col gap-1 w-full'>
                      <Label
                        htmlFor='phone'
                        className='text-[14px] font-semibold text-[#868686]'
                      >
                        Phone number
                      </Label>
                      <div className='flex w-full h-[42px] bg-white rounded-[6px] border border-[#d9d9d9] items-center'>
                        <span className='flex items-center px-2 text-[#868686] text-[16px] relative'>
                          +639
                        </span>
                        <Input
                          id='phone'
                          name='phone'
                          placeholder='00 0000 000'
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className='flex-1 h-full px-[16px] rounded-r-[6px] border-none !text-[14px] placeholder:text-[14px] placeholder:text-[#d9d9d9] font-normal'
                        />
                      </div>
                    </div>
                    {/* Email Address */}
                    <div className='flex flex-col gap-1 w-full'>
                      <Label
                        htmlFor='email'
                        className='text-[14px] font-semibold text-[#868686]'
                      >
                        Email
                      </Label>
                      <Input
                        id='email'
                        name='email'
                        type='email'
                        placeholder='name@email.com'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='w-full h-[42px] px-[16px] rounded-[6px] border border-[#d9d9d9] !text-[14px] placeholder:text-[14px] placeholder:text-[#d9d9d9] font-normal'
                      />
                    </div>
                    {/* Password */}
                    <div className='flex flex-col gap-1 w-full'>
                      <Label
                        htmlFor='password'
                        className='text-[14px] font-semibold text-[#868686]'
                      >
                        Enter password
                      </Label>
                      <div className='relative w-full'>
                        <Input
                          id='password'
                          name='password'
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Enter password'
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className='w-full h-[42px] px-[16px] pr-10 rounded-[6px] border border-[#d9d9d9] !text-[14px] placeholder:text-[14px] placeholder:text-[#d9d9d9] font-normal'
                        />
                        <button
                          type='button'
                          className='absolute right-3 top-1/2 -translate-y-1/2'
                          tabIndex={-1}
                          onClick={() => setShowPassword((v) => !v)}
                        >
                          {showPassword ? (
                            <EyeSlash size={20} color='#868686' />
                          ) : (
                            <Eye size={20} color='#868686' />
                          )}
                        </button>
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
                          let colors = [
                            'bg-[#d9d9d9]',
                            'bg-[#d9d9d9]',
                            'bg-[#d9d9d9]',
                          ]
                          if (strength === 1) {
                            colors = [
                              'bg-[#ffe066]',
                              'bg-[#d9d9d9]',
                              'bg-[#d9d9d9]',
                            ] // yellow
                          } else if (strength === 2) {
                            colors = [
                              'bg-[#ffa600]',
                              'bg-[#ffa600]',
                              'bg-[#d9d9d9]',
                            ] // orange
                          } else if (strength === 3) {
                            colors = [
                              'bg-[#28c700]',
                              'bg-[#28c700]',
                              'bg-[#28c700]',
                            ] // green
                          }
                          return colors.map((c, i) => (
                            <span
                              key={i}
                              className={`flex-1 rounded-[999px] ${c}`}
                            ></span>
                          ))
                        })()}
                      </div>
                      {/* Password requirements - Figma style */}
                      <div className='mt-2 flex flex-col gap-2'>
                        <div className='flex items-center gap-2 text-[14px] font-normal'>
                          {/[A-Z]/.test(values.password) ? (
                            <CheckCircle
                              size={20}
                              color='#28c700'
                              weight='fill'
                            />
                          ) : (
                            <XCircle size={20} color='#f25d3b' weight='fill' />
                          )}
                          <span
                            className={`${
                              /[A-Z]/.test(values.password)
                                ? 'text-[#363636]'
                                : 'text-[#868686]'
                            }`}
                          >
                            At least one capital letter
                          </span>
                        </div>
                        <div className='flex items-center gap-2 text-[14px] font-normal'>
                          {/[0-9]/.test(values.password) ? (
                            <CheckCircle
                              size={20}
                              color='#28c700'
                              weight='fill'
                            />
                          ) : (
                            <XCircle size={20} color='#f25d3b' weight='fill' />
                          )}
                          <span
                            className={`${
                              /[0-9]/.test(values.password)
                                ? 'text-[#363636]'
                                : 'text-[#868686]'
                            }`}
                          >
                            At least one number
                          </span>
                        </div>
                        <div className='flex items-center gap-2 text-[14px] font-normal'>
                          {values.password.length >= 8 ? (
                            <CheckCircle
                              size={20}
                              color='#28c700'
                              weight='fill'
                            />
                          ) : (
                            <XCircle size={20} color='#f25d3b' weight='fill' />
                          )}
                          <span
                            className={`${
                              values.password.length >= 8
                                ? 'text-[#363636]'
                                : 'text-[#868686]'
                            }`}
                          >
                            Be at least 8 characters
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Terms and Conditions */}
                    <div className='flex items-start gap-2 mt-4 w-full'>
                      <input
                        type='checkbox'
                        id='terms'
                        name='terms'
                        checked={values.terms}
                        onChange={(e) =>
                          setFieldValue('terms', e.target.checked)
                        }
                        className='accent-[#383ad8] size-4 rounded-[4px] border border-[#d9d9d9]'
                      />
                      <label
                        htmlFor='terms'
                        className='text-[14px] text-[#363636] font-normal leading-[1.5]'
                      >
                        I acknowledge that I have read and accept the
                        <a
                          href='#'
                          className='text-[#383ad8] font-semibold ml-1'
                        >
                          Terms and Condition
                        </a>
                        <span> and the </span>
                        <a href='#' className='text-[#383ad8] font-semibold'>
                          Privacy Policy
                        </a>
                        .
                      </label>
                    </div>
                    {/* Sign Up Button */}
                    <button
                      type='submit'
                      className='w-full h-[42px] bg-[#383ad8] text-[white] text-[14px] font-semibold rounded-[6px]'
                      disabled={isLoading || !values.terms}
                    >
                      {isLoading ? 'Signing Up...' : 'Sign up'}
                    </button>
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
          className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
        <div className='absolute bottom-[110px] left-1/2 -translate-x-1/2 text-center text-white w-[370px] z-10'>
          <div className='flex flex-col gap-1 items-center w-full text-[#363636] text-center'>
            <h2 className="font-['Inter',_sans-serif] text-[24px] font-semibold mb-1 leading-normal">
              Turn your idea to reality
            </h2>
            <p className="font-['Inter',_sans-serif] text-[14px] font-normal leading-[1.5]">
              Consistent quality and experience across all platforms.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
