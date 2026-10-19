import { create } from "zustand";
import { VILLAS, VillaData } from "@/data/villas";

export type FloorType = "underground" | "ground" | "first" | "popup";
export type RenderMode = "realistic" | "clay" | "wireframe";
export type LightingMode = "sunset" | "daylight" | "night" | "studio";
export type CameraPreset = "iso" | "front" | "top" | "entrance";

interface AppState {
  // Legacy / Diorama compatibility
  currentFloor: FloorType;
  setFloor: (floor: FloorType) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;

  // 8-Model 3D Villa Showcase
  currentModelIndex: number;
  currentVilla: VillaData;
  setModelIndex: (index: number) => void;
  nextModel: () => void;
  prevModel: () => void;

  // 360 Auto Rotation & Interactivity
  isAutoRotating: boolean;
  toggleAutoRotate: () => void;
  setAutoRotate: (val: boolean) => void;
  rotationSpeed: number;
  setRotationSpeed: (speed: number) => void;

  // View & Render Controls
  renderMode: RenderMode;
  setRenderMode: (mode: RenderMode) => void;
  lightingMode: LightingMode;
  setLightingMode: (mode: LightingMode) => void;
  cameraPreset: CameraPreset;
  setCameraPreset: (preset: CameraPreset) => void;

  // Hotspots & Info
  showHotspots: boolean;
  setShowHotspots: (show: boolean) => void;
  activeHotspot: string | null;
  setActiveHotspot: (id: string | null) => void;
  isDetailsModalOpen: boolean;
  setDetailsModalOpen: (open: boolean) => void;

  // Model Loading State
  isLoadingModel: boolean;
  setIsLoadingModel: (loading: boolean) => void;
  modelProgress: number;
  setModelProgress: (progress: number) => void;
  modelError: string | null;
  setModelError: (err: string | null) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Legacy
  currentFloor: "ground",
  setFloor: (floor) => set({ currentFloor: floor }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  isMenuOpen: false,
  setMenuOpen: (open) => set({ isMenuOpen: open }),

  // 8-Model Showcase
  currentModelIndex: 0,
  currentVilla: VILLAS[0],
  setModelIndex: (index) => {
    const safeIndex = (index + VILLAS.length) % VILLAS.length;
    set({
      currentModelIndex: safeIndex,
      currentVilla: VILLAS[safeIndex],
      activeHotspot: null,
    });
  },
  nextModel: () => {
    const nextIdx = (get().currentModelIndex + 1) % VILLAS.length;
    get().setModelIndex(nextIdx);
  },
  prevModel: () => {
    const prevIdx = (get().currentModelIndex - 1 + VILLAS.length) % VILLAS.length;
    get().setModelIndex(prevIdx);
  },

  // 360 Auto Rotation
  isAutoRotating: true,
  toggleAutoRotate: () => set((s) => ({ isAutoRotating: !s.isAutoRotating })),
  setAutoRotate: (val) => set({ isAutoRotating: val }),
  rotationSpeed: 0.8,
  setRotationSpeed: (speed) => set({ rotationSpeed: speed }),

  // View Controls
  renderMode: "realistic",
  setRenderMode: (mode) => set({ renderMode: mode }),
  lightingMode: "daylight",
  setLightingMode: (mode) => set({ lightingMode: mode }),
  cameraPreset: "iso",
  setCameraPreset: (preset) => set({ cameraPreset: preset }),

  // Hotspots & Modals
  showHotspots: false,
  setShowHotspots: (show) => set({ showHotspots: show }),
  activeHotspot: null,
  setActiveHotspot: (id) => set({ activeHotspot: id }),
  isDetailsModalOpen: false,
  setDetailsModalOpen: (open) => set({ isDetailsModalOpen: open }),

  // Model Loading
  isLoadingModel: false,
  setIsLoadingModel: (loading) => set({ isLoadingModel: loading }),
  modelProgress: 0,
  setModelProgress: (progress) => set({ modelProgress: progress }),
  modelError: null,
  setModelError: (err) => set({ modelError: err }),
}));
