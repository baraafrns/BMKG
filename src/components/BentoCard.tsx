import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function BentoCard({ children, className, delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "bg-[#F5F2EA] dark:bg-[#2C2A26] rounded-3xl p-6 shadow-sm border border-[#E8E4D9] dark:border-[#3A3834] overflow-hidden relative",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
