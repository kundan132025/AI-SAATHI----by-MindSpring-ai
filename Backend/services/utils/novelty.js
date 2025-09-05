// utils/novelty.js
function normalize(s){
  return s.toLowerCase().replace(/[^a-z0-9\s]/g,'').replace(/\s+/g,' ').trim();
}
function trigrams(s){
  s = `  ${s}  `;
  const t = [];
  for (let i=0;i<s.length-2;i++) t.push(s.slice(i,i+3));
  return new Set(t);
}
export function jaccard(a,b){
  const A = trigrams(normalize(a));
  const B = trigrams(normalize(b));
  const inter = [...A].filter(x=>B.has(x)).length;
  const union = new Set([...A, ...B]).size || 1;
  return inter/union;
}
export function isSimilar(a,b,threshold=0.45){
  return jaccard(a,b) >= threshold;
}
