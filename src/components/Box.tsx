import { useColorChange } from "../hooks/useColorChange";
import { useRotation } from "../hooks/useRotation";
import { useXR } from "@react-three/xr";
import { useEffect } from "react";

/**
 * インタラクティブな3Dボックスコンポーネント
 * - クリックまたはXRコントローラーで色が変化
 * - 自動回転アニメーション
 * - デバウンス処理による連続操作防止
 */
export const Box = () => {
  const { currentColor, debouncedColorChange } = useColorChange();
  const meshRef = useRotation();
  const { session } = useXR();

  // XRコントローラーのトリガー押下時のイベントハンドラー
  useEffect(() => {
    if (session) {
      session.addEventListener("selectstart", debouncedColorChange);
      return () =>
        session.removeEventListener("selectstart", debouncedColorChange);
    }
  }, [session, debouncedColorChange]);

  return (
    <mesh ref={meshRef} position={[0, 1.5, -1]} onClick={debouncedColorChange}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color={currentColor} />
    </mesh>
  );
};
