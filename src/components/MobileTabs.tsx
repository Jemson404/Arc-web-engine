'use client';

interface MobileTabsProps {
  activeTab: 'arc0' | 'arc1';
  onTabChange: (tab: 'arc0' | 'arc1') => void;
}

export default function MobileTabs({ activeTab, onTabChange }: MobileTabsProps) {
  return (
    <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-800">
      <button
        onClick={() => onTabChange('arc0')}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
          activeTab === 'arc0'
            ? 'bg-green-900 text-green-300'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        ARC-0
      </button>

      <button
        onClick={() => onTabChange('arc1')}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
          activeTab === 'arc1'
            ? 'bg-red-900 text-red-300'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        ARC-1
      </button>
    </div>
  );
}