'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!token) {
      router.replace('/login');
      return;
    }
    // Навмисний client-only mount-check: токен читається з localStorage,
    // тож на сервері його нема. Чекаємо монтування на клієнті, перш ніж
    // показувати дочірній контент, щоб уникнути SSR/CSR neузгодження.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsChecked(true);
  }, [token, router]);

  if (!isChecked) return null;

  return <>{children}</>;
}
