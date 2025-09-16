'use client'

import { CONTAINER_IDENTIFIER } from '@/_shared/constants/container-identifier'
import { ERROR_MESSAGES } from '@/_shared/constants/errors/error-messages'
import { FIELD_ERROR_MESSAGES } from '@/_shared/constants/errors/form-validation.constants'
import { DEFAULT_EMAIL_PATTERN_REGEX } from '@/_shared/constants/patterns.constant'
import { ValidationHelper } from '@/_shared/helpers/validation.helper'
import { IAuthService } from '@/_shared/interfaces/iauth.service'
import container from '@/_shared/services/service-container'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as Yup from 'yup'

// Asset constants
const imgLogo = '/images/d5fb6718c343ea0851f29d6aa8bbc4cf69c005b6.svg'
const imgLogo1 = '/images/5a2bb2f0ab7cc80d56e630d0ea5fbacf7e74371c.svg'
const imgVector = '/images/0cca2f3112427e27afa237063c63d735f1f9f076.svg'
const imgVector1 = '/images/c062ae23fc27c5fb724f17dabc7d8788e0c90930.svg'
const imgIcon = '/images/52e6806586c6f2e4e63a3057cac6692fe4aca934.svg'

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

interface Props {}

const loginFormInitialValue = {
  email: '',
  password: '',
  rememberMe: false,
}

// Eye slash icon component
function EyeSlash() {
  return (
    <div className='relative size-full cursor-pointer'>
      <div className='absolute inset-[21.88%_6.25%]'>
        <img alt='' className='block max-w-none size-full' src={imgVector} />
      </div>
      <div className='absolute inset-[12.47%_3.13%]'>
        <img alt='' className='block max-w-none size-full' src={imgVector1} />
      </div>
    </div>
  )
}

const Login: NextPage<Props> = ({}) => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [alertType, setAlertType] = useState<
    'default' | 'success' | 'warning' | 'error'
  >('default')
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)

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

    try {
      // Check if Firebase is configured
      if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        // For development/demo purposes, simulate successful login
        setTimeout(() => {
          setIsLoading(false)
          router.push('/dashboard')
        }, 1500)
        return
      }

      // Get auth service from container
      const authService = container.get<IAuthService>(
        CONTAINER_IDENTIFIER.IAUTH_SERVICE
      )

      // Call authentication service
      const result = await authService.signInWithEmail({
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe as boolean,
      })

      setIsLoading(false)

      if (result.success) {
        // Redirect to dashboard on successful login
        router.push('/dashboard')
      } else {
        // Show error message
        const errorMessage =
          ERROR_MESSAGES[result.errorCode || 'unexpected-error'] ||
          'Login failed. Please try again.'
        showAlert('error', errorMessage)
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Login error:', error)
      showAlert('error', 'An unexpected error occurred. Please try again.')
    }
  }

  const navigateToSignUp = () => {
    router.push('/sign-up')
  }

  const handleGoogleLogin = () => {
    console.log('Google login clicked')
    // Implement Google OAuth here
  }

  const handleAppleLogin = () => {
    console.log('Apple login clicked')
    // Implement Apple OAuth here
  }

    return (
      <div className="grid min-h-svh lg:grid-cols-2 font-['Inter',sans-serif]">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-md">
              {/* Logo at top center */}
              <div className="flex flex-col items-center mb-6">
                <img src="/images/ys-new-logo.png" alt="logo" className="h-[45px] w-auto mb-2" />
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;
                  const formData = new FormData(form);
                  const values = {
                    email: formData.get('email') as string,
                    password: formData.get('password') as string,
                    rememberMe: formData.get('rememberMe') === 'on',
                  };
                  handleSubmit(values);
                }}
                className="flex flex-col gap-6"
              >
                {/* Log In heading and sublabel at top, below logo */}
                <div className="flex flex-col gap-1 items-start mb-6">
                  <h1 className="text-[18px] font-semibold text-[#363636]">Log In</h1>
                  <div className="text-[14px] text-[#868686] font-normal">
                    Welcome back! Please log in to continue.
                  </div>
                </div>
                {/* SSO Buttons */}
                <div className="flex flex-col gap-3 mb-4 w-full">
                  <Button
                    variant='outline'
                    type='button'
                    onClick={handleGoogleLogin}
                    className='w-full flex items-center justify-center border border-[#e5e5e5] bg-white text-[#363636] !text-[14px] font-semibold h-[42px] cursor-pointer'
                  >
                    <img alt='Google' className='mr-2 h-4 w-4' src={imgLogo} />
                    Login with Google
                  </Button>
                  <Button
                    variant='outline'
                    type='button'
                    onClick={handleAppleLogin}
                    className='w-full flex items-center justify-center border border-[#e5e5e5] bg-[#18181b] text-[white] !text-[14px] font-semibold h-[42px] cursor-pointer'
                  >
                    <img alt='Apple' className='mr-2 h-4 w-4' src={imgLogo1} />
                    Login with Apple
                  </Button>
                </div>
                {/* Divider */}
                <div className="flex items-center w-full my-2">
                  <div className="flex-1 h-px bg-[#e5e5e5]" />
                  <span className="mx-3 text-xs text-[#868686]">OR</span>
                  <div className="flex-1 h-px bg-[#e5e5e5]" />
                </div>
                {/* Email Address */}
                <div className="flex flex-col gap-1 w-full">
                  <Label htmlFor="email" className="text-[14px] font-semibold text-[#868686]">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="w-full h-[42px] px-[16px] rounded-[6px] border border-[#d9d9d9] !text-[14px] placeholder:text-[14px] placeholder:text-[#d9d9d9] font-normal"
                  />
                </div>
                {/* Password and Checkbox Group */}
                <div className="flex flex-col gap-1 w-full">
                  {/* Password */}
                  <div className="flex flex-col gap-1 w-full">
                    <Label htmlFor="password" className="text-[14px] font-semibold text-[#868686]">Password</Label>
                    <div className="relative w-full">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder='Enter your password'
                        className="w-full h-[42px] px-[16px] pr-10 rounded-[6px] border border-[#d9d9d9] !text-[14px] placeholder:text-[14px] placeholder:text-[#d9d9d9] font-normal"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <EyeSlash />
                      </button>
                    </div>
                  </div>
                  {/* Remember Me and Forgot Password Row */}
                  <div className="flex items-center justify-between w-full mt-1 mb-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        className="accent-[#383ad8] w-4 h-4 rounded-[4px] border border-[#d9d9d9]"
                      />
                      <Label htmlFor="rememberMe" className="text-[14px] text-[#363636] font-normal ml-2">Remember me</Label>
                    </div>
                    <a href="/forgot-password" className="text-[#383ad8] font-semibold">Forgot Password?</a>
                  </div>
                </div>
                {/* Error Alert */}
                {isError && <Alert variant='destructive'>{alertMessage}</Alert>}
                {/* Login Button and Sign Up Row Group */}
                <div className="flex flex-col gap-2 w-full">
                  <button type="submit" className="w-full h-[42px] bg-[#383ad8] text-[white] text-[14px] font-semibold rounded-[6px] cursor-pointer" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                  </button>
                  <div className="text-left text-[14px] mt-2">
                    Don't have an account?{' '}
                    <a href="/sign-up-options" className="text-[#383ad8] font-semibold">Sign up</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            © 2024 Powered by You_Source
          </div>
        </div>
        <div className="bg-muted relative hidden lg:block">
          <img
            src="/images/bg-authentication.png"
            alt="Login cover"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
          <div className="absolute bottom-[110px] left-1/2 -translate-x-1/2 text-center text-white w-[370px] z-10">
            <div className="flex flex-col gap-1 items-center w-full text-[#363636] text-center">
              <h2 className="font-['Inter',_sans-serif] text-[24px] font-semibold mb-1 leading-normal">Turn your idea to reality</h2>
              <p className="font-['Inter',_sans-serif] text-[14px] font-normal leading-[1.5]">Consistent quality and experience across all platforms.</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Login
