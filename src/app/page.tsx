"use client";

import React, { useState } from "react";
import WardrobePanel from "@/components/WardrobePanel";
import CameraPanel from "@/components/CameraPanel";
import { products } from "@/data/products";

export default function Home() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    products[0]?.id || null
  );

  const selectedProduct =
    products.find((p) => p.id === selectedProductId) || null;

  return (
    <main
      id="main-content"
      className="w-full h-screen md:h-dvh flex flex-col md:flex-row overflow-y-auto md:overflow-hidden bg-[#FAFAFA]"
    >
      {/* LEFT PANEL — PRODUCT SELECTION */}
      <WardrobePanel
        products={products}
        selectedProductId={selectedProductId}
        onSelectProduct={(id) => setSelectedProductId(id)}
      />

      {/* RIGHT PANEL — CAMERA EXPERIENCE */}
      <CameraPanel selectedProduct={selectedProduct} />
    </main>
  );
}
