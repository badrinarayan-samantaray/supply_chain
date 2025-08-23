import React from "react";
import ThreeCube from "../background/ThreeCube"; // ← adjust this path if your ThreeCube lives elsewhere

// Full-screen, behind everything, and non-interactive
export default function Background3D() {
  return (
    <div
      className="background-3d"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <ThreeCube />
    </div>
  );
}
