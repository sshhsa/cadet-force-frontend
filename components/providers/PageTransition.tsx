'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

/**
 * Справжній crossfade між сторінками (а не лише анімація появи нового
 * контенту): стара сторінка плавно зникає, поки нова плавно проявляється
 * й трохи зсувається по вертикалі. key={pathname} змушує AnimatePresence
 * побачити зміну маршруту й програти exit/enter навіть без перезавантаження.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
