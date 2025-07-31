export interface SupplyChainStep {
  step: string;
  location: string;
  company: string;
  date: string;
  status: "completed" | "current" | "pending";
  icon: any;
  description: string;
  carbonFootprint: string;
  blockchainTxId: string;
  tests: Array<{
    name: string;
    result: string;
    date: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    id: string;
  }>;
}

export interface ProductCertification {
  name: string;
  icon: string;
  issuer: string;
  date: string;
  document?: string;
}

export interface ProductData {
  image: string;
  name: string;
  productId: string;
  harvestDate: string;
  sustainabilityScore: number;
  certifications: ProductCertification[];
}

export interface LayoutConfiguration {
  name: string;
  description: string;
  sections: {
    productImage: {
      position: "top" | "left" | "center";
      size: "small" | "medium" | "large";
    };
    certifications: {
      position: "top-right" | "bottom" | "sidebar";
      display: "grid" | "list" | "badges";
    };
    supplyChain: {
      position: "main" | "bottom" | "accordion";
      style: "timeline" | "cards" | "minimal";
    };
  };
}

export type LayoutType = "comprehensive" | "executive" | "consumer";