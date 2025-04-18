import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { XRDevice, metaQuest3 } from "iwer";
import { Experience } from "./components/Experience";
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
        // XR device emulation for debugging on PC
        // Comment out this part when testing on actual device
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
    try {
      if (isInVR) {
        const session = store.getState().session;
        if (session) {
          await session.end();
        }
        setIsInVR(false);
        setCurrentSession(null);
      } else {
        if (currentSession) {
          await currentSession.end();
          setCurrentSession(null);
        }
        await store.enterVR();
        setIsInVR(true);
      }
    } catch (error) {
      console.error("Failed to toggle VR mode:", error);
      setIsInVR(false);
      setCurrentSession(null);
      try {
        const session = store.getState().session;
        if (session) {
          await session.end();
        }
      } catch (e) {
        console.error("Failed to force end session:", e);
      }
    }
  };

  return (
    <div className="app-container">
      <div className="canvas-container">
        <Canvas>
          <XR store={store}>
            <Experience />
          </XR>
        </Canvas>
      </div>
      {isXRSupported && (
        <VRButton isInVR={isInVR} onToggleVR={handleVRToggle} />
      )}
    </div>
  );
}
