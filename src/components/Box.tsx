import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { useXR } from "@react-three/xr";
import { useColorChange } from "../hooks/useColorChange";
import { useRotation } from "../hooks/useRotation";
import { DebugPanel } from "./DebugPanel";

export const Box = () => {
  const { currentColor, debouncedColorChange, setCurrentColor } =
    useColorChange();
  const [rotateSpeed, setRotateSpeed] = useState<number>(0.5);
  const meshRef = useRotation(rotateSpeed);
  const { session } = useXR();
  const [position, setPosition] = useState<Vector3>(new Vector3(0, 1.5, -1));
  const [scale, setScale] = useState<Vector3>(new Vector3(0.3, 0.3, 0.3));

  useEffect(() => {
    if (session) {
      session.addEventListener("selectstart", debouncedColorChange);
      return () =>
        session.removeEventListener("selectstart", debouncedColorChange);
    }
  }, [session, debouncedColorChange]);

  return (
    <>
      <mesh
        ref={meshRef}
        position={[position.x, position.y, position.z]}
        scale={[scale.x, scale.y, scale.z]}
        onClick={debouncedColorChange}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={currentColor} />
      </mesh>
      <DebugPanel
        color={currentColor}
        position={position}
        scale={scale}
        rotateSpeed={rotateSpeed}
        onPositionChange={setPosition}
        onScaleChange={setScale}
        onRotateSpeedChange={setRotateSpeed}
        onColorChange={setCurrentColor}
      />
    </>
  );
};
