import { useState } from "react";
import { QRScanner } from "@/components/QRScanner";
import { ProductTraceability } from "@/components/ProductTraceability";

const Index = () => {
  const [currentView, setCurrentView] = useState<"scanner" | "traceability">("scanner");
  const [productId, setProductId] = useState<string | null>(null);

  const handleScan = (scannedProductId: string) => {
    setProductId(scannedProductId);
    setCurrentView("traceability");
  };

  const handleBack = () => {
    setCurrentView("scanner");
    setProductId(null);
  };

  return (
    <div className="min-h-screen">
      {currentView === "scanner" ? (
        <QRScanner onScan={handleScan} />
      ) : (
        <ProductTraceability onBack={handleBack} />
      )}
    </div>
  );
};

export default Index;
