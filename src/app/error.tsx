"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, ArrowLeft } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-sm space-y-4">
        <span className="text-xs font-mono tracking-widest text-[#8E8E93]">
          NOTICE
        </span>
        <h1 className="text-3xl font-medium tracking-tight text-[#0A0A0A]">
          Momentary Interruption
        </h1>
        <p className="text-xs text-[#737373] leading-relaxed">
          An error occurred while loading this view. You can retry or return home.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-xs font-medium tracking-wide hover:bg-[#262626] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D4D4D4] text-[#0A0A0A] text-xs font-medium tracking-wide hover:bg-black hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
