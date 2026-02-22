# Skill: Link Extractor (v1.0.0)
> "웹상의 어떤 서비스라도 Link Protocol 규격으로 변환하는 전문가"

## 1. 개요 (Description)
이 스킬은 비정형화된 웹서비스 정보(HTML, README, API 문서)를 분석하여 `Link Protocol` 규격의 `link.json` 파일로 변환하는 데 특화되어 있습니다. 서비스의 정체성, 능력, 그리고 다른 서비스와의 잠재적 연결 고리를 찾아냅니다.

## 2. 분석 가이드라인 (Analysis Guidelines)
사용자가 웹사이트 URL이나 텍스트를 제공하면, 다음과 같은 사고 단계를 거칩니다:

### ① 정체성 추출 (Identity Extraction)
- 서비스의 이름과 **궁극적인 목적(Purpose)**을 한 문장으로 정의합니다.
- 단순한 기능 나열이 아닌, "사용자의 어떤 고통을 해결해주는가?"에 집중합니다.

### ② 능력 분류 (Capability Mapping)
- 핵심 API 엔드포인트를 `intent` 중심으로 분류합니다. (예: `POST /buy` -> `intent: execute_purchase`)
- 각 기능이 시스템 전체에서 어떤 역할을 하는지 설명합니다.

### ③ 의존성 추론 (Dependency Inference)
- **명시적 의존성:** API Key, 위치 정보 등 필요한 데이터.
- **암묵적 의존성:** "쇼핑몰이라면 결제와 배송이 필요할 것이다"라는 도메인 지식 기반의 추론.

## 3. 출력 형식 (Output Format)
반드시 `LINK_PROTOCOL.md`에 정의된 `link.json` 규격을 엄수해야 합니다.

## 4. 활용 도구 (Available Tools)
- `web_fetch`: 웹사이트의 내용을 읽어오기 위해 사용합니다.
- `write_file`: 분석된 결과를 `services/{service_id}.json`으로 저장합니다.

## 5. 예시 명령어
- "이 API 문서를 분석해서 Link Protocol로 변환해줘."
- "GitHub API를 우리 생태계에 추가해줘."
