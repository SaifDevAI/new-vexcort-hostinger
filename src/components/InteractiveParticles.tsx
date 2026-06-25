import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShaderCode = `
  // Classic value noise
  float hash(vec3 p) {
    p = fract(p * vec3(443.8975, 397.2973, 491.1871));
    p += dot(p.xyz, p.yzx + 19.19);
    return fract(p.x * p.y * p.z);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i + vec3(0.0,0.0,0.0)), hash(i + vec3(1.0,0.0,0.0)), u.x),
          mix(hash(i + vec3(0.0,1.0,0.0)), hash(i + vec3(1.0,1.0,0.0)), u.x), u.y),
      mix(mix(hash(i + vec3(0.0,0.0,1.0)), hash(i + vec3(1.0,0.0,1.0)), u.x),
          mix(hash(i + vec3(0.0,1.0,1.0)), hash(i + vec3(1.0,1.0,1.0)), u.x), u.y), u.z
    );
  }

  varying float vHue;
  varying float vDistToMouse;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  uniform vec2 uParallaxOffset;
  attribute float aSize;
  attribute float aHue;

  void main() {
    vHue = aHue;
    vec3 pos = position;
    
    // Wave motion using noise
    float wave = noise(vec3(pos.xy * 0.003, uTime * 0.5)) * 60.0;
    float wave2 = noise(vec3(pos.xy * 0.012, uTime * 1.2)) * 15.0;
    pos.z += wave + wave2;

    // Mouse attraction/repulsion & ripple distortion
    vec2 toMouse = pos.xy - uMouse;
    float dist = length(toMouse);
    vDistToMouse = dist;
    
    if (dist < 320.0 && uMouseStrength > 0.01) {
      float force = (320.0 - dist) / 320.0;
      
      // Repulsion force
      vec2 repel = normalize(toMouse) * force * 55.0 * uMouseStrength;
      pos.xy += repel;
      
      // Wavy ripple
      float ripple = sin(dist * 0.06 - uTime * 7.5) * 20.0 * force * uMouseStrength;
      pos.z += ripple;
    }

    // Parallax effect based on mouse location and Z-depth
    pos.xy += uParallaxOffset * 0.14 * (pos.z * 0.01 + 0.5);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation
    gl_PointSize = aSize * (350.0 / -mvPosition.z);
  }
`;

const fragmentShaderCode = `
  uniform float uTime;
  uniform float uOpacity;
  varying float vHue;
  varying float vDistToMouse;

  vec3 hsl2rgb(in vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0);
    return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
  }

  void main() {
    float distToCenter = length(gl_PointCoord - vec2(0.5));
    if (distToCenter > 0.5) discard;

    // Soft glow bloom
    float glow = smoothstep(0.5, 0.1, distToCenter);
    float center = (1.0 - smoothstep(0.0, 0.22, distToCenter)) * 0.7;
    float alpha = (glow + center) * uOpacity;

    // Cycle colors dynamically
    float reactiveShift = 0.0;
    if (vDistToMouse < 320.0) {
      reactiveShift = (320.0 - vDistToMouse) / 320.0 * 0.12;
    }
    float hue = fract(vHue / 360.0 + uTime * 0.02 + reactiveShift);
    vec3 color = hsl2rgb(vec3(hue, 0.88, 0.60));

    gl_FragColor = vec4(color, alpha);
  }
`;

export function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{
    x: number;
    y: number;
    rx: number;
    ry: number;
    nx: number;
    ny: number;
    rnx: number;
    rny: number;
    active: boolean;
  }>({
    x: 0,
    y: 0,
    rx: 0,
    ry: 0,
    nx: 0,
    ny: 0,
    rnx: 0,
    rny: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xffffff, 1);

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 420);

    const cols = 100;
    const rows = 70;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(cols * rows * 3);
    const aSize = new Float32Array(cols * rows);
    const aHue = new Float32Array(cols * rows);

    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2) * 12;
        const y = (r - rows / 2) * 12;
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = 0;

        aSize[i] = Math.random() * 4.0 + 2.5;
        const baseHue = ((c / cols) * 180 + (r / rows) * 180 + Math.random() * 10) % 360;
        aHue[i] = baseHue;
        i++;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(aSize, 1));
    geometry.setAttribute("aHue", new THREE.BufferAttribute(aHue, 1));

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(9999, 9999) },
      uMouseStrength: { value: 0 },
      uOpacity: { value: 0 },
      uParallaxOffset: { value: new THREE.Vector2(0, 0) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShaderCode,
      fragmentShader: fragmentShaderCode,
      uniforms: uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.active = true;
      mouseRef.current.nx = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.ny = -(e.clientY / window.innerHeight) * 2 + 1;

      const vector = new THREE.Vector3(
        mouseRef.current.nx,
        mouseRef.current.ny,
        0.5
      );
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const worldPos = camera.position.clone().add(dir.multiplyScalar(distance));

      mouseRef.current.x = worldPos.x;
      mouseRef.current.y = worldPos.y;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resize);

    resize();

    let animationFrameId: number;
    let tick = 0;
    let globalAlpha = 0;

    const draw = () => {
      tick += 0.016;
      uniforms.uTime.value = tick;

      if (mouseRef.current.active) {
        mouseRef.current.rx += (mouseRef.current.x - mouseRef.current.rx) * 0.08;
        mouseRef.current.ry += (mouseRef.current.y - mouseRef.current.ry) * 0.08;
        
        mouseRef.current.rnx += (mouseRef.current.nx - mouseRef.current.rnx) * 0.06;
        mouseRef.current.rny += (mouseRef.current.ny - mouseRef.current.rny) * 0.06;

        uniforms.uMouse.value.set(mouseRef.current.rx, mouseRef.current.ry);
        uniforms.uParallaxOffset.value.set(mouseRef.current.rnx * 40.0, mouseRef.current.rny * 40.0);
      }

      const targetAlpha = mouseRef.current.active ? 1 : 0;
      globalAlpha += (targetAlpha - globalAlpha) * 0.08;

      uniforms.uOpacity.value = globalAlpha;
      uniforms.uMouseStrength.value = globalAlpha;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(draw);
    };

    const drawLoop = draw;
    drawLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 bg-white"
    />
  );
}
