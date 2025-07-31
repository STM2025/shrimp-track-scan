import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Camera, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface QRScannerProps {
  onScan: (productId: string) => void;
}

export function QRScanner({ onScan }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate QR code scan - in real app, this would use camera
    setTimeout(() => {
      setIsScanning(false);
      onScan("SHRIMP-ECU-2024-001");
    }, 2000);
  };

  const handleManualEntry = () => {
    // Simulate manual entry for demo
    onScan("SHRIMP-ECU-2024-001");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-light to-sustainable-light p-4">
      <div className="max-w-md mx-auto pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-ocean to-sustainable rounded-full mx-auto mb-4 flex items-center justify-center">
            <QrCode className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Shrimp Traceability
          </h1>
          <p className="text-muted-foreground">
            Scan QR code to track your product's sustainable journey
          </p>
        </div>

        {/* Scanner Card */}
        <Card className="mb-6 shadow-xl">
          <CardContent className="p-6">
            <div 
              className={cn(
                "relative w-full h-64 border-2 border-dashed rounded-lg mb-6 transition-all duration-300",
                isScanning ? "border-sustainable bg-sustainable-light" : "border-border bg-muted/30"
              )}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {isScanning ? (
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-sustainable border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-sustainable font-medium">Scanning...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Position QR code in frame</p>
                  </div>
                )}
              </div>
              
              {!isScanning && (
                <div className="absolute inset-4 border border-foreground/20 rounded-lg">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-foreground/40 rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-foreground/40 rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-foreground/40 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-foreground/40 rounded-br-lg"></div>
                </div>
              )}
            </div>

            <Button 
              variant="scan" 
              size="lg" 
              className="w-full mb-4"
              onClick={handleScan}
              disabled={isScanning}
            >
              <Camera className="mr-2" />
              {isScanning ? "Scanning..." : "Start Scanning"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              size="lg" 
              className="w-full mt-4"
              onClick={handleManualEntry}
            >
              <Search className="mr-2" />
              View Demo Product
            </Button>
          </CardContent>
        </Card>

        {/* Demo Options */}
        <div className="space-y-4 mb-6">
          <h2 className="text-lg font-semibold">Try these sample QR codes:</h2>
          <div className="grid grid-cols-1 gap-3">
            <Button
              variant="outline"
              onClick={() => onScan("SHRIMP-ECU-2024-001")}
              className="p-4 h-auto"
            >
              <div className="text-center">
                <div className="text-2xl mb-1">🦐</div>
                <div className="font-semibold">Supply Chain View</div>
                <div className="text-xs text-muted-foreground">Detailed traceability</div>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => onScan("CUSTOMER-SHRIMP-2024-001")}
              className="p-4 h-auto"
            >
              <div className="text-center">
                <div className="text-2xl mb-1">👥</div>
                <div className="font-semibold">Customer View</div>
                <div className="text-xs text-muted-foreground">B2C Experience</div>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => onScan("ADMIN-PANEL-2024-001")}
              className="p-4 h-auto"
            >
              <div className="text-center">
                <div className="text-2xl mb-1">⚙️</div>
                <div className="font-semibold">Admin Panel</div>
                <div className="text-xs text-muted-foreground">Configure layouts</div>
              </div>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <div className="w-10 h-10 bg-sustainable/20 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-sustainable font-bold">✓</span>
            </div>
            <p className="text-sm font-medium">Certified Sustainable</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="w-10 h-10 bg-ocean/20 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-ocean font-bold">🌊</span>
            </div>
            <p className="text-sm font-medium">Ocean Responsible</p>
          </Card>
        </div>
      </div>
    </div>
  );
}