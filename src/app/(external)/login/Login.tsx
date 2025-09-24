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
import { Checkbox } from '@/components/ui/checkbox'
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
    <div className='grid min-h-svh lg:grid-cols-2'>
      {/* Left Side - Login Form */}
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
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.currentTarget as HTMLFormElement
                const formData = new FormData(form)
                const values = {
                  email: formData.get('email') as string,
                  password: formData.get('password') as string,
                  rememberMe: formData.get('rememberMe') === 'on',
                }
                handleSubmit(values)
              }}
              className='flex flex-col gap-6'
            >
              <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className='text-2xl font-bold'>Log In</h1>
                <p className='text-muted-foreground text-sm text-balance'>
                  Welcome back! Please log in to continue.
                </p>
              </div>

              <div className='grid gap-6'>
                {/* Social Login Buttons */}
                <div className='flex flex-col gap-3'>
                  <Button
                    variant='outline'
                    type='button'
                    onClick={handleGoogleLogin}
                    className='w-full'
                  >
                    <img alt='Google' className='mr-2 h-4 w-4' src={imgLogo} />
                    Login with Google
                  </Button>
                  <Button
                    type='button'
                    onClick={handleAppleLogin}
                    className='w-full bg-black hover:bg-black/90'
                  >
                    <img alt='Apple' className='mr-2 h-4 w-4' src={imgLogo1} />
                    Login with Apple
                  </Button>
                </div>

                {/* Divider */}
                <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                  <span className='bg-background text-muted-foreground relative z-10 px-2'>
                    Or continue with
                  </span>
                </div>

                {/* Email Field */}
                <div className='grid gap-3'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='name@email.com'
                    required
                  />
                </div>

                {/* Password Field */}
                <div className='grid gap-3'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>Password</Label>
                    <Button
                      variant='link'
                      className='ml-auto h-auto p-0 text-sm underline-offset-4 hover:underline'
                      onClick={() => router.push('/forgot-password')}
                    >
                      Forgot your password?
                    </Button>
                  </div>
                  <div className='relative'>
                    <Input
                      id='password'
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder='Enter password'
                      className='pr-10'
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <EyeSlash />
                    </Button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='rememberMe'
                    name='rememberMe'
                    className='h-4 w-4'
                  />
                  <Label
                    htmlFor='rememberMe'
                    className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Remember me
                  </Label>
                </div>

                {/* Error Alert */}
                {isError && <Alert variant='destructive'>{alertMessage}</Alert>}

                {/* Login Button */}
                <Button type='submit' className='w-full' disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </div>

              {/* Sign Up Link */}
              <div className='text-center text-sm'>
                Don&apos;t have an account?{' '}
                <Button
                  variant='link'
                  className='h-auto p-0 underline underline-offset-4'
                  onClick={() => router.push('/sign-up-options')}
                >
                  Sign up
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className='text-center text-sm text-muted-foreground'>
          © 2024 Powered by You_Source
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div className='bg-muted relative hidden lg:block'>
        <img
          src='/images/bg-authentication.png'
          alt='Login cover'
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

export default Login
