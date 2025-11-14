'use client';

import { useState, useEffect } from 'react';
import { useArcEngine } from '@/hooks/useArcEngine';
import { useOptionsDrawer } from '@/hooks/useOptionsDrawer';
import PersonaPanel from '@/components/PersonaPanel';
import SparkPanel from '@/components/SparkPanel';
import PromptBar from '@/components/PromptBar';
import OptionsDrawer from '@/components/OptionsDrawer';
import MobileTabs from '@/components/MobileTabs';

export default function ArcLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const arcEngine = useArcEngine();
  const optionsDrawer = useOptionsDrawer();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter messages by type for panels
  const arc0Messages = arcEngine.messages.filter(msg => msg.type === 'arc0');
  const arc1Messages = arcEngine.messages.filter(msg => msg.type === 'arc1');
  const latestUserPrompt = arcEngine.messages
    .filter(msg => msg.type === 'user')
    .pop()?.content || '';

  // Parse spark summary from messages
  const latestSparkMessage = arcEngine.messages
    .filter(msg => msg.type === 'spark')
    .pop();

  const currentSpark = latestSparkMessage ? {
    reconciliation: latestSparkMessage.content.split('\n\n')[0].replace('Reconciliation: ', ''),
    nextStep: latestSparkMessage.content.split('\n\n')[1]?.replace('Next Step: ', '') || ''
  } : null;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--main-bg)' }}>
      {/* Header */}
      <header className="h-[60px] border-b flex items-center justify-between px-4"
              style={{ borderColor: '#333' }}>
        <h1 className="text-xl font-light text-white">ARC Engine</h1>
        <button
          onClick={optionsDrawer.openDrawer}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          aria-label="Options"
        >
          <div className="space-y-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </button>
      </header>

      {/* User Prompt Stream */}
      {latestUserPrompt && (
        <div className="px-4 py-3 border-b" style={{ borderColor: '#333' }}>
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">Current prompt:</p>
            <p className="text-white font-medium">{latestUserPrompt}</p>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        {isMobile ? (
          // Mobile Layout
          <div className="h-full flex flex-col p-4 space-y-4">
            {/* Spark Panel (always visible) */}
            <div className="flex-shrink-0">
              <SparkPanel currentSpark={currentSpark} />
            </div>

            {/* Mobile Tabs */}
            <div className="flex-shrink-0">
              <MobileTabs
                activeTab={arcEngine.activeMobileTab}
                onTabChange={arcEngine.setActiveMobileTab}
              />
            </div>

            {/* Persona Panels (tabbed) */}
            <div className="flex-1 min-h-0">
              {arcEngine.activeMobileTab === 'arc0' && (
                <PersonaPanel
                  title="ARC-0: Grounded"
                  personaType="arc0"
                  messages={arc0Messages}
                />
              )}
              {arcEngine.activeMobileTab === 'arc1' && (
                <PersonaPanel
                  title="ARC-1: Exploratory"
                  personaType="arc1"
                  messages={arc1Messages}
                />
              )}
            </div>
          </div>
        ) : (
          // Desktop Layout
          <div className="h-full p-4">
            <div className="grid grid-cols-3 gap-4 h-full">
              {/* ARC-0 Panel */}
              <div>
                <PersonaPanel
                  title="ARC-0: Grounded"
                  personaType="arc0"
                  messages={arc0Messages}
                />
              </div>

              {/* Spark Panel */}
              <div>
                <SparkPanel currentSpark={currentSpark} />
              </div>

              {/* ARC-1 Panel */}
              <div>
                <PersonaPanel
                  title="ARC-1: Exploratory"
                  personaType="arc1"
                  messages={arc1Messages}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Input Bar */}
      <div className="h-[80px] border-t p-4" style={{ borderColor: '#333' }}>
        <PromptBar
          onSubmit={arcEngine.handleSubmitPrompt}
          isLoading={arcEngine.isLoading}
        />
      </div>

      {/* Options Drawer */}
      <OptionsDrawer
        isOpen={optionsDrawer.isOpen}
        onClose={optionsDrawer.closeDrawer}
        history={arcEngine.history}
        onHistoryItemClick={arcEngine.loadHistoryItem}
        onClearSession={arcEngine.clearSession}
      />
    </div>
  );
}