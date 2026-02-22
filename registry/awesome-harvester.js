const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const INDEX_DIR = path.join(__dirname, 'index'); // 절대 경로 사용 권장

const LinkHarvester = {
  parseMarkdown: (content) => {
    console.log(`\n📝 [Link Harvester] Markdown 분석 중...`);
    const lines = content.split('\n');
    const candidates = [];
    
    lines.forEach(line => {
      // 1. 리스트 패턴: (- 또는 *) [Name](URL) - Description
      const listMatch = line.match(/[\-\*]\s+\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)\s*(?:-|:|–)\s*(.+)/);
      if (listMatch) {
        candidates.push({ name: listMatch[1], url: listMatch[2], description: listMatch[3].trim() });
        return;
      }

      // 2. 테이블 패턴: | [Name](URL) | Description | ...
      // 예: | [Cat Facts](url) | Daily cat facts | ...
      const tableMatch = line.match(/\|\s*\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)\s*\|\s*([^\|]+)\s*\|/);
      if (tableMatch) {
        candidates.push({ name: tableMatch[1], url: tableMatch[2], description: tableMatch[3].trim() });
      }
    });
    return candidates;
  },

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

    if (!fs.existsSync(INDEX_DIR)) fs.mkdirSync(INDEX_DIR, { recursive: true });
    
    const filePath = path.join(INDEX_DIR, `${id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(manifest, null, 2));
    return manifest;
  }
};

module.exports = LinkHarvester;
