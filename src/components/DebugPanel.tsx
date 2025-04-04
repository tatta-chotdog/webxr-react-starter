import { Vector3 } from "three";
import { useControls } from "leva";

interface DebugPanelProps {
  color: string;
  position: Vector3;
  scale: Vector3;
  rotation: Vector3;
  onPositionChange: (v: Vector3) => void;
  onScaleChange: (v: Vector3) => void;
  onRotationChange: (v: Vector3) => void;
  onColorChange: (v: string) => void;
}

export const DebugPanel = ({
  color,
  position,
  scale,
  rotation,
  onPositionChange,
  onScaleChange,
  onRotationChange,
  onColorChange,
}: DebugPanelProps) => {
  useControls({
    Position: {
      value: { x: position.x, y: position.y, z: position.z },
      onChange: (v) => {
        onPositionChange(new Vector3(v.x, v.y, v.z));
      },
    },
    Scale: {
      value: { x: scale.x, y: scale.y, z: scale.z },
      onChange: (v) => {
        onScaleChange(new Vector3(v.x, v.y, v.z));
      },
    },
    Rotation: {
      value: { x: rotation.x, y: rotation.y, z: rotation.z },
      onChange: (v) => {
        onRotationChange(new Vector3(v.x, v.y, v.z));
      },
    },
    Color: {
      value: color,
      onChange: (v: string) => {
        onColorChange(v);
      },
    },
  });

  return null;
};
