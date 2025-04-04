import { Environment } from "@react-three/drei";
import { Box } from "./Box";

export const Scene = () => {
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
