import React from "react";
import MatteCubeBackground from "./background/MatteCubeBackground";

export default function WithCubeBackground(Component) {
  return function WrappedWithCubeBackground(props) {
    return (
      <div style={{ position: "relative" }}>
        {/* Background */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            pointerEvents: "none",
          }}
        >
          <MatteCubeBackground />
        </div>

        {/* Your original component */}
        <Component {...props} />
      </div>
    );
  };
}
