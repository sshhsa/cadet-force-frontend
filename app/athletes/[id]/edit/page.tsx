'use client';

import { useParams } from 'next/navigation';

import PageHeader from '@/components/PageHeader/PageHeader';
import AthleteForm from '@/components/AthleteForm/AthleteForm';
import { getErrorMessage } from '@/lib/api/getErrorMessage';
import { useAthlete } from '@/lib/hooks/useAthlete';

import css from './page.module.css';

export default function EditAthletePage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data: athlete, isLoading, isError, error } = useAthlete(id);

  return (
    <>
      <PageHeader />
      <main className={css.main}>
        <div className="container">
          <div className={css.titleBlock}>
            <h1 className={css.title}>Редагувати спортсмена</h1>
            <div className={css.divider} />
            <p className={css.subtitle}>Оновіть дані спортсмена</p>
          </div>

          {isLoading && <p className={css.status}>Завантаження...</p>}

          {isError && <p className={css.statusError}>{getErrorMessage(error)}</p>}

          {athlete && <AthleteForm athlete={athlete} />}
        </div>
      </main>
    </>
  );
}
