# Link Protocol Best Practices (v1.0)
> "전 세계 AI 에이전트가 당신의 서비스를 사랑하게 만드는 방법"

## 1. 표준 탐색 경로 (Discovery)
AI 에이전트나 브로커가 당신의 서비스를 가장 빨리 찾게 하려면, `link.json` 파일을 웹사이트 루트의 **`.well-known/`** 디렉토리에 위치시키세요.
- **권장 URL:** `https://your-service.com/.well-known/link.json`

## 2. AI 최적화 기술 (Writing for AI)
AI 브로커는 문맥을 읽습니다. 기술적인 `endpoint` 이름보다 `purpose`와 `intent` 설명이 훨씬 중요합니다.
- **Bad:** `intent: "get_data"`, `description: "데이터를 가져옵니다."`
- **Good:** `intent: "calculate_carbon_footprint"`, `description: "입력된 배송 거리와 무게를 바탕으로 탄소 배출량을 ISO 표준에 따라 계산합니다."`

## 3. 보안 및 인증 전략 (Security)
절대로 API 키나 비밀 정보를 `link.json`에 포함하지 마세요. 대신 **인증 스키마(Auth Schemes)**를 정의하세요.
- **권장 사항:** `requires: ["auth.bearer"]`와 같이 요구 사항을 정의하고, 실제 호출 시에는 에이전트가 안전한 Vault나 환경 변수에서 키를 가져오게 하세요.

## 4. 버전 관리 및 하위 호환성 (Versioning)
서비스 기능이 바뀌면 `protocol_version`과 별개로 `service_version`을 명시하세요.
- 새로운 기능이 추가되면 `capabilities` 배열에 새 항목을 추가하되, 기존 AI 에이전트가 깨지지 않도록 `deprecated` 필드를 활용하세요.

## 5. 레거시 어댑터 패턴 (Legacy Adapter Pattern)
기존 API 문서를 고칠 수 없는 경우, 해당 API 문서를 래핑하는 별도의 'Shadow Manifest'를 생성하여 중앙 저장소에 등록하는 방식을 권장합니다.
- 이는 `AI Extractor` 스킬을 사용하여 정기적으로 업데이트할 수 있습니다.

## 6. 검증 (Validation)
항상 `SCHEMA.json`을 사용하여 당신의 매니페스트가 표준을 준수하는지 확인하세요.
- **도구 추천:** `link-validator` (현재 제작 중)
