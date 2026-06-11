import React, { useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { useTheme } from './ThemeProvider';
import * as THREE from 'three';

export default function GlobeWidget() {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const { theme } = useTheme();
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setDimensions({ width: clientWidth, height: clientHeight });
    }
    
    // Zoom in on Indonesia
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: -0.7893, lng: 113.9213, altitude: 1.5 }, 2000);
      
      const scene = globeEl.current.scene();

      // Remove default lights
      const lights = scene.children.filter((obj: any) => obj.type === 'AmbientLight' || obj.type === 'DirectionalLight');
      lights.forEach((l: any) => scene.remove(l));

      // Calculate approximate real-time sun position
      const now = new Date();
      const hours = now.getUTCHours() + now.getUTCMinutes() / 60;
      const sunLon = (12 - hours) * 15;
      
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = now.getTime() - start.getTime();
      const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
      const sunLat = -23.44 * Math.cos((360 / 365) * (dayOfYear + 10) * (Math.PI / 180));

      // Convert to Cartesian
      const phi = (90 - sunLat) * (Math.PI / 180);
      const theta = (sunLon + 180) * (Math.PI / 180);

      const distance = 200;
      const x = -(distance * Math.sin(phi) * Math.cos(theta));
      const z = (distance * Math.sin(phi) * Math.sin(theta));
      const y = (distance * Math.cos(phi));

      // Add actual sun light
      const dirLight = new THREE.DirectionalLight(0xffeedd, Math.PI);
      dirLight.position.set(x, y, z);
      scene.add(dirLight);

      // Add a dim ambient light for the night side so it's not totally pitch black
      const ambientLight = new THREE.AmbientLight(0x222233, 0.4); 
      scene.add(ambientLight);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDark = theme === 'dark';

  return (
    <div ref={containerRef} className="w-full h-full min-h-[300px] flex items-center justify-center relative cursor-move">
      <div className="absolute inset-0 bg-transparent z-10 pointer-events-none rounded-3xl" />
      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor={isDark ? "#8fbcd4" : "#4bc0c0"}
        atmosphereAltitude={0.2}
      />
    </div>
  );
}
