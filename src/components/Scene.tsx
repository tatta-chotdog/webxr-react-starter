import { Box } from "./Box";

export const Scene = () => {
  return (
    <>
      <Box />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </>
  );
};
