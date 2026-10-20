export interface ProjectSpec {
  label: string;
  value: string;
}

export interface StudioProject {
  id: string;
  title: string;
  subtitle: string;
  category: "Residential Architecture" | "Interior Design" | "3D Architectural Visualization" | "Commercial Architecture";
  status: "Completed" | "In Progress" | "Concept";
  location: string;
  year: string;
  area: string;
  coverImage: string;
  galleryImages: string[];
  concept: string;
  overview: string;
  materials: string[];
  specifications: ProjectSpec[];
  has3DModel?: boolean;
  villaModelIndex?: number;
}

export const STUDIO_PROJECTS: StudioProject[] = [
  {
    id: "the-monolith-sanctuary",
    title: "The Monolith Sanctuary",
    subtitle: "Sculptural Brutalist Residential Compound",
    category: "Residential Architecture",
    status: "Completed",
    location: "Ahmedabad, Gujarat",
    year: "2025",
    area: "9,600 sq.ft",
    coverImage: "/images/project-1.jpg",
    galleryImages: [
      "/images/project-1.jpg",
      "/images/studio/project-interior-10.jpeg",
      "/images/studio/project-interior-1.jpeg",
      "/images/gallery-1.jpg",
    ],
    concept:
      "A dialogue between exposed cast-in-place concrete and warm natural wood textures. Deep overhangs and sheltered courtyards create passive thermal comfort while filtering sunlight throughout the day.",
    overview:
      "Commissioned as a private family residence, The Monolith Sanctuary balances bold monolithic geometric masses with quiet contemplative interior courtyards. Every living zone connects visually to private landscaped courtyards.",
    materials: ["Board-Formed Concrete", "Charred Teakwood", "Natural Basalt Stone", "Low-E Acoustic Glass"],
    specifications: [
      { label: "Built-up Area", value: "9,600 sq.ft" },
      { label: "Levels", value: "G + 2 Storeys" },
      { label: "Courtyard Core", value: "Triple-Height Green Shaft" },
      { label: "Energy Strategy", value: "Passive Solar & Cross-Ventilation" },
    ],
    has3DModel: true,
    villaModelIndex: 0,
  },
  {
    id: "sky-pavilion-residence",
    title: "Sky Pavilion Residence",
    subtitle: "Cantilevered Contemporary Villa",
    category: "Residential Architecture",
    status: "Completed",
    location: "Surat, Gujarat",
    year: "2025",
    area: "10,500 sq.ft",
    coverImage: "/images/project-2.jpg",
    galleryImages: [
      "/images/project-2.jpg",
      "/images/studio/project-interior-2.jpeg",
      "/images/studio/project-interior-6.jpeg",
      "/images/gallery-2.jpg",
    ],
    concept:
      "Floating geometric planes that frame the surrounding skyline. The design utilizes post-tensioned cantilevers to create column-free interior living spaces that merge seamlessly with expansive terraces.",
    overview:
      "The Sky Pavilion was designed around horizontal sightlines. Double-height glazing brings expansive natural daylight deep into the heart of the residence while recessed balconies provide shaded outdoor seating year-round.",
    materials: ["Architectural Micro-Concrete", "Anodized Bronze Aluminum", "Italian Travertine", "Custom Louvered Panels"],
    specifications: [
      { label: "Built-up Area", value: "10,500 sq.ft" },
      { label: "Bedrooms", value: "5 Ensuite Suites" },
      { label: "Cantilever Span", value: "6.8 Meter Column-Free" },
      { label: "Water Feature", value: "Infinity Overflow Reflection Pool" },
    ],
    has3DModel: true,
    villaModelIndex: 1,
  },
  {
    id: "atelier-minimal-interior",
    title: "Atelier Minimalist Living",
    subtitle: "Tailored Residential Interior Architecture",
    category: "Interior Design",
    status: "Completed",
    location: "Vadodara, Gujarat",
    year: "2024",
    area: "4,800 sq.ft",
    coverImage: "/images/studio/project-interior-1.jpeg",
    galleryImages: [
      "/images/studio/project-interior-1.jpeg",
      "/images/studio/project-interior-4.jpeg",
      "/images/studio/project-interior-5.jpeg",
      "/images/studio/project-interior-3.jpeg",
    ],
    concept:
      "Restraint as the highest luxury. A neutral tonal palette of fluted oak, tactile lime wash, and concealed architectural joinery creates an atmosphere of serene order and warmth.",
    overview:
      "This interior renovation transformed a fragmented apartment into a continuous open-plan living landscape. Custom architectural millwork conceals all storage and technical services, allowing materials to take center stage.",
    materials: ["Fluted White Oak", "Venetian Lime Plaster", "Brushed Champagne Brass", "Calacatta Gold Marble"],
    specifications: [
      { label: "Space Scope", value: "Full Interior Architecture" },
      { label: "Lighting", value: "Indirect 2700K Architectural Coves" },
      { label: "Joinery", value: "Bespoke Flush-Wall Cabinetry" },
      { label: "Acoustics", value: "Integrated Fabric Wall Linings" },
    ],
    has3DModel: false,
  },
  {
    id: "nordic-horizon-compound",
    title: "Nordic Horizon Compound",
    subtitle: "Biophilic Waterfront Architectural Villa",
    category: "Residential Architecture",
    status: "In Progress",
    location: "Mumbai Coastal Outskirts",
    year: "2026",
    area: "12,400 sq.ft",
    coverImage: "/images/project-3.jpg",
    galleryImages: [
      "/images/project-3.jpg",
      "/images/studio/project-interior-7.jpeg",
      "/images/studio/project-interior-8.jpeg",
      "/images/gallery-3.jpg",
    ],
    concept:
      "A stepped coastal residence sculpted to follow natural terrain contours. Large glass elevations capture maritime breezes and sunset vistas while natural stone retains earth stability.",
    overview:
      "Currently under construction, this private estate combines sustainable rammed-earth base walls with pre-patinated zinc roofing. An integrated rainwater harvesting system sustains extensive native botanical terraces.",
    materials: ["Weathered Zinc", "Rammed Earth", "Thermally Modified Ash", "Perforated Metal Screens"],
    specifications: [
      { label: "Project Status", value: "Structural Superstructure Active" },
      { label: "Gross Footprint", value: "12,400 sq.ft" },
      { label: "Deck Area", value: "3,200 sq.ft Covered Verandah" },
      { label: "Landscape", value: "Native Coastal Flora Integration" },
    ],
    has3DModel: true,
    villaModelIndex: 2,
  },
  {
    id: "elysian-parametric-villa",
    title: "Elysian Parametric Manor",
    subtitle: "Fluid Contemporary Architectural Concept",
    category: "3D Architectural Visualization",
    status: "Concept",
    location: "Studio Visualization Lab",
    year: "2026",
    area: "18,200 sq.ft",
    coverImage: "/images/project-4.jpg",
    galleryImages: [
      "/images/project-4.jpg",
      "/images/studio/project-interior-9.jpeg",
      "/images/studio/project-interior-10.jpeg",
      "/images/gallery-4.jpg",
    ],
    concept:
      "Exploration of fluid spatial transitions using parametric algorithms. Curvilinear concrete ribs extend outward to form shading canopies and integrated exterior planters.",
    overview:
      "Conceived as an experimental research model by Siddhatva Design's visualization atelier, this concept examines how continuous geometric surfaces can unite structural load-bearing with sculptural beauty.",
    materials: ["Glass-Fiber Reinforced Concrete", "Curved Thermo-Insulated Glass", "Sculpted Basalt", "Titanium Composite"],
    specifications: [
      { label: "Format", value: "Real-time Interactive 3D Digital Twin" },
      { label: "Model Scale", value: "Sub-millimeter Architectural BIM" },
      { label: "Simulation", value: "Solar Azimuth & Wind Mapping" },
      { label: "Status", value: "Ready for Client Customization" },
    ],
    has3DModel: true,
    villaModelIndex: 3,
  },
  {
    id: "urban-zenith-penthouse",
    title: "Urban Zenith Penthouse",
    subtitle: "Bespoke High-Rise Interior & Lighting Architecture",
    category: "Interior Design",
    status: "Completed",
    location: "Ahmedabad, Gujarat",
    year: "2025",
    area: "6,200 sq.ft",
    coverImage: "/images/studio/project-interior-2.jpeg",
    galleryImages: [
      "/images/studio/project-interior-2.jpeg",
      "/images/studio/project-interior-6.jpeg",
      "/images/studio/project-interior-7.jpeg",
      "/images/studio/project-interior-8.jpeg",
    ],
    concept:
      "A serene penthouse sanctuary elevated above the bustling cityscape. Tailored lighting design orchestrates transition from natural daylight to intimate evening moods.",
    overview:
      "Designed for a patron of contemporary art, this penthouse features museum-grade recessed lighting tracks, climate-controlled acoustic study lounges, and custom bronze display niches.",
    materials: ["Smoked Walnut", "Honed Pietra Grey Marble", "Acoustic Suede Paneling", "Custom Gunmetal Hardware"],
    specifications: [
      { label: "Area", value: "6,200 sq.ft Triplex" },
      { label: "Control System", value: "DALI Integrated Lighting Scenes" },
      { label: "Art Display", value: "Museum-Standard CRI 98 Lighting" },
      { label: "Outdoor Terrace", value: "Private Sky Lounge with Plunge Spa" },
    ],
    has3DModel: false,
  },
];
