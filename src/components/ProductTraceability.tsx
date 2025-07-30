import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  MapPin, 
  Leaf, 
  Award, 
  Truck,
  Factory,
  Store,
  Fish,
  Thermometer,
  Calendar,
  Scale,
  TreePine,
  Waves,
  ChevronRight,
  CheckCircle
} from "lucide-react";
import shrimpImage from "@/assets/shrimp-product.jpg";

interface ProductTraceabilityProps {
  onBack: () => void;
}

export function ProductTraceability({ onBack }: ProductTraceabilityProps) {
  const sustainabilityScore = 87;

  const supplyChainSteps = [
    {
      step: "Farm",
      location: "Guayas Province, Ecuador",
      company: "AquaMar Sustainable Farms",
      date: "2024-01-15",
      status: "completed",
      icon: Fish,
      description: "Responsible aquaculture with ASC certification"
    },
    {
      step: "Processing",
      location: "Guayaquil, Ecuador", 
      company: "EcoProcess Solutions",
      date: "2024-01-20",
      status: "completed",
      icon: Factory,
      description: "IFS certified processing facility"
    },
    {
      step: "Distribution",
      location: "Miami, FL, USA",
      company: "FreshMarine Logistics",
      date: "2024-01-22",
      status: "completed", 
      icon: Truck,
      description: "Cold chain maintained at -18°C"
    },
    {
      step: "Retail",
      location: "Whole Foods Market",
      company: "Austin, TX, USA",
      date: "2024-01-25",
      status: "current",
      icon: Store,
      description: "Final point of sale"
    }
  ];

  const certifications = [
    { name: "ASC Certified", icon: "🌊", color: "bg-ocean" },
    { name: "BAP 4-Star", icon: "⭐", color: "bg-sustainable" },
    { name: "Non-GMO", icon: "🧬", color: "bg-accent" },
    { name: "Antibiotic Free", icon: "💊", color: "bg-secondary" }
  ];

  const environmentalData = [
    { label: "Carbon Footprint", value: "2.1 kg CO₂/kg", status: "Low", color: "text-sustainable" },
    { label: "Water Usage", value: "15,200 L/kg", status: "Efficient", color: "text-ocean" },
    { label: "Land Use", value: "0.8 m²/kg", status: "Minimal", color: "text-sustainable" },
    { label: "Feed Efficiency", value: "1.4:1 FCR", status: "Excellent", color: "text-sustainable" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-ocean to-sustainable text-white p-4">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 mb-4">
            <ArrowLeft className="mr-2" />
            Back to Scanner
          </Button>
          
          <div className="flex items-start space-x-4">
            <img 
              src={shrimpImage} 
              alt="Premium Shrimp" 
              className="w-24 h-24 rounded-lg object-cover border-2 border-white/20"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">Premium White Shrimp</h1>
              <p className="text-white/90 mb-1">Product ID: SHRIMP-ECU-2024-001</p>
              <p className="text-white/90 mb-3">Harvest Date: January 15, 2024</p>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Leaf className="w-5 h-5" />
                  <span className="font-medium">Sustainability Score</span>
                </div>
                <div className="flex-1 max-w-32">
                  <Progress value={sustainabilityScore} className="h-2 bg-white/20" />
                </div>
                <span className="font-bold">{sustainabilityScore}/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        
        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 text-sustainable" />
              Certifications & Standards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="text-center p-4 rounded-lg border">
                  <div className="text-3xl mb-2">{cert.icon}</div>
                  <p className="font-medium text-sm">{cert.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Supply Chain Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 text-ocean" />
              Supply Chain Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supplyChainSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    step.status === 'completed' ? 'bg-sustainable text-white' : 
                    step.status === 'current' ? 'bg-ocean text-white' : 'bg-muted'
                  }`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{step.step}</h3>
                      {step.status === 'completed' && <CheckCircle className="w-5 h-5 text-sustainable" />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{step.company}</p>
                    <p className="text-sm text-muted-foreground">{step.location} • {step.date}</p>
                    <p className="text-sm mt-1">{step.description}</p>
                  </div>
                  
                  {index < supplyChainSteps.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="environmental" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="environmental">Environmental</TabsTrigger>
            <TabsTrigger value="farm">Farm Details</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="transport">Transport</TabsTrigger>
          </TabsList>

          <TabsContent value="environmental" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Leaf className="mr-2 text-sustainable" />
                  Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {environmentalData.map((item, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{item.label}</h3>
                        <Badge variant="secondary" className={item.color}>{item.status}</Badge>
                      </div>
                      <p className="text-2xl font-bold text-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="farm" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Fish className="mr-2 text-ocean" />
                  Farm Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Farmer Details</h3>
                    <p><strong>Farm Name:</strong> AquaMar Sustainable Farms</p>
                    <p><strong>Owner:</strong> Carlos Rodriguez</p>
                    <p><strong>Location:</strong> Guayas Province, Ecuador</p>
                    <p><strong>Farm Size:</strong> 25 hectares</p>
                    <p><strong>Established:</strong> 2018</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Feed Details</h3>
                    <p><strong>Feed Type:</strong> Plant-based premium feed</p>
                    <p><strong>Supplier:</strong> BioMarine Nutrition</p>
                    <p><strong>Protein Source:</strong> Soy, fish meal (sustainable)</p>
                    <p><strong>Feed Conversion:</strong> 1.4:1 FCR</p>
                    <p><strong>Antibiotics:</strong> None used</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Pond Conditions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 rounded-lg bg-ocean-light">
                      <Thermometer className="w-6 h-6 text-ocean mx-auto mb-1" />
                      <p className="text-sm font-medium">Temperature</p>
                      <p className="text-lg font-bold text-ocean">28°C</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-sustainable-light">
                      <Waves className="w-6 h-6 text-sustainable mx-auto mb-1" />
                      <p className="text-sm font-medium">Salinity</p>
                      <p className="text-lg font-bold text-sustainable">15 ppt</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-ocean-light">
                      <Scale className="w-6 h-6 text-ocean mx-auto mb-1" />
                      <p className="text-sm font-medium">Density</p>
                      <p className="text-lg font-bold text-ocean">25 shrimp/m²</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-sustainable-light">
                      <TreePine className="w-6 h-6 text-sustainable mx-auto mb-1" />
                      <p className="text-sm font-medium">Oxygen</p>
                      <p className="text-lg font-bold text-sustainable">6.5 ppm</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="processing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Factory className="mr-2 text-ocean" />
                  Processing Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Processor Information</h3>
                    <p><strong>Company:</strong> EcoProcess Solutions</p>
                    <p><strong>Location:</strong> Guayaquil, Ecuador</p>
                    <p><strong>Facility Code:</strong> EP-GYE-001</p>
                    <p><strong>Certifications:</strong> IFS, HACCP, BRC</p>
                    <p><strong>Processing Date:</strong> January 20, 2024</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Processing Method</h3>
                    <p><strong>Method:</strong> IQF (Individual Quick Frozen)</p>
                    <p><strong>Temperature:</strong> -35°C flash freeze</p>
                    <p><strong>Packaging:</strong> Vacuum sealed, recyclable</p>
                    <p><strong>Yield:</strong> 68% headless shell-on</p>
                    <p><strong>Quality Grade:</strong> Premium A</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 rounded-lg bg-muted">
                  <h3 className="font-semibold mb-2">Quality Control Tests</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <CheckCircle className="w-6 h-6 text-sustainable mx-auto mb-1" />
                      <p className="text-sm">Microbiological</p>
                      <p className="font-semibold text-sustainable">Passed</p>
                    </div>
                    <div className="text-center">
                      <CheckCircle className="w-6 h-6 text-sustainable mx-auto mb-1" />
                      <p className="text-sm">Chemical Analysis</p>
                      <p className="font-semibold text-sustainable">Passed</p>
                    </div>
                    <div className="text-center">
                      <CheckCircle className="w-6 h-6 text-sustainable mx-auto mb-1" />
                      <p className="text-sm">Sensory Evaluation</p>
                      <p className="font-semibold text-sustainable">Excellent</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transport" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="mr-2 text-ocean" />
                  Transportation Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Logistics Provider</h3>
                    <p><strong>Company:</strong> FreshMarine Logistics</p>
                    <p><strong>Route:</strong> Guayaquil → Miami → Austin</p>
                    <p><strong>Transport Mode:</strong> Air freight</p>
                    <p><strong>Transit Time:</strong> 48 hours</p>
                    <p><strong>Tracking ID:</strong> FM-24-001-SHR</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Cold Chain Monitoring</h3>
                    <p><strong>Target Temp:</strong> -18°C ± 2°C</p>
                    <p><strong>Actual Range:</strong> -17.8°C to -18.2°C</p>
                    <p><strong>Humidity:</strong> 85% RH</p>
                    <p><strong>Monitoring:</strong> IoT sensors (24/7)</p>
                    <p><strong>Status:</strong> <span className="text-sustainable font-semibold">Optimal</span></p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 rounded-lg bg-muted">
                  <h3 className="font-semibold mb-2">Carbon Footprint - Transportation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl mb-1">✈️</div>
                      <p className="text-sm">Air Transport</p>
                      <p className="font-semibold">0.85 kg CO₂/kg</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">🚛</div>
                      <p className="text-sm">Ground Transport</p>
                      <p className="font-semibold">0.12 kg CO₂/kg</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">🌱</div>
                      <p className="text-sm">Carbon Offset</p>
                      <p className="font-semibold text-sustainable">100% Offset</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}