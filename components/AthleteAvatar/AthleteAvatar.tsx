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

export default function AthleteAvatar({ src, name, size = 56 }: AthleteAvatarProps) {
  if (!src) {
    return (
      <span className={css.placeholder} style={{ width: size, height: size }}>
        {getInitials(name) || '?'}
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      width={size}
      height={size}
      className={css.image}
      style={{ width: size, height: size }}
    />
  );
}
