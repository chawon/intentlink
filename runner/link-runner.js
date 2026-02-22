const fs = require('fs');
const readline = require('readline');
const MockServices = require('./mock-services');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function runProposal(proposalPath) {
  const proposal = JSON.parse(fs.readFileSync(proposalPath, 'utf8'));

  console.log(`
🚀 [Link Runner v0.3] 실행을 시작합니다...`);
  console.log(`- 제안 ID: ${proposal.proposal_id}`);
  console.log(`- 연결 대상: ${proposal.summary}`);

  // 1. 신뢰 및 안전성(Trust & Safety) 검토
  console.log(`
⚠️  [보안 및 안전성 검토]`);
  proposal.trust_and_safety.risks.forEach(risk => console.log(`- 리스크: ${risk}`));
  proposal.trust_and_safety.required_approvals.forEach(appr => console.log(`- 승인 필요: ${appr}`));

  const confirm = await new Promise((resolve) => {
    rl.question(`
위 내용을 확인하고 실행을 승인하시겠습니까? (Y/N): `, resolve);
  });

  if (confirm.toUpperCase() !== 'Y') {
    console.log(`
❌ [실행 중단] 사용자가 승인을 거절했습니다.`);
    rl.close();
    return;
  }

  // 2. 브릿지(Bridge) 실행
  console.log(`
⚙️  [연동 실행 중...]`);
  for (const bridge of proposal.bridge) {
    console.log(`
🔹 [단계: ${bridge.source_need} -> ${bridge.target_capability}]`);
    console.log(`- 실행 방식: ${bridge.interaction_type}`);
    console.log(`- 힌트: ${bridge.implementation_hint}`);

    if (bridge.side_effect === 'state-change') {
      console.log(`- [상태 변경 감지] 이 작업은 기록을 남기고 비용을 발생시킵니다.`);
    }

    // 시뮬레이션: 배송사 Mock 호출
    if (bridge.target_capability === 'request_delivery') {
      const calcResult = MockServices["flash-ship"]["/api/v1/calc"]({ weight: 1.5, distance: 10 });
      console.log(`   └ 배송비 결과: ${calcResult.fee} ${calcResult.currency}`);
      
      const shipResult = MockServices["flash-ship"]["/api/v1/ship"]({ item: "어린왕자 초판본" });
      console.log(`   └ 최종 결과: 송장번호 ${shipResult.tracking_id} 발급 성공!`);
    }
  }

  console.log(`
✅ [전체 연동 완료] 모든 제안된 단계가 성공적으로 실행되었습니다.`);
  rl.close();
}

// 테스트 실행을 위한 커맨드라인 매개변수
const proposalFile = process.argv[2] || 'examples/book-ship-proposal.json';
runProposal(proposalFile);
