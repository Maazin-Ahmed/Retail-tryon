import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { storeMetadata } from "@/data/products";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-sm space-y-4">
        <span className="text-xs font-mono tracking-widest text-[#8E8E93]">
          404 · NOT FOUND
        </span>
        <h1 className="text-3xl font-medium tracking-tight text-[#0A0A0A]">
          Page Not Found
        </h1>
        <p className="text-xs text-[#737373] leading-relaxed">
          The requested view does not exist in {storeMetadata.storeName}.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-xs font-medium tracking-wide hover:bg-[#262626] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to {storeMetadata.storeName}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
