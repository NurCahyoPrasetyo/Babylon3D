import React from "react";
import {
  Vector3,
  Color4,
  ArcRotateCamera,
  AssetsManager,
  PointLight,
  SceneOptimizer,
  SceneOptimizerOptions,
  HardwareScalingOptimization,
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; // uses above component in same directory
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
import "./App.css";

let box;

const onSceneReady = (scene, engine) => {
  const canvas = scene.getEngine().getRenderingCanvas();
  scene.clearColor = new Color4(255, 255, 255, 0);
  const camera = new ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    15,
    new Vector3(0, 4, 0)
  );
  camera.attachControl(canvas, true);

  var optimizerOptions = new SceneOptimizerOptions();
  optimizerOptions.addOptimization(new HardwareScalingOptimization(0, 1));
  var optimizer = new SceneOptimizer(scene, optimizerOptions, false, false);
  optimizer.start();

  var light = new PointLight("light1", new Vector3(0, 0, 0), scene);
  light.intensity = 1;

  var assetsManager = new AssetsManager(scene);
  var meshTask = assetsManager.addMeshTask(
    "cat",
    "",
    "./assets/3D/",
    "SK_Character_Cat.babylon"
  );

  meshTask.onSuccess = function (task) {
    var mesh = task.loadedMeshes[0];
    task.loadedMeshes.map((el) => {
      const mat = el.material;
      if (mat) {
        mat.disableLighting = true;
      }
    });

    const skeleton = mesh.skeleton;
    const animIdle = skeleton?.getAnimationRange("Move_Cat");
    if (animIdle && skeleton) {
      const anim = scene.beginAnimation(
        skeleton,
        animIdle.from,
        animIdle.to,
        true,
        1.25
      );
    }
  };

  scene.registerBeforeRender(function () {
    light.position = camera.position;
  });

  assetsManager.onFinish = function (tasks) {
    engine.runRenderLoop(function () {
      scene.render();
    });
  };

  assetsManager.load();
};

const onRender = (scene) => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

const Dummy3D = () => (
  <div>
    <SceneComponent
      antialias
      onSceneReady={onSceneReady}
      onRender={onRender}
      id="trisixty-render-canvas"
    />
  </div>
);

export default Dummy3D
