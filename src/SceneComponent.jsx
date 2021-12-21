/* eslint-disable react-hooks/rules-of-hooks */
import { Engine, Scene } from "@babylonjs/core";
import React from "react";
import { useEffect, useRef } from "react";

const scene = (props) => {
    const reactCanvas = useRef(null);
    const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest } = props;


    useEffect(() => {
        if (reactCanvas.current === false) {
            return;
        }
        const engine = new Engine(reactCanvas.current,
                 antialias, engineOptions, adaptToDeviceRatio);
        const scene = new Scene(engine, sceneOptions);
        if (scene.isReady()) {
            props.onSceneReady(scene);
        } else {
            scene.onReadyObservable.addOnce((scene) => props.onSceneReady(scene));
        }

        engine.runRenderLoop(() => {
            if (typeof onRender === "function") {
                onRender(scene);
            }
            scene.render();
        });

        const resize = () => {
            scene.getEngine().resize();
        };

        if (window) {
            window.addEventListener("resize", resize);
        }

        return () => {
            scene.getEngine().dispose();

            if (window) {
                window.removeEventListener("resize", resize);
            }
        };

    }, [reactCanvas]);

    return (
        <canvas ref={reactCanvas} {...rest} />
    );
};

export default scene;