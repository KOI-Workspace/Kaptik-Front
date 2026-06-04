"use client";

import dynamic from "next/dynamic";

const PrismBackground = dynamic(
  () => import("./PrismBackground"),
  { ssr: false }
);

export default function PrismBackgroundLoader() {
  return <PrismBackground />;
}
