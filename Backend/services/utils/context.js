// utils/context.js
export const CONTEXT_KEYWORDS = {
  exam: ["exam","study","revision","cgpa","marks","grade","semester"],
  career: ["job","career","interview","resume","linkedin","work","office","boss"],
  relationship: ["relationship","girlfriend","boyfriend","husband","wife","partner","breakup","love"],
  finance: ["money","pay","salary","debt","finance","loan","economy"],
  health: ["health","doctor","ill","sick","panic attack"]
};

export function detectContext(message) {
  const t = message.toLowerCase();
  for (const [ctx, kws] of Object.entries(CONTEXT_KEYWORDS)) {
    if (kws.some(k => t.includes(k))) return ctx;
  }
  return "general";
}

// sticky update: only change if 2 messages in a row indicate new context
export function updateStickyContext(session, message) {
  const newCtx = detectContext(message);
  if (!session.context) {
    session.context = newCtx;
    session.contextVotes = { [newCtx]: 1 };
    return session.context;
  }
  session.contextVotes = session.contextVotes || {};
  session.contextVotes[newCtx] = (session.contextVotes[newCtx] || 0) + 1;
  // require 2 votes to switch
  if (newCtx !== session.context && session.contextVotes[newCtx] >= 2) {
    session.context = newCtx;
    session.contextVotes = {}; // reset votes
  }
  // decay votes optionally (not shown)
  return session.context;
}
