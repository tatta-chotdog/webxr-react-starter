import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { useState, useEffect } from "react";
import { XRDevice, metaQuest3 } from "iwer";
import { Scene } from "./components/Scene";
import { ARButton } from "./components/ARButton";
import "./styles/styles.css";

const store = createXRStore();

export default function App() {
  const [isInAR, setIsInAR] = useState(false);
  const [currentSession, setCurrentSession] = useState<XRSession | null>(null);
  const [isXRSupported, setIsXRSupported] = useState(false);

  // XRデバイスとランタイムの初期化
  useEffect(() => {
    const initializeXR = async () => {
      try {
        // WebXR APIのサポート確認
        if (!navigator.xr) {
          console.error("WebXR API is not supported");
          return;
        }

        // XRデバイスの初期化
        const xrDevice = new XRDevice(metaQuest3);

        // ランタイムのインストール
        xrDevice.installRuntime();

        // XRセッションのサポート確認
        const isSupported = await navigator.xr.isSessionSupported(
          "immersive-ar"
        );
        setIsXRSupported(isSupported);

        if (!isSupported) {
          console.error("AR is not supported on this device");
          return;
        }

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
      } catch (error) {
        console.error("Failed to initialize XR:", error);
      }
    };

    initializeXR();
  }, []);

  // ARモードの切り替え処理
  const handleARToggle = async () => {
    if (!isXRSupported) {
      console.error("AR is not supported on this device");
      return;
    }

    if (isInAR && currentSession) {
      try {
        await currentSession.end();
        setIsInAR(false);
      } catch (error) {
        console.error("Failed to end AR session:", error);
      }
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
    <div className="app-container">
      <div className="canvas-container">
        <Canvas>
          <XR store={store}>
            <Scene />
          </XR>
        </Canvas>
      </div>
      {isXRSupported && (
        <ARButton isInAR={isInAR} onToggleAR={handleARToggle} />
      )}
    </div>
  );
}
