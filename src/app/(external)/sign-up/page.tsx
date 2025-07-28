import { Metadata } from 'next'
import SignUp from './SignUp'

export const metadata: Metadata = {
  title: 'SignUp',
}

export default function Page() {
  return <SignUp />
}
