import React from 'react';
import ReactDOM from 'react-dom';
import { ArcRotateCamera, Vector3, SceneLoader, HemisphericLight,
  Texture, MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core";
import { GLTFFileLoader } from "@babylonjs/loaders";

import './index.css';
//import App from './App';
//import reportWebVitals from './reportWebVitals';
import SceneComponent from './SceneComponent.jsx';



let box;
const createBoxModel = (scene) => {
  let mesh = MeshBuilder.CreateBox("box", { size: 2 }, scene);
  mesh.scaling = Vector3.One().scale(0.1);
  let mat = createMaterial();
  mesh.material = mat;

  return mesh;
};

const createMaterial = (scene) => {
  let myMaterial = new StandardMaterial("myMaterial", scene);

  myMaterial.diffuseColor = new Color3(1, 1, 1);
  //myMaterial.specularColor = new Color3(0.5, 0.6, 0.87);
  myMaterial.emissiveColor = new Color3(1, 1, 1);
  //myMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);
  //myMaterial.diffuseTexture = new Texture("https://www.babylonjs-playground.com/textures/co.png", scene);
  myMaterial.diffuseTexture = new Texture("simple_box_texture_2.png", scene);
  //myMaterial.diffuseTexture = new Texture("https://www.babylonjs-playground.com/textures/co.png", scene);
  
  return myMaterial;
};

const createSpecialModel = async (scene) => {
  //const data = await SceneLoader.ImportMeshAsync(null, "./", "special.gltf", scene);
  const data = await SceneLoader.ImportMeshAsync(null, "./", "color_cube.glb", scene);
  console.debug("meshData:" , data);
  for(let m of data.meshes) {
    m.scaling = Vector3.One().scale(1);
    let mat = createMaterial();
    m.material = mat;
    console.log("mesh:", m);
  }
  return data.meshes[1];
  //return MeshBuilder.CreateBox("box", { size: 2 }, scene);
};

const onSceneReady = (scene) => {
  // This creates and positions a free camera (non-mesh)
  //var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  let camera = new ArcRotateCamera("Camera1", 10, 0.5, 10, new Vector3(0, 0, 0), scene);
  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;


  //SceneLoader.Append("./", "special.gltf", scene, function (scene) {
    // do something with the scene
  //});


  // Our built-in 'box' shape.
  //let model = createBoxModel(scene);
  let model = createSpecialModel(scene);
  console.debug("Model: ", model);
  model.scaling = Vector3.One().scale(5);
  //model.scaling = new Vector3(2,2,2);


  // Move the box upward 1/2 its height
  //model.position.y = 1;

  // Our built-in 'ground' shape.
  //MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {
  if (box !== undefined) {
    //var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    //const rpm = 10;
    //box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

// export default () => (
//   <div>
//     <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
//   </div>
// );

ReactDOM.render(
  <React.StrictMode>
    <SceneComponent style={{ width: '1000px' }} antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
