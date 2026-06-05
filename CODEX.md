# CODEX.md - Kaptik Codex 작업 가이드

이 파일은 Codex가 Kaptik 프로젝트에서 작업할 때 반드시 참고해야 하는 프로젝트 전용 지침입니다. `CLAUDE.md`, `GEMINI.md`, `DESIGN.md`, `design.json`을 기준으로 정리했습니다.

## 기본 원칙

- 기본 응답은 한국어로 한다.
- 설명은 짧고 핵심 위주로 한다.
- 코드 주석과 문서는 한국어로 작성한다.
- 변수명과 함수명은 영어 camelCase를 사용한다.
- 컴포넌트명은 PascalCase를 사용한다.
- 들여쓰기는 2칸을 사용한다.
- 코드 변경 후 변경 이유를 짧게 설명한다.
- 에러 발생 시 증상, 원인, 해결 방법 순서로 설명한다.

## 작업 방식

- 작업 전 관련 파일을 먼저 읽고, 기존 패턴을 따른다.
- 코드 수정은 최소 범위로 한다.
- 사용자가 요청하지 않은 리팩터링, 디자인 변경, 색상 추가는 하지 않는다.
- 기존 사용자 변경사항을 되돌리지 않는다.
- 변경 후 `npm run lint`와 `npm run build`로 검증한다.
- lint warning이 기존 warning이면 새 문제와 구분해서 보고한다.

## 프로젝트 개요

- 프로젝트: Kaptik 웨이트리스트 랜딩페이지
- 프레임워크: Next.js 16 App Router
- 언어: TypeScript
- 스타일: Tailwind CSS v4
- 폰트: Pretendard Variable
- DB: Supabase
- 배포: Vercel, `main` 브랜치 push 시 자동 배포

## 주요 파일

- `src/app/page.tsx`: 랜딩페이지 진입점
- `src/components/LandingPage.tsx`: 전체 섹션 조합
- `src/components/Header.tsx`: 상단 내비게이션
- `src/components/Hero.tsx`: Hero 섹션
- `src/components/FanProblems.tsx`: Problem 섹션
- `src/components/WhyKaptik.tsx`: 해결 방식 섹션
- `src/components/WaitlistForm.tsx`: 웨이트리스트 폼
- `src/app/globals.css`: 전역 스타일 및 디자인 토큰
- `design.json`: 디자인 토큰과 정확한 스펙
- `DESIGN.md`: 디자인 철학, 톤앤매너, 금지 패턴

## 디자인 작업 필수 규칙

디자인 또는 UI를 수정할 때는 반드시 `design.json`과 `DESIGN.md`를 먼저 확인한다. 독단적으로 새로운 스타일 방향을 만들지 않는다.

### Lavender Pulse 핵심

- 흰 캔버스가 기본이다.
- 보라색은 기능색이다.
- 핑크는 아주 제한적인 accent/info 전용이다.
- CTA는 검정 pill 버튼이다.
- Pretendard 단일 폰트를 사용한다.

### 색상 규칙

- 메인 배경: `#FFFFFF`
- 보조 배경: `#FAFAFA` 또는 `#F5F5F5`
- 텍스트 기본: `#0A0A0A`
- 보조 텍스트: `#525252`
- border: `#EAEAEA`
- primary 보라: `#8B5CF6`
- primary deep: `#7C3AED`
- secondary 핑크: `#EC4899`
- danger: `#DC2626`

### 금지

- CTA에 보라/핑크를 쓰지 않는다.
- 풀페이지 그라디언트 배경을 만들지 않는다.
- 그린, 민트, 청록 계열을 새로 추가하지 않는다.
- 카드 안에 카드를 중첩하지 않는다.
- 카드 그림자를 `shadow-md` 이상으로 강하게 만들지 않는다.
- `DESIGN.md`나 `design.json`에 없는 색상, 라운딩, 폰트 체계를 임의로 추가하지 않는다.
- 사용자가 명시하지 않은 디자인 실험을 독단적으로 하지 않는다.

### 카드와 패널

- 기본 카드: 흰 배경, 1px `#EAEAEA` border, 12-16px radius, 약한 shadow.
- 카드가 떠 보이면 안 된다. 놓여있는 느낌을 유지한다.
- 카드 내부 UI 목업은 실제 콘텐츠를 보여주되, 전체 디자인 시스템과 충돌하지 않게 한다.

## 명령어

```bash
npm run dev
npm run lint
npm run build
```

## 최종 보고 형식

- 변경한 파일과 핵심 변경사항을 짧게 설명한다.
- 실행한 검증 명령과 결과를 말한다.
- 실패한 검증이 있으면 원인과 해결 방법을 함께 말한다.
