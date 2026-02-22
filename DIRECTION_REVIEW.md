# Link Protocol Direction Review (2026-02-22)

## 1. 요약 판단

이 방향성은 **의미가 있다**. 문제 정의가 좋고, 특히 "API 호출"보다 더 어려운 문제인 **서비스 발견/해석/연결 설계**를 정면으로 다루고 있다.

다만 범위를 잘못 잡으면 실용성이 급격히 떨어진다.  
초기 제품 가치는 **완전 자율 실행**보다 **신뢰 가능한 반자동 연결 추천**에서 더 빠르게 나온다.

## 2. 왜 의미가 있는가

- 실제 연동 비용의 큰 부분은 기술 호출 자체보다 "무엇을 왜 연결할지" 결정하는 데 있다.
- `Intent`/`Capability` 중심 표현은 기존 endpoint 중심 문서보다 AI 브로커가 추론하기에 유리하다.
- `Legacy-first` + `AI Extractor` 전략은 채택 장벽을 낮춘다.

## 3. 실용성이 높은 구간 (강함)

- 사내 서비스 카탈로그 / 플랫폼 엔지니어링
- 특정 버티컬 생태계 (예: 커머스의 결제/배송/재고/CRM)
- 레거시 문서에서 `Shadow Manifest` 생성 후 연결 후보 추천
- 인간 승인(Human Approval) 전제의 `AI Broker` 추천 시스템

## 4. 실용성이 낮아지는 구간 (약함)

- 공개 웹 전체에서 신뢰 없는 서비스 간 자동 연결/실행
- 인증/권한/요금/약관/실패 semantics가 불명확한 상태의 오케스트레이션
- `intent` 설명만으로 실행 가능성까지 보장하려는 접근

## 5. 핵심 리스크

- **의미 표준화 부족:** 같은 기능을 서로 다른 표현으로 작성하면 매칭 품질이 흔들림
- **실행 계약 부족:** 자연어 설명만으로는 입력/출력/부작용/실패 처리 정의가 부족함
- **보안/승인 문제:** 특히 write/action 계열 작업은 승인 모델이 필요함
- **신선도(freshness):** `Shadow Manifest`가 문서 변경을 따라가지 못하면 금방 낡음
- **평가 지표 부재:** 정량 검증 없이 "좋아 보이는 아이디어"에 머물 위험

## 6. 권장 포지셔닝 (v1)

v1 목표를 `Autonomous Integration`보다 아래로 두는 것이 현실적이다.

- **권장:** `AI-assisted Discovery + Connection Proposal + Human Approval`
- **비권장(초기):** 무인 자동 실행까지 포함한 전면 자율 통합

## 7. 지금 문서/스펙에서 좋은 점

- `LINK_PROTOCOL.md`의 비전과 원칙은 명확함
- `AI_BROKER_SPEC.md`에서 브로커 출력 JSON (`Connection Proposal`)을 구조화한 점은 매우 좋음
- `BEST_PRACTICES.md`가 discovery / security / writing guidance를 분리해둔 점도 좋음

## 8. 바로 보완하면 실용성 올라가는 포인트 (v0.2 제안)

### 8.1 용어 정합성 통일

현재 문서 간에 `capabilities` 중심 표현과 `requires/provides` 표현이 혼재되어 있다.  
브로커 스펙과 프로토콜 스펙에서 같은 개념을 같은 이름으로 정리해야 한다.

### 8.2 Capability에 최소 실행 메타데이터 추가

각 capability에 아래 메타데이터를 추가하면 브로커 결과의 실행 가능성이 크게 올라간다.

- `inputs` / `outputs` (간단 schema)
- `auth` (예: bearer, oauth2, api_key)
- `side_effect` (`read` | `write`)
- `idempotency`
- `rate_limit_hint`
- `cost_hint`
- `freshness` / `last_verified_at`
- `confidence` (AI extractor 생성값일 경우 특히 중요)

### 8.3 브로커 출력에 리스크/승인 정보 추가

`Connection Proposal`에 아래 필드를 추가 권장:

- `risks`
- `assumptions`
- `required_approvals`
- `missing_information`

## 9. 반영 후 추가 점검 (2026-02-22)

문서 반영 방향은 전반적으로 좋아졌다. 특히 아래 2가지는 실용성 관점에서 개선 효과가 크다.

- v1 포지셔닝이 `Autonomous Integration` 중심에서 `AI-assisted Discovery + Connection Proposal + Human Approval` 중심으로 현실화됨
- `AI_BROKER_SPEC.md`의 `Connection Proposal` 출력에 `trust_and_safety` 블록(`risks`, `assumptions`, `required_approvals`, `missing_information`)이 추가됨

다만 현재는 "방향성 문제"보다 "정합성 마무리" 단계에 가깝고, 아래 3개를 정리하면 문서 품질이 더 안정된다.

### 9.1 프로토콜 문서 내부 용어 혼재 (`capabilities/dependencies` vs `offers/needs`)

- `LINK_PROTOCOL.md`의 핵심 필드 설명에서는 `capabilities` / `dependencies`를 사용하지만,
- 같은 문서의 JSON 예시와 `SCHEMA.json`은 `offers` / `needs`를 사용한다.

같은 개념을 여러 이름으로 표현하면 브로커/추출기 구현 시 매핑 규칙이 늘어나고, 문서 독자의 오해 가능성도 커진다.  
v0.2 기준 canonical 용어를 하나로 고정하는 것이 좋다.

### 9.2 브로커 스펙에 구용어 잔존 (`requires/provides`)

- `AI_BROKER_SPEC.md`의 사고 프로세스에는 아직 `requires` / `provides` 표현이 남아 있다.
- 현재 프로토콜 스키마 기준 용어(`needs` / `offers`)와 맞추는 것이 필요하다.

브로커 문서는 구현자에게 직접적인 영향을 주기 때문에, 이 부분의 용어 불일치는 실제 코드 레벨에서 필드명 드리프트를 만들 가능성이 높다.

### 9.3 문서 규칙과 스키마 규칙의 불일치 (`confidence_score`)

- 프로토콜 문서에서는 `confidence_score`가 "AI Extractor에 의해 생성된 경우 필수"라고 설명한다.
- 하지만 `SCHEMA.json`에서는 이 조건이 강제되지 않는다(조건부 required 부재).

선택지는 2가지다.

- 문서 표현을 완화해서 "권장"으로 낮추기
- 스키마를 조건부 검증(`if/then` 또는 별도 extractor profile)로 강화하기

초기 단계라면 문서-스키마 정합성을 우선 맞추는 것이 더 중요하다.

## 10. 결론

이 프로젝트는 "웹서비스 연결의 의미 계층"을 표준화하려는 시도로서 충분히 가치가 있다.  
성공 가능성을 높이려면 초기 범위를 좁히고, **발견/추천/승인** 문제를 먼저 풀어야 한다.

완전 자율 통합은 장기 로드맵으로 유지하되, 단기적으로는 **신뢰 가능한 브로커 제안 시스템**을 제품화 목표로 두는 것이 실용적이다.
