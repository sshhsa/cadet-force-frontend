'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/lib/store/authStore';

export default function Home() {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  useEffect(() => {
    router.replace(token ? '/athletes' : '/login');
  }, [token, router]);

  return null;
}
