'use client';

import { useArcStore } from '@/store/useArcStore';
import Panel from '@/components/Panel';
import SparkPanel from '@/components/SparkPanel';
import MessageBubble from '@/components/MessageBubble';
import InputBar from '@/components/InputBar';
import BackgroundAnimation from '@/components/BackgroundAnimation';

export default function ArcPage() {
  const { messages, isProcessing, showSpark, addMessage, updateMessage, setProcessing, setShowSpark } = useArcStore();

  const handleSubmit = async (message: string) => {
    // Add user message
    addMessage({ role: 'user', content: message });
    setProcessing(true);

    try {
      // Step 1: Classify message
      const classifierRes = await fetch('/api/classifier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const { classification } = await classifierRes.json();
      const needsSpark = classification === 'NEEDS_SPARK';
      setShowSpark(needsSpark);

      // Step 2: Stream ARC-0 response
      const arc0InitialMsg = { role: 'arc0' as const, content: '', streaming: true };
      addMessage(arc0InitialMsg);
      
      // Get the ID of the message we just added
      const currentMessages = useArcStore.getState().messages;
      const arc0MsgId = currentMessages[currentMessages.length - 1].id;
      
      const arc0Res = await fetch('/api/arc0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      
      const arc0Reader = arc0Res.body?.getReader();
      const arc0Decoder = new TextDecoder();
      let arc0Content = '';
      
      if (arc0Reader) {
        while (true) {
          const { done, value } = await arc0Reader.read();
          if (done) break;
          
          const chunk = arc0Decoder.decode(value, { stream: true });
          arc0Content += chunk;
          updateMessage(arc0MsgId, arc0Content);
        }
      }

      // Step 3: Stream ARC-1 response
      const arc1InitialMsg = { role: 'arc1' as const, content: '', streaming: true };
      addMessage(arc1InitialMsg);
      
      const currentMessages2 = useArcStore.getState().messages;
      const arc1MsgId = currentMessages2[currentMessages2.length - 1].id;
      
      const arc1Res = await fetch('/api/arc1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      
      const arc1Reader = arc1Res.body?.getReader();
      const arc1Decoder = new TextDecoder();
      let arc1Content = '';
      
      if (arc1Reader) {
        while (true) {
          const { done, value } = await arc1Reader.read();
          if (done) break;
          
          const chunk = arc1Decoder.decode(value, { stream: true });
          arc1Content += chunk;
          updateMessage(arc1MsgId, arc1Content);
        }
      }

      // Step 4: Generate summary
      const summaryRes = await fetch('/api/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const { summary } = await summaryRes.json();
      addMessage({ role: 'summary', content: summary });

      // Step 5: Generate spark if needed
      if (needsSpark) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const sparkRes = await fetch('/api/spark', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message }),
        });
        const { spark } = await sparkRes.json();
        addMessage({ role: 'spark', content: spark });
      }

    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      setProcessing(false);
    }
  };

  const userMessages = messages.filter(m => m.role === 'user');
  const arc0Messages = messages.filter(m => m.role === 'arc0');
  const arc1Messages = messages.filter(m => m.role === 'arc1');
  const summaryMessages = messages.filter(m => m.role === 'summary');
  const sparkMessage = messages.find(m => m.role === 'spark');

  return (
    <div className="min-h-screen bg-black flex flex-col relative">
      <BackgroundAnimation />
      
      {/* Main content */}
      <div className="flex-1 p-6 relative z-10">
        <div className="max-w-7xl mx-auto h-full">
          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[calc(100vh-200px)]">
            {/* User Prompt Stream */}
            <div className="h-full">
              <Panel title="User Prompt Stream" idle={!isProcessing}>
                <div className="space-y-2 h-full overflow-y-auto">
                  {userMessages.map((msg) => (
                    <MessageBubble key={msg.id} content={msg.content} role={msg.role} />
                  ))}
                </div>
              </Panel>
            </div>

            {/* ARC-0 Panel */}
            <div className="h-full">
              <Panel title="ARC-0 (Analytical)" idle={!isProcessing}>
                <div className="space-y-2 h-full overflow-y-auto">
                  {arc0Messages.map((msg) => (
                    <MessageBubble
                      key={msg.id}
                      content={msg.content}
                      role={msg.role}
                      streaming={msg.streaming}
                    />
                  ))}
                </div>
              </Panel>
            </div>

            {/* ARC-1 Panel */}
            <div className="h-full">
              <Panel title="ARC-1 (Creative)" idle={!isProcessing}>
                <div className="space-y-2 h-full overflow-y-auto">
                  {arc1Messages.map((msg) => (
                    <MessageBubble
                      key={msg.id}
                      content={msg.content}
                      role={msg.role}
                      streaming={msg.streaming}
                    />
                  ))}
                </div>
              </Panel>
            </div>

            {/* Summary/Spark Panel */}
            <div className="h-full flex flex-col gap-4">
              {/* Summary Panel */}
              <div className="flex-1">
                <Panel title="Summary" idle={!isProcessing}>
                  <div className="space-y-2 h-full overflow-y-auto">
                    {summaryMessages.map((msg) => (
                      <MessageBubble key={msg.id} content={msg.content} role={msg.role} />
                    ))}
                  </div>
                </Panel>
              </div>

              {/* Spark Panel - conditionally rendered */}
              <SparkPanel content={sparkMessage?.content} show={showSpark} />
            </div>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <InputBar onSubmit={handleSubmit} disabled={isProcessing} />
    </div>
  );
}
