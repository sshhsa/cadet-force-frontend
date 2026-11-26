'use client';

import { forwardRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

import css from './AthleteAvatar.module.css';

interface AthleteAvatarProps {
  src: string | null;
  name: string;
  size?: number;
}

const getInitials = (name: string): string =>
  name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

const AthleteAvatar = forwardRef<HTMLButtonElement, AthleteAvatarProps>(function AthleteAvatar(
  { src, name, size = 56 },
  ref,
) {
  const [isOpen, setIsOpen] = useState(false);

  // Esc закриває модалку з фото
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!src) {
    return (
      <span className={css.placeholder} style={{ width: size, height: size }}>
        {getInitials(name) || '?'}
      </span>
    );
  }

  return (
    <>
      <button
        ref={ref}
        type="button"
        className={css.avatarButton}
        onClick={() => setIsOpen(true)}
        aria-label={`Переглянути фото: ${name}`}
      >
        <Image
          src={src}
          alt={name}
          width={size}
          height={size}
          className={css.image}
          style={{ width: size, height: size }}
        />
      </button>

      {isOpen &&
        createPortal(
          <div
            className={css.overlay}
            role="dialog"
            aria-modal="true"
            aria-label={name}
            onClick={(event) => {
              // Портал рендериться у document.body, але синтетичні події
              // React все одно бульбашать по дереву компонентів (а не DOM),
              // тому без stopPropagation клік по фону долітав би аж до
              // onClick картки-батька й миттєво відкривав модалку назад.
              event.stopPropagation();
              setIsOpen(false);
            }}
          >
            <div className={css.modalContent} onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                className={css.closeButton}
                onClick={() => setIsOpen(false)}
                aria-label="Закрити"
              >
                <svg viewBox="0 0 24 24" className={css.closeIcon} aria-hidden="true">
                  <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              <div className={css.modalImageWrap}>
                <Image
                  src={src}
                  alt={name}
                  fill
                  sizes="(max-width: 600px) 90vw, 480px"
                  className={css.modalImage}
                />
              </div>

              <p className={css.modalCaption}>{name}</p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
});

export default AthleteAvatar;
