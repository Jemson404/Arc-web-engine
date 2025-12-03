export function generateARC1Text(input: string): string {
  if (!input.trim()) {
    return 'I cannot explore possibilities until you give me something to explore.';
  }
  return [
    'From an expansive point of view, here is what opens up:',
    '',
    `• If you softened your framing of: "${input.trim()}", what else might it mean?`,
    '• What possibility feels quietly true but unspoken?',
    '• What angle haven\'t you allowed yourself to entertain yet?'
  ].join('\n');
}
