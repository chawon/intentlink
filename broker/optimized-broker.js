const fs = require('fs');
const path = require('path');

const INDEX_DIR = './registry/index';

const OptimizedBroker = {
  // 1. Stage 1: Vector-like Semantic Search (Keyword Cluster)
  // 실제 임베딩 모델 대신 키워드 가중치를 통해 고속 검색을 수행합니다.
  vectorSearch: (query, manifests) => {
    console.log(`
⚡ [Optimized Broker] 1단계: 고속 매칭 검색 중...`);
    const q = query.toLowerCase();
    return manifests.map(m => {
      let score = 0;
      const text = (m.identity.name + " " + m.identity.purpose + " " + m.offers.map(o => o.intent).join(" ")).toLowerCase();
      
      // 키워드 가중치 부여
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

  // 2. Stage 2: Deep Ranking (Match + Confidence)
  // 발견된 후보들을 정밀 분석하여 최종 순위를 매깁니다.
  rankResults: (candidates, userNeeds) => {
    console.log(`🛡️  [Optimized Broker] 2단계: 정밀 랭킹 및 신뢰도 분석 중...`);
    
    return candidates.map(c => {
      const m = c.manifest;
      let matchScore = 0;

      // 요구사항 일치도 계산 (Needs vs Offers)
      const offersIntents = m.offers.map(o => o.intent.toLowerCase());
      userNeeds.forEach(need => {
        if (offersIntents.some(oi => oi.includes(need.toLowerCase()))) {
          matchScore += 1 / userNeeds.length;
        }
      });

      // 최종 랭킹 = (매칭 점수 * 0.7) + (데이터 신뢰도 * 0.3)
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

// 실전 테스트: "weather"와 "shipping"이 필요한 상황 가정
const registryFiles = fs.readdirSync(INDEX_DIR);
const allManifests = registryFiles.map(f => JSON.parse(fs.readFileSync(path.join(INDEX_DIR, f), 'utf8')));

const query = "shipping weather";
const needs = ["shipping", "weather"];

const stage1 = OptimizedBroker.vectorSearch(query, allManifests);
const finalRanking = OptimizedBroker.rankResults(stage1, needs);

console.log(`
🏆 [최종 추천 리스트]`);
finalRanking.forEach((res, i) => {
  console.log(`${i+1}. [${res.id}] 점수: ${res.finalScore} (매칭: ${res.matchScore}, 신뢰도: ${res.confidence})`);
  console.log(`   └ ${res.purpose}`);
});
