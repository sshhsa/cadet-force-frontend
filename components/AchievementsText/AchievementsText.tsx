'use client';

import { useState } from 'react';

import css from './AchievementsText.module.css';

const PREVIEW_LENGTH = 100;

interface AchievementsTextProps {
  text: string;
}

export default function AchievementsText({ text }: AchievementsTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) {
    return <span>—</span>;
  }

  const isLong = text.length > PREVIEW_LENGTH;

  if (!isLong) {
    return <span>{text}</span>;
  }

  const cutIndex = text.lastIndexOf(' ', PREVIEW_LENGTH);
  const splitIndex = cutIndex > 0 ? cutIndex : PREVIEW_LENGTH;
  const previewText = text.slice(0, splitIndex);
  const restText = text.slice(splitIndex);

  return (
    <span>
      {previewText}
      <span className={css.extra} data-expanded={isExpanded}>
        <span className={css.extraInner}>{restText}</span>
      </span>
      <span className={css.ellipsis} data-hidden={isExpanded}>
        …
      </span>
      <button
        type="button"
        className={css.toggle}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {isExpanded ? ' Показати менше' : ' Показати більше'}
      </button>
    </span>
  );
}
