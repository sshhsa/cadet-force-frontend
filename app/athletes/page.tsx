'use client';

import { useMemo, useState } from 'react';

import PageHeader from '@/components/PageHeader/PageHeader';
import AthleteFilters, { type AthleteView } from '@/components/AthleteFilters/AthleteFilters';
import AthleteTable from '@/components/AthleteTable/AthleteTable';
import AthleteTile from '@/components/AthleteTile/AthleteTile';
import { getErrorMessage } from '@/lib/api/getErrorMessage';
import { useAthletes } from '@/lib/hooks/useAthletes';
import type { Sport } from '@/types/athlete';

import css from './page.module.css';

export default function AthletesPage() {
  const [search, setSearch] = useState('');
  const [sport, setSport] = useState<Sport | ''>('');
  const [course, setCourse] = useState<number | ''>('');
  const [view, setView] = useState<AthleteView>('tile');

  const { data: athletes, isLoading, isError, error } = useAthletes();

  const filteredAthletes = useMemo(() => {
    if (!athletes) return [];

    const normalizedSearch = search.trim().toLowerCase();

    return athletes.filter((athlete) => {
      const matchesSearch = normalizedSearch
        ? athlete.name.toLowerCase().includes(normalizedSearch)
        : true;
      const matchesSport = sport ? athlete.sport === sport : true;
      const matchesCourse = course ? athlete.course === course : true;

      return matchesSearch && matchesSport && matchesCourse;
    });
  }, [athletes, search, sport, course]);

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

          {isLoading && <p className={css.status}>Завантаження...</p>}

          {isError && <p className={css.statusError}>{getErrorMessage(error)}</p>}

          {!isLoading && !isError && filteredAthletes.length === 0 && (
            <p className={css.status}>Спортсменів не знайдено.</p>
          )}

          {!isLoading &&
            !isError &&
            filteredAthletes.length > 0 &&
            (view === 'tile' ? (
              <AthleteTile athletes={filteredAthletes} />
            ) : (
              <AthleteTable athletes={filteredAthletes} />
            ))}
        </div>
      </main>
    </>
  );
}
