import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

export const useRotation = (speed: number = 0.5) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed;
      meshRef.current.rotation.y += delta * speed;
    }
  });

  return meshRef;
};
