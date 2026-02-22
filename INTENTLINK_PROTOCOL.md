# IntentLink Protocol (v0.2.0)
> "수백만 개의 웹서비스를 정적 링크(Hyperlink)를 넘어 지능적(IntentLink)으로 연결한다."

## 1. 비전 (Vision)
IntentLink는 AI 에이전트가 웹서비스의 **의도(Intent)**와 **능력(Capability)**을 이해하고, 실시간으로 최적의 서비스를 찾아 자율적으로 연결하는 **'살아있는 웹(Active Web)'**을 지향합니다.

## 2. 핵심 원칙 (Core Principles)
1. **의도 중심 (Intent-based):** "어떻게 호출하는가"보다 "무엇을 해결하려 하는가"를 우선 정의합니다.
2. **지능적 중개 (IntentLink Brokerage):** 연결의 주체는 개발자가 아닌 AI 에이전트입니다.
3. **하위 호환성 (Legacy-first):** 기존 웹서비스가 프로콜을 채택하지 않아도, AI가 '어댑터'를 통해 이들을 생태계로 끌어들입니다.

## 3. 프로토콜 규격: `link.json` (v0.2.0)
모든 서비스는 자신을 설명하는 **`link.json`** 파일을 가집니다.

### 핵심 필드 정의:
- **`id`**: 서비스의 고유 식별자.
- **`identity`**: 서비스의 이름과 비즈니스 목적(`purpose`).
- **`offers`**: 서비스가 제공하는 구체적인 기능.
- **`needs`**: 서비스가 작동하기 위해 외부에서 필요한 기능.

### 상호작용 타입 (Interaction Types):
- **`api`**: REST/JSON-RPC 등 기계 간 통신.
- **`ui-web`**: 사용자가 직접 조작할 수 있는 웹 페이지 주소.
- **`deep-link`**: 특정 모바일 앱이나 데스크탑 앱의 액션 링크.
- **`embed`**: 웹사이트 내에 삽입 가능한 위젯 형태.
