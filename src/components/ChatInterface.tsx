"use client";

import { useState } from 'react';
import { ARCRuntime } from '../lib/arc-runtime';
import { Message, Spark } from '../lib/types';

export default function ChatInterface() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [spark, setSpark] = useState<Spark | null>(null);
    const [loading, setLoading] = useState(false);
    const [runtime] = useState(() => new ARCRuntime());

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        setLoading(true);
        setSpark(null);

        try {
            // 1. Process Input
            const dialogue = await runtime.processInput(input);
            setMessages(prev => [...prev, ...dialogue.messages]);
            setInput('');

            // 2. Generate Spark
            const newSpark = await runtime.integrateSpark(dialogue);
            setSpark(newSpark);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 flex flex-col h-[80vh]">
            <div className="flex-1 overflow-y-auto space-y-6 mb-8 scrollbar-hide">
                {messages.map((msg) => (
                    <div
                        key={`${msg.trace_id}-${msg.role}`}
                        className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'
                            }`}
                    >
                        <div className={`
              max-w-[80%] rounded-2xl px-6 py-4 backdrop-blur-md
              ${msg.role === 'user'
                                ? 'bg-white/10 text-white'
                                : msg.role === 'arc0'
                                    ? 'bg-blue-500/10 border border-blue-500/20 text-blue-100'
                                    : 'bg-purple-500/10 border border-purple-500/20 text-purple-100'
                            }
            `}>
                            <div className="text-xs opacity-50 mb-1 uppercase tracking-widest">
                                {msg.role === 'arc0' ? 'ARC-0 Observe' : msg.role === 'arc1' ? 'ARC-1 Explore' : 'You'}
                            </div>
                            <div className="text-lg font-light leading-relaxed">
                                {msg.content}
                            </div>
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-center py-8">
                        <div className="animate-pulse text-white/30 text-sm tracking-[0.2em]">
                            PROCESSING THOUGHTS...
                        </div>
                    </div>
                )}

                {spark && (
                    <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 backdrop-blur-xl animate-fade-in text-center">
                        <div className="text-2xl mb-2">✦</div>
                        <h3 className="text-xl font-light text-white mb-4">Spark Generated</h3>
                        <p className="text-lg text-white/80 italic">
                            &ldquo;{spark.summary}&rdquo;
                        </p>
                        <div className="flex justify-center gap-2 mt-6">
                            {spark.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/50">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Share a thought..."
                    className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                />
            </form>
        </div>
    );
}
