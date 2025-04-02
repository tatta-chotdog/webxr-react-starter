import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

/**
 * オブジェクトの回転を管理するカスタムフック
 * - X軸とY軸の連続的な回転
 * - アニメーションフレームごとの更新
 * @param speed 回転速度（デフォルト: 0.5）
 */
export const useRotation = (speed: number = 0.5) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((_state, delta: number) => {
    if (meshRef.current) {
      // X軸とY軸の同時回転により、より動的な動きを実現
      meshRef.current.rotation.x += delta * speed;
      meshRef.current.rotation.y += delta * speed;
    }
  });

  return meshRef;
};
