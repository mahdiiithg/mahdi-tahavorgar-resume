"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

const COUNT = 6500;
const TUNNEL_LEN = 90;

function smoothstep(p: number, a: number, b: number) {
  const t = Math.min(Math.max((p - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
}

function getScrollProgress() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  return max > 0 ? Math.min(window.scrollY / max, 1) : 0;
}

function Particles() {
  const points = useRef<THREE.Points>(null);
  const smoothP = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  const { wave, tunnel, sphere, positions, colors, seeds } = useMemo(() => {
    const wave = new Float32Array(COUNT * 3);
    const tunnel = new Float32Array(COUNT * 3);
    const sphere = new Float32Array(COUNT * 3);
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);

    const cyan = new THREE.Color("#22D3EE");
    const violet = new THREE.Color("#8B5CF6");
    const white = new THREE.Color("#DCE3F2");
    const tmp = new THREE.Color();

    for (let i = 0; i < COUNT; i++) {
      // ocean of data — a wide plane below the hero type
      wave[i * 3] = (Math.random() - 0.5) * 90;
      wave[i * 3 + 1] = -5 - Math.random() * 3;
      wave[i * 3 + 2] = 8 - Math.random() * 55;

      // the descent tunnel
      const ang = Math.random() * Math.PI * 2;
      const rad = 7 + Math.random() * 4.5;
      tunnel[i * 3] = Math.cos(ang) * rad;
      tunnel[i * 3 + 1] = Math.sin(ang) * rad;
      tunnel[i * 3 + 2] = 15 - Math.random() * TUNNEL_LEN;

      // the core — arrival
      const u = Math.random() * Math.PI * 2;
      const v = Math.acos(2 * Math.random() - 1);
      const r = 9 + Math.random() * 1.6;
      sphere[i * 3] = r * Math.sin(v) * Math.cos(u);
      sphere[i * 3 + 1] = r * Math.sin(v) * Math.sin(u);
      sphere[i * 3 + 2] = r * Math.cos(v) - 12;

      positions[i * 3] = wave[i * 3];
      positions[i * 3 + 1] = wave[i * 3 + 1];
      positions[i * 3 + 2] = wave[i * 3 + 2];

      const roll = Math.random();
      tmp.copy(roll < 0.55 ? cyan : roll < 0.85 ? violet : white);
      tmp.multiplyScalar(0.55 + Math.random() * 0.45);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;

      seeds[i] = Math.random() * Math.PI * 2;
    }
    return { wave, tunnel, sphere, positions, colors, seeds };
  }, []);

  useFrame((state) => {
    const pts = points.current;
    if (!pts) return;
    const t = state.clock.elapsedTime;

    // eased scroll progress
    const target = getScrollProgress();
    smoothP.current += (target - smoothP.current) * 0.06;
    const p = smoothP.current;

    const wWave = 1 - smoothstep(p, 0.08, 0.3);
    const wSphere = smoothstep(p, 0.74, 0.94);
    const wTunnel = Math.max(1 - wWave - wSphere, 0);

    const arr = (pts.geometry.attributes.position as THREE.BufferAttribute)
      .array as Float32Array;

    const flow = t * 6 + p * 120;

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      const seed = seeds[i];

      // wave undulation
      const wx = wave[ix];
      const wz = wave[ix + 2];
      const wy =
        wave[ix + 1] +
        Math.sin(wx * 0.18 + t * 1.1 + seed) * 1.1 +
        Math.cos(wz * 0.14 + t * 0.8) * 0.9;

      // tunnel streaming toward the camera
      let tz = tunnel[ix + 2] + flow;
      tz = ((tz % TUNNEL_LEN) + TUNNEL_LEN) % TUNNEL_LEN; // 0..LEN
      tz = 15 - tz; // back to  -75..15
      const swirl = t * 0.12;
      const txp = tunnel[ix] * Math.cos(swirl) - tunnel[ix + 1] * Math.sin(swirl);
      const typ = tunnel[ix] * Math.sin(swirl) + tunnel[ix + 1] * Math.cos(swirl);

      // breathing core
      const breathe = 1 + Math.sin(t * 1.4 + seed) * 0.035;
      const sx = sphere[ix] * breathe;
      const sy = sphere[ix + 1] * breathe;
      const sz = sphere[ix + 2];

      arr[ix] = wx * wWave + txp * wTunnel + sx * wSphere;
      arr[ix + 1] = wy * wWave + typ * wTunnel + sy * wSphere;
      arr[ix + 2] = wz * wWave + tz * wTunnel + sz * wSphere;
    }
    pts.geometry.attributes.position.needsUpdate = true;

    // camera drift + mouse parallax
    const mx = mouse.current.x;
    const my = mouse.current.y;
    camera.position.x += (mx * 1.6 - camera.position.x) * 0.04;
    camera.position.y += (2 - my * 1.4 - camera.position.y) * 0.04;
    camera.position.z = 18 - p * 4;
    camera.lookAt(0, 0, -14);
  });

  useMemo(() => {
    if (typeof window === "undefined") return;
    window.addEventListener(
      "pointermove",
      (e) => {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      },
      { passive: true }
    );
  }, []);

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Core() {
  const group = useRef<THREE.Group>(null);
  const smoothP = useRef(0);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    smoothP.current += (getScrollProgress() - smoothP.current) * 0.06;
    const appear = smoothstep(smoothP.current, 0.78, 0.96);
    g.visible = appear > 0.01;
    const s = appear * (1 + Math.sin(t * 1.4) * 0.04);
    g.scale.setScalar(Math.max(s, 0.0001));
    g.rotation.y = t * 0.15;
    g.rotation.x = Math.sin(t * 0.2) * 0.2;
  });

  return (
    <group ref={group} position={[0, 0, -12]}>
      <mesh>
        <icosahedronGeometry args={[4.6, 1]} />
        <meshBasicMaterial
          color="#22D3EE"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[2.6, 0]} />
        <meshBasicMaterial
          color="#8B5CF6"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 2, 18], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#050508", 30, 85]} />
        <Particles />
        <Core />
      </Canvas>
      <div className="scene-vignette absolute inset-0" />
    </div>
  );
}
