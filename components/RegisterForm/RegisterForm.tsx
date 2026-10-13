'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import { registerUser } from '@/lib/api/auth';
import { getErrorMessage } from '@/lib/api/getErrorMessage';
import type { RegisterPayload } from '@/types/auth';

import css from './RegisterForm.module.css';

const schema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Мінімум 2 символи')
    .max(32, 'Максимум 32 символи')
    .required("Обов'язкове поле"),
  email: Yup.string().trim().email('Некоректний email').required("Обов'язкове поле"),
  password: Yup.string().min(6, 'Мінімум 6 символів').required("Обов'язкове поле"),
});

const initialValues: RegisterPayload = { name: '', email: '', password: '' };

export default function RegisterForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: RegisterPayload, { resetForm }: { resetForm: () => void }) => {
    try {
      await registerUser({ ...values, name: values.name.trim(), email: values.email.trim() });
      toast.success('Реєстрація успішна! Перевірте пошту, щоб підтвердити акаунт.');
      resetForm();
      router.push('/login');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
      {({ errors, touched, isSubmitting }) => (
        <Form className={css.form} noValidate>
          <h1 className={css.title}>Реєстрація</h1>

          <div className={css.field}>
            <label className={css.label} htmlFor="register-name">
              Ім&apos;я*
            </label>
            <Field
              id="register-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Іваненко Олександр"
              className={css.input}
              aria-invalid={Boolean(touched.name && errors.name)}
            />
            <ErrorMessage name="name" component="span" className={css.error} />
          </div>

          <div className={css.field}>
            <label className={css.label} htmlFor="register-email">
              Email*
            </label>
            <Field
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="example@navs.gov.ua"
              className={css.input}
              aria-invalid={Boolean(touched.email && errors.email)}
            />
            <ErrorMessage name="email" component="span" className={css.error} />
          </div>

          <div className={css.field}>
            <label className={css.label} htmlFor="register-password">
              Пароль*
            </label>
            <div className={css.passwordField}>
              <Field
                id="register-password"
                name="password"
                type={isPasswordVisible ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Мінімум 6 символів"
                className={`${css.input} ${css.passwordInput}`}
                aria-invalid={Boolean(touched.password && errors.password)}
              />
              <button
                className={css.passwordToggle}
                type="button"
                aria-label={isPasswordVisible ? 'Приховати пароль' : 'Показати пароль'}
                aria-controls="register-password"
                onClick={() => setIsPasswordVisible((visible) => !visible)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                  {isPasswordVisible && <path d="m3 3 18 18" />}
                </svg>
              </button>
            </div>
            <ErrorMessage name="password" component="span" className={css.error} />
          </div>

          <button className={css.button} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Реєстрація...' : 'Зареєструватися'}
          </button>

          <p className={css.switchText}>
            Вже є акаунт? <Link href="/login">Увійти</Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}
