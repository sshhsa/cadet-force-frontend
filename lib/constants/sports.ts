import type { Sport } from '@/types/athlete';

export const SPORTS: Sport[] = [
  'sambo',
  'thai-boxing',
  'athletics',
  'football',
  'kickboxing',
  'judo',
];

export const SPORT_LABELS: Record<Sport, string> = {
  sambo: 'Самбо',
  'thai-boxing': 'Тайський бокс',
  athletics: 'Легка атлетика',
  football: 'Футбол',
  kickboxing: 'Кікбоксинг',
  judo: 'Дзюдо',
};
