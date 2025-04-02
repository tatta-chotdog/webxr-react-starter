interface ARButtonProps {
  isInAR: boolean;
  onToggleAR: () => void;
}

/**
 * AR モード切り替えボタンコンポーネント
 * - モードに応じて表示を切り替え
 * - スタイリッシュなデザインと視認性の高いUI
 */
export const ARButton = ({ isInAR, onToggleAR }: ARButtonProps) => {
  return (
    <button
      onClick={onToggleAR}
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        zIndex: 1000,
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: isInAR ? "#ff4444" : "#4444ff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        transition: "all 0.3s",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      }}
    >
      {isInAR ? "Exit AR" : "Enter AR"}
    </button>
  );
};
