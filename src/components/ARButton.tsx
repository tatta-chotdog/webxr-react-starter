import "../styles/styles.css";

interface ARButtonProps {
  isInAR: boolean;
  onToggleAR: () => void;
}

export const ARButton = ({ isInAR, onToggleAR }: ARButtonProps) => {
  return (
    <button
      onClick={onToggleAR}
      className={`ar-button ${isInAR ? "active" : ""}`}
    >
      {isInAR ? "Exit AR" : "Enter AR"}
    </button>
  );
};
