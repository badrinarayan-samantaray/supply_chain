import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";


export default function ThreeCube() {
  const group = useRef();
  const { pointer } = useThree();

const baseMat = new THREE.MeshStandardMaterial({
  color: "#0b3d2e",      // midnight green
  roughness: 1.0,        // full matte
  metalness: 2,
});

const panelMat = new THREE.MeshStandardMaterial({
  color: "#0f2f24",
  roughness: 1.0,
  metalness: 2,
});

const accentMat = new THREE.MeshStandardMaterial({
  color: "#0e2a21",
  roughness: 1.0,
  metalness: 0.0,
});

const glowMat = new THREE.MeshStandardMaterial({
  color: "#00ff66",
  emissive: "#00ff66",
  emissiveIntensity: 1.2,
  roughness: 0.7,
  metalness: 5,
});


  const Face = ({ pos = [0, 0, 0.06], rot = [0, 0, 0] }) => (
    <group position={pos} rotation={rot}>
      <mesh material={panelMat} position={[0, 0, 0.06]}>
        <boxGeometry args={[1.7, 1.7, 0.12]} />
      </mesh>

      <mesh material={glowMat} position={[0, 0, 0.14]}>
        <cylinderGeometry args={[0.22, 0.22, 0.12, 48]} />
      </mesh>

      {[...Array(8)].map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <mesh key={i} material={panelMat} position={[Math.cos(a) * 0.65, Math.sin(a) * 0.65, 0.13]}>
            <cylinderGeometry args={[0.06, 0.06, 0.08, 16]} />
          </mesh>
        );
      })}
    </group>
  );

  const Corners = () => {
    const s = 1;
    const pts = [
      [s, s, s], [s, s, -s], [s, -s, s], [s, -s, -s],
      [-s, s, s], [-s, s, -s], [-s, -s, s], [-s, -s, -s],
    ];
    return (
      <group>
        {pts.map((p, i) => (
          <group key={i} position={p}>
            <pointLight color={"#00ff66"} intensity={1.8} distance={6} decay={2} />

            <mesh material={glowMat}>
              <sphereGeometry args={[0.06, 16, 16]} />
            </mesh>
          </group>
        ))}
      </group>
    );
  };
const initialRotation = useRef([Math.PI / 6, Math.PI / 6]);
  useFrame((_, dt) => {
    if (!group.current) return;
    // mouse nudge - subtle
    const targetY = pointer.x * 0.25 + initialRotation.current[1];;
    const targetX = -pointer.y * 0.25 + initialRotation.current[0];
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, dt * 4);
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, dt * 4);
    // tiny idle rotation around z so it doesn't feel static
    group.current.rotation.z += 0.002;
    
  });

  return (
    <group ref={group} position={[0, 0, 0]}  rotation={[Math.PI / 6, Math.PI / 6, 0]}>
      <hemisphereLight color={"#335e48"} groundColor={"#020d08"} intensity={0.4} />
<pointLight position={[0, 0, -6]} intensity={0.7} color={"#09321f"} />



      <mesh material={baseMat}>
        <boxGeometry args={[2, 2, 2]} />
      </mesh>

      <Face pos={[0, 0, 1]} />
      <Face pos={[0, 0, -1]} rot={[0, Math.PI, 0]} />
      <Face pos={[1, 0, 0]} rot={[0, -Math.PI / 2, 0]} />
      <Face pos={[-1, 0, 0]} rot={[0, Math.PI / 2, 0]} />
      <Face pos={[0, 1, 0]} rot={[Math.PI / 2, 0, 0]} />
      <Face pos={[0, -1, 0]} rot={[-Math.PI / 2, 0, 0]} />

      <Corners />

      <mesh>
  <sphereGeometry args={[10, 32, 32]} />
  <meshStandardMaterial 
    color={"#0b3d2e"}   // darker matte green
    roughness={1}       // makes it matte
    metalness={1}     // very low metalness
    transparent
    opacity={0}      // keep it slightly transparent
    side={THREE.BackSide}
  />
</mesh>

    </group>
  );
}
