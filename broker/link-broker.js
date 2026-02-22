const fs = require('fs');
const path = require('path');

function broker(serviceAPath, serviceBPath) {
  const serviceA = JSON.parse(fs.readFileSync(serviceAPath, 'utf8'));
  const serviceB = JSON.parse(fs.readFileSync(serviceBPath, 'utf8'));

  console.log(`
🔍 [Link Broker] 탐색 중...`);
  console.log(`- 서비스 A: ${serviceA.identity.name} (${serviceA.id})`);
  console.log(`- 서비스 B: ${serviceB.identity.name} (${serviceB.id})`);

  // 매칭 로직 (MVP: 단순 키워드 매칭)
  const aNeeds = serviceA.dependencies?.requires || [];
  const bProvides = serviceB.provides || [];

  const matches = aNeeds.filter(need => bProvides.includes(need));

  if (matches.length > 0) {
    console.log(`
✅ [매칭 성공!]`);
    matches.forEach(match => {
      console.log(`💡 ${serviceA.id}의 필요 사항 '${match}'를 ${serviceB.id}가 제공할 수 있습니다.`);
    });

    console.log(`
🤖 [AI 분석 의견]`);
    console.log(`- "${serviceA.identity.purpose}"를 달성하기 위해 "${serviceB.identity.purpose}"와 연결하는 것은 매우 적절합니다.`);
    console.log(`- 연결 전략: ${serviceB.capabilities.find(c => c.intent.includes('ship'))?.endpoint}를 호출하여 배송 처리를 자동화하세요.`);
  } else {
    console.log(`
❌ [매칭 실패] 직접적인 연결 고리를 찾을 수 없습니다.`);
  }
}

// 테스트 실행
const args = process.argv.slice(2);
broker(args[0], args[1]);
