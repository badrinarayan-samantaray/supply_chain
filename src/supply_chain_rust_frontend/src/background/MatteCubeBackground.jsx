import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ThreeCube from "./ThreeCube";
import * as THREE from "three";
import "./styles.css";

function BackgroundGlow() {
  return (
    <mesh>
      <sphereGeometry args={[50, 64, 64]} />
      <meshBasicMaterial color={"#041710"} side={2} />
// BackSide to render inside of sphere
      
    </mesh>
  );
}

export default function MatteCubeBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    >
      <Canvas
        style={{ pointerEvents: "auto" }}
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true }}
      >
        {/* ✅ Big glowing sphere as background */}
        <BackgroundGlow />

        {/* Lights */}
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 5]} intensity={1.5} color={"#00ff66"} />
        
        <fog attach="fog" args={["#02150e", 10, 22]} />
<ambientLight intensity={0.6} />
<hemisphereLight
  color={"#335e48"}
  groundColor={"#020d08"}
  intensity={0.6}
/>
<pointLight position={[0, 0, 5]} intensity={1.2} color={"#00ff66"} />
<BackgroundGlow />


        {/* Cube */}
        <ThreeCube />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          rotateSpeed={0.7}
          dampingFactor={0.1}
          target={[0, 0, 0]}
        />
        
      </Canvas>
      
    </div>
  );
}
