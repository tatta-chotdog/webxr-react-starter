import { Box } from "./Box";

export const Experience = () => {
  return (
    <>
      <Box />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </>
  );
};
