const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = './registry/public';
const CATALOG_FILE = './registry/public/catalog.json';

// 대표적인 유명 서비스 목록 (실제 Harvester가 수집했다고 가정)
const famousServices = [
  { id: "google-maps", name: "Google Maps Platform", purpose: "지도, 경로, 장소 정보를 제공하는 위치 기반 서비스", offers: ["location.map", "location.route"] },
  { id: "stripe-api", name: "Stripe", purpose: "인터넷 비즈니스를 위한 온라인 결제 처리 인프라", offers: ["finance.payment", "finance.subscription"] },
  { id: "slack-api", name: "Slack", purpose: "팀 협업 및 커뮤니케이션을 위한 메신저 플랫폼", offers: ["communication.message", "communication.channel"] },
  { id: "discord-api", name: "Discord", purpose: "음성, 영상, 텍스트 커뮤니케이션 서비스", offers: ["communication.voice", "communication.chat"] },
  { id: "openai-api", name: "OpenAI", purpose: "GPT 모델을 활용한 자연어 처리 및 이미지 생성 AI", offers: ["ai.text_generation", "ai.image_generation"] },
  { id: "notion-api", name: "Notion", purpose: "노트, 문서, 프로젝트 관리를 위한 올인원 워크스페이스", offers: ["productivity.document", "productivity.database"] },
  { id: "twilio-api", name: "Twilio", purpose: "SMS, 음성, 영상 통화를 위한 클라우드 통신 API", offers: ["communication.sms", "communication.call"] },
  { id: "sendgrid-api", name: "SendGrid", purpose: "이메일 마케팅 및 트랜잭션 이메일 발송 서비스", offers: ["communication.email"] }
];

// 1. 개별 link.json 생성
famousServices.forEach(s => {
  const manifest = {
    id: s.id,
    protocol_version: "0.2.0",
    identity: { name: s.name, purpose: s.purpose },
    offers: s.offers.map(intent => ({
      intent: intent,
      description: `${s.name}의 ${intent} 기능`,
      endpoint: "https://api.example.com/v1", // Placeholder
      method: "POST",
      side_effect: "state-change",
      auth_type: "bearer"
    })),
    needs: []
  };
  fs.writeFileSync(path.join(PUBLIC_DIR, `${s.id}.json`), JSON.stringify(manifest, null, 2));
  console.log(`✅ Registered: ${s.id}`);
});

// 2. 통합 카탈로그 생성 (Catalog)
const catalog = fs.readdirSync(PUBLIC_DIR)
  .filter(f => f.endsWith('.json') && f !== 'catalog.json')
  .map(f => {
    const m = JSON.parse(fs.readFileSync(path.join(PUBLIC_DIR, f), 'utf8'));
    return {
      id: m.id,
      name: m.identity.name,
      purpose: m.identity.purpose,
      url: `https://raw.githubusercontent.com/chawon/intentlink/main/registry/public/${f}` // 실제 배포 URL
    };
  });

fs.writeFileSync(CATALOG_FILE, JSON.stringify(catalog, null, 2));
console.log(`
📚 Catalog Updated: ${catalog.length} services indexed.`);
