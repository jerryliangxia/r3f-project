import { useKeyboardControls, useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import * as THREE from "three";

const MAX_LINVEL = 2;
const ROTATION_THRESHOLD = Math.PI;
const IMPULSE_FACTOR = 2;

const isMobile = window.innerWidth <= 768;

function verifyLinvel(body) {
  const linvel = body?.current?.linvel();
  const linvelMagnitude = Math.sqrt(linvel?.x ** 2 + linvel?.z ** 2);
  return linvelMagnitude < MAX_LINVEL;
}

function getRotationMatrix(state) {
  const cameraDirection = new THREE.Vector3();
  state.camera.getWorldDirection(cameraDirection);
  cameraDirection.y = 0;
  cameraDirection.normalize();
  const rotationMatrix = new THREE.Matrix4();
  rotationMatrix.lookAt(
    cameraDirection,
    new THREE.Vector3(0, 0, 0),
    state.camera.up
  );
  return rotationMatrix;
}

function getRotation(impulse, delta, character) {
  const targetAngle = Math.atan2(impulse.x, impulse.z);
  const currentAngle = character.scene.rotation.y;
  const newAngle = THREE.MathUtils.lerp(
    currentAngle,
    targetAngle,
    0.1 * delta * 100
  );
  const angleDifference = Math.abs(newAngle - targetAngle);
  return angleDifference <= ROTATION_THRESHOLD ? newAngle : targetAngle;
}

function getImpulse(delta, inputDirection) {
  const impulseStrength = IMPULSE_FACTOR * delta;
  return {
    x: inputDirection.x * impulseStrength,
    y: 0,
    z: inputDirection.z * impulseStrength,
  };
}

export default function CharacterController({
  handleCharacterClick,
  isComputerClicked,
  isWorkbenchClicked,
  setIsComputerClicked,
  characterPosition,
  isAboutPage,
}) {
  const body = useRef();
  const character = useGLTF("./animated_spiderman2.glb");
  // const character = useGLTF("./animated_spiderman_ps5.glb");
  const animations = useAnimations(character.animations, character.scene);
  const [characterState, setCharacterState] = useState("Idle");
  const [subscribeKeys, getKeys] = useKeyboardControls();
  // const [isJumping, setIsJumping] = useState(false);
  const [keysPressed, setKeysPressed] = useState(0);

  useFrame((state, delta) => {
    // if (!isJumping) {
    body?.current?.wakeUp();
    if (isMobile || isAboutPage) return;
    const { forward, backward, leftward, rightward } = getKeys();
    setKeysPressed(
      [forward, backward, leftward, rightward].filter(Boolean).length
    );
    if (keysPressed <= 2 && verifyLinvel(body)) {
      const inputDirection = new THREE.Vector3(0, 0, 0);
      if (forward) {
        inputDirection.z += 1;
      }
      if (rightward) {
        inputDirection.x -= 1;
      }
      if (backward) {
        inputDirection.z -= 1;
      }
      if (leftward) {
        inputDirection.x += 1;
      }
      inputDirection.applyMatrix4(getRotationMatrix(state));
      const impulse = getImpulse(delta, inputDirection);
      const isMoving = impulse.x !== 0 || impulse.z !== 0;
      if (isMoving) {
        character.scene.rotation.y = getRotation(impulse, delta, character);
        if (verifyLinvel(body)) body.current.applyImpulse(impulse);

        if (characterState !== "Run") {
          setCharacterState("Run");
        }
      } else if (characterState !== "Idle") {
        setCharacterState("Idle");
      }
    }
    // }
  });

  useEffect(() => {
    if (!isMobile && keysPressed > 2) {
      setCharacterState("Idle");
    }
  }, [keysPressed]);

  useFrame((state, delta) => {
    if (!isMobile || isAboutPage) return;

    const direction = new THREE.Vector3()
      .subVectors(characterPosition, body?.current?.translation())
      .normalize();

    const bodyTranslation = new THREE.Vector3(
      body.current.translation().x,
      body.current.translation().y,
      body.current.translation().z
    );
    if (bodyTranslation.distanceTo(characterPosition) > 0.2) {
      const impulse = getImpulse(delta, direction);
      character.scene.rotation.y = getRotation(impulse, delta, character);
      if (verifyLinvel(body)) body.current.applyImpulse(impulse);
      setCharacterState("Run");
    } else {
      setCharacterState("Idle");
    }
  });

  useEffect(() => {
    // if (isJumping) {
    //   const action = animations.actions[characterState];
    //   action.reset().fadeIn(0.5).play();
    //   setTimeout(() => {
    //     setIsJumping(false);
    //   }, 1500);
    //   return () => {
    //     action.fadeOut(0.5);
    //   };
    // } else {
    const action = animations.actions[characterState];
    action.reset().fadeIn(0.2).play();
    return () => {
      action.fadeOut(0.5);
    };
    // }
  }, [characterState]);

  // const jump = () => {
  //   setIsJumping(true);
  //   setCharacterState("Jump");
  // };

  // useEffect(() => {
  //   const unsubscribeJump = subscribeKeys(
  //     (state) => state.jump,
  //     (value) => {
  //       if (value) jump();
  //     }
  //   );
  //   return () => {
  //     unsubscribeJump();
  //   };
  // });

  return (
    <>
      <RigidBody
        ref={body}
        colliders={false}
        position={[0, 0, 0]}
        scale={[0.5, 0.5, 0.5]}
        linearDamping={1}
        angularDamping={0.5}
        enabledRotations={[false, false, false]}
      >
        <primitive object={character.scene} />
        {/* Mesh for click events */}
        <mesh
          onPointerEnter={() => {
            document.body.style.cursor =
              isComputerClicked || isWorkbenchClicked ? "default" : "pointer";
          }}
          onPointerLeave={() => {
            document.body.style.cursor = "default";
          }}
          onClick={(event) => {
            if (!isComputerClicked && !isWorkbenchClicked && !isMobile) {
              event.stopPropagation();
              handleCharacterClick(body);
            }
          }}
          position-y={0.9}
          visible={false}
        >
          <cylinderGeometry args={[0.2, 0.2, 1.5, 8]} />
        </mesh>
        <CapsuleCollider args={[0.4, 0.4]} position={[0, 0.8, 0]} />
      </RigidBody>
    </>
  );
}
