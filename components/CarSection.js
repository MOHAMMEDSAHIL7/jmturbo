"use client";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const lerp = THREE.MathUtils.lerp;

function Model({ url }) {
  const { scene } = useGLTF(url);
  const fitted = useMemo(() => {
    const obj = scene.clone();
    const box = new THREE.Box3().setFromObject(obj);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    obj.position.sub(center);
    const group = new THREE.Group();
    group.add(obj);
    group.scale.setScalar(3 / Math.max(size.x, size.y, size.z));
    return group;
  }, [scene]);
  return <primitive object={fitted} />;
}

function Rig({ progress, cfg }) {
  const smooth = useRef(0);
  useFrame((state) => {
    smooth.current += (progress.current - smooth.current) * 0.08;
    const p = smooth.current;
    const a = THREE.MathUtils.degToRad(lerp(cfg.angle[0], cfg.angle[1], p));
    const r = lerp(cfg.radius[0], cfg.radius[1], p);
    const h = lerp(cfg.height[0], cfg.height[1], p);
    state.camera.position.set(Math.sin(a) * r, h, Math.cos(a) * r);
    state.camera.lookAt(0, cfg.lookY, 0);
  });
  return null;
}

export default function CarSection({ cfg }) {
  const wrapRef = useRef(null);
  const progress = useRef(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => (progress.current = self.progress),
    });
    return () => trigger.kill();
  }, []);

  return (
    <section id={cfg.id} ref={wrapRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen">
        <Canvas camera={{ position: [0, 1, 6], fov: 40 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.5} color={cfg.ambient} />
          <directionalLight position={[5, 6, 5]} intensity={2} color={cfg.key} />
          <directionalLight position={[-5, 2, -5]} intensity={3} color={cfg.rim} />
          <Suspense fallback={null}>
            <Model url={cfg.url} />
            <Environment preset={cfg.env} />
          </Suspense>
          <Rig progress={progress} cfg={cfg} />
        </Canvas>
        <div className="pointer-events-none absolute bottom-6 left-6 md:bottom-10 md:left-12">
          <h2 className="text-2xl font-black uppercase tracking-wider md:text-4xl">
            {cfg.title}
          </h2>
          <p className="mt-1 text-xs text-white/70 md:text-sm">{cfg.tagline}</p>
        </div>
      </div>
    </section>
  );
}