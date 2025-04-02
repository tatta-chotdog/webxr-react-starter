import "../styles/styles.css";

interface VRButtonProps {
  isInVR: boolean;
  onToggleVR: () => void;
}

export const VRButton = ({ isInVR, onToggleVR }: VRButtonProps) => {
  return (
    <button
      onClick={onToggleVR}
      className={`vr-button ${isInVR ? "active" : ""}`}
    >
      {isInVR ? "Exit VR" : "Enter VR"}
    </button>
  );
};
