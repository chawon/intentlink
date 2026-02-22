const fs = require('fs');

const LinkConnector = {
  // 1. 인증 로직 생성기
  generateAuthSnippet: (authType, serviceId) => {
    const safeId = serviceId.replace(/-/g, '_');
    const envVar = serviceId.toUpperCase().replace(/-/g, '_');
    
    switch(authType) {
      case 'api_key':
        return `const ${safeId}_key = process.env.${envVar}_KEY;`;
      case 'bearer':
        return `const ${safeId}_token = process.env.${envVar}_TOKEN;`;
      default:
        return '// No auth required';
    }
  },

  // 2. 실제 연동 코드 생성기
  generateCode: (proposalPath) => {
    const p = JSON.parse(fs.readFileSync(proposalPath, 'utf8'));
    console.log(`\n🛠️  [Link Connector v0.8] '${p.proposal_id}' 연동 코드 생성 중...`);

    let code = `/**\n * Generated Integration Code for Link Protocol\n * Summary: ${p.summary}\n */\n\nconst axios = require('axios');\n\n`;

    // 1단계: 인증 정보 생성
    code += LinkConnector.generateAuthSnippet('api_key', 'flash-ship') + '\n\n';

    code += `async function executeLink() {\n  try {\n`;

    // 2단계: 브릿지 단계별 실행 코드 생성
    p.bridge.forEach((b, i) => {
      code += `    // Step ${i+1}: ${b.source_need} -> ${b.target_capability}\n`;
      code += `    console.log('실행 중: ${b.implementation_hint}');\n\n`;
      
      if (b.target_capability === 'request_delivery') {
        code += `    // 1. 배송비 계산 요청\n`;
        code += `    const calcResponse = await axios.post('/api/v1/calc', { weight: 1.5, distance: 10 });\n`;
        code += `    console.log('배송비:', calcResponse.data.fee);\n\n`;
        
        code += `    // 2. 최종 배송 의뢰\n`;
        code += `    const shipResponse = await axios.post('/api/v1/ship', { \n      headers: { 'Authorization': 'Bearer ' + flash_ship_key },\n      data: { item: '어린왕자 초판본' }\n    });\n`;
        code += `    console.log('최종 결과:', shipResponse.data.tracking_id);\n`;
      }
    });

    code += `  } catch (error) {\n    console.error('연동 도중 오류 발생:', error.message);\n  }\n}\n\n// executeLink(); // Uncomment to run`;

    const outputPath = `connector/generated_${p.proposal_id.slice(0,8)}.js`;
    if (!fs.existsSync('connector')) fs.mkdirSync('connector');
    fs.writeFileSync(outputPath, code);
    
    console.log(`✅ [Link Connector] 코드 생성 완료: ${outputPath}`);
    return code;
  }
};

const proposalPath = process.argv[2] || 'examples/book-ship-proposal.json';
if (fs.existsSync(proposalPath)) {
  LinkConnector.generateCode(proposalPath);
} else {
  console.error(`Error: Proposal file not found at ${proposalPath}`);
}
