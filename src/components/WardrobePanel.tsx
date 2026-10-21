"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { Product } from "@/types/product";

interface WardrobePanelProps {
  products: Product[];
  selectedProductId: string | null;
  onSelectProduct: (id: string) => void;
}

export default function WardrobePanel({
  products,
  selectedProductId,
  onSelectProduct,
}: WardrobePanelProps) {
  return (
    <aside
      aria-label="Wardrobe product selection"
      className="w-full md:w-[320px] md:min-w-[280px] md:max-w-[340px] md:h-full flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EAEAEA] bg-white p-5 sm:p-6 shrink-0"
    >
      <div className="flex flex-col flex-1 min-h-0">
        {/* Brand wordmark */}
        <div className="flex items-center justify-between shrink-0">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#0A0A0A] select-none">
            RETAIL.
          </span>
          <span className="text-[10px] text-[#A3A3A3] uppercase tracking-wider font-mono">
            {products.length} {products.length === 1 ? "Piece" : "Pieces"}
          </span>
        </div>

        {/* Section title & subtitle */}
        <div className="mt-5 md:mt-6 shrink-0">
          <h1 className="text-base sm:text-lg font-medium tracking-tight text-[#0A0A0A]">
            Your wardrobe
          </h1>
          <p className="text-xs text-[#737373] mt-1 font-normal">
            Select a piece to try on
          </p>
        </div>

        {/* Products list - scrollable within desktop viewport */}
        <div
          className="mt-4 flex-1 overflow-y-auto space-y-2.5 pr-0.5 select-none"
          role="radiogroup"
          aria-label="Wardrobe pieces"
        >
          {products.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-10 px-4 border border-dashed border-[#E5E5E5] rounded-xl bg-[#FAFAFA]/60 text-center"
              aria-live="polite"
            >
              <p className="text-xs text-[#8A8A8A] font-normal leading-relaxed">
                Your collection is coming soon.
              </p>
            </div>
          ) : (
            products.map((product) => {
              const isSelected = selectedProductId === product.id;

              return (
                <div
                  key={product.id}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onClick={() => onSelectProduct(product.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectProduct(product.id);
                    }
                  }}
                  className={`group relative p-2.5 sm:p-3 rounded-xl border transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
                    isSelected
                      ? "border-[#0A0A0A] bg-white shadow-xs ring-1 ring-[#0A0A0A]/10"
                      : "border-[#EAEAEA] bg-white hover:border-[#D4D4D4] hover:bg-[#FAFAFA]"
                  }`}
                >
                  <div className="flex gap-2.5 sm:gap-3">
                    {/* Product Thumbnail */}
                    <div className="w-14 h-18 sm:w-16 sm:h-20 rounded-lg overflow-hidden bg-[#F4F6F8] shrink-0 border border-[#E5E7EB] relative flex items-center justify-center">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.imageAlt || product.name}
                          width={64}
                          height={80}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-[#94A3B8]">
                          {product.category}
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        {/* Brand & Selected badge */}
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[#737373] truncate">
                            {product.brand}
                          </span>
                          {isSelected && (
                            <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-semibold text-[#0A0A0A] bg-[#F4F4F5] px-1.5 py-0.5 rounded shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                              Selected
                            </span>
                          )}
                        </div>

                        {/* Short Product Name */}
                        <h2 className="text-xs font-medium text-[#0A0A0A] leading-snug mt-0.5 line-clamp-1 sm:line-clamp-2">
                          {product.shortName || product.name}
                        </h2>

                        {/* Attribute hint */}
                        <p className="text-[10px] text-[#71717A] mt-0.5 truncate">
                          {product.category}
                          {product.fit ? ` · ${product.fit}` : ""}
                          {product.shape ? ` · ${product.shape}` : ""}
                          {product.features ? ` · ${product.features}` : ""}
                        </p>
                      </div>

                      {/* Price Note & Action Link */}
                      <div className="mt-2 pt-1.5 border-t border-[#F4F4F5] flex items-center justify-between gap-2">
                        <span className="text-[10px] text-[#8E8E93] truncate">
                          {product.priceNote || "Confirm price on Myntra"}
                        </span>

                        <a
                          href={product.myntraUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-0.5 text-[10px] font-medium text-[#0A0A0A] hover:opacity-70 transition-opacity shrink-0"
                          title="View on Myntra (opens in new tab)"
                        >
                          <span>View on Myntra</span>
                          <ArrowUpRight className="w-3 h-3 text-[#737373]" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Discrete bottom meta */}
      <div className="hidden md:block pt-3 border-t border-[#F3F3F3] shrink-0">
        <p className="text-[10px] text-[#A3A3A3] tracking-widest uppercase select-none">
          Phase 1 · Camera Preview
        </p>
      </div>
    </aside>
  );
}
