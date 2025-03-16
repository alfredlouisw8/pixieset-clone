import { redirect } from 'next/navigation'
import React from 'react'

import Container from '@/components/layout/container'
import { auth } from '@/lib/auth/auth'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect('/')
  }

  return (
    <Container sideBar={true} session={session}>
      {children}
    </Container>
  )
}
