export function generateARC0Text(input: string): string {
  if (!input.trim()) {
    return 'I do not have anything to ground yet, because you have not shared a thought.';
  }
  return [
    'From a grounded point of view, here is what stands out:',
    '',
    `• You are focusing on: "${input.trim()}"`,
    '• What feels undeniably real about this?',
    '• What consequences are already unfolding as things stand?'
  ].join('\n');
}
