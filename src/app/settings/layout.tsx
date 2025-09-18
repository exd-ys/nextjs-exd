'use client'
import MainLayout from '../(main-layout)/layout'

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}
