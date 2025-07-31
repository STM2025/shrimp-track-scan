import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Award, 
  Fish, 
  Leaf, 
  Eye,
  Calendar,
  MapPin,
  Thermometer
} from "lucide-react";
import shrimp1 from "@/assets/shrimp-1.jpg";
import shrimp2 from "@/assets/shrimp-2.jpg";
import shrimp3 from "@/assets/shrimp-3.jpg";

interface B2CCustomerViewProps {
  onBack: () => void;
  layout: "card" | "hero" | "minimal";
  productData: {
    image: string;
    name: string;
    productId: string;
    harvestDate: string;
    sustainabilityScore: number;
    certifications: Array<{
      name: string;
      icon: string;
      issuer: string;
      date: string;
      document?: string;
    }>;
  };
}

export function B2CCustomerView({ onBack, layout, productData }: B2CCustomerViewProps) {
  const [selectedCert, setSelectedCert] = useState<any>(null);

  const renderCardLayout = () => (
    <div className="min-h-screen bg-gradient-to-br from-ocean/5 to-sustainable/5">
      <div className="p-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2" />
          Back
        </Button>
      </div>
      
      <div className="max-w-md mx-auto p-4 space-y-6">
        <Card className="overflow-hidden">
          <div className="relative">
            <img 
              src={productData.image} 
              alt={productData.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge className="bg-sustainable text-white">
                Fresh
              </Badge>
            </div>
          </div>
          
          <CardContent className="p-6">
            <h1 className="text-xl font-bold mb-2">{productData.name}</h1>
            <p className="text-sm text-muted-foreground mb-4">
              Product ID: {productData.productId}
            </p>
            
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-4 h-4 text-ocean" />
              <span className="text-sm">Harvested: {productData.harvestDate}</span>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Sustainability Score</span>
                <span className="text-sm font-bold">{productData.sustainabilityScore}/100</span>
              </div>
              <Progress value={productData.sustainabilityScore} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Certifications</h3>
              <div className="grid grid-cols-2 gap-2">
                {productData.certifications.map((cert, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col items-center space-y-1">
                        <span className="text-lg">{cert.icon}</span>
                        <span className="text-xs font-medium text-center">{cert.name}</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <span className="text-xl">{cert.icon}</span>
                          <span>{cert.name}</span>
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <p><strong>Issued by:</strong> {cert.issuer}</p>
                          <p><strong>Date:</strong> {cert.date}</p>
                        </div>
                        {cert.document && (
                          <div className="p-4 border rounded-lg bg-muted/50">
                            <p className="text-sm text-muted-foreground mb-2">Certification Document</p>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View Document
                            </Button>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderHeroLayout = () => (
    <div className="min-h-screen">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={productData.image} 
          alt={productData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack} 
          className="absolute top-4 left-4 text-white hover:bg-white/20"
        >
          <ArrowLeft className="mr-2" />
          Back
        </Button>
        
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h1 className="text-2xl font-bold mb-2">{productData.name}</h1>
          <div className="flex items-center space-x-4 mb-3">
            <Badge className="bg-sustainable/80 text-white">
              Premium Quality
            </Badge>
            <span className="text-sm opacity-90">ID: {productData.productId}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Leaf className="w-4 h-4" />
            <span className="text-sm">Sustainability: {productData.sustainabilityScore}/100</span>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Harvested on {productData.harvestDate}</span>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-4">Quality Certifications</h2>
          <div className="grid grid-cols-1 gap-3">
            {productData.certifications.map((cert, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-center space-x-3">
                      <span className="text-2xl">{cert.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-medium">{cert.name}</h3>
                        <p className="text-sm text-muted-foreground">Issued by {cert.issuer}</p>
                      </div>
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <span className="text-xl">{cert.icon}</span>
                      <span>{cert.name}</span>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <p><strong>Issued by:</strong> {cert.issuer}</p>
                      <p><strong>Date:</strong> {cert.date}</p>
                    </div>
                    {cert.document && (
                      <div className="p-4 border rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground mb-2">Certification Document</p>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Document
                        </Button>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMinimalLayout = () => (
    <div className="min-h-screen bg-background p-4">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-6">
        <ArrowLeft className="mr-2" />
        Back
      </Button>
      
      <div className="max-w-sm mx-auto space-y-6">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-ocean/20">
            <img 
              src={productData.image} 
              alt={productData.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl font-bold mb-1">{productData.name}</h1>
          <p className="text-sm text-muted-foreground mb-4">
            {productData.productId}
          </p>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="w-4 h-4 text-sustainable" />
            <span className="text-sm font-medium">Sustainability {productData.sustainabilityScore}%</span>
          </div>
        </div>
        
        <div className="space-y-2">
          {productData.certifications.map((cert, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start h-auto p-3">
                  <span className="text-lg mr-3">{cert.icon}</span>
                  <div className="text-left">
                    <div className="font-medium text-sm">{cert.name}</div>
                    <div className="text-xs text-muted-foreground">{cert.issuer}</div>
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <span className="text-xl">{cert.icon}</span>
                    <span>{cert.name}</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <p><strong>Issued by:</strong> {cert.issuer}</p>
                    <p><strong>Date:</strong> {cert.date}</p>
                  </div>
                  {cert.document && (
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-2">Certification Document</p>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Document
                      </Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        
        <div className="text-center pt-4 border-t">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span className="text-xs">Harvested {productData.harvestDate}</span>
          </div>
        </div>
      </div>
    </div>
  );

  switch (layout) {
    case "hero":
      return renderHeroLayout();
    case "minimal":
      return renderMinimalLayout();
    default:
      return renderCardLayout();
  }
}