'use client'
import Register from '@/components/Register'
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

export default function RegisterPage() {
  useAuthRedirect(false);

  return <Register />
}
