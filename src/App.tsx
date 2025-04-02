import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { useState, useEffect } from "react";
import { XRDevice, metaQuest3 } from "iwer";
import { Scene } from "./components/Scene";
import { ARButton } from "./components/ARButton";

// XRストアの作成（グローバルなXR状態管理）
const store = createXRStore();

/**
 * アプリケーションのメインコンポーネント
 * - XR機能の初期化と管理
 * - シーンとUIの統合
 * - セッション状態の管理
 */
export default function App() {
  const [isInAR, setIsInAR] = useState(false);
  const [currentSession, setCurrentSession] = useState<XRSession | null>(null);

  // XRデバイスとランタイムの初期化
  useEffect(() => {
    const xrDevice = new XRDevice(metaQuest3);

    // ランタイムのインストール
    xrDevice.installRuntime();

    const handleSessionEnd = () => {
      setIsInAR(false);
      setCurrentSession(null);
    };

    const handleSessionUpdate = (event: CustomEvent) => {
      setCurrentSession(event.detail.session);
    };

    // イベントリスナーの設定
    window.addEventListener("xrsessionend", handleSessionEnd);
    window.addEventListener(
      "xrsessionupdate",
      handleSessionUpdate as EventListener
    );

    // クリーンアップ
    return () => {
      window.removeEventListener("xrsessionend", handleSessionEnd);
      window.removeEventListener(
        "xrsessionupdate",
        handleSessionUpdate as EventListener
      );
    };
  }, []);

  // ARモードの切り替え処理
  const handleARToggle = async () => {
    if (isInAR && currentSession) {
      await currentSession.end();
      setIsInAR(false);
    } else {
      try {
        await store.enterAR();
        setIsInAR(true);
      } catch (error) {
        console.error("Failed to enter AR mode:", error);
      }
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <XR store={store}>
          <Scene />
        </XR>
      </Canvas>
      <ARButton isInAR={isInAR} onToggleAR={handleARToggle} />
    </div>
  );
}
