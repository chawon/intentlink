const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const INDEX_DIR = './registry/index';

const LinkHarvester = {
  // Markdown의 [이름](URL) - 설명을 추출하는 함수
  parseMarkdown: (content) => {
    console.log(`\n📝 [Link Harvester] Markdown 분석 중...`);
    const lines = content.split('\n');
    const candidates = [];
    
    lines.forEach(line => {
      // 패턴: - [Name](URL) - Description
      const match = line.match(/-\s\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)\s+-\s+(.+)/);
      if (match) {
        candidates.push({
          name: match[1],
          url: match[2],
          description: match[3].trim()
        });
      }
    });
    return candidates;
  },

  // 발견된 후보를 Shadow Manifest로 변환하여 저장
  createShadowManifest: (candidate) => {
    const id = candidate.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const manifest = {
      id: id,
      protocol_version: "0.2.0",
      identity: {
        name: candidate.name,
        purpose: candidate.description
      },
      offers: [
        {
          intent: "use_api",
          description: `가상의 기본 엔드포인트: ${candidate.url}`,
          endpoint: "/",
          method: "GET",
          side_effect: "read-only",
          auth_type: "api_key",
          confidence_score: 0.5
        }
      ],
      needs: [
        { "intent": "identity.api_key", "criticality": "required" }
      ]
    };

    const filePath = path.join(INDEX_DIR, `${id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(manifest, null, 2));
    return manifest;
  }
};

// 테스트용 샘플 데이터
const sampleMarkdown = `
- [Cat Facts](https://alexwohlbruck.github.io/cat-facts/) - Daily cat facts
- [Dog API](https://dog.ceo/dog-api/) - Access to images of dogs
- [OpenWeather](https://openweathermap.org/) - Weather forecasting services
`;

if (!fs.existsSync(INDEX_DIR)) fs.mkdirSync(INDEX_DIR, { recursive: true });

const candidates = LinkHarvester.parseMarkdown(sampleMarkdown);
console.log(`✨ 발견된 서비스 후보: ${candidates.length}개`);

candidates.forEach(c => {
  const m = LinkHarvester.createShadowManifest(c);
  console.log(`✅ [Shadow Manifest] '${m.id}' 등록 완료!`);
  
  // Validator 실행
  try {
    const output = execSync(`node validator/link-validator.js registry/index/${m.id}.json`).toString();
    console.log(output);
  } catch (e) {
    console.error("Validator 실행 오류");
  }
});
