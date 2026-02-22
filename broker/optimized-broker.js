const fs = require('fs');
const path = require('path');

const OptimizedBroker = {
  vectorSearch: (query, manifests) => {
    console.log(`\n⚡ [Optimized Broker] 1단계: 고속 매칭 검색 중...`);
    const q = query.toLowerCase();
    return manifests.map(m => {
      let score = 0;
      const text = (m.identity.name + " " + m.identity.purpose + " " + (m.offers ? m.offers.map(o => o.intent).join(" ") : "")).toLowerCase();
      
      if (text.includes(q)) score += 0.5;
      const queryWords = q.split(" ");
      queryWords.forEach(word => {
        if (text.includes(word)) score += 0.1;
      });

      return { manifest: m, vectorScore: score };
    })
    .filter(res => res.vectorScore > 0)
    .sort((a, b) => b.vectorScore - a.vectorScore);
  },

  rankResults: (candidates, userNeeds) => {
    console.log(`🛡️  [Optimized Broker] 2단계: 정밀 랭킹 및 신뢰도 분석 중...`);
    
    return candidates.map(c => {
      const m = c.manifest;
      let matchScore = 0;

      const offersIntents = (m.offers || []).map(o => o.intent.toLowerCase());
      userNeeds.forEach(need => {
        if (offersIntents.some(oi => oi.includes(need.toLowerCase()))) {
          matchScore += 1 / userNeeds.length;
        }
      });

      const confidence = m.confidence_score || 0.5;
      const finalScore = (matchScore * 0.7) + (confidence * 0.3);

      return {
        id: m.id,
        name: m.identity.name,
        finalScore: finalScore.toFixed(2),
        matchScore: matchScore.toFixed(2),
        confidence: confidence.toFixed(2),
        purpose: m.identity.purpose
      };
    })
    .sort((a, b) => b.finalScore - a.finalScore);
  }
};

module.exports = OptimizedBroker;
