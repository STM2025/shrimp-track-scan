import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  Upload, 
  Eye, 
  Settings, 
  Save,
  Plus,
  Trash2,
  Fish,
  Factory,
  Truck,
  Store
} from "lucide-react";
import { UnifiedProductView } from "./UnifiedProductView";
import { LayoutType, ProductData, SupplyChainStep } from "@/types/layout";
import shrimp1 from "@/assets/shrimp-1.jpg";
import shrimp2 from "@/assets/shrimp-2.jpg";
import shrimp3 from "@/assets/shrimp-3.jpg";

interface AdminPanelProps {
  onBack: () => void;
}

export function AdminPanel({ onBack }: AdminPanelProps) {
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>("comprehensive");
  const [productData, setProductData] = useState<ProductData>({
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
  });

  const [newCertification, setNewCertification] = useState({
    name: "",
    icon: "",
    issuer: "",
    date: "",
    document: ""
  });

  const supplyChainData: SupplyChainStep[] = [
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
        { name: "Larvae Health Check", result: "Passed", date: "2024-01-10" },
        { name: "Genetic Screening", result: "SPF Certified", date: "2024-01-12" }
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

  const layoutOptions = [
    { 
      value: "comprehensive" as LayoutType, 
      label: "Comprehensive Layout", 
      description: "Full detailed view with product info, certifications, and complete supply chain journey in timeline format" 
    },
    { 
      value: "executive" as LayoutType, 
      label: "Executive Layout", 
      description: "Business-focused layout with hero image, sidebar certifications, and supply chain cards" 
    },
    { 
      value: "consumer" as LayoutType, 
      label: "Consumer Layout", 
      description: "Simple mobile-friendly design with accordion supply chain and minimal information" 
    }
  ];

  const imageOptions = [
    { src: shrimp1, label: "Cooked Shrimp" },
    { src: shrimp2, label: "Fresh Shrimp" },
    { src: shrimp3, label: "Grilled Shrimp" }
  ];

  const handleAddCertification = () => {
    if (newCertification.name && newCertification.issuer) {
      setProductData(prev => ({
        ...prev,
        certifications: [...prev.certifications, { ...newCertification }]
      }));
      setNewCertification({ name: "", icon: "", issuer: "", date: "", document: "" });
    }
  };

  const handleRemoveCertification = (index: number) => {
    setProductData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="mr-2" />
                Back to Scanner
              </Button>
              <div>
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <p className="text-sm text-muted-foreground">Configure B2C customer experience</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-ocean/10 text-ocean">
              <Settings className="w-3 h-3 mr-1" />
              Configuration Mode
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <Tabs defaultValue="layout" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="layout">Layout</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
              </TabsList>

              <TabsContent value="layout" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Layout Selection</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {layoutOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedLayout === option.value 
                            ? 'border-ocean bg-ocean/5' 
                            : 'border-border hover:bg-muted/50'
                        }`}
                        onClick={() => setSelectedLayout(option.value)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{option.label}</h3>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                          {selectedLayout === option.value && (
                            <Badge className="bg-ocean text-white">Selected</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="productName">Product Name</Label>
                      <Input
                        id="productName"
                        value={productData.name}
                        onChange={(e) => setProductData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="productId">Product ID</Label>
                      <Input
                        id="productId"
                        value={productData.productId}
                        onChange={(e) => setProductData(prev => ({ ...prev, productId: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="harvestDate">Harvest Date</Label>
                      <Input
                        id="harvestDate"
                        value={productData.harvestDate}
                        onChange={(e) => setProductData(prev => ({ ...prev, harvestDate: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sustainability">Sustainability Score (0-100)</Label>
                      <Input
                        id="sustainability"
                        type="number"
                        min="0"
                        max="100"
                        value={productData.sustainabilityScore}
                        onChange={(e) => setProductData(prev => ({ ...prev, sustainabilityScore: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Product Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-2">
                        {imageOptions.map((option, index) => (
                          <div
                            key={index}
                            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-colors ${
                              productData.image === option.src 
                                ? 'border-ocean' 
                                : 'border-border hover:border-muted-foreground'
                            }`}
                            onClick={() => setProductData(prev => ({ ...prev, image: option.src }))}
                          >
                            <img
                              src={option.src}
                              alt={option.label}
                              className="w-full h-20 object-cover"
                            />
                            {productData.image === option.src && (
                              <div className="absolute inset-0 bg-ocean/20 flex items-center justify-center">
                                <Badge className="bg-ocean text-white text-xs">Selected</Badge>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Custom Image
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Manage Certifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Current Certifications */}
                    <div className="space-y-2">
                      <h3 className="font-medium">Current Certifications</h3>
                      {productData.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{cert.icon}</span>
                            <div>
                              <p className="font-medium text-sm">{cert.name}</p>
                              <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveCertification(index)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {/* Add New Certification */}
                    <div className="space-y-3 pt-4 border-t">
                      <h3 className="font-medium">Add New Certification</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Certification Name"
                          value={newCertification.name}
                          onChange={(e) => setNewCertification(prev => ({ ...prev, name: e.target.value }))}
                        />
                        <Input
                          placeholder="Icon (emoji)"
                          value={newCertification.icon}
                          onChange={(e) => setNewCertification(prev => ({ ...prev, icon: e.target.value }))}
                        />
                        <Input
                          placeholder="Issuer"
                          value={newCertification.issuer}
                          onChange={(e) => setNewCertification(prev => ({ ...prev, issuer: e.target.value }))}
                        />
                        <Input
                          placeholder="Date"
                          value={newCertification.date}
                          onChange={(e) => setNewCertification(prev => ({ ...prev, date: e.target.value }))}
                        />
                      </div>
                      <Button onClick={handleAddCertification} className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Certification
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex space-x-2">
              <Button className="flex-1 bg-sustainable hover:bg-sustainable/90">
                <Save className="w-4 h-4 mr-2" />
                Save Configuration
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Customer View Preview</DialogTitle>
                  </DialogHeader>
                  <div className="max-h-96 overflow-auto">
                    <div className="scale-50 origin-top-left w-[200%] h-96 overflow-hidden">
                      <UnifiedProductView
                        layout={selectedLayout}
                        productData={productData}
                        supplyChainData={supplyChainData}
                        onBack={() => {}}
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Live Preview */}
          <div className="lg:sticky lg:top-4">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="mr-2" />
                  Live Preview - {layoutOptions.find(l => l.value === selectedLayout)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <div className="scale-50 origin-top-left w-[200%] h-96 overflow-hidden">
                    <UnifiedProductView
                      layout={selectedLayout}
                      productData={productData}
                      supplyChainData={supplyChainData}
                      onBack={() => {}}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}