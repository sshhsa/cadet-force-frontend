import PageHeader from '@/components/PageHeader/PageHeader';
import AthleteForm from '@/components/AthleteForm/AthleteForm';

import css from './page.module.css';

export default function NewAthletePage() {
  return (
    <>
      <PageHeader />
      <main className={css.main}>
        <div className="container">
          <div className={css.titleBlock}>
            <h1 className={css.title}>Додати спортсмена</h1>
            <div className={css.divider} />
            <p className={css.subtitle}>Заповніть дані для реєстрації нового спортсмена</p>
          </div>

          <AthleteForm />
        </div>
      </main>
    </>
  );
}
