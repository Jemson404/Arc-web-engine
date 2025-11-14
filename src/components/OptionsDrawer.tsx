'use client';

interface OptionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  personaName: string;
  onPersonaChange?: (settings: Record<string, unknown>) => void;
}

export default function OptionsDrawer({
  isOpen,
  onClose,
  personaName,
}: OptionsDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed right-0 top-0 bottom-0 w-80 bg-zinc-900 border-l border-zinc-800 z-50 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-zinc-100">Options</h3>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Persona
            </label>
            <div className="text-sm text-zinc-100 bg-zinc-800 p-3 rounded-lg">
              {personaName}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Temperature
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              defaultValue="0.7"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Max Length
            </label>
            <input
              type="number"
              defaultValue="500"
              className="w-full bg-zinc-800 text-zinc-100 border border-zinc-700 rounded px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>
    </>
  );
}
