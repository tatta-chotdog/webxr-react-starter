import { Environment } from "@react-three/drei";
import { useXR } from "@react-three/xr";
import { useEffect } from "react";
import { Box } from "./Box";

export const Scene = () => {
  const { session } = useXR();

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("xrsessionupdate", { detail: { session } })
    );
  }, [session]);

  return (
    <>
      <Environment preset="apartment" background blur={0.5} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      <Box />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </>
  );
};
