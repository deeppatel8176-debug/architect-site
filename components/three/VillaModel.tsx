"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { FBXLoader } from "three-stdlib";
import { useStore } from "@/store/useStore";
import { VillaData } from "@/data/villas";

interface VillaModelProps {
  villa: VillaData;
}

export default function VillaModel({ villa }: VillaModelProps) {
  const modelGroupRef = useRef<THREE.Group>(null);
  const [modelScene, setModelScene] = useState<THREE.Group | null>(null);

  const isAutoRotating = useStore((s) => s.isAutoRotating);
  const rotationSpeed = useStore((s) => s.rotationSpeed);
  const renderMode = useStore((s) => s.renderMode);

  const setIsLoadingModel = useStore((s) => s.setIsLoadingModel);
  const setModelProgress = useStore((s) => s.setModelProgress);
  const setModelError = useStore((s) => s.setModelError);

  // Cached materials for clay & wireframe modes
  const clayMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0xe8e2d8,
      roughness: 0.82,
      metalness: 0.05,
      flatShading: false,
      side: THREE.DoubleSide,
    });
  }, []);

  const wireframeMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0xc5a880,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
  }, []);

  // Load and process FBX Model
  useEffect(() => {
    let isCancelled = false;
    let loadedObj: THREE.Group | null = null;
    setIsLoadingModel(true);
    setModelProgress(15);
    setModelError(null);

    const loader = new FBXLoader();
    if (villa.texturesPath) {
      loader.setResourcePath(villa.texturesPath);
    }

    loader.load(
      villa.modelPath,
      (loadedObject) => {
        if (isCancelled) return;

        // Auto-center and normalize scale
        const box = new THREE.Box3().setFromObject(loadedObject);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        // Reset local position and rotation before computing transform
        loadedObject.position.set(0, 0, 0);
        loadedObject.rotation.set(0, 0, 0);

        // Standardize max horizontal footprint / dimension to ~14.2 units for a prominent, zoomed-in view
        const footprint = Math.max(size.x, size.z);
        const targetFootprint = 14.2;
        const baseScale = footprint > 0 ? targetFootprint / footprint : 1;
        const finalScale = baseScale * (villa.scaleMultiplier ?? 1.0);
        loadedObject.scale.setScalar(finalScale);

        // Apply villa base orientation rotation
        if (villa.rotationY) {
          loadedObject.rotation.y = villa.rotationY;
        }
        loadedObject.updateMatrixWorld(true);

        // Recompute bounds after scaling & orientation to anchor ground exactly at y = 0
        const scaledBox = new THREE.Box3().setFromObject(loadedObject);
        const scaledCenter = new THREE.Vector3();
        scaledBox.getCenter(scaledCenter);

        loadedObject.position.x = -scaledCenter.x;
        loadedObject.position.y = -scaledBox.min.y + (villa.yOffset ?? 0);
        loadedObject.position.z = -scaledCenter.z;
        loadedObject.updateMatrixWorld(true);

        // Architectural material curation & shadow setup
        loadedObject.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            const name = (child.name || "").toLowerCase();

            const isGlass =
              name.includes("glass") ||
              name.includes("window") ||
              name.includes("glazing") ||
              name.includes("pane") ||
              name.includes("vitrage");
            const isWater = name.includes("water") || name.includes("pool");
            const isGrass =
              name.includes("grass") ||
              name.includes("lawn") ||
              name.includes("plant") ||
              name.includes("vegetation");
            const isWood =
              name.includes("wood") ||
              name.includes("deck") ||
              name.includes("timber") ||
              name.includes("parquet");
            const isMetal =
              name.includes("metal") ||
              name.includes("steel") ||
              name.includes("frame") ||
              name.includes("mullion") ||
              name.includes("iron");
            const isGroundOrBase =
              name.includes("base") ||
              name.includes("ground") ||
              name.includes("terrain") ||
              name.includes("site") ||
              name.includes("plot") ||
              name.includes("box") ||
              name.includes("plane") ||
              name.includes("curb") ||
              name.includes("road") ||
              name.includes("asphalt");

            const enhanceMaterial = (origMat: THREE.Material): THREE.Material => {
              origMat.side = THREE.DoubleSide;

              // Crystal Architectural Physical Glass
              if (isGlass) {
                return new THREE.MeshPhysicalMaterial({
                  color: 0xebf4ff,
                  transparent: true,
                  opacity: 0.35,
                  roughness: 0.05,
                  metalness: 0.05,
                  transmission: 0.88,
                  ior: 1.52,
                  clearcoat: 1.0,
                  side: THREE.DoubleSide,
                });
              }

              // Reflective Architectural Pool Water
              if (isWater) {
                return new THREE.MeshStandardMaterial({
                  color: 0x2b8fa8,
                  roughness: 0.08,
                  metalness: 0.2,
                  transparent: true,
                  opacity: 0.85,
                  side: THREE.DoubleSide,
                });
              }

              // Rich Emerald Lawn
              if (isGrass) {
                return new THREE.MeshStandardMaterial({
                  color: 0x2e422c,
                  roughness: 0.85,
                  metalness: 0.02,
                  side: THREE.DoubleSide,
                });
              }

              // Honed Dark Basalt Stone Plinth for ground/base slabs
              if (isGroundOrBase && !isGrass && !isWater) {
                return new THREE.MeshStandardMaterial({
                  color: 0x1b1d22,
                  roughness: 0.88,
                  metalness: 0.04,
                  side: THREE.DoubleSide,
                });
              }

              // Natural Teak/Walnut Wood
              if (isWood) {
                return new THREE.MeshStandardMaterial({
                  color: 0x7c5e42,
                  roughness: 0.65,
                  metalness: 0.05,
                  side: THREE.DoubleSide,
                });
              }

              // Anodized Architectural Metal
              if (isMetal) {
                return new THREE.MeshStandardMaterial({
                  color: 0x202226,
                  roughness: 0.35,
                  metalness: 0.85,
                  side: THREE.DoubleSide,
                });
              }

              // Standard building surfaces:
              if (
                origMat instanceof THREE.MeshStandardMaterial ||
                origMat instanceof THREE.MeshPhongMaterial ||
                origMat instanceof THREE.MeshLambertMaterial
              ) {
                if (origMat.map) {
                  origMat.map.colorSpace = THREE.SRGBColorSpace;
                } else if (
                  origMat.color.getHex() === 0x000000 ||
                  origMat.color.getHex() === 0xffffff
                ) {
                  // Warm architectural limestone / travertine
                  origMat.color.setHex(0xdad4c8);
                }
                if (origMat instanceof THREE.MeshStandardMaterial) {
                  origMat.roughness = 0.68;
                }
              }

              return origMat;
            };

            if (Array.isArray(child.material)) {
              child.material = child.material.map(enhanceMaterial);
            } else if (child.material) {
              child.material = enhanceMaterial(child.material);
            }
          }
        });

        loadedObj = loadedObject;
        setModelScene(loadedObject);
        setModelProgress(100);
        setIsLoadingModel(false);
      },
      (xhr) => {
        if (isCancelled) return;
        if (xhr.total > 0) {
          const percent = Math.min(99, Math.round((xhr.loaded / xhr.total) * 100));
          setModelProgress(percent);
        } else {
          setModelProgress(65);
        }
      },
      (error) => {
        if (isCancelled) return;
        console.error("Error loading FBX model:", error);
        setModelError(`Unable to render 3D model for ${villa.name}`);
        setIsLoadingModel(false);
      }
    );

    return () => {
      isCancelled = true;
      if (loadedObj) {
        loadedObj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else if (child.material) {
              child.material.dispose();
            }
          }
        });
      }
    };
  }, [villa, setIsLoadingModel, setModelProgress, setModelError]);

  // Apply visual render modes (realistic, clay, wireframe)
  useEffect(() => {
    if (!modelScene) return;

    modelScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (renderMode === "clay") {
          child.material = clayMaterial;
        } else if (renderMode === "wireframe") {
          child.material = wireframeMaterial;
        }
      }
    });
  }, [renderMode, modelScene, clayMaterial, wireframeMaterial]);

  // Graceful pedestal entrance animation when model appears
  const introProgress = useRef(0);

  useEffect(() => {
    introProgress.current = 0;
    if (modelGroupRef.current) {
      modelGroupRef.current.scale.set(0.92, 0.92, 0.92);
      modelGroupRef.current.position.y = -0.3;
    }
  }, [villa.id, modelScene]);

  useFrame((_, delta) => {
    if (modelGroupRef.current && modelScene) {
      if (introProgress.current < 1) {
        introProgress.current = Math.min(1, introProgress.current + delta * 2.5);
        const t = introProgress.current;
        const ease = 1 - Math.pow(1 - t, 4); // Quartic ease-out

        const s = 0.92 + 0.08 * ease;
        modelGroupRef.current.scale.set(s, s, s);
        modelGroupRef.current.position.y = (1 - ease) * -0.3;
      }
    }

    if (modelGroupRef.current && isAutoRotating) {
      modelGroupRef.current.rotation.y += delta * 0.35 * rotationSpeed;
    }
  });

  return (
    <group ref={modelGroupRef}>
      {modelScene && <primitive object={modelScene} />}
    </group>
  );
}
