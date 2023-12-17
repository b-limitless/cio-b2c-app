'use client';


import { OrbitControls } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { modelsURL } from 'config/models';
import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useMemo, useRef } from 'react';
import { TCollar } from 'slices/accentSlice';
import * as THREE from 'three';
import { Group, MeshPhongMaterial, Object3DEventMap, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface BaseModel {
  collar:string;
}

interface CollarInterface extends  BaseModel{
  
}

interface ShirtModelInterface extends BaseModel {
  febricURI:string;
  collarAccent: TCollar
}

interface AddTextureModel {
  textureURL: string;
  children: ReactNode
  meshName: string[];
  fullBody: boolean;
}

const Shirt3DModel = ({collar, febricURI, collarAccent}: ShirtModelInterface) => {
  return (
    
    <Canvas>
        <ambientLight />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={1} />
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
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
          enableDamping={true}
          enablePan={false}
          dampingFactor={0.1}
          autoRotate={false}
          autoRotateSpeed={0.2}
        />
        <AddTextureToModel textureURL={collarAccent.febric} meshName={collarAccent.meshName} fullBody={collarAccent.meshName.length === 0}>
        <CollarModel collar={collar}/>
        </AddTextureToModel>

        <CuffModel/>
        
        <AddTextureToModel textureURL={febricURI} meshName={['Body_Front_Node']} fullBody={true}>
          <Model />
        </AddTextureToModel>
        
      </Canvas>

      
    
    
    
  );
};

const Model = () => {
  const { scene } = useLoader(GLTFLoader, modelsURL.shirt);

  scene.scale.set(6, 6, 6);
  // Optionally adjust position or scale here
  scene.position.y = -7;
  scene.position.x = 0;
  scene.name = 'shirt-model-without-collar'
  

  return <primitive object={scene} />;
};

// Keep crashing
const CollarModel = ({collar}: CollarInterface) => {
 
    // const collarModelURL =  collar ?? '/models/collars/collar-2.glb';
    // console.log('collarModelURL', collarModelURL);
    // Before adding get the object by name 
    

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

const CuffModel = () => {
 
  // const collarModelURL =  collar ?? '/models/cuff/collar-2.glb';
  // console.log('collarModelURL', collarModelURL);
  // Before adding get the object by name 
  

  const { scene } = useLoader(GLTFLoader, '/models/cuffs/cuff-1-normal.glb');

  const existingCollar = scene.getObjectByName("cuffs");
  if (existingCollar) {
    scene.remove(existingCollar);
  }

  scene.scale.set(6, 6, 6);
  // Optionally adjust position or scale here
  scene.position.y = -7;
  scene.position.x = 0;
  scene.name = 'cuffs';
  
  return <primitive object={scene}/>;
};


const AddTextureToModel = ({textureURL, meshName, children, fullBody}: AddTextureModel) => {
  const modelRef = useRef<Group<Object3DEventMap>>(null);

  // Load texture using userLoader 
  const texture = useLoader(TextureLoader, textureURL);

  console.log('collarAccent.meshName', meshName, 'type', textureURL)

    texture.repeat.set(2, 2);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

  // Define material with the loaded texture
  const material =  useMemo(() => {
    return new MeshPhongMaterial({map: texture});
  }, [texture]);
  
  

  // Set the material to the specific mesh in the model

  const setMaterial = (parent:THREE.Object3D, meshName:string[], mtl:THREE.Material, fullBody:boolean) => {

    fullBody && parent.traverse((o) => {
      if(o instanceof THREE.Mesh) {
        o.material = mtl;
      }
    })

    !fullBody && parent.traverse((o) => {
      if(o instanceof THREE.Mesh && meshName.includes(o.name)) {
        o.material = mtl;
      }
    })
  }
  
  useEffect(() => {
    if(modelRef.current) setMaterial(modelRef.current, meshName, material, fullBody);
    
  }, [texture, material, meshName, fullBody]);
  
    return (
      <group ref={modelRef}>
        {children}
      </group>
    );
  

}



CollarModel.displayName = "Collar Model";

// export default Shirt3DModel;

export default dynamic(() => Promise.resolve(Shirt3DModel), { ssr: false });
