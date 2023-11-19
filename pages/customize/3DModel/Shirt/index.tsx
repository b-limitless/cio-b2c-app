'use client';


import React from 'react';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import { HemisphereLight, PerspectiveCamera } from 'three';



const BACKGROUND_COLOR = 0xf1f1f1;

const Shirt3DModel = () => {
  return (
    <Canvas>
        
      <ambientLight />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <directionalLight position={[-5, -5, -5]} intensity={2} />
      <pointLight position={[100, 100, 100]} />
      <hemisphereLight color={0xffffff} intensity={0.6} position={[100, 50, 0]} />
      <perspectiveCamera
          // This makes this camera the default camera for the scene
        fov={15}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={100}
        position={[10, 0, 5]}
      />
      
      <OrbitControls
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        enableDamping={true}
        enablePan={false}
        dampingFactor={0.1}
        autoRotate={false}
        autoRotateSpeed={0.2}
      />
      <Model />
    </Canvas>
  );
};

const Model = () => {
  const { scene } = useLoader(GLTFLoader, '/models/shirt/shirt-without-collar.glb');

  scene.traverse((o:any) => {
    if (o.isMesh) {
      console.log("o", o)
    //   o.castShadow = true;
    //   o.receiveShadow = true;
    }
  });
  scene.scale.set(6, 6, 6);
  // Optionally adjust position or scale here
  scene.position.y = -7;
  scene.position.x = 0;
  

  return <primitive object={scene} />;
};

export default dynamic(() => Promise.resolve(Shirt3DModel), { ssr: false });
// export default Shirt3DModel;


// export default ;