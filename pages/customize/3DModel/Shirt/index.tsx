'use client';


import { OrbitControls } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import dynamic from 'next/dynamic';


interface Collar {
  collar:string;
}

const Shirt3DModel = ({collar}: Collar) => {
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
      <CollarModel collar={collar}/>
      <Model />
    </Canvas>
  );
};

const Model = () => {
  const { scene } = useLoader(GLTFLoader, '/models/shirt/shirt-without-collar.glb');

  scene.scale.set(6, 6, 6);
  // Optionally adjust position or scale here
  scene.position.y = -7;
  scene.position.x = 0;
  scene.name = 'shirt-model-without-collar'
  

  return <primitive object={scene} />;
};

// Keep crashing
const CollarModel = ({collar}: Collar) => {
 
    // const collarModelURL =  collar ?? '/models/collars/collar-2.glb';
    // console.log('collarModelURL', collarModelURL);
    // Before adding get the object by name 
    
    console.log('collar', collar)

    const { scene } = useLoader(GLTFLoader, collar);

    const existingCollar = scene.getObjectByName("collar");
    if (existingCollar) {
      scene.remove(existingCollar);
    }

    scene.scale.set(6, 6, 6);
    // Optionally adjust position or scale here
    scene.position.y = -7;
    scene.position.x = 0;
    scene.name = 'collar';
    
    return <primitive object={scene}/>;
};

CollarModel.displayName = "Collar Model";

// export default Shirt3DModel;

export default dynamic(() => Promise.resolve(Shirt3DModel), { ssr: false });
