import { Vector3 } from "three";
import { useControls } from "leva";

interface DebugPanelProps {
  position: Vector3;
  scale: Vector3;
  rotateSpeed: number;
  color: string;
  onPositionChange: (v: Vector3) => void;
  onScaleChange: (v: Vector3) => void;
  onRotateSpeedChange: (v: number) => void;
  onColorChange: (v: string) => void;
}

export const DebugPanel = ({
  position,
  scale,
  rotateSpeed,
  color,
  onPositionChange,
  onScaleChange,
  onRotateSpeedChange,
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
    RotateSpeed: {
      value: rotateSpeed,
      min: 0,
      max: 5,
      step: 0.1,
      onChange: (v: number) => {
        onRotateSpeedChange(v);
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
