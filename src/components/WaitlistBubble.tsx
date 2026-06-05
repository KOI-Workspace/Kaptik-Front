"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabaseClient";

const WAITLIST_DISPLAY_OFFSET = 200;
const WAITLIST_LIMIT = 1000;

/**
 * 웨이트리스트 신청 현황(누적 인원·남은 자리)을 보여주는 보라 버블.
 * Hero(WaitlistForm)와 Pricing 페이지에서 동일하게 사용한다.
 */
export default function WaitlistBubble() {
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const displayCount = waitlistCount ?? WAITLIST_DISPLAY_OFFSET;
  const spotsLeft = Math.max(WAITLIST_LIMIT - displayCount, 0);

  useEffect(() => {
    const fetchWaitlistCount = async () => {
      const supabase = getSupabaseClient();
      const { count, error: countError } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true });

      if (countError) {
        console.error(countError);
        return;
      }

      if (typeof count === "number") {
        setWaitlistCount(WAITLIST_DISPLAY_OFFSET + count);
      }
    };

    fetchWaitlistCount();
  }, []);

  return (
    <p className="waitlist-bubble relative whitespace-nowrap rounded-[999px] border border-[#C4B5FD] bg-[#8B5CF6] px-3.5 py-2 text-center text-[11px] font-medium leading-none text-white shadow-[0_10px_24px_rgba(139,92,246,0.22)] sm:px-5 sm:py-2.5 sm:text-sm">
      <span className="font-bold text-white">
        {displayCount.toLocaleString()}
      </span>{" "}
      people joined.{" "}
      <span className="font-bold text-white">
        {spotsLeft.toLocaleString()}
      </span>{" "}
      spots left for the free{" "}
      <Link
        href="/pricing"
        className="font-bold text-white underline underline-offset-2 transition-opacity hover:opacity-80"
      >
        Basic Plan
      </Link>{" "}
      trial.
    </p>
  );
}
