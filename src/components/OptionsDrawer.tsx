'use client';

import { SessionHistory } from '@/types/arc';

interface OptionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: SessionHistory;
  onHistoryItemClick: (id: string) => void;
  onClearSession: () => void;
}

export default function OptionsDrawer({
  isOpen,
  onClose,
  history,
  onHistoryItemClick,
  onClearSession
}: OptionsDrawerProps) {
  if (!isOpen) return null;

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-80 bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">Options</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Session History */}
            <div className="p-6">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Session History</h3>

              {history.length === 0 ? (
                <p className="text-gray-500 text-sm">No previous turns yet</p>
              ) : (
                <div className="space-y-2">
                  {history.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onHistoryItemClick(item.id);
                        onClose();
                      }}
                      className="w-full text-left p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors group"
                    >
                      <div className="text-sm text-white font-medium truncate">
                        {item.promptPreview}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {formatTime(item.timestamp)}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="mx-6 border-t border-gray-800"></div>

            {/* Other Options */}
            <div className="p-6 space-y-2">
              <button
                disabled
                className="w-full text-left p-3 rounded-lg text-gray-500 cursor-not-allowed opacity-60"
              >
                <div className="text-sm font-medium">Export conversation (coming soon)</div>
                <div className="text-xs text-gray-600 mt-1">Download your chat history</div>
              </button>

              <button
                disabled
                className="w-full text-left p-3 rounded-lg text-gray-500 cursor-not-allowed opacity-60"
              >
                <div className="text-sm font-medium">About ARC</div>
                <div className="text-xs text-gray-600 mt-1">Learn more about ARC Engine</div>
              </button>

              <button
                onClick={onClearSession}
                className="w-full text-left p-3 rounded-lg hover:bg-red-900 hover:bg-opacity-20 transition-colors group"
              >
                <div className="text-sm font-medium text-red-400 group-hover:text-red-300">
                  Clear session
                </div>
                <div className="text-xs text-red-500 mt-1 group-hover:text-red-400">
                  Reset this conversation
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}