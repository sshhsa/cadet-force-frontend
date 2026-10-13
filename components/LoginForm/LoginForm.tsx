'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import { loginUser } from '@/lib/api/auth';
import { getErrorMessage } from '@/lib/api/getErrorMessage';
import { useAuthStore } from '@/lib/store/authStore';
import type { LoginPayload } from '@/types/auth';

import css from './LoginForm.module.css';

const schema = Yup.object({
  email: Yup.string().trim().email('Некоректний email').required("Обов'язкове поле"),
  password: Yup.string().required("Обов'язкове поле"),
});

const initialValues: LoginPayload = { email: '', password: '' };

export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (values: LoginPayload) => {
    try {
      const { token, user } = await loginUser({ ...values, email: values.email.trim() });
      setAuth(token, user);
      router.push('/athletes');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
      {({ errors, touched, isSubmitting }) => (
        <Form className={css.form} noValidate>
          <h1 className={css.title}>Вхід</h1>

          <div className={css.field}>
            <label className={css.label} htmlFor="login-email">
              Email*
            </label>
            <Field
              id="login-email"
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
            <label className={css.label} htmlFor="login-password">
              Пароль*
            </label>
            <div className={css.passwordField}>
              <Field
                id="login-password"
                name="password"
                type={isPasswordVisible ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="********"
                className={`${css.input} ${css.passwordInput}`}
                aria-invalid={Boolean(touched.password && errors.password)}
              />
              <button
                className={css.passwordToggle}
                type="button"
                aria-label={isPasswordVisible ? 'Приховати пароль' : 'Показати пароль'}
                aria-controls="login-password"
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
            {isSubmitting ? 'Вхід...' : 'Увійти'}
          </button>

          <p className={css.switchText}>
            Немає акаунту? <Link href="/register">Зареєструватися</Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}
