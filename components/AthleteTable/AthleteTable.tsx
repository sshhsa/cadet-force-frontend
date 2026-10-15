import AthleteAvatar from '@/components/AthleteAvatar/AthleteAvatar';
import { SPORT_LABELS } from '@/lib/constants/sports';
import type { Athlete } from '@/types/athlete';

import css from './AthleteTable.module.css';

interface AthleteTableProps {
  athletes: Athlete[];
}

export default function AthleteTable({ athletes }: AthleteTableProps) {
  return (
    <div className={css.wrapper}>
      <table className={css.table}>
        <thead>
          <tr>
            <th>Фото</th>
            <th>ПІБ</th>
            <th>Підрозділ</th>
            <th>Курс</th>
            <th>Вид спорту</th>
            <th>Розряд</th>
            <th>Досягнення</th>
          </tr>
        </thead>
        <tbody>
          {athletes.map((athlete) => (
            <tr key={athlete._id}>
              <td>
                <AthleteAvatar src={athlete.avatarURL} name={athlete.name} size={48} />
              </td>
              <td className={css.name}>{athlete.name}</td>
              <td>{athlete.department}</td>
              <td>{athlete.course}</td>
              <td>{SPORT_LABELS[athlete.sport]}</td>
              <td>{athlete.rank}</td>
              <td>{athlete.achievements || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
