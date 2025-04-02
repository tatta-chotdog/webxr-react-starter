import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { XRDevice, metaQuest3 } from "iwer";
import { Scene } from "./components/Scene";
import { VRButton } from "./components/VRButton";
import "./styles/styles.css";

const store = createXRStore();

export default function App() {
  const [isInVR, setIsInVR] = useState(false);
  const [currentSession, setCurrentSession] = useState<XRSession | null>(null);
  const [isXRSupported, setIsXRSupported] = useState(false);

  useEffect(() => {
    const initializeXR = async () => {
      try {
        if (!navigator.xr) {
          console.error("WebXR API is not supported");
          return;
        }

        // PC上でデバッグするためのXRデバイスエミュレーション
        // 実機での動作確認時は、この部分をコメントアウトしてください
        const xrDevice = new XRDevice(metaQuest3);
        xrDevice.installRuntime();

        const isSupported = await navigator.xr.isSessionSupported(
          "immersive-vr"
        );
        setIsXRSupported(isSupported);

        if (!isSupported) {
          console.error("VR is not supported on this device");
          return;
        }

        const handleSessionEnd = () => {
          setIsInVR(false);
          setCurrentSession(null);
        };

        const handleSessionUpdate = (event: CustomEvent) => {
          setCurrentSession(event.detail.session);
        };

        window.addEventListener("xrsessionend", handleSessionEnd);
        window.addEventListener(
          "xrsessionupdate",
          handleSessionUpdate as EventListener
        );

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

  const handleVRToggle = async () => {
    if (!isXRSupported) {
      console.error("VR is not supported on this device");
      return;
    }

    try {
      if (isInVR && currentSession) {
        await currentSession.end();
        setIsInVR(false);
      } else {
        await store.enterVR();
        setIsInVR(true);
      }
    } catch (error) {
      console.error("Failed to toggle VR mode:", error);
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
        <VRButton isInVR={isInVR} onToggleVR={handleVRToggle} />
      )}
    </div>
  );
}
