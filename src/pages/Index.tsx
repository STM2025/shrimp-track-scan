import { useState } from "react";
import { QRScanner } from "@/components/QRScanner";
import { ProductTraceability } from "@/components/ProductTraceability";
import { B2CCustomerView } from "@/components/B2CCustomerView";
import { AdminPanel } from "@/components/AdminPanel";
import shrimp1 from "@/assets/shrimp-1.jpg";

const Index = () => {
  const [currentView, setCurrentView] = useState<"scanner" | "traceability" | "customer" | "admin">("scanner");
  const [productId, setProductId] = useState<string | null>(null);
  const [customerLayout, setCustomerLayout] = useState<"card" | "hero" | "minimal">("card");

  // Sample product data for B2C view
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
        <B2CCustomerView 
          layout={customerLayout}
          productData={sampleProductData}
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
