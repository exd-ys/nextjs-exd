'use client'
import MainLayout from '../(main-layout)/layout'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}
