---
name: Lavender Pulse
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

# LinKo Design System — Lavender Pulse

## Overview

LinKo는 YouTube 영상으로 한국어를 배우는 플랫폼이다. K-pop, K-드라마, 예능 자막을 플래시카드와 WatchTab으로 학습한다. 타깃 사용자는 한국어를 배우는 글로벌 유저이며, UI 언어는 영어 기반이다.

디자인 시스템 이름은 **Lavender Pulse**. 흰 캔버스 위에 라벤더 보라가 정확하게 찍히는 구조다.

**한 줄로**: 흰 종이 위에 정확하게 떨어지는 보라색 잉크 한 방울.

핵심 원칙 세 가지:
1. **흰 캔버스 우선** — 컬러는 메시지가 있을 때만 등장한다
2. **보라는 기능, 핑크는 감정** — 둘은 절대 동등하지 않다
3. **Pretendard 하나로 충분** — 폰트 다양성보다 위계의 명확함이 먼저다

## Colors

### 시그널 컬러 (Signal — 의미가 있는 색)

- **Primary `#8B5CF6`**: 활성 내비, 포커스 링, 선택 상태, 입력 인라인 액션. "지금 여기" 신호
- **Primary Deep `#7C3AED`**: 강조 텍스트, 링크, 호버 시 깊어지는 보라
- **Secondary `#EC4899`**: 액센트. 일러스트 디테일, info 배지. **CTA에는 절대 쓰지 않는다**
- **Error `#DC2626`**: 파괴적 액션, 삭제 확인. 보라/핑크와 절대 섞지 않는다

### 베이스 컬러 (Base — 침묵하는 색)

- **Surface `#FFFFFF`**: 메인 캔버스. 비어있어 보이는 게 정상이다
- **Surface Soft `#FAFAFA`**: 사이드바, 보조 패널. 구역만 나누고 사라진다
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

### Grammar Category Colors (제한적 예외)

FlashcardTab의 한국어 문법 어미 카테고리는 시각적 구분이 학습 UX에 필수적이다. 이 색들은 **FlashcardTab 전용 semantic color**로만 사용한다. 다른 컴포넌트에 절대 전용 외 목적으로 사용 금지.

| 어미 카테고리 | 태그 배경 | 태그 텍스트 | 패널 배경 | 패널 테두리 |
|---|---|---|---|---|
| 선어말어미 (Pre-final) | `blue-100` | `blue-700` | `blue-50` | `blue-200` |
| 어말-종결 (Final·Closing) | `violet-100` | `violet-700` | `violet-50` | `violet-200` |
| 어말-연결 (Final·Connective) | `amber-100` | `amber-700` | `amber-50` | `amber-200` |
| 어말-전성 (Final·Transformative) | `teal-100` | `teal-700` | `teal-50` | `teal-200` |
| 어말-보조적 (Final·Auxiliary) | `emerald-100` | `emerald-700` | `emerald-50` | `emerald-200` |
| 어간변화 (Stem Change) | `neutral-100` | `neutral-600` | `neutral-50` | `neutral-200` |

이 색들이 디자인 시스템 밖에서 쓰이는 유일한 정당한 예외다.

## Typography

**Pretendard 단일 패밀리**. 한글·영문·숫자가 한 호흡으로 흐른다.

### 위계

- **Display (32px / 700)**: 페이지 타이틀. "Which video will you learn Korean today?" 같은 히어로 헤드라인
- **Headline (20–24px / 600–700)**: 섹션 제목 ("My Lessons", "Recommendations")
- **Body (14–16px / 400)**: 본문 기본. 14px가 디폴트, 긴 글은 16px
- **Label (12px / 500)**: 카테고리 라벨, 메타 정보. **영문 라벨만 `uppercase` 가능** — 한글 라벨에는 uppercase 적용 금지
- **Micro (10px / 500–600)**: VideoCard 내 상태 라벨, ActivityPill 텍스트. 최소 허용 크기
- **Metric (32px / 600)**: 숫자 단독 표시용

### Pretendard 미세 조정

- 한글은 자간 0, 영문 디스플레이는 `letter-spacing: -0.02em`으로 살짝 좁힌다
- 250 이하 weight는 사용 금지 (흰 배경 가독성 무너짐)
- 본문 줄간격은 `1.5`, 한글 위주 단락은 `1.6`까지 허용

## Components

### Buttons

- **Primary**: 검정(`#0A0A0A`) 필 + 흰 텍스트, pill 라운드. CTA 무게감은 채도가 아닌 명도 대비에서 온다
- **Secondary**: 흰 배경 + 1px 보더, pill 라운드
- **Ghost**: 배경 없음, 호버 시 옅은 회색. 사이드바·아이콘 버튼용
- **Danger**: `#DC2626` 필. 삭제·파괴적 액션 전용

> **UrlInput 제출 버튼 예외**: URL 입력창 내부의 제출 버튼은 `bg-primary`(보라)를 사용한다. 이 버튼은 독립 CTA가 아니라 입력 필드에 종속된 인라인 액션이므로, 포커스 링과 동일한 시각적 언어로 입력과의 연결감을 표현한다.

### Inputs

- 1px `#EAEAEA` 보더, 8px 라운드, 흰 배경
- 포커스 시 보라 보더 + 0.15 알파 보라 글로우 (3px)
- 플레이스홀더는 `#A3A3A3` — 본문보다 두 단계 옅게

### VideoCard

LinKo의 핵심 카드 컴포넌트. 두 가지 렌더 모드:

**Generating (생성 중)**
- `bg-neutral-900` 어두운 배경
- Loader 스피너 + "Generating lesson..." + 예상 남은 시간
- 완료 카드와 높이를 맞추기 위해 학습 영역을 `invisible`로 공간 예약

**Ready (완료)**
- `bg-white`, 1px `#EAEAEA` 보더, `rounded-xl` (16px)
- 썸네일 영역: `aspect-video`, hover 시 재생 버튼 오버레이 fade-in
- 재생시간 배지: 우하단, `bg-black/70`, 흰 텍스트
- 카드 정보 영역 하단에 LearningStatusPills 포함

크기 모드:
- `fluid=false` (기본): `w-[240px]` 고정 → 가로 스크롤 리스트에 사용
- `fluid=true`: `w-full` → 그리드 레이아웃에 사용

### ActivityPill

Flashcard / Watch 탭 각각의 완료 여부를 나타내는 독립 pill.

- **완료**: `bg-primary-50`, `text-primary`, `border-primary-200`
- **미완료**: `bg-neutral-50`, `text-neutral-400`, `border-neutral-200`
- `rounded-lg` (12px), 아이콘 + 텍스트 조합, `text-[10px]`
- 버튼으로 쓸 때: 호버 시 `border-primary` + `text-primary`로 전환

### UrlInput

YouTube URL 입력 컴포넌트. 아이콘·입력창·제출 버튼이 한 줄로 통합된 구조.

- 외부 컨테이너: `bg-white`, 1px `#EAEAEA` 보더, `rounded-xl` (16px), `shadow-xs`
- `focus-within`으로 `border-primary` 전환
- 제출 버튼: `bg-primary`, 흰 아이콘, `rounded-lg` (8px) — 인라인 액션이므로 보라 허용
- 비활성(URL 없음 or 제출 중): `bg-neutral-300`으로 감쇠

### Cards & Panels

- 그림자는 `0 1px 3px rgba(10,10,10,0.06)`까지만. 떠오르는 게 아니라 **놓여있어야** 한다
- 12–16px 라운드, 1px 보더
- 카드 안의 카드는 만들지 말 것 — 중첩되면 즉시 답답해진다

### Modals

모든 모달은 같은 외곽 쉘을 공유한다. LinKo에 현재 존재하는 모달:

- **Login Modal**: Google 인증 유도
- **Early Access Modal**: 웨이팅 리스트 저장 안내
- **Unsupported Modal**: 지원하지 않는 URL/케이스 안내
- **DeleteConfirm Modal**: 북마크 단일 아이템 삭제 확인 (소형)

기본 쉘 규격:
- 최대 너비 `560px` (소형 확인 모달은 `320px`까지 축소 가능)
- 라운드 `36px` (소형 확인 모달은 `24px`)
- 흰 배경 + 반투명 화이트 보더
- 상단에 아주 약한 보라 글로우
- 그림자 `0 30px 100px rgba(15,23,42,0.24)`

모달 CTA:
- 주 액션: 검정 pill 버튼
- Google 로그인 같은 인증 버튼: 넓은 카드형 버튼 (`border-radius: 20px`)
- 삭제 확인: Danger 버튼 (`bg-red-500`)
- 닫기 기본값: 배경 클릭. X 버튼은 정말 필요한 경우에만

### Badges

- 모두 pill 형태로 통일
- Success: `#EDE9FE` 배경 + `#5B21B6` 텍스트 (보라 톤). 그린은 사용하지 않는다
- Info: 핑크 톤 (`#FCE7F3` 배경). 핑크가 등장하는 거의 유일한 자리
- free 플랜: `bg-neutral-100`, `text-neutral-500`, `border-neutral-200`

### Sidebar

- 펼침: `w-60`, 접힘: `w-16`. 300ms ease-in-out 트랜지션
- 배경: `#FAFAFA`, 우측 `1px #EAEAEA` 보더
- 활성 nav item: `text-primary`, `bg-primary-50` light fill 배경
- 비활성 nav item: `text-neutral-600`, 호버 시 `bg-neutral-100`
- 아이콘: `strokeWidth 1.5`, 16px

## Do's and Don'ts

### Do
- ✅ **흰 공간을 두려워하지 말 것**. 여백이 럭셔리다
- ✅ **보라는 한 화면에 한 가지 역할**로 — 활성 내비면 내비, 포커스면 포커스
- ✅ **호버 상태에 보라를 살짝 깊게** (`#7C3AED`) — 인터랙션의 보상감을 컬러 깊이로 표현
- ✅ **포커스 링은 항상 보라**. 브랜드는 디테일에서 드러난다
- ✅ **VideoCard 높이는 showLearning 여부와 무관하게 항상 일치**시킬 것 (invisible 공간 예약)

### Don't
- ❌ **핑크를 CTA에 쓰지 말 것**. 핑크는 말하는 게 아니라 속삭이는 색
- ❌ **보라 그라디언트로 도배하지 말 것**. 그라디언트는 히어로 배경에 한정
- ❌ **검정 버튼과 보라 버튼을 동등하게 두지 말 것**. 위계가 무너진다
- ❌ **FlashcardTab Grammar 카테고리 색을 다른 컴포넌트에 쓰지 말 것**
- ❌ **Pretendard 외 다른 한글 폰트와 섞지 말 것**
- ❌ **한글 라벨에 uppercase를 쓰지 말 것** — 한글에는 대문자가 없다
- ❌ **그린·민트·청록을 새로 추가하지 말 것** (Grammar Colors만 예외)
- ❌ **라운드와 직각을 한 컴포넌트 안에서 섞지 말 것** — pill이면 안쪽 요소도 둥글게

## Voice & Tone (시각적 톤)

LinKo는 K-pop과 K-드라마로 한국어를 배우는 서비스다. UI 톤:
- 격식 없이 친근하지만, 학습 맥락에서 명확성을 잃지 않는다
- 마이크로카피는 짧게. "Start Learning" / "Pick Other Videos" / "Generating lesson..."
- 영어 기반 UI (타깃 사용자: 한국어를 배우는 글로벌 유저)
- 아이콘은 outlined, strokeWidth 1.5px
- 애니메이션은 200–250ms ease-out. 느릿함은 신뢰감, 빠름은 가벼움

## Creative Latitude (창작 시 허용 범위)

자유롭게 결정 가능:
- 카드 내부 레이아웃 (그리드, 리스트, 매트릭스)
- 일러스트 형태 — 단, 컬러는 보라 + 핑크 + 회색 3종만
- 마이크로 인터랙션 디테일 (호버 시 미세한 스케일업, 클릭 시 스케일다운 등)
- 데이터 시각화 그래프 종류 — 단, 시리즈 컬러는 `#7C3AED → #EC4899 → #525252` 순
- 빈 상태(empty state) 메시지 톤 — 위트 허용, 단 핑크 톤으로 한 줄까지
- FlashcardTab Grammar 카테고리 색 조합 (blue / violet / amber / teal / emerald / neutral)

건드리지 말 것:
- 컬러 토큰 추가 (Grammar Colors 예외 외 신규 색 도입 금지)
- 폰트 패밀리 추가
- 라운딩 스케일 변경 (sm/md/lg/xl/pill 외 신규 값 금지)
- 그림자 농도 강화 (떠 있는 UI는 이 시스템과 맞지 않는다)

## When to use this MD vs JSON

- **JSON (`design.json`)**: 컴포넌트 정확한 색상값·픽셀값·스펙 적용. 빌드 토큰 주입. 디자인 QA 체크리스트
- **MD (`DESIGN.md`)**: 새 화면 설계 시 톤·방향 결정. 일러스트·마케팅 페이지 톤 결정. AI에게 새 화면 만들어달라 요청 시 컨텍스트 첨부
