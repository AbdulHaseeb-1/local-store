import LoginForm from '@/components/auth/Forms/loginForm'
import Login from '@/components/auth/Forms/loginForm'
import { auth } from '@/lib/auth'
import { permanentRedirect, redirect } from 'next/navigation';
import React from 'react'

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    permanentRedirect("/")
  }
  return (
    <div>
      <LoginForm />
    </div>
  )
}
