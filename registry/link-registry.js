const fs = require('fs');
const path = require('path');

const INDEX_DIR = './registry/index';

const LinkRegistry = {
  // 1. 서비스 등록 (Index)
  register: (manifest) => {
    const filePath = path.join(INDEX_DIR, `${manifest.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(manifest, null, 2));
    console.log(`✅ [Registry Index] '${manifest.id}' 서비스 등록 완료!`);
  },

  // 2. 서비스 검색 (Search)
  search: (keyword) => {
    console.log(`
🔍 [Registry Search] '${keyword}' 관련 서비스 검색 중...`);
    const results = [];
    const files = fs.readdirSync(INDEX_DIR);

    files.forEach(file => {
      const manifest = JSON.parse(fs.readFileSync(path.join(INDEX_DIR, file), 'utf8'));
      const text = (manifest.identity.purpose + ' ' + (manifest.offers?.map(o => o.intent).join(' ') || '')).toLowerCase();
      
      if (text.includes(keyword.toLowerCase())) {
        results.push(manifest);
      }
    });

    if (results.length > 0) {
      console.log(`✨ 검색 결과: ${results.length}개의 서비스를 찾았습니다.`);
      results.forEach(r => console.log(` - [${r.id}] ${r.identity.name}: ${r.identity.purpose}`));
    } else {
      console.log(`❌ 일치하는 서비스를 찾을 수 없습니다.`);
    }
    return results;
  },

  // 3. GitHub Awesome 리스트에서 탐색 (Crawl Simulation)
  discoverFromSeed: async (seedName) => {
    console.log(`
🌐 [Registry Discover] '${seedName}' 시드에서 서비스 탐색 중...`);
    // 시뮬레이션: Awesome 리스트에서 서비스 URL을 발견했다고 가정
    const discovered = [
      { url: "https://api.github.com", id: "github-api" },
      { url: "https://openweathermap.org", id: "openweather-api" }
    ];

    console.log(`👀 발견된 서비스: ${discovered.length}개. 인덱싱을 시작합니다...`);
    // 실제로는 여기서 web_fetch로 link.json을 확인하거나 Extractor를 호출함
    return discovered;
  }
};

// 커맨드라인 인터페이스 (예: node registry/link-registry.js search "weather")
const args = process.argv.slice(2);
if (args[0] === 'search') {
  LinkRegistry.search(args[1]);
} else if (args[0] === 'index-all') {
  // 기존 services/ 폴더의 파일들을 인덱스에 복사 (초기화)
  const services = fs.readdirSync('./services');
  services.forEach(s => {
    const manifest = JSON.parse(fs.readFileSync(`./services/${s}`, 'utf8'));
    LinkRegistry.register(manifest);
  });
}

module.exports = LinkRegistry;
