import React from 'react';
import { motion } from 'motion/react';
import { BentoCard } from './BentoCard';

export function SkeletonLoader({ className }: { className?: string }) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className={`bg-[#E8E4D9] dark:bg-[#34332F] rounded-2xl w-full ${className}`}
    />
  );
}

export function WeatherSkeleton() {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex justify-between mb-4">
        <div>
          <SkeletonLoader className="h-4 w-24 mb-2" />
          <SkeletonLoader className="h-6 w-32" />
        </div>
        <SkeletonLoader className="w-12 h-12 rounded-full" />
      </div>
      <div className="my-6">
        <SkeletonLoader className="h-16 w-32 mb-2" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-auto">
        <SkeletonLoader className="h-16 w-full" />
        <SkeletonLoader className="h-16 w-full" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="w-full h-full min-h-[250px] flex flex-col">
      <SkeletonLoader className="h-4 w-32 mb-4" />
      <SkeletonLoader className="flex-1 w-full" />
    </div>
  );
}

export function WarningSkeleton() {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-6">
        <SkeletonLoader className="w-10 h-10 rounded-full" />
        <div>
          <SkeletonLoader className="h-4 w-24 mb-1" />
          <SkeletonLoader className="h-6 w-32" />
        </div>
      </div>
      <div className="flex-1 flex gap-6">
        <div className="flex-1 space-y-4">
          <SkeletonLoader className="h-12 w-full" />
          <SkeletonLoader className="h-12 w-full" />
          <SkeletonLoader className="h-12 w-full" />
        </div>
        <SkeletonLoader className="w-48 h-48 rounded-2xl flex-shrink-0 hidden sm:block" />
      </div>
    </div>
  );
}
