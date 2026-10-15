import AthleteActions from '@/components/AthleteActions/AthleteActions';
import AthleteAvatar from '@/components/AthleteAvatar/AthleteAvatar';
import { SPORT_LABELS } from '@/lib/constants/sports';
import { formatDate } from '@/lib/utils/formatDate';
import { formatWeight } from '@/lib/utils/weight';
import type { Athlete } from '@/types/athlete';

import css from './AthleteCard.module.css';

interface AthleteCardProps {
  athlete: Athlete;
}

export default function AthleteCard({ athlete }: AthleteCardProps) {
  return (
    <article className={css.card}>
      <div className={css.header}>
        <div className={css.identity}>
          <AthleteAvatar src={athlete.avatarURL} name={athlete.name} size={64} />
          <h3 className={css.name}>{athlete.name}</h3>
        </div>
        <AthleteActions athlete={athlete} />
      </div>

      <div className={css.details}>
        <div className={css.row}>
          <svg className={css.icon} viewBox="0 0 24 24">
            <use href="/sprite.svg#icon-shield" />
          </svg>
          <span className={css.label}>Підрозділ:</span>
          <span className={css.value}>{athlete.department}</span>
        </div>
        <div className={css.row}>
          <svg className={css.icon} viewBox="0 0 24 24">
            <use href="/sprite.svg#icon-graduation-cap" />
          </svg>
          <span className={css.label}>Курс:</span>
          <span className={css.value}>{athlete.course}</span>
        </div>
        <div className={css.row}>
          <svg className={css.icon} viewBox="0 0 24 24">
            <use href="/sprite.svg#icon-activity" />
          </svg>
          <span className={css.label}>Вид спорту:</span>
          <span className={css.value}>{SPORT_LABELS[athlete.sport]}</span>
        </div>
        <div className={css.row}>
          <svg className={css.icon} viewBox="0 0 24 24">
            <use href="/sprite.svg#icon-award" />
          </svg>
          <span className={css.label}>Розряд:</span>
          <span className={css.value}>{athlete.rank}</span>
        </div>
        <div className={css.row}>
          <svg className={css.icon} viewBox="0 0 24 24">
            <use href="/sprite.svg#icon-calendar" />
          </svg>
          <span className={css.label}>Дата народження:</span>
          <span className={css.value}>{formatDate(athlete.birthDate)}</span>
        </div>
        <div className={css.row}>
          <svg className={css.icon} viewBox="0 0 24 24">
            <use href="/sprite.svg#icon-weight" />
          </svg>
          <span className={css.label}>Вагова категорія:</span>
          <span className={css.value}>{formatWeight(athlete.weightCategory)}</span>
        </div>
      </div>

      {athlete.achievements && (
        <div className={css.achievements}>
          <svg className={css.achievementsIcon} viewBox="0 0 24 24">
            <use href="/sprite.svg#icon-trophy" />
          </svg>
          <div>
            <p className={css.achievementsLabel}>Досягнення:</p>
            <p className={css.achievementsText}>{athlete.achievements}</p>
          </div>
        </div>
      )}
    </article>
  );
}
