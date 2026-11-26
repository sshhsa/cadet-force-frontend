import PageHeader from '@/components/PageHeader/PageHeader';

import css from './AuthLayout.module.css';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={css.page}>
      <PageHeader />
      <div className={css.wrapper}>
        <div className="container">{children}</div>
      </div>
    </div>
  );
}
