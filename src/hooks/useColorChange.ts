import { useState, useCallback } from "react";

export const colors = ["blue", "red", "green", "yellow", "purple"];

/**
 * 色変更のロジックを管理するカスタムフック
 */
export const useColorChange = () => {
  const [colorIndex, setColorIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  // useCallbackで関数をメモ化し、不要な再生成を防止
  const handleColorChange = useCallback(() => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  }, []);

  // デバウンス処理付きの色変更ハンドラー
  // 300msのクールダウン中は追加の色変更をブロック
  const debouncedColorChange = useCallback(() => {
    if (!isChanging) {
      setIsChanging(true);
      handleColorChange();
      setTimeout(() => setIsChanging(false), 300);
    }
  }, [isChanging, handleColorChange]);

  return {
    currentColor: colors[colorIndex],
    debouncedColorChange,
  };
};
