import { useState } from "react";
import { QRScanner } from "@/components/QRScanner";
import { ProductTraceability } from "@/components/ProductTraceability";
import { UnifiedProductView } from "@/components/UnifiedProductView";
import { AdminPanel } from "@/components/AdminPanel";
import { LayoutType, SupplyChainStep } from "@/types/layout";
import { Fish, Factory, Truck, Store } from "lucide-react";
import shrimp1 from "@/assets/shrimp-1.jpg";

const Index = () => {
  const [currentView, setCurrentView] = useState<"scanner" | "traceability" | "customer" | "admin">("scanner");
  const [productId, setProductId] = useState<string | null>(null);
  const [customerLayout, setCustomerLayout] = useState<LayoutType>("comprehensive");

  // Sample supply chain data
  const sampleSupplyChainData: SupplyChainStep[] = [
    {
      step: "Farm",
      location: "Guayas Province, Ecuador",
      company: "AquaMar Sustainable Farms",
      date: "2024-01-15",
      status: "completed",
      icon: Fish,
      description: "Responsible aquaculture with ASC certification",
      carbonFootprint: "0.8 kg CO₂",
      blockchainTxId: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
      tests: [
        { name: "Larvae Health Check", result: "Passed", date: "2024-01-10" }
      ],
      certifications: [
        { name: "SPF Larvae Certificate", issuer: "GOAL Standards", id: "SPF-2024-001" }
      ]
    },
    {
      step: "Processing",
      location: "Guayaquil, Ecuador", 
      company: "EcoProcess Solutions",
      date: "2024-01-20",
      status: "completed",
      icon: Factory,
      description: "IFS certified processing facility",
      carbonFootprint: "0.6 kg CO₂",
      blockchainTxId: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234",
      tests: [
        { name: "Microbiological Analysis", result: "Passed", date: "2024-01-20" }
      ],
      certifications: [
        { name: "HACCP Certificate", issuer: "SGS", id: "HACCP-EP-2024" }
      ]
    },
    {
      step: "Distribution",
      location: "Miami, FL, USA",
      company: "FreshMarine Logistics",
      date: "2024-01-22",
      status: "completed", 
      icon: Truck,
      description: "Cold chain maintained at -18°C",
      carbonFootprint: "0.5 kg CO₂",
      blockchainTxId: "0x3c4d5e6f7890abcdef1234567890abcdef123456",
      tests: [
        { name: "Temperature Monitoring", result: "Maintained", date: "2024-01-22" }
      ],
      certifications: [
        { name: "GDP Certificate", issuer: "FDA", id: "GDP-US-2024" }
      ]
    },
    {
      step: "Retail",
      location: "Whole Foods Market",
      company: "Austin, TX, USA",
      date: "2024-01-25",
      status: "current",
      icon: Store,
      description: "Final point of sale",
      carbonFootprint: "0.2 kg CO₂",
      blockchainTxId: "0x4d5e6f7890abcdef1234567890abcdef12345678",
      tests: [
        { name: "Final Quality Check", result: "Passed", date: "2024-01-25" }
      ],
      certifications: [
        { name: "Retail Food Safety", issuer: "Whole Foods", id: "RFS-WF-2024" }
      ]
    }
  ];

  // Sample product data for customer view
  const sampleProductData = {
    image: shrimp1,
    name: "Premium White Shrimp",
    productId: "SHRIMP-ECU-2024-001",
    harvestDate: "January 15, 2024",
    sustainabilityScore: 87,
    certifications: [
      {
        name: "ASC Certified",
        icon: "🌊",
        issuer: "Aquaculture Stewardship Council",
        date: "2024-01-10",
        document: "asc-certificate.pdf"
      },
      {
        name: "BAP 4-Star",
        icon: "⭐",
        issuer: "Best Aquaculture Practices",
        date: "2024-01-12",
        document: "bap-certificate.pdf"
      },
      {
        name: "Non-GMO",
        icon: "🧬",
        issuer: "Non-GMO Project",
        date: "2024-01-08",
        document: "non-gmo-certificate.pdf"
      },
      {
        name: "Organic",
        icon: "🌱",
        issuer: "USDA Organic",
        date: "2024-01-05",
        document: "organic-certificate.pdf"
      }
    ]
  };

  const handleScan = (scannedProductId: string) => {
    setProductId(scannedProductId);
    // Simulate different QR codes leading to different views
    if (scannedProductId.includes("CUSTOMER")) {
      setCurrentView("customer");
    } else if (scannedProductId.includes("ADMIN")) {
      setCurrentView("admin");
    } else {
      setCurrentView("traceability");
    }
  };

  const handleBack = () => {
    setCurrentView("scanner");
    setProductId(null);
  };

  return (
    <div className="min-h-screen">
      {currentView === "scanner" && (
        <QRScanner onScan={handleScan} />
      )}
      {currentView === "traceability" && (
        <ProductTraceability onBack={handleBack} />
      )}
      {currentView === "customer" && (
        <UnifiedProductView 
          layout={customerLayout}
          productData={sampleProductData}
          supplyChainData={sampleSupplyChainData}
          onBack={handleBack}
        />
      )}
      {currentView === "admin" && (
        <AdminPanel onBack={handleBack} />
      )}
    </div>
  );
};

export default Index;
