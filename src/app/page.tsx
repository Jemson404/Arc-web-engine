"use client";

import { useState, useCallback } from "react";
import { ArcPanel } from "@/ui/ArcPanel";
import { CenterPanel } from "@/ui/CenterPanel";
import { evaluateSpark, getARC0Text, getARC1Text } from "@/core/sparkEngine";
import type { ArcEngineResponse } from "@/types/arc";

/**
 * Main ARC Engine Page
 * Three-column layout: ARC-0 (grounding) | Center (lens) | ARC-1 (exploring)
 */
export default function Home() {
  // Input state
  const [input, setInput] = useState("");

  // Loading state for button
  const [isProcessing, setIsProcessing] = useState(false);

  // ARC panel states
  const [arc0Text, setArc0Text] = useState("");
  const [arc1Text, setArc1Text] = useState("");

  // Center panel state
  const [response, setResponse] = useState<ArcEngineResponse>({
    mode: "idle",
    hasSpark: false,
    centerText: "Share your thoughts, and let them reflect...",
    delta: 0,
    userState: "calm",
  });

  /**
   * Handle the main action button click
   * Processes input and generates ARC responses
   */
  const handleReflect = useCallback(() => {
    // Prevent spam-clicks while processing
    if (isProcessing) return;

    // Handle empty input gracefully
    const trimmedInput = input.trim();
    if (!trimmedInput) {
      setArc0Text("");
      setArc1Text("");
      setResponse({
        mode: "idle",
        hasSpark: false,
        centerText: "Share your thoughts, and let them reflect...",
        delta: 0,
        userState: "calm",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate brief processing delay for UX
    setTimeout(() => {
      // Generate ARC-0 and ARC-1 texts
      const newArc0Text = getARC0Text(trimmedInput);
      const newArc1Text = getARC1Text(trimmedInput);

      // Evaluate spark with full pipeline
      const newResponse = evaluateSpark(trimmedInput);

      // Update all states
      setArc0Text(newArc0Text);
      setArc1Text(newArc1Text);
      setResponse(newResponse);
      setIsProcessing(false);
    }, 150);
  }, [input, isProcessing]);

  /**
   * Handle textarea input change
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  /**
   * Handle Enter key to submit (with Shift+Enter for newlines)
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleReflect();
    }
  };

  // Determine if button should be disabled
  const isButtonDisabled = isProcessing || input.trim() === "";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            ARC Engine
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Dual minds with middle lens
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Input area */}
        <div className="mb-8">
          <label
            htmlFor="thought-input"
            className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            What&apos;s on your mind?
          </label>
          <textarea
            id="thought-input"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Share what you're thinking or feeling..."
            rows={4}
            className="w-full resize-none rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
          />
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Press Enter to reflect, Shift+Enter for new line
            </p>
            <button
              onClick={handleReflect}
              disabled={isButtonDisabled}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                isButtonDisabled
                  ? "cursor-not-allowed bg-zinc-200 text-zinc-400 dark:bg-zinc-700 dark:text-zinc-500"
                  : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              }`}
            >
              {isProcessing ? "Reflecting..." : "Let them reflect"}
            </button>
          </div>
        </div>

        {/* Three-column layout */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Left panel: ARC-0 (Grounding) */}
          <ArcPanel
            label="ARC-0"
            text={arc0Text}
            subtitle="Grounding perspective"
          />

          {/* Center panel: Middle Lens */}
          <CenterPanel
            mode={response.mode}
            text={response.centerText}
            hasSpark={response.hasSpark}
            delta={response.delta}
          />

          {/* Right panel: ARC-1 (Exploring) */}
          <ArcPanel
            label="ARC-1"
            text={arc1Text}
            subtitle="Exploring perspective"
          />
        </div>

        {/* State indicator (subtle) */}
        <div className="mt-6 text-center">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Current state: {response.userState} | Mode: {response.mode}
          </p>
        </div>
      </main>
    </div>
  );
}
