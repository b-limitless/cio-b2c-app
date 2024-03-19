/**
 * 
 * Using Draco compression for your 3D models can indeed improve performance in terms of 
 * loading times and memory usage. Draco is a compression library developed by Google 
 * that reduces the size of 3D geometry and animation data without significantly 
 * compromising visual quality. By using Draco compression, you can decrease 
 * the file size of your 3D models, leading to faster loading times, 
 * reduced bandwidth usage, and better overall performance, especially 
 * for web-based applications.
*/
'use client';
import { OrbitControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { defaultCuffModel } from 'config/default';
import { modelsURL } from 'config/models';
import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useMemo, useRef } from 'react';
import { TBase } from 'slices/accentSlice';
import { RowType } from 'slices/modelSlice';
import * as THREE from 'three';
import { Group, MeshPhongMaterial, Object3DEventMap, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';



const modelScale = 8;
const modelYPostion = -10.5;

interface BaseModel {
  collar: string;
}

interface CollarInterface extends BaseModel {

}

interface ShirtModelInterface extends BaseModel {
  febricURI: string;
  collarAccent: TBase;
  cuffAccent: TBase;
  cuff: RowType;
  chestPocket: boolean
}

interface AddTextureModel {
  textureURL: string;
  children: ReactNode
  meshName: string[];
  fullBody: boolean;

}

interface AddColorToModel extends Omit<AddTextureModel, 'textureURL'> {

}

interface IAddModelToScene {
  name: string;
  modelURI: string;
}


const Shirt3DModel = ({ collar, cuff, febricURI, collarAccent, cuffAccent, chestPocket }: ShirtModelInterface) => {

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={.1} color={0xffffff} />
      <directionalLight position={[-5, -5, -5]} intensity={.1} color={0xffffff} />
      <pointLight position={[100, 100, 100]} />
      <hemisphereLight color={0xffffff} intensity={0.4} position={[100, 50, 0]} />
      <directionalLight castShadow={true} />
      <mesh receiveShadow castShadow />

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
        dampingFactor={0.2}
        autoRotate={false}
        autoRotateSpeed={0.2}
      />
      <AddTextureToModel textureURL={collarAccent.febric} meshName={collarAccent.meshName} fullBody={collarAccent.meshName.length === 0}>
        <AddModelToScene name='collar' modelURI={collar} />
      </AddTextureToModel>

      <AddTextureToModel textureURL={cuffAccent.febric} meshName={cuffAccent.meshName} fullBody={cuffAccent.meshName.length === 0}>
        <AddModelToScene name='cuff' modelURI={cuff.modelURL ?? defaultCuffModel} />
      </AddTextureToModel>

      {/* This is render button in front of the shirt */}

      <AddTextureToModel textureURL={'/img/126.jpg'} meshName={[]} fullBody={true}>

        <AddModelToScene name='buttons' modelURI={modelsURL.buttons} />

      </AddTextureToModel>

      {/* render button wholes e */}
    
      <AddModelToScene name='buttonsWholes' modelURI={modelsURL.buttonsWholes} /> 
      {/* <AddColorToModel  meshName={['MatShape_55582_Node']} fullBody={false}>
      </AddColorToModel> */}



      {/* render cuff button based on different condition, initial value */}
      {/* Model url value will be keep change based on user interecting */}
      <AddModelToScene name='cuffButtons' modelURI={modelsURL.singleCuffOneButton} />

      <AddTextureToModel textureURL={febricURI} meshName={[]} fullBody={true}>
        <Model chestPocket={chestPocket}/>
      </AddTextureToModel>



    </>


  );
};

const hideMeshByName = (scene:THREE.Scene, names:string[], show:boolean) => {
  scene.traverse((o:any) => {
    if (o.isMesh &&  names.indexOf(o.name) !== -1 && !show) {
      o.visible = false; // Hide the mesh
    } else {
      o.visible = true;
    }
  });
};

interface IModel {
  chestPocket:boolean;
}

const Model = ({chestPocket}: IModel) => {

  const { scene } = useLoader(GLTFLoader, modelsURL.shirt);

  hideMeshByName(scene as any, ['Pattern_285866_Node', 'Pattern_288949_Node'], chestPocket);
  
  scene.scale.set(modelScale, modelScale, modelScale);
  // Optionally adjust position or scale here
  scene.position.y = modelYPostion;
  scene.position.x = 0;
  scene.name = 'shirt-model-without-collar'

  return <primitive object={scene} />;
};


const AddModelToScene = ({ name, modelURI }: IAddModelToScene) => {

  const { scene } = useLoader(GLTFLoader, modelURI);


  const existingCollar = scene.getObjectByName(name);
  if (existingCollar) {
    scene.remove(existingCollar);
  }

  scene.scale.set(modelScale, modelScale, modelScale);
  // Optionally adjust position or scale here
  scene.position.y = modelYPostion;
  scene.position.x = 0;

  scene.name = name;

  return <primitive object={scene} />;
};


const AddTextureToModel = ({ textureURL, meshName, children, fullBody }: AddTextureModel) => {

  // console.log(`textureURL, meshName, children, fullBody`, textureURL, meshName, children, fullBody);

  const modelRef = useRef<Group<Object3DEventMap>>(null);

  // Load texture using userLoader 
  const texture = useLoader(TextureLoader, textureURL);

  // Check the proper resolution of model 
  // On the other hand the febric need to be high resolution 
  // Febric size need to be greater then model so there is no repeating 
  // needed to add to have real experiences
  // Considere the lighting way on the model which will provide more
  // Realistic experiences for the model
  texture.repeat.set(4, 4);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  // Define material with the loaded texture
  const material = useMemo(() => {
    return new MeshPhongMaterial({ map: texture });
  }, [texture]);



  // Set the material to the specific mesh in the model

  const setMaterial = (parent: THREE.Object3D, meshName: string[], mtl: THREE.Material, fullBody: boolean) => {

    fullBody && parent.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.material = mtl;
      }
    })

    !fullBody && parent.traverse((o) => {
      if (o instanceof THREE.Mesh && meshName.includes(o.name)) {
        o.material = mtl;
      }
    })
  }

  useEffect(() => {
    if (modelRef.current) setMaterial(modelRef.current, meshName, material, fullBody);

  }, [texture, material, meshName, fullBody]);

  return (
    <group ref={modelRef}>
      {children}
    </group>
  );


}

const AddColorToModel = ({meshName, children }: AddColorToModel) => {

  const modelRef = useRef<Group<Object3DEventMap>>(null);

  // Define material with the loaded texture
  const material = useMemo(() => {
    return new MeshPhongMaterial({
      // color: parseInt("0x" + 'FF0000'), // Assuming color is a hex string, if not, adjust accordingly
      // shininess: 10 // You can adjust shininess as needed
    });
  }, []);



  // Set the material to the specific mesh in the model

  const setMaterial = (parent: THREE.Object3D, meshName: string[], mtl: THREE.Material) => {

    parent.traverse((o) => {
      if (o instanceof THREE.Mesh && meshName.includes(o.name)) {
        o.material = mtl;
      }
    })
  }

  useEffect(() => {
    if (modelRef.current) setMaterial(modelRef.current, meshName, material);

  }, [material, meshName]);

  return (
    <group ref={modelRef}>
      {children}
    </group>
  );


}

export default dynamic(() => Promise.resolve(Shirt3DModel), { ssr: false });
