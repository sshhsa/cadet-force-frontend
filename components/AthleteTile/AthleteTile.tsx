import { AnimatePresence, motion, type Variants } from 'framer-motion';

import AthleteCard from '@/components/AthleteCard/AthleteCard';
import type { Athlete } from '@/types/athlete';

import css from './AthleteTile.module.css';

interface AthleteTileProps {
  athletes: Athlete[];
}

// Стагер-поява при монтуванні (перший рендер, зміна фільтрів/пошуку) і
// швидке плавне зникнення при виході зі списку — без затримки, щоб картки,
// що залишаються, одразу плавно займали нове місце (layout-анімація нижче).
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
      delay: Math.min(index, 12) * 0.035,
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function AthleteTile({ athletes }: AthleteTileProps) {
  return (
    <div className={css.grid}>
      <AnimatePresence mode="popLayout" initial={false}>
        {athletes.map((athlete, index) => (
          <motion.div
            key={athlete._id}
            layout
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <AthleteCard athlete={athlete} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
