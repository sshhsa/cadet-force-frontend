const dateFormatter = new Intl.DateTimeFormat('uk-UA', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

/** Формат для виводу користувачу: 01.01.2008 */
export const formatDate = (isoString: string | null | undefined): string => {
  if (!isoString) return '—';

  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '—';

  return dateFormatter.format(date);
};

/** Формат для value <input type="date">: 2008-01-01 */
export const toDateInputValue = (isoString: string | null | undefined): string => {
  if (!isoString) return '';

  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '';

  return date.toISOString().slice(0, 10);
};
