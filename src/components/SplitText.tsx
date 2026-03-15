"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** SplitText 컴포넌트 Props */
interface SplitTextProps {
  /** 애니메이션할 텍스트 */
  text: string;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  style?: React.CSSProperties;
  /** 글자/단어 간 스태거 지연 (ms) */
  delay?: number;
  /** 애니메이션 지속 시간 */
  duration?: number;
  /** GSAP 이징 함수 */
  ease?: string;
  /** 분할 타입: chars(글자), words(단어), lines(줄) */
  splitType?: "chars" | "words" | "lines";
  /** 시작 상태 (from) */
  from?: gsap.TweenVars;
  /** 최종 상태 (to) */
  to?: gsap.TweenVars;
  /** ScrollTrigger threshold (0~1) */
  threshold?: number;
  /** ScrollTrigger rootMargin */
  rootMargin?: string;
  /** 텍스트 정렬 */
  textAlign?: "left" | "center" | "right";
  /** 래퍼 HTML 태그 */
  tag?: "p" | "h1" | "h2" | "h3" | "span" | "div";
  /** 모든 글자 애니메이션 완료 시 콜백 */
  onLetterAnimationComplete?: () => void;
}

const SplitText = ({
  text,
  className = "",
  style: styleProp,
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  tag: Tag = "p",
  onLetterAnimationComplete,
}: SplitTextProps) => {
  const ref = useRef<HTMLParagraphElement | HTMLHeadingElement | HTMLSpanElement>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const splitInstanceRef = useRef<SplitType | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // 콜백 ref 유지
  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  // 폰트 로드 대기
  useEffect(() => {
    if (document.fonts.status === "loaded") {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      if (animationCompletedRef.current) return;

      const el = ref.current;

      // 이전 split 인스턴스 정리
      if (splitInstanceRef.current) {
        try {
          splitInstanceRef.current.revert();
        } catch {
          /* noop */
        }
        splitInstanceRef.current = null;
      }

      // ScrollTrigger start 계산
      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
      const sign =
        marginValue === 0
          ? ""
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      // SplitType types 매핑: chars -> words+chars, words -> words, lines -> lines
      const types =
        splitType === "chars"
          ? "words,chars"
          : splitType === "words"
            ? "words"
            : "lines";

      const splitInstance = new SplitType(el, {
        types,
        lineClass: "split-line",
        wordClass: "split-word",
        charClass: "split-char",
      });

      splitInstanceRef.current = splitInstance;

      // 애니메이션 타깃 결정
      let targets: Element[] = [];
      if (splitType === "chars" && splitInstance.chars?.length) {
        targets = splitInstance.chars;
      } else if (splitType === "words" && splitInstance.words?.length) {
        targets = splitInstance.words;
      } else if (splitType === "lines" && splitInstance.lines?.length) {
        targets = splitInstance.lines;
      } else {
        targets =
          splitInstance.chars ||
          splitInstance.words ||
          splitInstance.lines ||
          [];
      }

      if (targets.length === 0) return;

      gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
            fastScrollEnd: true,
            anticipatePin: 0.4,
          },
          onComplete: () => {
            animationCompletedRef.current = true;
            onCompleteRef.current?.();
          },
          willChange: "transform, opacity",
          force3D: true,
        }
      );

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
        try {
          splitInstance.revert();
        } catch {
          /* noop */
        }
        splitInstanceRef.current = null;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
      ],
      scope: ref,
    }
  );

  const style: React.CSSProperties = {
    textAlign,
    overflow: "visible",
    display: "inline-block",
    whiteSpace: "normal",
    wordWrap: "break-word",
    willChange: "transform, opacity",
    fontKerning: "none", // SplitType 권장: split 시 글자 위치 유지
    ...styleProp,
  };

  return (
    <Tag
      ref={ref as React.Ref<never>}
      style={style}
      className={`split-parent ${className}`.trim()}
    >
      {text}
    </Tag>
  );
};

export default SplitText;
