# IntentLink Ecosystem Dashboard (v0.9.9)
> "의도(Intent)로 연결된 서비스들의 실시간 매칭 지도"

## 🌐 서비스 연결 신경망 (Service Neural Map)

```mermaid
graph TD
    %% 서비스 노드 정의
    Bookstore[("📚 글로벌 북스토어<br/>(global-books)")]
    Delivery[("🚚 번개 배송<br/>(flash-ship)")]
    Weather[("☁️ OpenWeather<br/>(openweather-api)")]
    GitHub[("💻 GitHub<br/>(github-api)")]
    OTT[("🎬 OTT Preview<br/>(ott-preview-pe-kr)")]

    %% 연결 관계 (Intent Edges)
    
    %% 1. 물류 연결 (API, state-change)
    Bookstore -- "Intent: logistics.shipping<br/>(API / Match: 0.92)" --> Delivery
    
    %% 2. 마케팅 연결 (API, read-only)
    Bookstore -. "Intent: environment.weather<br/>(API / Match: 0.85)" .-> Weather
    
    %% 3. 운영/백업 연결 (API, state-change)
    Bookstore -- "Intent: devops.vcs<br/>(API / Match: 0.78)" --> GitHub
    
    %% 4. 고객 경험 연결 (UI-Web, state-change)
    Bookstore == "Intent: book.metadata.record<br/>(UI-Web / Match: 0.88)" ==> OTT

    %% 스타일 정의
    style Bookstore fill:#f9f,stroke:#333,stroke-width:4px
    style OTT fill:#bbf,stroke:#333,stroke-width:2px
    style Delivery fill:#dfd,stroke:#333,stroke-width:2px
```

## 📊 생태계 통계 (Ecosystem Stats)

| 서비스 ID | 신뢰도(Confidence) | 주요 상호작용 모드 | 상태 |
| :--- | :--- | :--- | :--- |
| `global-books` | 0.80 | API | Active |
| `flash-ship` | 0.90 | API, UI-Web | Active |
| `openweather-api` | 0.95 | API | Active |
| `github-api` | 0.90 | API | Active |
| `ott-preview-pe-kr` | 0.96 | UI-Web, API | Active |

## 💡 최근 브로커 통찰 (Recent Broker Insights)
- **최고의 시너지:** `global-books` + `ott-preview-pe-kr` (구매 즉시 기록 연동으로 고객 리텐션 25% 향상 기대)
- **보안 알림:** `flash-ship`과의 연결 시 `state-change` 작업에 대한 인간 승인 절차(Human-in-the-loop)가 활성화되어 있습니다.
- **확장 제안:** `ott-preview-pe-kr`의 공유 카드 생성 기능을 `github-api`의 리포지토리 메인 이미지(OG Image)로 자동 등록하는 새로운 경로를 탐색 중입니다.
