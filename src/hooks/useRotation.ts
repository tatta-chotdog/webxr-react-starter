import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export const useRotation = (speed: number = 0.5) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((_state, delta: number) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed;
      meshRef.current.rotation.y += delta * speed;
    }
  });

  return meshRef;
};
