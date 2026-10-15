'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import AthleteAvatar from '@/components/AthleteAvatar/AthleteAvatar';
import { updateAthleteAvatar } from '@/lib/api/athletes';
import { getErrorMessage } from '@/lib/api/getErrorMessage';
import { useCreateAthlete } from '@/lib/hooks/useCreateAthlete';
import { useUpdateAthlete } from '@/lib/hooks/useUpdateAthlete';
import { SPORTS, SPORT_LABELS } from '@/lib/constants/sports';
import { toDateInputValue } from '@/lib/utils/formatDate';
import type { Athlete, CreateAthletePayload, Sport } from '@/types/athlete';

import css from './AthleteForm.module.css';

const COURSES = [1, 2, 3, 4];

interface AthleteFormValues {
  name: string;
  department: string;
  course: number | '';
  sport: Sport | '';
  rank: string;
  birthDate: string;
  weightCategory: string;
  achievements: string;
}

const getInitialValues = (athlete?: Athlete): AthleteFormValues =>
  athlete
    ? {
        name: athlete.name,
        department: athlete.department,
        course: athlete.course,
        sport: athlete.sport,
        rank: athlete.rank,
        birthDate: toDateInputValue(athlete.birthDate),
        weightCategory: athlete.weightCategory ?? '',
        achievements: athlete.achievements,
      }
    : {
        name: '',
        department: '',
        course: '',
        sport: '',
        rank: '',
        birthDate: '',
        weightCategory: '',
        achievements: '',
      };

const schema = Yup.object({
  name: Yup.string().trim().min(2, 'Мінімум 2 символи').required("Обов'язкове поле"),
  department: Yup.string()
    .trim()
    .min(2, 'Мінімум 2 символи')
    .required("Обов'язкове поле"),
  course: Yup.number()
    .typeError('Оберіть курс')
    .min(1)
    .max(4)
    .required("Обов'язкове поле"),
  sport: Yup.string().oneOf(SPORTS, 'Оберіть вид спорту').required("Обов'язкове поле"),
  rank: Yup.string().trim().required("Обов'язкове поле"),
  birthDate: Yup.date()
    .typeError("Обов'язкове поле")
    .max(new Date(), 'Дата народження не може бути в майбутньому')
    .required("Обов'язкове поле"),
  weightCategory: Yup.string().trim().required("Обов'язкове поле"),
  achievements: Yup.string().trim(),
});

interface AthleteFormProps {
  athlete?: Athlete;
}

export default function AthleteForm({ athlete }: AthleteFormProps) {
  const isEditMode = Boolean(athlete);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { mutateAsync: createAthlete, isPending: isCreating } = useCreateAthlete();
  const { mutateAsync: updateAthlete, isPending: isUpdating } = useUpdateAthlete();
  const isPending = isCreating || isUpdating;

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setAvatarFile(file);
  };

  const handleSubmit = async (
    values: AthleteFormValues,
    { resetForm }: FormikHelpers<AthleteFormValues>,
  ) => {
    try {
      const payload: CreateAthletePayload = {
        name: values.name.trim(),
        department: values.department.trim(),
        course: Number(values.course),
        sport: values.sport as Sport,
        rank: values.rank.trim(),
        birthDate: values.birthDate,
        weightCategory: values.weightCategory.trim(),
        achievements: values.achievements.trim(),
      };

      const savedAthlete = isEditMode
        ? await updateAthlete({ id: athlete!._id, payload })
        : await createAthlete(payload);

      if (avatarFile) {
        await updateAthleteAvatar(savedAthlete._id, avatarFile);
      }

      toast.success(isEditMode ? 'Дані спортсмена оновлено' : 'Спортсмена додано');

      // Очищуємо форму й файл перед переходом: Next.js router cache може
      // лишити цей компонент змонтованим при поверненні на сторінку, тож
      // без явного скидання стара інформація "виживає" між візитами.
      resetForm();
      setAvatarFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      router.push('/athletes');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Formik
      initialValues={getInitialValues(athlete)}
      validationSchema={schema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ errors, touched }) => (
        <Form className={css.form} noValidate>
          <div className={css.grid}>
            <div className={css.field}>
              <label className={css.label} htmlFor="athlete-name">
                ПІБ*
              </label>
              <Field
                id="athlete-name"
                name="name"
                type="text"
                placeholder="Іваненко Олександр Петрович"
                className={css.input}
                aria-invalid={Boolean(touched.name && errors.name)}
              />
              <ErrorMessage name="name" component="span" className={css.error} />
            </div>

            <div className={css.field}>
              <label className={css.label} htmlFor="athlete-department">
                Підрозділ*
              </label>
              <Field
                id="athlete-department"
                name="department"
                type="text"
                placeholder="1-й навчальний взвод"
                className={css.input}
                aria-invalid={Boolean(touched.department && errors.department)}
              />
              <ErrorMessage name="department" component="span" className={css.error} />
            </div>

            <div className={css.field}>
              <label className={css.label} htmlFor="athlete-course">
                Курс*
              </label>
              <Field
                as="select"
                id="athlete-course"
                name="course"
                className={css.select}
                aria-invalid={Boolean(touched.course && errors.course)}
              >
                <option value="">Оберіть курс</option>
                {COURSES.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="course" component="span" className={css.error} />
            </div>

            <div className={css.field}>
              <label className={css.label} htmlFor="athlete-sport">
                Вид спорту*
              </label>
              <Field
                as="select"
                id="athlete-sport"
                name="sport"
                className={css.select}
                aria-invalid={Boolean(touched.sport && errors.sport)}
              >
                <option value="">Оберіть вид спорту</option>
                {SPORTS.map((sport) => (
                  <option key={sport} value={sport}>
                    {SPORT_LABELS[sport]}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="sport" component="span" className={css.error} />
            </div>

            <div className={css.field}>
              <label className={css.label} htmlFor="athlete-rank">
                Розряд*
              </label>
              <Field
                id="athlete-rank"
                name="rank"
                type="text"
                placeholder="Кандидат у майстри спорту"
                className={css.input}
                aria-invalid={Boolean(touched.rank && errors.rank)}
              />
              <ErrorMessage name="rank" component="span" className={css.error} />
            </div>

            <div className={css.field}>
              <label className={css.label} htmlFor="athlete-birthDate">
                Дата народження*
              </label>
              <Field
                id="athlete-birthDate"
                name="birthDate"
                type="date"
                className={css.input}
                aria-invalid={Boolean(touched.birthDate && errors.birthDate)}
              />
              <ErrorMessage name="birthDate" component="span" className={css.error} />
            </div>

            <div className={css.field}>
              <label className={css.label} htmlFor="athlete-weightCategory">
                Вагова категорія*
              </label>
              <Field
                id="athlete-weightCategory"
                name="weightCategory"
                type="text"
                placeholder="до 75 кг"
                className={css.input}
                aria-invalid={Boolean(touched.weightCategory && errors.weightCategory)}
              />
              <ErrorMessage
                name="weightCategory"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.field}>
              <label className={css.label} htmlFor="athlete-avatar">
                Фото
              </label>
              {isEditMode && athlete?.avatarURL && !avatarFile && (
                <div className={css.currentAvatar}>
                  <AthleteAvatar src={athlete.avatarURL} name={athlete.name} size={48} />
                  <span className={css.fileName}>Поточне фото</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                id="athlete-avatar"
                name="avatar"
                type="file"
                accept="image/*"
                className={css.fileInput}
                onChange={handleAvatarChange}
              />
              {avatarFile && <span className={css.fileName}>{avatarFile.name}</span>}
            </div>

            <div className={`${css.field} ${css.fieldWide}`}>
              <label className={css.label} htmlFor="athlete-achievements">
                Досягнення
              </label>
              <Field
                as="textarea"
                id="athlete-achievements"
                name="achievements"
                rows={4}
                placeholder="Чемпіон України серед юніорів, 2025"
                className={css.textarea}
              />
              <ErrorMessage name="achievements" component="span" className={css.error} />
            </div>
          </div>

          <div className={css.actions}>
            <Link href="/athletes" className={css.cancelButton}>
              Скасувати
            </Link>
            <button className={css.submitButton} type="submit" disabled={isPending}>
              {isPending ? (isEditMode ? 'Оновлення...' : 'Збереження...') : 'Зберегти'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
