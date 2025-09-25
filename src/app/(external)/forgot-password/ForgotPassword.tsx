'use client'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const ForgotPassword = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Basic email validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess(true)
    } catch (err) {
      setError('Failed to send reset link. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      {/* Left Side - Forgot Password Form */}
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
            <Button
              variant='ghost'
              className='mb-6 text-muted-foreground text-sm flex items-center gap-2 p-0 h-auto'
              onClick={() => router.back()}
            >
              <ArrowLeft className='w-4 h-4' />
              Back
            </Button>

            {success ? (
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col items-center gap-2 text-center'>
                  <div className='w-16 h-16 mx-auto bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center'>
                    <svg
                      className='w-8 h-8 text-green-600 dark:text-green-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  </div>
                  <h2 className='text-2xl font-bold'>Check your email</h2>
                  <p className='text-muted-foreground text-sm text-balance'>
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                </div>

                <div className='grid gap-6'>
                  <Button
                    variant='outline'
                    className='w-full'
                    onClick={() => {
                      setSuccess(false)
                      setEmail('')
                    }}
                  >
                    Send another email
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                <div className='flex flex-col items-center gap-2 text-center'>
                  <h1 className='text-2xl font-bold'>Reset Password</h1>
                  <p className='text-muted-foreground text-sm text-balance'>
                    Enter your email address below, and we'll send you a link to
                    reset your password.
                  </p>
                </div>

                <div className='grid gap-6'>
                  {/* Email Field */}
                  <div className='grid gap-3'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      placeholder='name@email.com'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Error Alert */}
                  {error && <Alert variant='destructive'>{error}</Alert>}

                  {/* Submit Button */}
                  <Button type='submit' className='w-full' disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send reset password link'}
                  </Button>
                </div>

                {/* Help Link */}
                <div className='text-center text-sm'>
                  Are you having trouble?{' '}
                  <Button
                    variant='link'
                    className='h-auto p-0 underline underline-offset-4'
                    onClick={() => {
                      // Handle contact us action
                    }}
                  >
                    Contact us
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
        <div className='text-center text-sm text-muted-foreground'>
          © 2024 Powered by You_Source
        </div>
      </div>
      <div className='bg-muted relative hidden lg:block'>
        <img
          src='/images/bg-authentication.png'
          alt='Forgot password cover'
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

export default ForgotPassword
