'use client'
import MainLayout from '../(main-layout)/layout'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}
