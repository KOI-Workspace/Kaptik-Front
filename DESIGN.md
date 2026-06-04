---
name: Lavender Pulse
product: Kaptik
colors:
  primary: "#8B5CF6"
  primary-deep: "#7C3AED"
  secondary: "#EC4899"
  surface: "#FFFFFF"
  surface-soft: "#FAFAFA"
  on-surface: "#0A0A0A"
  on-surface-muted: "#525252"
  border: "#EAEAEA"
  error: "#DC2626"
typography:
  display:
    fontFamily: Pretendard
    fontSize: 32px
    fontWeight: 700
    letterSpacing: -0.02em
  body-md:
    fontFamily: Pretendard
    fontSize: 14px
    fontWeight: 400
  label:
    fontFamily: Pretendard
    fontSize: 12px
    fontWeight: 500
rounded:
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  pill: 9999px
---

# Kaptik Design System — Lavender Pulse

## Overview

Kaptik은 K-pop 팬을 위한 실시간 자막 번역 서비스다. Bubble·Weverse·YouTube 등 다양한 플랫폼의 라이브 자막을 화자 구분, 팬덤 용어, K-pop 맥락까지 반영한 정확한 번역으로 바꿔준다. 타깃 사용자는 전 세계 글로벌 K-pop 팬이며, UI 언어는 영어 기반이다.

디자인 시스템 이름은 **Lavender Pulse**. 흰 캔버스 위에 라벤더 보라가 정확하게 찍히는 구조다.

**한 줄로**: 흰 종이 위에 정확하게 떨어지는 보라색 잉크 한 방울.

핵심 원칙 세 가지:
1. **흰 캔버스 우선** — 컬러는 메시지가 있을 때만 등장한다
2. **보라는 기능, 핑크는 감정** — 둘은 절대 동등하지 않다
3. **Pretendard 하나로 충분** — 폰트 다양성보다 위계의 명확함이 먼저다

## Colors

### 시그널 컬러 (Signal — 의미가 있는 색)

- **Primary `#8B5CF6`**: 포커스 링, 활성/선택 상태, 인라인 액션, 캐러셀 인디케이터. "지금 여기" 신호
- **Primary Deep `#7C3AED`**: 강조 텍스트, 링크, 호버 시 깊어지는 보라
- **Secondary `#EC4899`**: 액센트. 일러스트 디테일, info 배지. **CTA에는 절대 쓰지 않는다**
- **Error `#DC2626`**: 파괴적 액션, 삭제 확인. 보라/핑크와 절대 섞지 않는다

### 베이스 컬러 (Base — 침묵하는 색)

- **Surface `#FFFFFF`**: 메인 캔버스. 비어있어 보이는 게 정상이다
- **Surface Soft `#FAFAFA`**: 보조 패널. 구역만 나누고 사라진다
- **On-surface `#0A0A0A`**: 본문. 검정에 가깝지만 완전한 검정은 아니다
- **On-surface Muted `#525252`**: 메타 정보, 설명문, 비활성 라벨
- **Border `#EAEAEA`**: 거의 보이지 않는 경계. 강조하지 말 것

### 컬러 사용 비율 가이드 (60-30-10 변형)

```
흰색·니어블랙 ████████████████████████████████  70%
보라 (Primary)  ████████░░░░░░░░░░░░░░░░░░░░░░  20%
회색 (Border·Muted) ████░░░░░░░░░░░░░░░░░░░░░░  8%
핑크 (Secondary) █░░░░░░░░░░░░░░░░░░░░░░░░░░░░  2%
```

핑크가 2%인 게 의도적이다. 한 화면에 핑크가 2개 이상 보이면 무언가 잘못된 것이다.

## Typography

**Pretendard 단일 패밀리**. 한글·영문·숫자가 한 호흡으로 흐른다.

### 위계

- **Display (32px / 700)**: 히어로 헤드라인 ("Understand everything your bias says" 같은 헤드라인)
- **Headline (20–24px / 600–700)**: 섹션 제목 ("Features", "Reviews")
- **Body (14–16px / 400)**: 본문 기본. 14px가 디폴트, 긴 글은 16px
- **Label (12px / 500)**: 카테고리 라벨, 메타 정보. **영문 라벨만 `uppercase` 가능** — 한글 라벨에는 uppercase 적용 금지
- **Micro (10px / 500–600)**: 상태 라벨. 최소 허용 크기
- **Metric (32px / 600)**: 숫자 단독 표시용

### Pretendard 미세 조정

- 한글은 자간 0, 영문 디스플레이는 `letter-spacing: -0.02em`으로 살짝 좁힌다
- 250 이하 weight는 사용 금지 (흰 배경 가독성 무너짐)
- 본문 줄간격은 `1.5`, 한글 위주 단락은 `1.6`까지 허용

## Components

### Buttons

- **Primary**: 검정(`#0A0A0A`) 필 + 흰 텍스트, pill 라운드. CTA 무게감은 채도가 아닌 명도 대비에서 온다
- **Secondary**: 흰 배경 + 1px 보더, pill 라운드
- **Ghost**: 배경 없음, 호버 시 옅은 회색. 아이콘 버튼용
- **Danger**: `#DC2626` 필. 삭제·파괴적 액션 전용

> **인라인 액션 버튼 예외**: 입력 필드 내부의 제출 버튼은 `bg-primary`(보라)를 사용할 수 있다. 독립 CTA가 아니라 입력 필드에 종속된 인라인 액션이므로, 포커스 링과 동일한 시각적 언어로 입력과의 연결감을 표현한다.

### Inputs

- 1px `#EAEAEA` 보더, 8px 라운드, 흰 배경
- 포커스 시 보라 보더 + 0.15 알파 보라 글로우 (3px)
- 플레이스홀더는 `#A3A3A3` — 본문보다 두 단계 옅게

### Cards & Panels

- 그림자는 `0 1px 3px rgba(10,10,10,0.06)`까지만. 떠오르는 게 아니라 **놓여있어야** 한다
- 12–16px 라운드, 1px 보더
- 카드 안의 카드는 만들지 말 것 — 중첩되면 즉시 답답해진다
- glassmorphism(반투명 + blur)은 쓰지 않는다 — 흰 배경 + 1px 보더가 기본

### Modals

기본 쉘 규격:
- 최대 너비 `560px` (소형 확인 모달은 `320px`까지 축소 가능)
- 라운드 `36px` (소형 확인 모달은 `24px`)
- 흰 배경 + 반투명 화이트 보더
- 상단에 아주 약한 보라 글로우
- 그림자 `0 30px 100px rgba(15,23,42,0.24)`
- 오버레이: `rgba(10,10,10,0.55)` + 4px blur

모달 CTA:
- 주 액션: 검정 pill 버튼
- 삭제 확인: Danger 버튼 (`#EF4444`)
- 닫기 기본값: 배경 클릭. X 버튼은 정말 필요한 경우에만

### Badges

- 모두 pill 형태로 통일
- Success: `#EDE9FE` 배경 + `#5B21B6` 텍스트 (보라 톤). 그린은 사용하지 않는다
- Info: 핑크 톤 (`#FCE7F3` 배경). 핑크가 등장하는 거의 유일한 자리
- Default: `#F5F5F5` 배경, `#525252` 텍스트

## Do's and Don'ts

### Do
- ✅ **흰 공간을 두려워하지 말 것**. 여백이 럭셔리다
- ✅ **보라는 한 화면에 한 가지 역할**로 — 포커스면 포커스, 링크면 링크
- ✅ **호버 상태에 보라를 살짝 깊게** (`#7C3AED`) — 인터랙션의 보상감을 컬러 깊이로 표현
- ✅ **포커스 링은 항상 보라**. 브랜드는 디테일에서 드러난다

### Don't
- ❌ **핑크를 CTA에 쓰지 말 것**. 핑크는 말하는 게 아니라 속삭이는 색
- ❌ **보라 그라디언트로 도배하지 말 것**. 풀페이지 그라디언트 금지, 흰 캔버스 우선
- ❌ **검정 버튼과 보라 버튼을 동등하게 두지 말 것**. 위계가 무너진다
- ❌ **Pretendard 외 다른 한글 폰트와 섞지 말 것**
- ❌ **한글 라벨에 uppercase를 쓰지 말 것** — 한글에는 대문자가 없다
- ❌ **그린·민트·청록을 새로 추가하지 말 것**
- ❌ **라운드와 직각을 한 컴포넌트 안에서 섞지 말 것** — pill이면 안쪽 요소도 둥글게

## Voice & Tone (시각적 톤)

Kaptik은 K-pop 팬을 위한 실시간 자막 번역 서비스다. UI 톤:
- 격식 없이 친근하지만, 명확성을 잃지 않는다
- 마이크로카피는 짧게. "Join Waitlist" / "Understand everything your bias says"
- 영어 기반 UI (타깃 사용자: 글로벌 K-pop 팬)
- 아이콘은 outlined, strokeWidth 1.5px
- 애니메이션은 200–250ms ease-out. 느릿함은 신뢰감, 빠름은 가벼움

## Creative Latitude (창작 시 허용 범위)

자유롭게 결정 가능:
- 카드 내부 레이아웃 (그리드, 리스트, 캐러셀)
- 일러스트 형태 — 단, 컬러는 보라 + 핑크 + 회색 3종만
- 마이크로 인터랙션 디테일 (호버 시 미세한 스케일업, 클릭 시 스케일다운 등)
- 빈 상태(empty state) 메시지 톤 — 위트 허용, 단 핑크 톤으로 한 줄까지

건드리지 말 것:
- 컬러 토큰 추가 (신규 색 도입 금지)
- 폰트 패밀리 추가
- 라운딩 스케일 변경 (sm/md/lg/xl/pill 외 신규 값 금지)
- 그림자 농도 강화 (떠 있는 UI는 이 시스템과 맞지 않는다)

## When to use this MD vs JSON

- **JSON (`design.json`)**: 컴포넌트 정확한 색상값·픽셀값·스펙 적용. 빌드 토큰 주입. 디자인 QA 체크리스트
- **MD (`design.md`)**: 새 화면 설계 시 톤·방향 결정. 일러스트·마케팅 페이지 톤 결정. AI에게 새 화면 만들어달라 요청 시 컨텍스트 첨부
