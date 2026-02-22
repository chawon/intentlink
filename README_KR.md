# IntentLink: AI 에이전트를 위한 자율 웹 프로토콜
> "정적 링크(Static Link)는 문서를 연결하지만, 인텐트링크(IntentLink)는 의도(Intent)를 연결합니다."

이 프로젝트는 AI 에이전트 시대에 맞춰, 서비스 간의 발견과 통합을 자율화하는 새로운 웹 프로토콜 생태계입니다. 개발자가 일일이 API를 연결하는 수고를 덜고, AI가 스스로 필요한 서비스를 찾아 연결하는 세상을 만듭니다.

## 🚀 핵심 개념 (Key Concepts)
1. **IntentLink Protocol:** 서비스의 **의도(Purpose)**와 **능력(Capability)**을 정의하는 경량화된 명세서(`link.json`) 표준입니다.
2. **IntentLink Extractor (AI Skill):** 기존 웹 문서(HTML, README)를 분석하여 `link.json`을 자동으로 생성해 주는 AI 스킬입니다.
3. **IntentLink Broker:** 사용자의 의도를 파악하고, 수많은 서비스 중에서 최적의 연결을 제안하는 지능형 중개자입니다.

## 🏆 주요 성과 (v1.0 달성)
- **자율 추출:** OpenWeatherMap API 문서를 AI가 읽고 자동으로 명세서를 생성했습니다.
- **의도 기반 매칭:** "배송이 필요해"라는 서점의 의도를 파악하여 배송 서비스를 자동으로 매칭했습니다.
- **교차 호환성:** Gemini뿐만 아니라 Codex, Claude 등 다양한 AI 모델에서 동일하게 작동함을 검증했습니다.

## 💻 CLI 사용법 (CLI Usage)
NPM을 통해 CLI 도구를 설치하고 바로 시작해 보세요.

```bash
npm install -g intentlink-cli
```

### 1. 서비스 수집 (Harvest)
Awesome List나 마크다운 문서를 크롤링하여 서비스를 수집합니다.
```bash
intentlink harvest https://github.com/public-apis/public-apis
```

### 2. 의도 매칭 (Match)
원하는 기능을 자연어로 검색하면 최적의 서비스를 추천합니다.
```bash
intentlink match "날씨 확인하고 배송 보내고 싶어"
```

### 3. 연결 실행 (Run)
브로커가 제안한 연결 시나리오를 코드로 변환하거나 실행합니다.
```bash
intentlink run ./proposal.json
```

## 📚 표준 문서 (Standards)
- **[INTENTLINK_PROTOCOL.md](./INTENTLINK_PROTOCOL.md):** 프로토콜 정의서 (영문)
- **[ARCHITECTURE_KR.md](./ARCHITECTURE_KR.md):** 시스템 아키텍처 설명 (한글)
- **[SCHEMA.json](./SCHEMA.json):** 데이터 검증을 위한 JSON 스키마

---
*Created with IntentLink - 의도를 연결하여 세상을 바꿉니다.*
