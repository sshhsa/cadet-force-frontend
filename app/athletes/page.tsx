'use client';

import { useState } from 'react';

import PageHeader from '@/components/PageHeader/PageHeader';
import AthleteFilters, { type AthleteView } from '@/components/AthleteFilters/AthleteFilters';
import type { Sport } from '@/types/athlete';

import css from './page.module.css';

export default function AthletesPage() {
  const [search, setSearch] = useState('');
  const [sport, setSport] = useState<Sport | ''>('');
  const [course, setCourse] = useState<number | ''>('');
  const [view, setView] = useState<AthleteView>('tile');

  const handleReset = () => {
    setSearch('');
    setSport('');
    setCourse('');
  };

  return (
    <>
      <PageHeader />
      <main className={css.main}>
        <div className="container">
          <div className={css.titleBlock}>
            <h1 className={css.title}>Список спортсменів НАВС</h1>
            <div className={css.divider} />
            <p className={css.subtitle}>
              {view === 'tile'
                ? 'Плитковий вигляд відображення даних'
                : 'Табличний вигляд відображення даних'}
            </p>
          </div>

          <AthleteFilters
            search={search}
            onSearchChange={setSearch}
            sport={sport}
            onSportChange={setSport}
            course={course}
            onCourseChange={setCourse}
            view={view}
            onViewChange={setView}
            onReset={handleReset}
          />

          <div className={css.placeholder}>
            <p>Дані спортсменів буде підʼєднано на наступному кроці.</p>
          </div>
        </div>
      </main>
    </>
  );
}
