"use client";

import type { ArcPanelProps } from "@/types/arc";

/**
 * ArcPanel Component
 * Displays either ARC-0 (grounding) or ARC-1 (exploring) content
 */
export function ArcPanel({ label, text, subtitle }: ArcPanelProps) {
  const isEmpty = !text || text.trim() === "";

  return (
    <div className="flex flex-col rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      {/* Header */}
      <div className="mb-3 border-b border-zinc-100 pb-2 dark:border-zinc-800">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
          {label}
        </h2>
        {subtitle && (
          <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
            {subtitle}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        {isEmpty ? (
          <p className="text-sm italic text-zinc-400 dark:text-zinc-500">
            Awaiting reflection...
          </p>
        ) : (
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {text}
          </p>
        )}
      </div>
    </div>
  );
}
