import { Metadata } from 'next'
import SignUpOptions from './SignUpOptions'

export const metadata: Metadata = {
  title: 'SignUpOptions',
}

export default function Page() {
  return <SignUpOptions />
}
