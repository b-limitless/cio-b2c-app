'use client';


import { OrbitControls } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import dynamic from 'next/dynamic';
import { ReactNode, Ref, useEffect, useMemo, useRef } from 'react';
import { Group, Object3DEventMap, TextureLoader, MeshPhongMaterial } from 'three';
import * as THREE from 'three';

interface BaseModel {
  collar:string;
}

interface CollarInterface extends  BaseModel{
  
}

interface ShirtModelInterface extends BaseModel {
  febricURI:string;
}

interface AddTextureModel {
  textureURL: string;
  children: ReactNode
}

const Shirt3DModel = ({collar, febricURI}: ShirtModelInterface) => {
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
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          enableDamping={true}
          enablePan={false}
          dampingFactor={0.1}
          autoRotate={false}
          autoRotateSpeed={0.2}
        />
        <CollarModel collar={collar}/>
        <AddTextureToModel textureURL={febricURI}>
          <Model />
        </AddTextureToModel>
        
      </Canvas>

      
    
    
    
  );
};

const Model = () => {
  const { scene } = useLoader(GLTFLoader, '/models/shirt/shirt-without-collar-2.glb');

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


const AddTextureToModel = ({textureURL, children}: AddTextureModel) => {
  const modelRef = useRef<Group<Object3DEventMap>>(null);

  // Load texture using userLoader 
  const texture = useLoader(TextureLoader, textureURL);

    texture.repeat.set(2, 2);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

  // Define material with the loaded texture
  const material =  useMemo(() => {
    console.log('texture', texture);
    return new MeshPhongMaterial({map: texture});
  }, [texture]);
  
  

  // Set the material to the specific mesh in the model

  const setMaterial = (parent:THREE.Object3D, type:string, mtl:THREE.Material, fullBody:boolean) => {

    fullBody && parent.traverse((o) => {
      if(o instanceof THREE.Mesh) {
        o.material = mtl;
      }
    })

    !fullBody && parent.traverse((o) => {
      if(o instanceof THREE.Mesh && o.name === type) {
        o.material = mtl;
      }
    })
  }
  
  useEffect(() => {
    if(modelRef.current) setMaterial(modelRef.current, 'Body_Front_Node', material, true);
    
  }, [texture, material])
  
    return (
      <group ref={modelRef}>
        {children}
      </group>
    );
  

}



CollarModel.displayName = "Collar Model";

// export default Shirt3DModel;

export default dynamic(() => Promise.resolve(Shirt3DModel), { ssr: false });
