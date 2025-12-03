"use client";

import type { CenterPanelProps } from "@/types/arc";

/**
 * CenterPanel Component
 * Displays the middle lens content: idle, summary, or spark
 */
export function CenterPanel({ mode, text, hasSpark, delta }: CenterPanelProps) {
  // Determine label based on mode
  const getLabel = () => {
    switch (mode) {
      case "idle":
        return "Middle Lens (Idle)";
      case "spark":
        return "✦ Spark";
      case "summary":
      default:
        return "Middle Lens";
    }
  };

  // Determine container styling based on mode
  const getContainerClasses = () => {
    const baseClasses =
      "flex flex-col rounded-lg p-4 transition-all duration-300";

    if (mode === "spark" && hasSpark) {
      // Spark mode: special styling with glow effect
      return `${baseClasses} border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg shadow-amber-200/50 dark:border-amber-500 dark:from-amber-950/30 dark:to-orange-950/30 dark:shadow-amber-900/30`;
    }

    if (mode === "idle") {
      // Idle mode: muted, waiting state
      return `${baseClasses} border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50`;
    }

    // Summary mode: neutral, standard styling
    return `${baseClasses} border border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900`;
  };

  // Determine text styling based on mode
  const getTextClasses = () => {
    if (mode === "spark" && hasSpark) {
      return "text-sm leading-relaxed text-amber-800 dark:text-amber-200 font-medium";
    }

    if (mode === "idle") {
      return "text-sm leading-relaxed text-zinc-400 dark:text-zinc-500 italic";
    }

    return "text-sm leading-relaxed text-zinc-600 dark:text-zinc-400";
  };

  // Determine label styling based on mode
  const getLabelClasses = () => {
    const baseClasses = "text-sm font-semibold uppercase tracking-wide";

    if (mode === "spark" && hasSpark) {
      return `${baseClasses} text-amber-600 dark:text-amber-400`;
    }

    if (mode === "idle") {
      return `${baseClasses} text-zinc-400 dark:text-zinc-500`;
    }

    return `${baseClasses} text-zinc-500 dark:text-zinc-400`;
  };

  return (
    <div className={getContainerClasses()}>
      {/* Header */}
      <div className="mb-3 flex items-center justify-between border-b border-zinc-100 pb-2 dark:border-zinc-700">
        <h2 className={getLabelClasses()}>{getLabel()}</h2>
        {mode !== "idle" && (
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            Δ {(delta * 100).toFixed(0)}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className={getTextClasses()}>{text}</p>
      </div>

      {/* Spark indicator */}
      {mode === "spark" && hasSpark && (
        <div className="mt-3 flex items-center justify-center">
          <span className="text-2xl" role="img" aria-label="spark">
            ✦
          </span>
        </div>
      )}
    </div>
  );
}
