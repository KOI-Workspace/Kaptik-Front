# Kaptik 랜딩페이지 프로젝트

## 프로젝트 개요
Kaptik 서비스의 웨이트리스트 랜딩페이지. Next.js 기반으로 제작되었으며, Vercel에 배포됩니다.

- **배포 URL**: kaptik-subtitle.vercel.app
- **배포 방식**: `main` 브랜치에 push하면 Vercel 자동 배포

## 기술 스택
- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript
- **스타일**: Tailwind CSS v4
- **애니메이션**: GSAP, OGL (WebGL)
- **DB**: Supabase (웨이트리스트 이메일 저장)
- **배포**: Vercel

## 프로젝트 구조
```
src/
├── app/
│   ├── page.tsx              # 진입점 → LandingPage 렌더링
│   ├── layout.tsx            # 루트 레이아웃
│   ├── globals.css           # 전역 스타일
│   └── api/meta/conversion/  # Meta Pixel 서버사이드 이벤트 API
├── components/
│   ├── LandingPage.tsx       # 페이지 전체 조합 컴포넌트
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── WhyKaptik.tsx
│   ├── AvailableDevices.tsx
│   ├── AvailablePlatforms.tsx
│   ├── FAQ.tsx
│   ├── Testimonials.tsx
│   ├── WaitlistModal.tsx
│   ├── ThankYouModal.tsx
│   ├── LogoLoop.tsx          # 플랫폼 로고 무한 스크롤
│   ├── Prism.tsx             # WebGL 프리즘 배경 효과
│   ├── PrismBackground.tsx
│   ├── PrismBackgroundLoader.tsx
│   ├── SplitText.tsx         # 텍스트 분할 애니메이션
│   └── MetaPixel.tsx         # Meta Pixel 트래킹
└── lib/
    ├── supabaseClient.ts     # Supabase 클라이언트
    └── mockData.ts           # 목 데이터
```

## 디자인 시스템 참고 파일

현재 디자인 시스템: **Lavender Pulse** (흰 캔버스 우선, 보라는 기능색·핑크는 accent, Pretendard 단일 폰트, CTA는 검정 pill).

### design.json
- **위치**: `/Users/leehyunsoo/Dream/Kaptik/kaptik-main/design.json`
- **언제 사용**: 전체적인 UI 설계, 컬러 토큰 적용, 타이포그래피 스케일, 컴포넌트 스펙, CSS 변수 구현 시
- 브랜드 primary 컬러: `#8B5CF6` (퍼플). 링크/강조는 `#7C3AED`
- **CTA 규칙**: 독립 CTA 버튼은 검정 `#0A0A0A` pill. 보라는 CTA에 쓰지 않는다 (포커스링·링크·인라인 액션 전용)
- **주의**: 초록·민트·청록 계열은 신규 추가 금지 (Weverse 브랜드색 `#05F048` 포함)

### design.md
- **위치**: `/Users/leehyunsoo/Dream/Kaptik/kaptik-main/design.md` (= `DESIGN.md`, macOS 대소문자 무시)
- **언제 사용**: 새로운 컴포넌트를 창의적으로 설계할 때, design.json에 없는 요소를 만들 때, 디자인 철학·톤앤매너·금지 패턴 확인 시

## 코딩 컨벤션
- 들여쓰기: 2칸
- 변수명/함수명: camelCase
- 컴포넌트명: PascalCase
- 주석: 한국어로 작성
- `"use client"` 필요한 컴포넌트에만 명시

## Git 브랜치 전략
- `main`: 프로덕션 (Vercel 자동 배포)
- `fix/design` 등 작업 브랜치에서 수정 → 로컬 서버(`localhost:3000`)에서 확인 → main에 머지

## 로컬 개발
```bash
npm run dev       # 개발 서버 실행 (localhost:3000)
npm run build     # 프로덕션 빌드
npm run lint      # 린트 검사
```
