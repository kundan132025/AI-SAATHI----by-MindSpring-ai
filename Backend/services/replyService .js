// in replyService (pseudo)
import { responseBank } from "./ResponseBank/index.js";
import { isSimilar } from "./utils/novelty.js";

function pickNovelIdea(session, context, maxAttempts=50){
  // prefer ideas that mention context keywords (simple filter)
  const pool = responseBank.microIdeas.slice(); // array
  // score by context keyword presence
  const contextKw = context; // e.g. 'exam' etc.
  // simple scoring: prefer ideas containing context keywords (not necessary)
  const scored = pool.map(idea => {
     const score = (idea.toLowerCase().includes(contextKw) ? 2 : 0) + Math.random();
     return { idea,score };
  }).sort((a,b)=>b.score-a.score);

  for (const {idea} of scored){
    const used = session.usedIdeas || [];
    const dup = used.some(u => isSimilar(u, idea));
    if (!dup) {
      session.usedIdeas = [...used, idea].slice(-50); // keep last 50
      return idea;
    }
  }
  // if everything similar, fallback: choose least-similar idea
  let best = null, bestSim=1;
  for (const idea of pool){
    const used = session.usedIdeas || [];
    const s = Math.max(...used.map(u=>isSimilar(u,idea)?1:0));
    if (s < bestSim) { best = idea; bestSim = s; }
  }
  if (best) {
    session.usedIdeas = [...(session.usedIdeas||[]), best].slice(-50);
    return best;
  }
  // final fallback: random
  return pool[Math.floor(Math.random()*pool.length)];
}
