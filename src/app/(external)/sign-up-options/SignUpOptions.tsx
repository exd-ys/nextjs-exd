'use client'

import { Button } from '@/components/ui/button'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'

const SignUpOptions: NextPage = () => {
  const router = useRouter()

  return (
    <div className="grid min-h-svh lg:grid-cols-2 font-['Inter',sans-serif]">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            {/* Logo at top center */}
            <div className="flex flex-col items-center mb-6">
              <img src="/images/ys-new-logo.png" alt="logo" className="h-[45px] w-auto mb-2" />
            </div>
            {/* Sign Up label and sublabel aligned left */}
            <div className="flex flex-col gap-1 items-start mb-6">
              <h1 className="text-[18px] font-semibold text-[#363636]">Sign Up</h1>
              <div className="text-[14px] text-[#868686] font-normal">
                Already have an account? <a href="/login" className="text-[#383ad8] font-semibold">Log in</a>
              </div>
            </div>
            {/* SSO Buttons */}
            <div className="flex flex-col gap-3 mb-4 w-full">
              <Button
                variant='outline'
                type='button'
                className='w-full flex items-center justify-center border border-[#e5e5e5] bg-white text-[#363636] !text-[14px] font-semibold h-[42px] cursor-pointer'
              >
                <img alt='Google' className='mr-2 h-4 w-4' src='/images/d5fb6718c343ea0851f29d6aa8bbc4cf69c005b6.svg' />
                Sign up with Google
              </Button>
              <Button
                variant='outline'
                type='button'
                className='w-full flex items-center justify-center border border-[#e5e5e5] bg-[#18181b] text-[white] !text-[14px] font-semibold h-[42px] cursor-pointer'
              >
                <img alt='Apple' className='mr-2 h-4 w-4' src='/images/5a2bb2f0ab7cc80d56e630d0ea5fbacf7e74371c.svg' />
                Sign up with Apple
              </Button>
            </div>
            {/* Divider */}
            <div className="flex items-center w-full my-2">
              <div className="flex-1 h-px bg-[#e5e5e5]" />
              <span className="mx-3 text-xs text-[#868686]">OR</span>
              <div className="flex-1 h-px bg-[#e5e5e5]" />
            </div>
            {/* Email sign up button */}
            <Button
              type='button'
              className='w-full h-[42px] bg-[#383ad8] [text-white] text-[14px] font-semibold rounded-[6px] mt-2 cursor-pointer'
              onClick={() => router.push('/sign-up')}
            >
              Sign up with your email
            </Button>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          © 2024 Powered by You_Source
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/images/bg-authentication.png"
          alt="Sign up cover"
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

export default SignUpOptions