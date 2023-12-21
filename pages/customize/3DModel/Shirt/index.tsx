'use client';
import { Html, OrbitControls } from '@react-three/drei';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { modelsURL } from 'config/models';
import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useMemo, useRef } from 'react';
import { TCollar } from 'slices/accentSlice';
import { RowType } from 'slices/modelSlice';
import * as THREE from 'three';
import { Group, MeshPhongMaterial, Object3DEventMap, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


interface BaseModel {
  collar: string;
}

interface CollarInterface extends BaseModel {

}

interface ShirtModelInterface extends BaseModel {
  febricURI: string;
  collarAccent: TCollar;
  cuffAccent: TCollar;
  cuff: RowType;
  [x:string]:any;
}

interface AddTextureModel {
  textureURL: string;
  children: ReactNode
  meshName: string[];
  fullBody: boolean;
}

interface IAddModelToScene {
  name: string;
  modelURI: string;
}


const CaptureModelScreenShot = () => {
  const {gl, scene, camera} = useThree();

  const captureScreenshot = () => {
    // Get the canvas element from the ref
    gl.render(scene, camera); 
    const screenShot = gl.domElement.toDataURL();

    console.log('screenShot', screenShot);
  };

  return <Html>
        <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10, backgroundColor:'red' }}>
          <button onClick={captureScreenshot}>Capture Screenshot</button>
        </div>
      </Html>
}

const Shirt3DModel = ({ collar, cuff, febricURI, collarAccent, cuffAccent, setScreenShot }: ShirtModelInterface) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);  
  

  return (

    <Canvas ref={(ref) => (canvasRef.current = ref)}  onCreated={({ gl }) => {
      // Set the clearColor to the background color of your scene
      gl.setClearColor(new THREE.Color(0xffffff));
    }}>
      <CaptureModelScreenShot/>
      
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
        <AddModelToScene name='collar' modelURI={collar} />
      </AddTextureToModel>

      <AddTextureToModel textureURL={cuffAccent.febric} meshName={cuffAccent.meshName} fullBody={cuffAccent.meshName.length === 0}>

        <AddModelToScene name='cuff' modelURI={cuff.model} />
      </AddTextureToModel>


      <AddTextureToModel textureURL={febricURI} meshName={[]} fullBody={true}>
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


const AddModelToScene = ({ name, modelURI }: IAddModelToScene) => {

  // const collarModelURL =  collar ?? '/models/collars/collar-2.glb';
  // console.log('collarModelURL', collarModelURL);
  // Before adding get the object by name 


  const { scene } = useLoader(GLTFLoader, modelURI);

  const existingCollar = scene.getObjectByName(name);
  if (existingCollar) {
    scene.remove(existingCollar);
  }

  scene.scale.set(6, 6, 6);
  // Optionally adjust position or scale here
  scene.position.y = -7;
  scene.position.x = 0;
  scene.name = name;

  return <primitive object={scene} />;
};


const AddTextureToModel = ({ textureURL, meshName, children, fullBody }: AddTextureModel) => {

  // console.log(`textureURL, meshName, children, fullBody`, textureURL, meshName, children, fullBody);

  const modelRef = useRef<Group<Object3DEventMap>>(null);

  // Load texture using userLoader 
  const texture = useLoader(TextureLoader, textureURL);

  texture.repeat.set(2, 2);
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

export default dynamic(() => Promise.resolve(Shirt3DModel), { ssr: false });
