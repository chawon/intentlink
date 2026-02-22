const fs = require('fs');

const LinkValidator = {
  validate: (manifestPath) => {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    let score = 0;
    const details = [];

    console.log(`
🧐 [Link Validator v0.5] '${manifest.id}' 품질 검사 중...`);

    // 1. Schema Basic Check (40점)
    if (manifest.id && manifest.identity && manifest.offers) {
      score += 40;
      details.push("✅ 기본 스키마 구조 통과 (+40)");
    } else {
      details.push("❌ 기본 스키마 구조 불량 (+0)");
    }

    // 2. Semantic Richness (40점)
    const purposeLength = manifest.identity.purpose.length;
    if (purposeLength > 30) {
      score += 40;
      details.push(`✅ 풍부한 서비스 설명: ${purposeLength}자 (+40)`);
    } else if (purposeLength > 10) {
      score += 20;
      details.push(`⚠️  보통 수준의 서비스 설명: ${purposeLength}자 (+20)`);
    } else {
      details.push("❌ 너무 짧은 서비스 설명 (+0)");
    }

    // 3. Endpoint Liveness (20점)
    const hasValidEndpoints = manifest.offers.every(o => o.endpoint.startsWith('/'));
    if (hasValidEndpoints) {
      score += 20;
      details.push("✅ 유효한 엔드포인트 형식 (+20)");
    } else {
      details.push("❌ 유효하지 않은 엔드포인트 형식 (+0)");
    }

    console.log(`📊 최종 품질 점수: ${score}/100`);
    details.forEach(d => console.log(` - ${d}`));

    // 결과 업데이트
    manifest.confidence_score = score / 100;
    return manifest;
  }
};

// 테스트 실행
const filePath = process.argv[2];
if (filePath) {
  LinkValidator.validate(filePath);
}

module.exports = LinkValidator;
