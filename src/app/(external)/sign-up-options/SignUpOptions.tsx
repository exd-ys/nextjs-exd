'use client'

import { Button } from '@/components/ui/button'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'

const SignUpOptions: NextPage = () => {
  const router = useRouter()

  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      {/* Left Side - Sign Up Options Form */}
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
            <div className='flex flex-col items-center gap-2 text-center'>
              <h1 className='text-2xl font-bold'>Sign Up</h1>
              <p className='text-muted-foreground text-sm text-balance'>
                Choose how you'd like to create your account.
              </p>
            </div>

            <div className='grid gap-6'>
              {/* SSO Buttons */}
              <div className='flex flex-col gap-3'>
                <Button variant='outline' type='button' className='w-full'>
                  <img
                    alt='Google'
                    className='mr-2 h-4 w-4'
                    src='/images/d5fb6718c343ea0851f29d6aa8bbc4cf69c005b6.svg'
                  />
                  Sign up with Google
                </Button>
                <Button
                  type='button'
                  className='w-full bg-black hover:bg-black/90'
                >
                  <img
                    alt='Apple'
                    className='mr-2 h-4 w-4'
                    src='/images/5a2bb2f0ab7cc80d56e630d0ea5fbacf7e74371c.svg'
                  />
                  Sign up with Apple
                </Button>
              </div>
              {/* Divider */}
              <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                <span className='bg-background text-muted-foreground relative z-10 px-2'>
                  Or continue with
                </span>
              </div>

              {/* Email sign up button */}
              <Button
                type='button'
                className='w-full'
                onClick={() => router.push('/sign-up')}
              >
                Sign up with your email
              </Button>
            </div>

            {/* Login Link */}
            <div className='text-center text-sm'>
              Already have an account?{' '}
              <Button
                variant='link'
                className='h-auto p-0 underline underline-offset-4 mt-6'
                onClick={() => router.push('/login')}
              >
                Log in
              </Button>
            </div>
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

export default SignUpOptions
