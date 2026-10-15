/**
 * Витягує число з рядка вагової категорії (працює і зі старими значеннями
 * на кшталт "до 75", "86+", "75 кг", і з новими "75 кг"). Повертає '' якщо
 * число не знайдено (порожнє поле).
 */
export const parseWeightValue = (
  weightCategory: string | null | undefined,
): number | '' => {
  if (!weightCategory) return '';

  const match = weightCategory.match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : '';
};

/** Формат для показу користувачу: 75 -> "75 кг", "75 кг" -> "75 кг", null -> "—" */
export const formatWeight = (weightCategory: string | null | undefined): string => {
  if (!weightCategory) return '—';

  const trimmed = weightCategory.trim();
  return /кг\s*$/i.test(trimmed) ? trimmed : `${trimmed} кг`;
};
