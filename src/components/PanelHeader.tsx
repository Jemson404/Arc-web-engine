'use client';

interface PanelHeaderProps {
  title: string;
  subtitle?: string;
  onOptionsClick?: () => void;
}

export default function PanelHeader({ title, subtitle, onOptionsClick }: PanelHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800 p-4">
      <div>
        <h2 className="text-sm font-medium text-zinc-100">{title}</h2>
        {subtitle && <p className="text-xs text-zinc-500 mt-1">{subtitle}</p>}
      </div>
      {onOptionsClick && (
        <button
          onClick={onOptionsClick}
          className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm"
          aria-label="Options"
        >
          ⋮
        </button>
      )}
    </div>
  );
}
