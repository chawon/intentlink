# IntentLink Broker Specification (v0.2.0)
> "서로 다른 서비스의 의도를 해석하고 최적의 연결 고리를 제안하는 IntentLink AI 에이전트를 위한 지침서"

## 1. IntentLink 브로커의 역할 (The Role)
IntentLink 브로커는 단순한 데이터 매칭 엔진이 아닙니다. 서비스 간의 **'의도(Intent)'**와 **'비즈니스 가치(Value)'**를 해석하여, 개발자가 미처 생각하지 못한 창의적인 연결을 제안하는 **'전략적 파트너'**입니다.

## 2. 입력 규격 (Standard Inputs)
브로커는 다음 정보를 바탕으로 판단을 시작합니다:
- **Service Manifests:** 연결 대상 서비스들의 **`link.json`** 파일들.
- **Context/Goal (Optional):** 사용자가 달성하고자 하는 구체적인 비즈니스 목표.

## 3. 핵심 사고 프로세스 (Thinking Process)
브로커는 다음 3단계를 거쳐 분석해야 합니다:
1. **Direct Match:** `needs`와 `offers`의 명시적 키워드 일치 여부 확인.
2. **Semantic Expansion:** 필요한 기능(`needs`)이 있다면 유의어/관련 카테고리를 제공하는 서비스(`offers`)와도 매칭 시도.
3. **Purpose Alignment:** 서비스 A의 존재 이유(Purpose)가 서비스 B의 능력(Offers)을 통해 강화될 수 있는지 추론.
