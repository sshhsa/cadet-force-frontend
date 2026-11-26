'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/store/authStore';

/**
 * Після перезавантаження сторінки з localStorage відновлюється лише token —
 * сам user (ім'я, email, і головне — id, потрібний для перевірки власності
 * над записами) живе тільки в пам'яті zustand і губиться. Цей компонент
 * нічого не рендерить, а просто підтягує актуального user з /auth/current,
 * коли token є, а user ще не завантажений.
 */
export default function AuthHydrator() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const { data } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    enabled: Boolean(token) && !user,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return null;
}
