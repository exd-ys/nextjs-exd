import { Metadata } from 'next'

import Home from '../home/Home'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Page() {
  return <Home />
}
