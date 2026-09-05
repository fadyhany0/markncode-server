import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Sparkles, Eye, Code, Layers, Share2, CheckCircle2 } from 'lucide-react';

export default function ThreeDExperienceViewer({ onSendToChat }) {
  const [clientCompany, setClientCompany] = useState('شغفك وشركتك هنا');
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Objects: Futuristic Glowing Icosahedron Core
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      wireframe: true,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.4
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    // Outer Torus Ring
    const torusGeo = new THREE.TorusGeometry(2.4, 0.05, 16, 100);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x7f00ff,
      metalness: 0.8,
      roughness: 0.2
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    scene.add(torusMesh);

    // Particle Stars System
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 400;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 12;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.025,
      color: 0x4facfe
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f2fe, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      coreMesh.rotation.x += 0.005;
      coreMesh.rotation.y += 0.008;

      torusMesh.rotation.x -= 0.007;
      torusMesh.rotation.y += 0.004;

      particlesMesh.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 border-cyan-500/30 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-[#00F2FE] border border-cyan-500/30 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>تجارب 3D تفاعلية مخصصة باسم شركة العميل</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">معاينة تجربة الـ 3D التفاعلية M-3D Studio 🚀</h2>
        <p className="text-slate-300 text-sm mt-1">
          أدخل اسم شركتك لتوليد تجربة 3D وبصرية ثلاثية الأبعاد تنبض بالحياة، لتعرف كيف ترفع ماركن كود تحويلات موقعك بنسبة تصل لـ 300%.
        </p>

        {/* Dynamic Name Input */}
        <div className="mt-4 max-w-md">
          <label className="text-xs font-bold text-slate-300 block mb-1">اسم شركتك أو مشروعك:</label>
          <input
            type="text"
            value={clientCompany}
            onChange={(e) => setClientCompany(e.target.value)}
            placeholder="أدخل اسم الشركة هنا..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white focus:outline-none focus:border-[#00F2FE] text-sm"
          />
        </div>
      </div>

      {/* 3D Viewport Canvas Card */}
      <div className="glass-panel p-6 relative overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#00F2FE]" />
            <h3 className="text-base font-bold text-white font-latin">Live WebGL 3D Interactive Canvas</h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            60 FPS Smooth Render
          </span>
        </div>

        {/* 3D WebGL Canvas */}
        <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-gradient-to-b from-[#060913] to-[#0d1326] border border-white/10 flex-center">
          <div ref={mountRef} className="absolute inset-0 w-full h-full"></div>

          {/* Interactive Floating Badge Overlay */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 backdrop-blur-md bg-slate-900/80 border border-cyan-500/50 px-6 py-3 rounded-2xl text-center space-y-1 shadow-2xl shadow-cyan-500/20">
            <span className="text-[10px] text-cyan-400 font-bold tracking-widest block uppercase">Markncode 3D Custom Interactive Experience</span>
            <h3 className="text-lg md:text-xl font-black text-white font-arabic">
              مرحباً بكم في عالم <span className="text-[#00F2FE]">{clientCompany || 'شركتك'}</span>
            </h3>
          </div>
        </div>

        {/* Features breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <Code className="w-5 h-5 text-cyan-400 mb-1" />
            <h4 className="text-xs font-bold text-white">سرعة استجابة فائقة</h4>
            <p className="text-[11px] text-slate-400">تقنية WebGL خفيفة جداً تفتح على جميع الموبايلات بدون أي تهنيج.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <Layers className="w-5 h-5 text-purple-400 mb-1" />
            <h4 className="text-xs font-bold text-white">عناصر تفاعلية ثلاثية الأبعاد</h4>
            <p className="text-[11px] text-slate-400">تسمح للمشتري بلمس وتجربة منتجك أو خدماتك باليد قبل اتخاذ القرار.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <Sparkles className="w-5 h-5 text-yellow-400 mb-1" />
            <h4 className="text-xs font-bold text-white">معدل تحويل أضعاف العادي</h4>
            <p className="text-[11px] text-slate-400">الصفحات الـ 3D تحقق أعلى نسبة بقاء للعميل وانطباع فوري بالاحترافية.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => onSendToChat && onSendToChat(`أنا حابب أصمم 3D Landing Page تفاعلية باسم شركتي (${clientCompany})`)}
            className="gradient-btn px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <span>طلب تصميم 3D Landing Page لشركة {clientCompany || 'شركتك'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
