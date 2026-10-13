import { isAxiosError } from 'axios';

const MESSAGES_BY_TEXT: Record<string, string> = {
  'Email or password is wrong': 'Невірний email або пароль',
  'Email is not verified': 'Підтвердіть email — перевірте пошту для активації акаунту',
  'Email in use': 'Користувач з таким email вже існує',
  'User not found': 'Користувача не знайдено',
};

const MESSAGES_BY_STATUS: Record<number, string> = {
  400: 'Перевірте правильність заповнення полів',
  401: 'Помилка авторизації',
  403: 'Доступ заборонено',
  404: 'Не знайдено',
  409: 'Конфлікт даних',
};

export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const backendMessage = error.response?.data?.message as string | undefined;
    if (backendMessage && MESSAGES_BY_TEXT[backendMessage]) {
      return MESSAGES_BY_TEXT[backendMessage];
    }
    const status = error.response?.status;
    if (status && MESSAGES_BY_STATUS[status]) return MESSAGES_BY_STATUS[status];
    if (!error.response) return 'Сервер недоступний, спробуйте пізніше';
  }
  return 'Щось пішло не так, спробуйте ще раз';
};
