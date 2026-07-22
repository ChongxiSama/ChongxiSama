"use client";

import { type Chapter } from '@/lib/data';

export default function ChapterTracker({
  children,
}: {
  chapters: Chapter[];
  brandLabel: string;
  utcLabel: string;
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
