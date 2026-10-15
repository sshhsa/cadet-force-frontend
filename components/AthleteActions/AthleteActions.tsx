'use client';

import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

import ConfirmDialog from '@/components/ConfirmDialog/ConfirmDialog';
import { getErrorMessage } from '@/lib/api/getErrorMessage';
import { useDeleteAthlete } from '@/lib/hooks/useDeleteAthlete';
import type { Athlete } from '@/types/athlete';

import css from './AthleteActions.module.css';

interface AthleteActionsProps {
  athlete: Athlete;
}

export default function AthleteActions({ athlete }: AthleteActionsProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { mutateAsync: deleteAthlete, isPending } = useDeleteAthlete();

  const handleDelete = async () => {
    try {
      await deleteAthlete(athlete._id);
      toast.success('Спортсмена видалено');
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className={css.actions}>
      <Link
        href={`/athletes/${athlete._id}/edit`}
        className={css.actionButton}
        aria-label={`Редагувати ${athlete.name}`}
        title="Редагувати"
      >
        <svg className={css.icon} viewBox="0 0 24 24">
          <use href="/sprite.svg#icon-edit" />
        </svg>
      </Link>

      <button
        type="button"
        className={`${css.actionButton} ${css.danger}`}
        aria-label={`Видалити ${athlete.name}`}
        title="Видалити"
        onClick={() => setIsConfirmOpen(true)}
      >
        <svg className={css.icon} viewBox="0 0 24 24">
          <use href="/sprite.svg#icon-trash" />
        </svg>
      </button>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Видалити спортсмена?"
        message={`Ви дійсно хочете видалити «${athlete.name}»? Цю дію не можна скасувати.`}
        confirmLabel="Видалити"
        confirmLoadingLabel="Видалення..."
        isLoading={isPending}
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
}
