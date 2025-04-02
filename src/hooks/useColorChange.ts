import { useState, useCallback } from "react";

// 利用可能な色の配列
export const colors = ["blue", "red", "green", "yellow", "purple"];

/**
 * 色変更のロジックを管理するカスタムフック
 * - 色のインデックス管理
 * - デバウンス処理による連続変更防止
 * - メモ化された関数の提供
 */
export const useColorChange = () => {
  const [colorIndex, setColorIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  // 色変更の基本ハンドラー
  // useCallbackで関数をメモ化し、不要な再生成を防止
  const handleColorChange = useCallback(() => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  }, []);

  // デバウンス処理付きの色変更ハンドラー
  // 300msのクールダウン期間中は追加の色変更をブロック
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
