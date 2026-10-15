'use client';

import Link from 'next/link';

import { SPORTS, SPORT_LABELS } from '@/lib/constants/sports';
import { useAuthStore } from '@/lib/store/authStore';
import type { Sport } from '@/types/athlete';

import css from './AthleteFilters.module.css';

export type AthleteView = 'table' | 'tile';

interface AthleteFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  sport: Sport | '';
  onSportChange: (value: Sport | '') => void;
  course: number | '';
  onCourseChange: (value: number | '') => void;
  view: AthleteView;
  onViewChange: (value: AthleteView) => void;
  onReset: () => void;
}

export default function AthleteFilters({
  search,
  onSearchChange,
  sport,
  onSportChange,
  course,
  onCourseChange,
  view,
  onViewChange,
  onReset,
}: AthleteFiltersProps) {
  const token = useAuthStore((state) => state.token);

  return (
    <div className={css.bar}>
      <label className={css.searchField}>
        <svg className={css.icon} viewBox="0 0 24 24">
          <use href="/sprite.svg#icon-search" />
        </svg>
        <input
          type="text"
          placeholder="Пошук за ПІБ..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className={css.searchInput}
        />
      </label>

      <label className={css.selectField}>
        <svg className={css.icon} viewBox="0 0 24 24">
          <use href="/sprite.svg#icon-activity" />
        </svg>
        <select
          value={sport}
          onChange={(event) => onSportChange(event.target.value as Sport | '')}
          className={css.select}
        >
          <option value="">Фільтр за видом спорту</option>
          {SPORTS.map((item) => (
            <option key={item} value={item}>
              {SPORT_LABELS[item]}
            </option>
          ))}
        </select>
        <svg className={css.chevron} viewBox="0 0 24 24">
          <use href="/sprite.svg#icon-chevron-down" />
        </svg>
      </label>

      <label className={css.selectField}>
        <svg className={css.icon} viewBox="0 0 24 24">
          <use href="/sprite.svg#icon-graduation-cap" />
        </svg>
        <select
          value={course}
          onChange={(event) =>
            onCourseChange(event.target.value ? Number(event.target.value) : '')
          }
          className={css.select}
        >
          <option value="">Фільтр за курсом</option>
          {[1, 2, 3, 4].map((item) => (
            <option key={item} value={item}>
              {item} курс
            </option>
          ))}
        </select>
        <svg className={css.chevron} viewBox="0 0 24 24">
          <use href="/sprite.svg#icon-chevron-down" />
        </svg>
      </label>

      <button type="button" className={css.resetButton} onClick={onReset}>
        <svg className={css.icon} viewBox="0 0 24 24">
          <use href="/sprite.svg#icon-refresh" />
        </svg>
        Скинути фільтри
      </button>

      <div className={css.viewToggle} role="group" aria-label="Режим відображення">
        <button
          type="button"
          className={`${css.viewButton} ${view === 'table' ? css.viewButtonActive : ''}`}
          onClick={() => onViewChange('table')}
        >
          <svg className={css.icon} viewBox="0 0 24 24">
            <use href="/sprite.svg#icon-list" />
          </svg>
          Таблиця
        </button>
        <button
          type="button"
          className={`${css.viewButton} ${view === 'tile' ? css.viewButtonActive : ''}`}
          onClick={() => onViewChange('tile')}
        >
          <svg className={css.icon} viewBox="0 0 24 24">
            <use href="/sprite.svg#icon-grid" />
          </svg>
          Плитка
        </button>
      </div>

      {token && (
        <Link href="/athletes/new" className={css.addButton}>
          <svg className={css.icon} viewBox="0 0 24 24">
            <use href="/sprite.svg#icon-plus" />
          </svg>
          Додати спортсмена
        </Link>
      )}
    </div>
  );
}
