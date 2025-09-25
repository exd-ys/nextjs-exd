'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Check } from 'lucide-react'
import { useState } from 'react'

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingPlan {
  name: string
  price: number
  period: string
  description: string
  features: PricingFeature[]
  isPopular?: boolean
  buttonText: string
  buttonVariant: 'default' | 'outline'
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Free',
    price: 0,
    period: 'mo',
    description: 'Perfect for individuals or small teams getting started.',
    features: [
      { text: '5 Team Members', included: true },
      { text: '10 GB Storage', included: true },
      { text: 'Basic Support', included: true },
      { text: 'Access to Core Features', included: true },
    ],
    buttonText: 'Get Started',
    buttonVariant: 'default',
  },
  {
    name: 'Pro',
    price: 29,
    period: 'mo',
    description: 'Perfect for individuals or small teams getting started.',
    features: [
      { text: 'Unlimited Team Members', included: true },
      { text: '100 GB Storage', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Access to Core Features', included: true },
      { text: 'Team Collaboration Tools', included: true },
      { text: 'Access to All Integrations', included: true },
    ],
    isPopular: true,
    buttonText: 'Start Pro Trial',
    buttonVariant: 'default',
  },
  {
    name: 'Enterprise',
    price: 99,
    period: 'mo',
    description: 'Perfect for individuals or small teams getting started.',
    features: [
      { text: 'Unlimited Everything', included: true },
      { text: '1 TB Storage', included: true },
      { text: 'Dedicated Support', included: true },
      { text: 'Access to Core Features', included: true },
      { text: 'Team Collaboration Tools', included: true },
      { text: 'Admin Controls & Security Features', included: true },
      { text: 'Custom Integrations', included: true },
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'default',
  },
]

export default function BillingPaymentsPage() {
  const [billingPeriod, setBillingPeriod] = useState('monthly')

  return (
    <div className='min-h-screen bg-background'>
      {/* Header Section */}
      <div className='container mx-auto px-6 py-12'>
        <div className='text-center max-w-2xl mx-auto mb-16'>
          <h1 className='text-4xl font-semibold text-foreground mb-4'>
            Subscription Plans
          </h1>
          <p className='text-lg text-muted-foreground mb-8'>
            Scale your streaming experience with our flexible pricing options
          </p>

          {/* Billing Toggle */}
          <ToggleGroup
            type='single'
            value={billingPeriod}
            onValueChange={(value) => value && setBillingPeriod(value)}
            variant='outline'
            className='mx-auto'
          >
            <ToggleGroupItem value='monthly'>Monthly</ToggleGroupItem>
            <ToggleGroupItem value='yearly'>Yearly</ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Pricing Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16'>
          {pricingPlans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative ${
                plan.isPopular ? 'border-primary shadow-lg scale-105' : ''
              }`}
            >
              {plan.isPopular && (
                <div className='absolute -top-3 left-1/2 transform -translate-x-1/2'>
                  <Badge variant='default' className='px-4 py-1'>
                    Popular
                  </Badge>
                </div>
              )}

              <CardHeader className='text-center pb-8'>
                <div className='flex items-center justify-center mb-4'>
                  <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center'>
                    <div className='w-6 h-6 rounded-full bg-primary'></div>
                  </div>
                  <CardTitle className='ml-4 text-2xl'>{plan.name}</CardTitle>
                </div>

                <div className='flex items-baseline justify-center mb-4'>
                  <span className='text-4xl font-semibold'>${plan.price}</span>
                  <span className='text-muted-foreground ml-1'>
                    /{plan.period}
                  </span>
                </div>

                <CardDescription className='text-center'>
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className='px-6'>
                <div className='space-y-4'>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className='flex items-start'>
                      <div className='flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5'>
                        <Check className='w-4 h-4 text-primary' />
                      </div>
                      <span className='text-sm text-foreground'>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className='flex flex-col space-y-3 px-6 pb-6'>
                <Button
                  variant={plan.buttonVariant}
                  className='w-full'
                  size='lg'
                >
                  {plan.buttonText}
                </Button>
                <Button variant='ghost' size='sm' className='w-full'>
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Footer CTA */}
        <div className='text-center max-w-2xl mx-auto'>
          <div className='h-px bg-border mb-8'></div>
          <p className='text-muted-foreground mb-6'>
            Need a custom solution? We offer enterprise packages with dedicated
            support.
          </p>
          <Button variant='outline' size='lg'>
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  )
}
