import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// GLSL Simplex Noise Shader Code
const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec3 vPosition;
  varying float vElevation;

  // Description : Array and textureless GLSL 2D/3D/4D simplex 
  //               noise functions.
  //      Author : Ian McEwan, Ashima Arts.
  //  Maintainer : stegu
  //     Lastmod : 20110822 (ijm)
  //     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
  //               Distributed under the MIT License. See LICENSE file.
  //               https://github.com/ashima/webgl-noise
  //               https://github.com/stegu/webgl-noise

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) { 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    //   x0 = x0 - 0.0 + 0.0 * C.xxx;
    //   x1 = x0 - i1  + 1.0 * C.xxx;
    //   x2 = x0 - i2  + 2.0 * C.xxx;
    //   x3 = x0 - 1.0 + 3.0 * C.xxx;
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
    vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

    // Permutations
    i = mod289(i); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    // Gradients: 7x7 points over a square, mapped onto an octahedron.
    // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
    float n_ = 0.142857142857; // 1.0/7.0
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
    //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vPosition = position;
    
    // Normalize positioning & generate 3D multi-layered simplex noise displacement
    vec3 noisePos = position * 0.45 + vec3(0.0, 0.0, uTime * 0.12);
    
    // Compute organic topology waves
    float noise1 = snoise(noisePos * 1.5) * 0.28;
    float noise2 = snoise(noisePos * 3.0 + vec3(uTime * 0.05)) * 0.12;
    float noiseSum = noise1 + noise2;
    
    // Apply displacement along normal vector to maintain spherical silhouette
    vec3 displaced = position + normal * noiseSum;
    
    // Subtle Mouse interaction magnetic pull distortion
    float dist = distance(displaced.xy, uMouse * 4.0);
    if (dist < 2.5) {
      float force = (1.0 - (dist / 2.5)) * 0.22;
      displaced += normal * force;
    }
    
    vElevation = noiseSum;
    
    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Point size calculation based on depth scaling
    gl_PointSize = (12.0 / -mvPosition.z) * (1.0 + (noiseSum * 0.5));
  }
`;

const fragmentShader = `
  varying vec3 vPosition;
  varying float vElevation;

  void main() {
    // Generate perfect anti-aliased circular points
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
    if (r > 1.0) discard;
    
    // Flowing Color gradient mapping mapping to primary colors: #1800AD -> #0EA5A4
    float t = vElevation * 3.0 + 0.5;
    
    vec3 color1 = vec3(0.094, 0.0, 0.678); // #1800AD (Vibrant Dark Blue)
    vec3 color2 = vec3(0.055, 0.647, 0.643); // #0EA5A4 (Vibrant Teal)
    vec3 color3 = vec3(0.388, 0.4, 0.945);  // Intermediate Soft Purple/Indigo
    
    vec3 color = color1;
    if (t < 0.0) {
      color = mix(color1, color3, (t + 0.5) / 0.5);
    } else {
      color = mix(color3, color2, min(t / 1.0, 1.0));
    }
    
    // Flat rendering, no bloom or neon edge outlines
    float alpha = 1.0 - smoothstep(0.88, 1.0, r);
    gl_FragColor = vec4(color, alpha * 0.85);
  }
`;

function ParticleSphereMesh() {
  const pointsRef = useRef<THREE.Points>(null);
  const { size } = useThree();
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Generate 15,000 particles evenly distributed across the sphere
  const [positions, normals] = useMemo(() => {
    const count = 15000;
    const pos = new Float32Array(count * 3);
    const norm = new Float32Array(count * 3);
    const radius = 2.0;

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Normal vector pointing outwards
      const length = Math.sqrt(x * x + y * y + z * z);
      norm[i * 3] = x / length;
      norm[i * 3 + 1] = y / length;
      norm[i * 3 + 2] = z / length;
    }
    return [pos, norm];
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  // Update mouse movements
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      // Slow breathing movement, subtle orbit & cinematic floating
      pointsRef.current.rotation.y = time * 0.04;
      pointsRef.current.rotation.x = Math.sin(time * 0.08) * 0.03;
      
      // Gentle spring physics back to target coordinates
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;
      
      uniforms.uTime.value = time;
      uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
    }
  });

  return (
    <points ref={pointsRef} scale={[0.82, 0.82, 0.82]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-normal"
          args={[normals, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}

export function NeuralSphere() {
  return (
    <div className="relative w-full h-[780px] bg-transparent overflow-hidden flex flex-col items-center justify-center mt-20 z-20">
      {/* Subtle bottom gradient shadow to fit into the white background of next section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ffffff]/5 to-[#ffffff] z-10 pointer-events-none" />

      {/* Catchy Transparent Text Cards on Left and Right Sides */}
      <div className="absolute inset-x-8 top-[10%] bottom-[10%] z-20 pointer-events-none flex flex-col lg:flex-row justify-between items-center gap-8 w-[calc(100%-4rem)]">
        {/* Left Card: AI Automation & Logic */}
        <div 
          className="max-w-[290px] rounded-2xl p-6 backdrop-blur-md bg-white/20 border border-[#1800AD]/10 shadow-[0_12px_30px_rgba(24,0,173,0.04)] pointer-events-auto transition-transform duration-500 hover:-translate-y-1"
        >
          <span className="text-[10px] font-black tracking-[0.2em] text-[#1800AD] uppercase">AUTOMATION PIPELINES</span>
          <h3 className="mt-2 text-base font-bold text-slate-900 leading-tight">Eliminate manual workload entirely</h3>
          <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
            We map custom AI agents and n8n nodes directly into your operations to process leads and data 24/7.
          </p>
        </div>

        {/* Right Card: High-Performance Engineering */}
        <div 
          className="max-w-[290px] rounded-2xl p-6 backdrop-blur-md bg-white/20 border border-[#0EA5A4]/10 shadow-[0_12px_30px_rgba(14,165,164,0.04)] pointer-events-auto transition-transform duration-500 hover:-translate-y-1 lg:text-right"
        >
          <span className="text-[10px] font-black tracking-[0.2em] text-[#0EA5A4] uppercase">ELITE ENGINEERING</span>
          <h3 className="mt-2 text-base font-bold text-slate-900 leading-tight">Scale-ready fast architecture</h3>
          <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
            Clean type-safe React/Vite platforms built for sub-second load times and high conversions.
          </p>
        </div>
      </div>

      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} />
        <ParticleSphereMesh />
      </Canvas>
    </div>
  );
}
