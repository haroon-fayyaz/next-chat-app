'use client'
import Register from '@/components/Register'
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function RegisterPage() {
  useAuthRedirect(false);

  return <Register />
}
