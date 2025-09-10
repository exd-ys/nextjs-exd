'use client'

import { CONTAINER_IDENTIFIER } from '@/_shared/constants/container-identifier'
import { ERROR_MESSAGES } from '@/_shared/constants/errors/error-messages'
import { FIELD_ERROR_MESSAGES } from '@/_shared/constants/errors/form-validation.constants'
import { DEFAULT_EMAIL_PATTERN_REGEX } from '@/_shared/constants/patterns.constant'
import { ValidationHelper } from '@/_shared/helpers/validation.helper'
import { IAuthService } from '@/_shared/interfaces/iauth.service'
import container from '@/_shared/services/service-container'
import { Alert } from '@/components/ui/alert'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as Yup from 'yup'

// Asset constants from Figma
const imgLogo = '/images/d5fb6718c343ea0851f29d6aa8bbc4cf69c005b6.svg'
const imgLogo1 = '/images/5a2bb2f0ab7cc80d56e630d0ea5fbacf7e74371c.svg'
const imgVector = '/images/0cca2f3112427e27afa237063c63d735f1f9f076.svg'
const imgVector1 = '/images/c062ae23fc27c5fb724f17dabc7d8788e0c90930.svg'
const img = '/images/71ca75ce582927c5fbb70db4af2336cbc6ec8484.svg'
const imgIcon = '/images/52e6806586c6f2e4e63a3057cac6692fe4aca934.svg'
const imgText = '/images/12c3423fa434e6fa2b7e592fe2b46f0216b962d5.svg'
const imgDivider = '/images/fa0e42c767742b3a324e5155196c39a3aa2f9818.svg'
const img1 = '/images/c985ece1d28c317b5ca673d203a6981022fcf389.svg'
const img2 = '/images/445faf93f2954b052aa681a8ccde574a57697095.svg'
const img3 = '/images/094578e5a55ba10128e2a1088428f8bf6fc70744.svg'
const img4 = '/images/da68a8133750887af868c0e14ec44e82332cb564.svg'
const img5 = '/images/5e78d9b855b371edf3699c3d3f25193b287fbf17.svg'
const img6 = '/images/b8aac3be19cfc6fc0f611d1b1619fee7c37540c3.svg'
const img7 = '/images/d4f239c23d56d3678752838200cd7d2d390d6d93.svg'
const img8 = '/images/965839aa7167e96b495eeae16f45e7945e3486cf.svg'
const img9 = '/images/199799e4f40c7d842fa7e020f9943c0e61d36290.svg'
const imgIcon1 = '/images/ff251bb83ea0bbc843c095b44060309438e7a697.svg'

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

// Social login components
interface ButtonSocialsProps {
  label?: boolean
  label1?: string
  variant?:
    | 'instagram'
    | 'apple'
    | 'facebook'
    | 'google'
    | 'linkedin'
    | 'slack'
    | 'github'
  onClick?: () => void
}

function ButtonSocials({
  label = true,
  label1 = 'Login with Apple',
  variant = 'apple',
  onClick,
}: ButtonSocialsProps) {
  if (variant === 'google') {
    return (
      <button
        onClick={onClick}
        className='bg-white box-border content-stretch flex gap-2 items-center justify-center p-[16px] relative rounded-[8px] size-full border border-[#f4f4f4] hover:shadow-sm transition-shadow'
      >
        <div className='relative shrink-0 size-4'>
          <img
            alt='Google'
            className='block max-w-none size-full'
            src={imgLogo}
          />
        </div>
        <div className="font-['Inter'] font-semibold text-[#363636] text-[14px] text-nowrap">
          Login with Google
        </div>
      </button>
    )
  }
  return (
    <button
      onClick={onClick}
      className='bg-black box-border content-stretch flex gap-2 items-center justify-center p-[16px] relative rounded-[8px] size-full hover:bg-gray-800 transition-colors'
    >
      <div className='h-4 relative shrink-0 w-[13.477px]'>
        <img
          alt='Apple'
          className='block max-w-none size-full'
          src={imgLogo1}
        />
      </div>
      {label && (
        <div className="font-['Inter'] font-semibold text-[14px] text-nowrap text-white">
          {label1}
        </div>
      )}
    </button>
  )
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
    <div className='bg-[#edf3ff] content-stretch flex items-center justify-start relative size-full min-h-screen'>
      <div className='basis-0 bg-white box-border content-stretch flex flex-col grow h-full min-h-[982px] items-center justify-between max-w-[750px] min-w-px overflow-clip px-[100px] py-16 relative shrink-0'>
        <div className='content-stretch flex flex-col gap-16 items-center justify-start relative shrink-0'>
          <div className='content-stretch flex flex-col gap-[6.437px] h-[45px] items-center justify-center relative shrink-0 w-[143.372px]'>
            <div className='h-[45px] overflow-clip relative shrink-0 w-[143.372px]'>
              <div className='absolute bottom-[0.13%] left-[76.39%] right-[0.1%] top-0'>
                <img
                  alt=''
                  className='block max-w-none size-full'
                  src={imgIcon}
                />
              </div>
              <div className='absolute bottom-[21.63%] left-0 right-[19.36%] top-[35.85%]'>
                <img
                  alt=''
                  className='block max-w-none size-full'
                  src={imgText}
                />
              </div>
            </div>
          </div>
          <div className='content-stretch flex flex-col gap-6 items-start justify-start relative shrink-0'>
            <div className='content-stretch flex flex-col gap-1 items-start justify-start leading-[0] not-italic relative shrink-0 w-[500px]'>
              <div className="font-['Inter'] font-semibold relative shrink-0 text-[#363636] text-[18px] w-full">
                <p className='leading-[1.5]'>Log In</p>
              </div>
              <div className="font-['Inter'] font-normal relative shrink-0 text-[#868686] text-[14px] w-full">
                <p className='leading-[1.5]'>
                  Welcome back! Please log in to continue.
                </p>
              </div>
            </div>
            <div className='content-stretch flex flex-col gap-6 items-start justify-start relative shrink-0 w-[500px]'>
              <div className='content-stretch flex flex-col gap-4 items-start justify-start relative shrink-0 w-full'>
                <ButtonSocials variant='google' onClick={handleGoogleLogin} />
                <ButtonSocials onClick={handleAppleLogin} />
              </div>
              <div className='content-stretch flex gap-2.5 items-center justify-center relative shrink-0 w-full'>
                <div className='basis-0 grow h-0 min-h-px min-w-px relative shrink-0'>
                  <div className='absolute bottom-0 left-0 right-0 top-[-1px]'>
                    <img
                      alt=''
                      className='block max-w-none size-full'
                      src={imgDivider}
                    />
                  </div>
                </div>
                <div className="font-['Inter'] font-normal text-[#868686] text-[14px] text-nowrap">
                  <p className='leading-[1.5] whitespace-pre'>OR</p>
                </div>
                <div className='basis-0 grow h-0 min-h-px min-w-px relative shrink-0'>
                  <div className='absolute bottom-0 left-0 right-0 top-[-1px]'>
                    <img
                      alt=''
                      className='block max-w-none size-full'
                      src={imgDivider}
                    />
                  </div>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  const values = {
                    email: formData.get('email') as string,
                    password: formData.get('password') as string,
                    rememberMe: formData.get('rememberMe') === 'on',
                  }
                  handleSubmit(values)
                }}
                className='content-stretch flex flex-col gap-4 items-start justify-start relative shrink-0 w-full'
              >
                {/* Email Field */}
                <div className='content-stretch flex flex-col items-start justify-start relative shrink-0 w-full'>
                  <div className='content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0 w-full'>
                    <div className='box-border content-stretch flex items-center justify-center px-2 py-0 relative shrink-0 w-full'>
                      <div className="basis-0 font-['Inter'] font-semibold grow text-[#868686] text-[14px] text-nowrap">
                        <p className='leading-[1.5] overflow-ellipsis overflow-hidden'>
                          Email
                        </p>
                      </div>
                    </div>
                    <div className='bg-white box-border content-stretch flex gap-14 h-[42px] items-center justify-start p-[16px] relative rounded-[6px] shrink-0 w-full border border-[#d9d9d9] focus-within:border-[#383ad8] transition-colors'>
                      <div className='basis-0 content-stretch flex gap-2 grow items-center justify-start min-h-px min-w-px relative shrink-0'>
                        <input
                          name='email'
                          type='email'
                          placeholder='name@email.com'
                          required
                          className="basis-0 font-['Inter'] font-normal grow text-[#363636] text-[16px] bg-transparent border-none outline-none placeholder-[#d9d9d9]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div className='content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full'>
                  <div className='content-stretch flex flex-col items-start justify-start relative shrink-0 w-full'>
                    <div className='content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0 w-full'>
                      <div className='box-border content-stretch flex items-center justify-center px-2 py-0 relative shrink-0 w-full'>
                        <div className="basis-0 font-['Inter'] font-semibold grow text-[#868686] text-[14px] text-nowrap">
                          <p className='leading-[1.5] overflow-ellipsis overflow-hidden'>
                            Password
                          </p>
                        </div>
                      </div>
                      <div className='bg-white box-border content-stretch flex gap-14 h-[42px] items-center justify-start p-[16px] relative rounded-[6px] shrink-0 w-full border border-[#d9d9d9] focus-within:border-[#383ad8] transition-colors'>
                        <div className='basis-0 content-stretch flex gap-2 grow items-center justify-start min-h-px min-w-px relative shrink-0'>
                          <input
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter password'
                            required
                            className="basis-0 font-['Inter'] font-normal grow text-[#363636] text-[16px] bg-transparent border-none outline-none placeholder-[#d9d9d9]"
                          />
                          <div
                            className='relative shrink-0 size-[18px] cursor-pointer'
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <EyeSlash />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='content-stretch flex items-center justify-between relative shrink-0 w-full'>
                    <div className='basis-0 content-stretch flex grow items-start justify-start min-h-px min-w-px relative shrink-0'>
                      <div className='basis-0 content-stretch flex gap-2 grow items-center justify-start min-h-px min-w-px relative shrink-0'>
                        <div className='relative shrink-0 size-4'>
                          <input
                            type='checkbox'
                            name='rememberMe'
                            className='size-4 rounded border-[#d9d9d9] text-[#383ad8] focus:ring-[#383ad8]'
                          />
                        </div>
                        <div className="basis-0 font-['Inter'] font-normal grow text-[#363636] text-[16px]">
                          <p className='leading-[1.5]'>Remember me</p>
                        </div>
                      </div>
                    </div>
                    <button
                      type='button'
                      className="font-['Inter'] font-semibold text-[#383ad8] text-[14px] text-nowrap hover:underline"
                    >
                      <p className='leading-[1.5] whitespace-pre'>
                        Forgot Password?
                      </p>
                    </button>
                  </div>
                </div>

                {/* Error Alert */}
                {isError && (
                  <div className='w-full'>
                    <Alert variant='destructive'>{alertMessage}</Alert>
                  </div>
                )}

                {/* Login Button and Sign Up Link */}
                <div className='content-stretch flex flex-col gap-4 items-start justify-start relative shrink-0 w-full'>
                  <button
                    type='submit'
                    disabled={isLoading}
                    className='bg-[#383ad8] box-border content-stretch flex h-[42px] items-center justify-center p-[16px] relative rounded-[6px] shrink-0 w-full hover:bg-[#2f32c4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                  >
                    <div className="font-['Inter'] font-semibold text-white text-[14px] text-nowrap">
                      {isLoading ? 'Logging in...' : 'Login'}
                    </div>
                  </button>
                  <div className='content-stretch flex gap-1 items-start justify-start relative shrink-0'>
                    <div className="font-['Inter'] font-normal text-[#868686] text-[14px] text-nowrap">
                      <p className='leading-[1.5]'>
                        <span>Don't have an account? </span>
                        <button
                          type='button'
                          onClick={navigateToSignUp}
                          className="font-['Inter'] font-semibold text-[#383ad8] hover:underline"
                        >
                          Sign up
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='content-stretch flex flex-col gap-2 items-center justify-center relative shrink-0 w-full'>
          <div className="font-['Inter'] font-normal text-[#868686] text-[14px] text-nowrap">
            <p className='leading-[1.5] whitespace-pre'>
              © 2024 Powered by You_Source
            </p>
          </div>
        </div>
      </div>

      {/* Right side decorative panel */}
      <div className='content-stretch flex gap-2.5 h-full min-h-[982px] isolate items-center justify-start overflow-clip relative shrink-0 w-[762px]'>
        <div className='absolute bottom-[110px] content-stretch flex flex-col gap-1 items-start justify-start left-1/2 text-[#363636] text-center translate-x-[-50%] w-[370px] z-[4]'>
          <div className="font-['Inter'] font-semibold relative shrink-0 text-[24px] w-full">
            <p className='leading-[normal]'>Turn your idea to reality</p>
          </div>
          <div className="font-['Inter'] font-normal relative shrink-0 text-[14px] w-full">
            <p className='leading-[1.5]'>
              Consistent quality and experience across all platforms.
            </p>
          </div>
        </div>

        {/* Chart components - simplified for now */}
        <div className='absolute contents inset-[19.49%_8.14%_30.3%_8.01%] z-[3]'>
          <div className='absolute bg-white box-border content-stretch flex flex-col gap-[16.599px] inset-[38.72%_8.14%_30.3%_32.41%] isolate items-start justify-start p-[16.598px] rounded-[8.299px] shadow-[0px_4px_24px_0px_rgba(0,1,116,0.08)]'>
            <div className='content-stretch flex items-start justify-between relative shrink-0 w-full z-[3]'>
              <div className='content-stretch flex flex-col gap-[2.766px] items-start justify-start relative shrink-0 text-nowrap'>
                <div className="font-['Inter'] font-semibold relative shrink-0 text-[#363636] text-[12.45px]">
                  <p className='leading-[1.5] text-nowrap whitespace-pre'>
                    Summary
                  </p>
                </div>
                <div className="font-['Inter'] font-normal relative shrink-0 text-[#868686] text-[9.68px]">
                  <p className='leading-[1.5] text-nowrap whitespace-pre'>
                    Rewards
                  </p>
                </div>
              </div>
            </div>
            <div className='h-[230px] relative shrink-0 w-full z-[2]'>
              <img
                alt='Chart'
                className='block max-w-none size-full object-contain'
                src={img6}
              />
            </div>
          </div>
          <div className='absolute bg-white box-border content-stretch flex flex-col gap-[16.599px] inset-[19.49%_32.55%_49.52%_8.01%] isolate items-start justify-start p-[16.598px] rounded-[8.299px] shadow-[0px_4px_24px_0px_rgba(0,1,116,0.08)]'>
            <div className='content-stretch flex items-start justify-between relative shrink-0 w-full z-[3]'>
              <div className='content-stretch flex flex-col gap-[2.766px] items-start justify-start relative shrink-0 text-nowrap'>
                <div className="font-['Inter'] font-semibold relative shrink-0 text-[#363636] text-[12.45px]">
                  <p className='leading-[1.5] text-nowrap whitespace-pre'>
                    Summary
                  </p>
                </div>
                <div className="font-['Inter'] font-normal relative shrink-0 text-[#868686] text-[9.68px]">
                  <p className='leading-[1.5] text-nowrap whitespace-pre'>
                    Rewards
                  </p>
                </div>
              </div>
            </div>
            <div className='h-[230px] relative shrink-0 w-full z-[2]'>
              <img
                alt='Chart'
                className='block max-w-none size-full object-contain'
                src={img9}
              />
            </div>
          </div>
        </div>

        {/* Background decorative element */}
        <div className='absolute flex inset-[-27.61%_-24.13%_-36.52%_-68.37%] items-center justify-center z-[2]'>
          <div className='flex-none h-[1309.72px] rotate-[26.763deg] w-[982.31px]'>
            <div className='relative size-full'>
              <img
                alt=''
                className='block max-w-none size-full'
                src={imgIcon1}
              />
            </div>
          </div>
        </div>
        <div className='basis-0 grow h-full min-h-px min-w-px shrink-0 z-[1]' />
      </div>
    </div>
  )
}

export default Login
