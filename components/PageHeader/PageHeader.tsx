'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { logoutUser } from '@/lib/api/auth';
import { getErrorMessage } from '@/lib/api/getErrorMessage';
import { useAuthStore } from '@/lib/store/authStore';

import css from './PageHeader.module.css';

export default function PageHeader() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const userName = useAuthStore((state) => state.user?.name);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      // бекенд може бути недоступний — все одно виходимо локально
      console.error(getErrorMessage(error));
    } finally {
      clearAuth();
      router.push('/login');
    }
  };

  return (
    <header className={css.header}>
      <div className={`container ${css.inner}`}>
        <div className={css.brand}>
          <span className={css.badge}>
            <Image
              src="/emblem.png"
              alt="Герб Національної академії внутрішніх справ"
              width={44}
              height={44}
              className={css.badgeIcon}
              priority
            />
          </span>
          <div className={css.brandText}>
            <span className={css.brandTitle}>Національна академія</span>
            <span className={css.brandSubtitle}>внутрішніх справ</span>
          </div>
        </div>

        <div className={css.right}>
          <span className={css.motto}>Честь · Знання · Закон</span>
          {userName && <span className={css.userName}>{userName}</span>}
          <button type="button" className={css.logoutButton} onClick={handleLogout}>
            <svg className={css.logoutIcon} viewBox="0 0 24 24">
              <use href="/sprite.svg#icon-logout" />
            </svg>
            Вийти
          </button>
        </div>
      </div>
      <div className={css.goldStripe} />
    </header>
  );
}
