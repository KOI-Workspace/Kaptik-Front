# GEMINI.md - Kaptik 프로젝트 가이드

이 파일은 Gemini CLI가 Kaptik 프로젝트에서 작업할 때 준수해야 할 핵심 지침입니다. `CLAUDE.md`, `DESIGN.md`, `design.json`의 내용을 기반으로 하며, Gemini CLI의 특성에 맞게 최적화되었습니다.

## 🤖 Gemini CLI 핵심 원칙 (Mandatory)

1.  **언어**: 모든 응답, 계획(Plan), 워크스루(Walkthrough)는 **한국어**로 작성합니다.
2.  **검증**: 모든 코드 변경 후에는 반드시 `npm run build` 명령어를 실행하여 빌드 성공 여부를 확인합니다.
3.  **참조**: 파일 및 디렉토리 경로를 언급할 때는 앞에 `@`를 붙여 표기합니다. (예: `@src/app/page.tsx`, `@public/`)
4.  **편집**: 코드 수정 시에는 `replace` 도구를 사용하여 최소한의 변경(Surgical Edit)을 수행하고, 변경 전후의 맥락을 충분히 유지하여 충돌을 방지합니다.

## 🚀 프로젝트 개요 및 기술 스택

-   **프로젝트**: Kaptik 서비스 웨이트리스트 랜딩페이지
-   **프레임워크**: Next.js 16 (App Router)
-   **언어**: TypeScript
-   **스타일**: Tailwind CSS v4
-   **DB**: Supabase (이메일 저장)
-   **디자인 시스템**: Lavender Pulse (흰 캔버스 기반, 보라색 포인트)

## 🎨 Lavender Pulse 디자인 시스템 규칙

UI 수정 또는 컴포넌트 추가 시 `@design.json` 및 `@DESIGN.md`를 반드시 준수합니다.

-   **배경**: 항상 `@#FFFFFF` (White Canvas). 전체 페이지 그라디언트 금지.
-   **CTA 버튼**: 반드시 **검정색 (`#0A0A0A`) Pill 형태**로 제작합니다. 보라색이나 핑크색은 CTA에 사용하지 않습니다.
-   **Primary 컬러**: `@#8B5CF6` (보라). 포커스 링, 링크, 인라인 액션, 선택 상태에만 사용합니다.
-   **Accent 컬러**: `@#EC4899` (핑크). 아주 드물게(전체 2% 미만) 데코레이션이나 정보 배지에만 사용합니다.
-   **타이포그래피**: `Pretendard Variable` 단일 폰트 사용. 위계는 `@design.json`의 `typography.scale`을 따릅니다.
-   **아이콘**: `lucide-react` 라이브러리를 사용하며, `strokeWidth`는 `1.5px`로 통일합니다.

## 🛠 코딩 컨벤션

-   **들여쓰기**: 2칸 (Space)
-   **명명 규칙**:
    -   변수/함수: `camelCase`
    -   컴포넌트: `PascalCase`
-   **주석**: 한국어로 상세히 작성합니다.
-   **Client Component**: 브라우저 API나 상태 관리가 필요한 경우에만 파일 상단에 `"use client"`를 명시합니다.

## 🔄 워크플로우 (Plan-Act-Validate)

1.  **Research**: 관련 파일(`@src/components/...`) 및 설정(`@package.json`)을 조사합니다.
2.  **Strategy**: 수행할 작업의 계획을 한국어로 상세히 설명합니다. (복잡한 작업은 `enter_plan_mode` 사용)
3.  **Execution (Plan -> Act -> Validate)**:
    -   수정할 코드 블록을 식별하고 `replace`로 적용합니다.
    -   새로운 기능 추가 시 관련 테스트를 추가하거나 기존 코드를 업데이트합니다.
4.  **Verification**:
    -   `npm run lint`로 스타일 체크
    -   `npm run build`로 최종 빌드 검증

## 📦 주요 명령어

-   `npm run dev`: 개발 서버 실행
-   `npm run build`: 프로덕션 빌드 (변경 사항 검증 필수)
-   `npm run lint`: ESLint 검사
