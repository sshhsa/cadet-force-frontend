import type { Sport } from '@/types/athlete';

export const SPORTS: Sport[] = [
  'sambo',
  'thai-boxing',
  'athletics',
  'football',
  'kickboxing',
  'judo',
  'fpv-drones',
  'basketball',
  'boxing',
  'volleyball',
  'kettlebell',
  'table-tennis',
  'swimming',
  'hand-to-hand',
  'thai-boxing-kickboxing',
  'chess',
];

export const SPORT_LABELS: Record<Sport, string> = {
  sambo: 'Самбо',
  'thai-boxing': 'Тайський бокс',
  athletics: 'Легка атлетика',
  football: 'Футбол',
  kickboxing: 'Кікбоксинг',
  judo: 'Дзюдо',
  'fpv-drones': 'FPV-спорт (дрони)',
  basketball: 'Баскетбол',
  boxing: 'Бокс',
  volleyball: 'Волейбол',
  kettlebell: 'Гирьовий спорт',
  'table-tennis': 'Настільний теніс',
  swimming: 'Плавання',
  'hand-to-hand': 'Рукопашний бій',
  'thai-boxing-kickboxing': 'Таїландський бокс, кікбоксинг',
  chess: 'Шахи',
};
