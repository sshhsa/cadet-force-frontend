import Image from 'next/image';

import css from './Hero.module.css';

export default function Hero() {
  return (
    <section className={css.hero}>
      <Image
        src="/hero-navs.jpg"
        alt="Будівля Національної академії внутрішніх справ України"
        fill
        priority
        sizes="100vw"
        className={css.image}
      />
      <div className={css.overlay} />
      <div className={css.content}>
        <h1 className={css.title}>Список спортсменів НАВС</h1>
        <div className={css.divider} />
      </div>
      <p className={css.credit}>
        Фото: Artemco / Wikimedia Commons, CC BY-SA 4.0
      </p>
    </section>
  );
}
