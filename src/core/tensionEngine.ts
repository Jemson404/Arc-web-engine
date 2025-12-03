export function computeTension(arc0: string, arc1: string): number {
  if (!arc0.trim() || !arc1.trim()) return 0;
  const t0 = new Set(arc0.toLowerCase().split(/\W+/).filter(Boolean));
  const t1 = new Set(arc1.toLowerCase().split(/\W+/).filter(Boolean));
  const intersect = [...t0].filter(t => t1.has(t)).length;
  const union = new Set([...t0, ...t1]).size || 1;
  return 1 - intersect / union;
}
