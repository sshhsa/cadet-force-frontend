import AthleteCard from '@/components/AthleteCard/AthleteCard';
import type { Athlete } from '@/types/athlete';

import css from './AthleteTile.module.css';

interface AthleteTileProps {
  athletes: Athlete[];
}

export default function AthleteTile({ athletes }: AthleteTileProps) {
  return (
    <div className={css.grid}>
      {athletes.map((athlete, index) => (
        <AthleteCard key={athlete._id} athlete={athlete} index={index} />
      ))}
    </div>
  );
}
