'use client';

import { useState } from 'react';
import PanelHeader from '@/components/PanelHeader';
import Bubble from '@/components/Bubble';
import SparkPanel from '@/components/SparkPanel';
import OptionsDrawer from '@/components/OptionsDrawer';
import InputBar from '@/components/InputBar';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface PersonaResponse {
  text: string;
  timestamp: string;
}

export default function ArcPage() {
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [arc0Responses, setArc0Responses] = useState<PersonaResponse[]>([]);
  const [arc1Responses, setArc1Responses] = useState<PersonaResponse[]>([]);
  const [sparks, setSparks] = useState<string[]>([]);
  const [arc0DrawerOpen, setArc0DrawerOpen] = useState(false);
  const [arc1DrawerOpen, setArc1DrawerOpen] = useState(false);

  // Mocked persona logic
  const mockArc0Response = (userInput: string): string => {
    return `ARC-0 (Analytical): Let me analyze "${userInput}". From a logical perspective, this requires systematic evaluation of the core components and their relationships.`;
  };

  const mockArc1Response = (userInput: string): string => {
    return `ARC-1 (Creative): Interesting question about "${userInput}"! I see this from a more intuitive angle - exploring possibilities and connections beyond the obvious.`;
  };

  const mockSparkGeneration = (userInput: string): string => {
    return `✨ Synthesis: Combining analytical rigor with creative exploration around "${userInput.substring(0, 30)}...", we discover that structured thinking and intuitive leaps complement each other, revealing deeper insights.`;
  };

  const handleSendMessage = (text: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const userMessage: Message = {
      text,
      isUser: true,
      timestamp,
    };
    setUserMessages((prev) => [...prev, userMessage]);

    // Simulate ARC-0 response after delay
    setTimeout(() => {
      const arc0Text = mockArc0Response(text);
      setArc0Responses((prev) => [...prev, { text: arc0Text, timestamp }]);

      // Simulate ARC-1 response after another delay
      setTimeout(() => {
        const arc1Text = mockArc1Response(text);
        setArc1Responses((prev) => [...prev, { text: arc1Text, timestamp }]);

        // Generate spark combining both perspectives
        setTimeout(() => {
          const spark = mockSparkGeneration(text);
          setSparks((prev) => [...prev, spark]);
        }, 800);
      }, 600);
    }, 400);
  };

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900 p-4">
        <h1 className="text-xl font-bold text-white text-center">ARC Engine</h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          {/* Left Column - User Stream + ARC-0 */}
          <div className="flex flex-col gap-4 h-full">
            {/* User Prompt Stream */}
            <div className="flex-1 flex flex-col bg-zinc-900 rounded-lg border border-zinc-800 min-h-0">
              <PanelHeader title="💬 Your Prompts" subtitle="Conversation Stream" />
              <div className="flex-1 overflow-y-auto p-4">
                {userMessages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-zinc-600 text-sm">
                    Start a conversation to see your messages here...
                  </div>
                ) : (
                  userMessages.map((msg, index) => (
                    <Bubble
                      key={index}
                      text={msg.text}
                      isUser={msg.isUser}
                      timestamp={msg.timestamp}
                    />
                  ))
                )}
              </div>
            </div>

            {/* ARC-0 Panel */}
            <div className="flex-1 flex flex-col bg-zinc-900 rounded-lg border border-zinc-800 min-h-0">
              <PanelHeader
                title="🔵 ARC-0"
                subtitle="Analytical Perspective"
                onOptionsClick={() => setArc0DrawerOpen(true)}
              />
              <div className="flex-1 overflow-y-auto p-4">
                {arc0Responses.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-zinc-600 text-sm">
                    Waiting for input to analyze...
                  </div>
                ) : (
                  arc0Responses.map((response, index) => (
                    <Bubble
                      key={index}
                      text={response.text}
                      isUser={false}
                      timestamp={response.timestamp}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - ARC-1 + Spark */}
          <div className="flex flex-col gap-4 h-full">
            {/* ARC-1 Panel */}
            <div className="flex-1 flex flex-col bg-zinc-900 rounded-lg border border-zinc-800 min-h-0">
              <PanelHeader
                title="🟢 ARC-1"
                subtitle="Creative Perspective"
                onOptionsClick={() => setArc1DrawerOpen(true)}
              />
              <div className="flex-1 overflow-y-auto p-4">
                {arc1Responses.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-zinc-600 text-sm">
                    Waiting for input to explore...
                  </div>
                ) : (
                  arc1Responses.map((response, index) => (
                    <Bubble
                      key={index}
                      text={response.text}
                      isUser={false}
                      timestamp={response.timestamp}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Spark Panel */}
            <div className="flex-1 min-h-0">
              <SparkPanel sparks={sparks} />
            </div>
          </div>
        </div>
      </div>

      {/* Input Bar */}
      <InputBar onSend={handleSendMessage} />

      {/* Drawers */}
      <OptionsDrawer
        isOpen={arc0DrawerOpen}
        onClose={() => setArc0DrawerOpen(false)}
        personaName="ARC-0 (Analytical)"
      />
      <OptionsDrawer
        isOpen={arc1DrawerOpen}
        onClose={() => setArc1DrawerOpen(false)}
        personaName="ARC-1 (Creative)"
      />
    </div>
  );
}
