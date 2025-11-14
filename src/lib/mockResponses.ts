import { SparkSummary } from '@/types/arc';

const arc0Responses = [
  "Let's approach this systematically. What are the concrete factors to consider?",
  "Have you evaluated the potential risks and prepared contingency plans?",
  "What does the data or evidence suggest about this situation?",
  "Consider the worst-case scenario. How would you handle it?",
  "What resources do you actually have available for this?",
  "Have you looked at similar situations and their outcomes?",
  "What are the measurable indicators of success here?",
  "Let's break this down into smaller, manageable steps.",
  "What assumptions are you making that might not be true?",
  "How would you test this hypothesis before fully committing?"
];

const arc1Responses = [
  "What if the opposite is true? Let's explore unconventional possibilities!",
  "Think about the most exciting outcome - what would that look like?",
  "What would you do if failure wasn't even a possibility?",
  "Imagine this works perfectly - what doors would open up?",
  "What's the boldest version of this idea you can envision?",
  "If you had unlimited resources, how would you approach this?",
  "What would inspire someone to join this vision?",
  "Think bigger - what if this could impact thousands of people?",
  "What's the most innovative way to solve this?",
  "If you remove all constraints, what becomes possible?"
];

const reconciliationTemplates = [
  "You need both caution and courage. {nextStep}",
  "Security and growth aren't mutually exclusive. {nextStep}",
  "Balance practicality with ambition. {nextStep}",
  "Consider both the immediate and the long-term. {nextStep}",
  "Your analytical and creative sides both have wisdom. {nextStep}"
];

const nextStepTemplates = [
  "Test your idea small-scale first.",
  "Create a timeline that honors both approaches.",
  "Set up checkpoints to evaluate progress.",
  "Build a prototype to validate assumptions.",
  "Research similar cases for insights.",
  "Consult with trusted advisors.",
  "Document your plan with measurable milestones.",
  "Start with the easiest win to build momentum.",
  "Create a backup plan before proceeding.",
  "Gather more data before deciding."
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}


export function getArc0Reply(prompt: string): string {
  const baseResponse = getRandomElement(arc0Responses);

  // Add context-aware variations based on prompt keywords
  if (prompt.toLowerCase().includes('risk') || prompt.toLowerCase().includes('danger')) {
    return "Risk assessment is crucial here. Let's identify potential failure points and mitigation strategies first.";
  }

  if (prompt.toLowerCase().includes('career') || prompt.toLowerCase().includes('job')) {
    return "Career decisions require careful analysis. What's your current skill set and market demand like?";
  }

  if (prompt.toLowerCase().includes('relationship') || prompt.toLowerCase().includes('love')) {
    return "Relationships need both emotional intelligence and practical compatibility. Have you discussed core values?";
  }

  return baseResponse;
}

export function getArc1Reply(prompt: string): string {
  const baseResponse = getRandomElement(arc1Responses);

  // Add context-aware variations based on prompt keywords
  if (prompt.toLowerCase().includes('risk') || prompt.toLowerCase().includes('danger')) {
    return "Risks are where the greatest opportunities hide! What if this danger is actually a signpost to something amazing?";
  }

  if (prompt.toLowerCase().includes('career') || prompt.toLowerCase().includes('job')) {
    return "Your career could be a canvas for your passions! What work would you do even if nobody paid you?";
  }

  if (prompt.toLowerCase().includes('relationship') || prompt.toLowerCase().includes('love')) {
    return "Love could be the adventure that transforms you! What if this connection helps you discover parts of yourself you never knew?";
  }

  return baseResponse;
}

export function getSparkSummary(arc0Reply: string, arc1Reply: string): SparkSummary {
  const reconciliation = getRandomElement(reconciliationTemplates);
  const nextStep = getRandomElement(nextStepTemplates);

  // Create reconciliation based on the actual responses
  let finalReconciliation = reconciliation;

  if (arc0Reply.toLowerCase().includes('systematically') && arc1Reply.toLowerCase().includes('unconventional')) {
    finalReconciliation = `Your systematic thinking and creative vision both serve you. ${nextStep}`;
  } else if (arc0Reply.toLowerCase().includes('data') && arc1Reply.toLowerCase().includes('imagine')) {
    finalReconciliation = `Both evidence and imagination are valuable. ${nextStep}`;
  }

  return {
    reconciliation: finalReconciliation.replace('{nextStep}', ''),
    nextStep: nextStep
  };
}