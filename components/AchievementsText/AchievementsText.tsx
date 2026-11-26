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
  const cutIndex = text.lastIndexOf(' ', PREVIEW_LENGTH);
  const previewText = isLong
    ? text.slice(0, cutIndex > 0 ? cutIndex : PREVIEW_LENGTH) + '…'
    : text;

  return (
    <span>
      {isExpanded || !isLong ? text : previewText}
      {isLong && (
        <button
          type="button"
          className={css.toggle}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? ' Показати менше' : ' Показати більше'}
        </button>
      )}
    </span>
  );
}
