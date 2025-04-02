import { Environment } from "@react-three/drei";
import { useXR } from "@react-three/xr";
import { useEffect } from "react";
import { Box } from "./Box";

/**
 * メインの3Dシーンコンポーネント
 * - 環境設定（照明、背景など）
 * - インタラクティブな要素の配置
 * - XRセッション管理
 */
export const Scene = () => {
  const { session } = useXR();

  // XRセッションの状態変更を通知
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("xrsessionupdate", { detail: { session } })
    );
  }, [session]);

  return (
    <>
      {/* 環境設定 */}
      <Environment preset="apartment" background blur={0.5} />

      {/* 床面 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* インタラクティブなボックス */}
      <Box />

      {/* 照明設定 */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </>
  );
};
