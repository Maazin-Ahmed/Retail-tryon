export interface StoreMetadata {
  storeName: string;
  tagline: string;
  description: string;
  domain: string;
  parentDomain: string;
  curator: string;
}

export interface Product {
  id: string;
  productId: string;
  brand: string;
  name: string;
  shortName: string;
  myntraUrl: string;
  category: string;
  fit?: string;
  material?: string;
  color?: string;
  pattern?: string;
  neck?: string;
  sleeves?: string;
  sizes?: string[];
  features?: string;
  shape?: string;
  audience?: string;
  price?: string | number;
  priceNote?: string;
  image?: string;
  imageAlt?: string;
}
