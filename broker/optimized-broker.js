const fs = require('fs');
const path = require('path');

// 이제 Public Catalog를 메인 소스로 사용합니다.
const CATALOG_PATH = path.join(__dirname, '../registry/public/catalog.json');

const OptimizedBroker = {
  // 1. 데이터 소스 로드 (Catalog)
  loadManifests: () => {
    if (fs.existsSync(CATALOG_PATH)) {
      // 카탈로그에는 요약 정보만 있으므로, 실제 검색 시에는 전체 파일을 읽거나 요약본으로 1차 필터링을 해야 함.
      // 여기서는 성능을 위해, 로컬에 있는 원본 파일들을 직접 읽습니다.
      const publicDir = path.join(__dirname, '../registry/public');
      return fs.readdirSync(publicDir)
        .filter(f => f.endsWith('.json') && f !== 'catalog.json')
        .map(f => JSON.parse(fs.readFileSync(path.join(publicDir, f), 'utf8')));
    }
    return [];
  },

  vectorSearch: (query, manifests) => {
    // manifests가 없으면 로드
    const targets = manifests || OptimizedBroker.loadManifests();
    
    console.log(`\n⚡ [Optimized Broker v0.9] ${targets.length}개 서비스 중 고속 검색...`);
    const q = query.toLowerCase();
    
    return targets.map(m => {
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
    console.log(`🛡️  [Optimized Broker] 정밀 랭킹 및 신뢰도 분석...`);
    
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
