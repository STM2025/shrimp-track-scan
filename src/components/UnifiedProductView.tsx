import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  ArrowLeft, 
  Award, 
  Fish, 
  Leaf, 
  Eye,
  Calendar,
  MapPin,
  Thermometer,
  Truck,
  Factory,
  Store,
  ChevronRight,
  CheckCircle
} from "lucide-react";
import { ProductData, SupplyChainStep, LayoutType } from "@/types/layout";

interface UnifiedProductViewProps {
  onBack: () => void;
  layout: LayoutType;
  productData: ProductData;
  supplyChainData: SupplyChainStep[];
}

export function UnifiedProductView({ onBack, layout, productData, supplyChainData }: UnifiedProductViewProps) {
  
  const renderSupplyChainTimeline = (style: "timeline" | "cards" | "minimal" = "timeline") => {
    if (style === "minimal") {
      return (
        <div className="space-y-2">
          {supplyChainData.map((step, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 rounded border">
              <step.icon className={`w-5 h-5 ${step.status === 'completed' ? 'text-sustainable' : 'text-muted-foreground'}`} />
              <div className="flex-1">
                <p className="font-medium text-sm">{step.step}</p>
                <p className="text-xs text-muted-foreground">{step.location}</p>
              </div>
              {step.status === 'completed' && <CheckCircle className="w-4 h-4 text-sustainable" />}
            </div>
          ))}
        </div>
      );
    }

    if (style === "cards") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supplyChainData.map((step, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.status === 'completed' ? 'bg-sustainable text-white' : 'bg-muted'
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{step.step}</h3>
                    <p className="text-xs text-muted-foreground mb-1">{step.company}</p>
                    <p className="text-xs text-muted-foreground">{step.location} • {step.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    // Default timeline style
    return (
      <div className="space-y-4">
        {supplyChainData.map((step, index) => (
          <div key={index} className="relative">
            <div className="flex items-start space-x-4 p-4 rounded-lg border bg-gradient-to-r from-muted/50 to-background">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                step.status === 'completed' ? 'bg-sustainable text-white' : 
                step.status === 'current' ? 'bg-ocean text-white' : 'bg-muted'
              }`}>
                <step.icon className="w-6 h-6" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold">{step.step}</h3>
                  {step.status === 'completed' && <CheckCircle className="w-5 h-5 text-sustainable" />}
                </div>
                <p className="font-medium text-sm">{step.company}</p>
                <p className="text-xs text-muted-foreground mb-2">{step.location} • {step.date}</p>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Leaf className="w-3 h-3 text-sustainable" />
                    <span className="text-xs">{step.carbonFootprint}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {index < supplyChainData.length - 1 && (
              <div className="flex justify-center my-2">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderCertifications = (display: "grid" | "list" | "badges" = "grid") => {
    if (display === "badges") {
      return (
        <div className="flex flex-wrap gap-2">
          {productData.certifications.map((cert, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  <span className="mr-1">{cert.icon}</span>
                  {cert.name}
                </Badge>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <span>{cert.icon}</span>
                    <span>{cert.name}</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  <p><strong>Issued by:</strong> {cert.issuer}</p>
                  <p><strong>Date:</strong> {cert.date}</p>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      );
    }

    if (display === "list") {
      return (
        <div className="space-y-2">
          {productData.certifications.map((cert, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="flex items-center space-x-3 p-3 border rounded cursor-pointer hover:bg-muted/50">
                  <span className="text-lg">{cert.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{cert.name}</p>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                  </div>
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <span>{cert.icon}</span>
                    <span>{cert.name}</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  <p><strong>Issued by:</strong> {cert.issuer}</p>
                  <p><strong>Date:</strong> {cert.date}</p>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      );
    }

    // Default grid display
    return (
      <div className="grid grid-cols-2 gap-3">
        {productData.certifications.map((cert, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-auto p-3 flex flex-col items-center space-y-1 cursor-pointer">
                <span className="text-lg">{cert.icon}</span>
                <span className="text-xs font-medium text-center">{cert.name}</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <span>{cert.icon}</span>
                  <span>{cert.name}</span>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                <p><strong>Issued by:</strong> {cert.issuer}</p>
                <p><strong>Date:</strong> {cert.date}</p>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    );
  };

  // Comprehensive Layout - Full detailed view
  if (layout === "comprehensive") {
    return (
      <div className="min-h-screen bg-background">
        <div className="p-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2" />
            Back
          </Button>
        </div>

        <div className="max-w-6xl mx-auto p-4 space-y-6">
          {/* Product Header */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <img 
                    src={productData.image} 
                    alt={productData.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="md:col-span-2">
                  <h1 className="text-2xl font-bold mb-2">{productData.name}</h1>
                  <p className="text-muted-foreground mb-4">Product ID: {productData.productId}</p>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <Calendar className="w-4 h-4 text-ocean" />
                    <span className="text-sm">Harvested: {productData.harvestDate}</span>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Sustainability Score</span>
                      <span className="font-bold">{productData.sustainabilityScore}/100</span>
                    </div>
                    <Progress value={productData.sustainabilityScore} className="h-3" />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Certifications</h3>
                    {renderCertifications("badges")}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supply Chain Journey */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 text-ocean" />
                Supply Chain Journey
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderSupplyChainTimeline("timeline")}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Executive Layout - Business focused
  if (layout === "executive") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ocean/5 to-sustainable/5">
        <div className="p-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2" />
            Back
          </Button>
        </div>

        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* Header with Image */}
          <div className="relative h-48 rounded-lg overflow-hidden">
            <img 
              src={productData.image} 
              alt={productData.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-xl font-bold">{productData.name}</h1>
              <p className="text-sm opacity-90">ID: {productData.productId}</p>
            </div>
            <div className="absolute top-4 right-4">
              <Badge className="bg-sustainable text-white">
                {productData.sustainabilityScore}% Sustainable
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Certifications */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderCertifications("list")}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Supply Chain */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Supply Chain Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderSupplyChainTimeline("cards")}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Consumer Layout - Simple and clean
  return (
    <div className="min-h-screen bg-background p-4">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2" />
        Back
      </Button>

      <div className="max-w-md mx-auto space-y-6">
        {/* Product Image and Basic Info */}
        <Card>
          <CardContent className="p-0">
            <img 
              src={productData.image} 
              alt={productData.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h1 className="font-bold mb-1">{productData.name}</h1>
              <p className="text-xs text-muted-foreground mb-3">{productData.productId}</p>
              
              <div className="flex items-center space-x-2 mb-3">
                <Leaf className="w-4 h-4 text-sustainable" />
                <span className="text-sm">Sustainability: {productData.sustainabilityScore}%</span>
              </div>
              
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span className="text-xs">Harvested {productData.harvestDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Quality Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            {renderCertifications("grid")}
          </CardContent>
        </Card>

        {/* Supply Chain - Accordion */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Product Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="journey">
                <AccordionTrigger className="text-sm">View Supply Chain</AccordionTrigger>
                <AccordionContent>
                  {renderSupplyChainTimeline("minimal")}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}