import { useState, useCallback } from "react";
import { Color } from "three";

/**
 * 色変更のロジックを管理するカスタムフック
 */
export const useColorChange = () => {
  const [currentColor, setCurrentColor] = useState<string>("#0000ff");
  const [isChanging, setIsChanging] = useState(false);

  const makeColorBrighter = useCallback((color: string) => {
    const colorObj = new Color(color);
    colorObj.offsetHSL(0, 0, 0.2); // 明度を10%上げる
    return "#" + colorObj.getHexString();
  }, []);

  const changeBoxColor = useCallback(() => {
    if (!isChanging) {
      setIsChanging(true);
      const originalColor = currentColor;
      setCurrentColor(makeColorBrighter(currentColor));
      setTimeout(() => {
        setCurrentColor(originalColor);
        setIsChanging(false);
      }, 300);
    }
  }, [isChanging, currentColor, makeColorBrighter]);

  return {
    currentColor,
    changeBoxColor,
    setCurrentColor,
  };
};
