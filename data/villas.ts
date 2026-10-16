export interface VillaHotspot {
  id: string;
  title: string;
  description: string;
  position: [number, number, number];
}

export interface VillaData {
  id: string;
  index: number;
  number: string;
  name: string;
  tagline: string;
  architect: string;
  location: string;
  year: string;
  area: string;
  levels: string;
  bedrooms: string;
  style: string;
  primaryMaterials: string[];
  description: string;
  modelPath: string;
  texturesPath: string;
  scaleMultiplier?: number;
  yOffset?: number;
  rotationY?: number;
  cameraPosition?: [number, number, number];
  hotspots: VillaHotspot[];
  features: { label: string; value: string }[];
  /** Three RGB colours (0–1) for the shader background palette */
  shaderPalette: [[number,number,number],[number,number,number],[number,number,number]];
}

export const VILLAS: VillaData[] = [
  {
    id: "villa-3",
    index: 0,
    number: "01",
    name: "The Monolith Sanctuary",
    tagline: "Sculptural Brutalist Compound",
    architect: "David Chipperfield Heritage",
    location: "Kyoto Foothills, Japan",
    year: "2026",
    area: "9,600 sq.ft",
    levels: "3 Levels",
    bedrooms: "4 Suites",
    style: "Organic Brutalism",
    primaryMaterials: ["Board-Formed Concrete", "Charred Yakisugi Cedar", "Basalt Stone"],
    description:
      "A monumental dialogue between raw board-formed concrete and traditional Japanese woodwork. Serene courtyards and private onsen baths anchor this tranquil meditative compound.",
    modelPath: "/models/villa-3/source/7575.fbx",
    texturesPath: "/models/villa-3/textures/",
    scaleMultiplier: 1.18,
    yOffset: 0,
    rotationY: 0,
    cameraPosition: [16, 11, 16],
    hotspots: [
      {
        id: "v3-h1",
        title: "Board-Formed Concrete Facade",
        description: "Hand-poured concrete retaining tactile wooden grain impressions.",
        position: [-2.8, 2.6, 2.2],
      },
      {
        id: "v3-h2",
        title: "Yakisugi Cedar Screening",
        description: "Charred Japanese cedar screens providing privacy and fire resistance.",
        position: [2.5, 3.2, -0.8],
      },
      {
        id: "v3-h3",
        title: "Basalt Reflection Pond",
        description: "Black volcanic basalt pond reflecting sky and bonsai sculptures.",
        position: [0.5, 0.4, 3.2],
      },
    ],
    features: [
      { label: "Gross Area", value: "9,600 sq.ft" },
      { label: "Tea House", value: "Detached Pavilion" },
      { label: "Thermal Mass", value: "High-Efficiency Core" },
      { label: "Garage", value: "4-Car Subterranean" },
    ],
    // Warm cream → peachy gold → amber — matches board-formed concrete & Yakisugi cedar
    shaderPalette: [[0.980, 0.965, 0.945], [0.969, 0.820, 0.580], [0.900, 0.640, 0.340]],
  },
  {
    id: "villa-5",
    index: 1,
    number: "02",
    name: "The Geometric Haven",
    tagline: "Sculptural Concrete Modernism",
    architect: "Tadao Ando Inspired",
    location: "St. Moritz, Switzerland",
    year: "2026",
    area: "10,500 sq.ft",
    levels: "3 Levels",
    bedrooms: "5 Suites",
    style: "Alpine Contemporary",
    primaryMaterials: ["Architectural Concrete", "Triple-Glazed Low-E Glass", "Slate Stone"],
    description:
      "Defying alpine conditions, this geometric sculpture captures dramatic mountain peaks while maintaining a warm thermal envelope. Internal light shafts channel daylight deep within.",
    modelPath: "/models/villa-5/source/52.fbx",
    texturesPath: "/models/villa-5/textures/",
    scaleMultiplier: 1.30,
    yOffset: 0,
    rotationY: 0,
    cameraPosition: [16, 11, 16],
    hotspots: [
      {
        id: "v5-h1",
        title: "Angled Roof Cantilever",
        description: "Aerodynamic snow-shedding structure engineered for high alpine loads.",
        position: [0.0, 4.0, 0.8],
      },
      {
        id: "v5-h2",
        title: "Alpine Thermal Envelope",
        description: "Quadruple-gasket insulation achieving zero thermal bridging.",
        position: [-2.8, 2.4, -1.2],
      },
      {
        id: "v5-h3",
        title: "Heated Driveway & Courtyard",
        description: "Geothermally heated stone apron melting snow automatically.",
        position: [2.2, 0.5, 2.8],
      },
    ],
    features: [
      { label: "Gross Area", value: "10,500 sq.ft" },
      { label: "Ski-in / Ski-out", value: "Direct Private Piste Access" },
      { label: "Geothermal Wells", value: "8 x 200m Deep Probes" },
      { label: "Indoor Pool", value: "15m Alpine Heated Pool" },
    ],
    // Ice white → alpine blue-grey → cool slate — matches alpine concrete & glacier glass
    shaderPalette: [[0.960, 0.968, 0.980], [0.780, 0.830, 0.900], [0.540, 0.620, 0.740]],
  },
  {
    id: "villa-6",
    index: 2,
    number: "03",
    name: "Nordic Obsidian Villa",
    tagline: "Scandinavian Timber & Glass Horizon",
    architect: "Snøhetta Atelier Vision",
    location: "Stockholm Archipelago, Sweden",
    year: "2025",
    area: "12,400 sq.ft",
    levels: "2 Levels + Boat Slip",
    bedrooms: "6 Suites",
    style: "Nordic Biophilic",
    primaryMaterials: ["Black Stained Pine", "Granite Bedrock", "Zinc Standing Seam"],
    description:
      "Perched on granite archipelago boulders, the villa steps gently down toward a private deep-water yacht dock. Floor-to-ceiling glass captures the midnight sun.",
    modelPath: "/models/villa-6/source/45.fbx",
    texturesPath: "/models/villa-6/textures/",
    scaleMultiplier: 1.08,
    yOffset: 0,
    rotationY: Math.PI / 2,
    cameraPosition: [16, 11, 16],
    hotspots: [
      {
        id: "v6-h1",
        title: "Architectural Zinc Roof",
        description: "Pre-weathered graphite zinc roofing with integrated solar tiles.",
        position: [0.8, 4.2, -0.4],
      },
      {
        id: "v6-h2",
        title: "Archipelago Yacht Deck",
        description: "Private treated spruce mooring dock accommodating 80ft vessels.",
        position: [3.2, 0.4, 2.4],
      },
      {
        id: "v6-h3",
        title: "Panoramic Glass Living Gallery",
        description: "18-meter uninterrupted waterfront living and dining pavilion.",
        position: [-1.8, 2.0, 1.6],
      },
    ],
    features: [
      { label: "Gross Area", value: "12,400 sq.ft" },
      { label: "Private Dock", value: "80ft Deep-Water Berth" },
      { label: "Sauna", value: "Floating Cedar Sauna on Dock" },
      { label: "Sustainability", value: "BREEAM Outstanding" },
    ],
    // Deep fjord navy → dark forest green → cold midnight teal — matches black pine & granite water
    shaderPalette: [[0.120, 0.180, 0.260], [0.080, 0.160, 0.180], [0.060, 0.100, 0.140]],
  },
  {
    id: "villa-8",
    index: 3,
    number: "04",
    name: "The Elysian Palace",
    tagline: "Palatial Multi-Tier Modern Manor",
    architect: "Zaha Hadid Architects Tribute",
    location: "Aspen, Colorado",
    year: "2026",
    area: "21,500 sq.ft",
    levels: "4 Levels",
    bedrooms: "9 Suites",
    style: "Parametric Monumental",
    primaryMaterials: ["Titanium Zinc", "Reinforced Fiber Concrete", "Curved Thermo-Glass"],
    description:
      "A fluid, parametric monument blending into snow-covered ridgelines. Sweeping organic ribbons of concrete and titanium define the world's most spectacular private residential estate.",
    modelPath: "/models/villa-8/source/230.fbx",
    texturesPath: "/models/villa-8/textures/",
    scaleMultiplier: 0.96,
    yOffset: 0,
    rotationY: 0,
    cameraPosition: [16, 11, 16],
    hotspots: [
      {
        id: "v8-h1",
        title: "Alpine A-Frame Roof Ridge",
        description: "Aerodynamic snow-clearing roof structure with high-performance thermal insulation.",
        position: [0.0, 4.8, -0.5],
      },
      {
        id: "v8-h2",
        title: "Grand Porte-Cochère & Driveway",
        description: "Sculptural covered entry pavilion with heated driveway turnaround.",
        position: [0.0, 1.2, 3.4],
      },
      {
        id: "v8-h3",
        title: "Outdoor Alpine Terrace & Pavilion",
        description: "Private heated stone terrace with integrated exterior fireplace and lounge.",
        position: [-2.6, 1.0, 1.5],
      },
    ],
    features: [
      { label: "Gross Area", value: "21,500 sq.ft" },
      { label: "Private Estate Lot", value: "14.5 Alpine Acres" },
      { label: "Wellness Complex", value: "Indoor/Outdoor Dual Pool & Spa" },
      { label: "Private Security", value: "Full Biometric Perimeter System" },
    ],
    // Cool platinum → lavender frost → pale silver — matches titanium zinc & parametric curves
    shaderPalette: [[0.960, 0.960, 0.975], [0.840, 0.820, 0.920], [0.700, 0.680, 0.820]],
  },
];
