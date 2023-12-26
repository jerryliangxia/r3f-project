import { useKeyboardControls, useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import * as THREE from "three";

function wrapAngle(angle) {
  while (angle < -Math.PI) angle += 2 * Math.PI;
  while (angle > Math.PI) angle -= 2 * Math.PI;
  return angle;
}

export default function CharacterController() {
  const body = useRef();
  const character = useGLTF("./animated_spiderman_ps5.glb");
  const animations = useAnimations(character.animations, character.scene);
  const [characterState, setCharacterState] = useState("Idle");
  const [subscribeKeys, getKeys] = useKeyboardControls();

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys();
    const keysPressed = [forward, backward, leftward, rightward].filter(
      Boolean
    ).length;

    // Only apply the impulse if two or fewer keys are pressed
    if (keysPressed <= 2) {
      // Get the camera's forward direction
      const cameraDirection = new THREE.Vector3();
      state.camera.getWorldDirection(cameraDirection);

      // Project the camera direction onto the XZ plane
      cameraDirection.y = 0;
      cameraDirection.normalize();

      // Create a rotation matrix from the camera's direction
      const rotationMatrix = new THREE.Matrix4();
      rotationMatrix.lookAt(
        cameraDirection,
        new THREE.Vector3(0, 0, 0),
        state.camera.up
      );

      // Initialize the input direction
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

      // Transform the input direction from the camera's perspective to the world perspective
      inputDirection.applyMatrix4(rotationMatrix);
      // Get the current linear velocity of the character
      const linvel = body.current.linvel();

      // Calculate the magnitude of the linear velocity
      const linvelMagnitude = Math.sqrt(linvel.x ** 2 + linvel.z ** 2);
      // Only apply the impulse if the linear velocity is below a certain threshold
      const maxLinvelMagnitude = 2; // Adjust this value to control the maximum speed
      if (linvelMagnitude < maxLinvelMagnitude) {
        // Use the transformed input direction for the impulse
        const impulseStrength = 1 * delta;
        const impulse = {
          x: inputDirection.x * impulseStrength,
          y: 0,
          z: inputDirection.z * impulseStrength,
        };

        if (impulse.x !== 0 || impulse.z !== 0) {
          const targetAngle = Math.atan2(impulse.x, impulse.z);
          const currentAngle = character.scene.rotation.y;
          const newAngle = THREE.MathUtils.lerp(
            currentAngle,
            targetAngle,
            0.05
          );

          // Wrap the new angle to ensure it's within the range of -π to π
          const wrappedNewAngle = wrapAngle(newAngle);

          character.scene.rotation.y = wrappedNewAngle;
          // Check if the character's rotation is close enough to the target angle
          const angleTolerance = 0.1; // Adjust this value to control the rotation tolerance

          // Check if the angle change is large
          const angleDifference = Math.abs(newAngle - currentAngle);

          // Only apply the impulse if the character's rotation is close enough to the target angle
          if (angleDifference < angleTolerance) {
            body.current.applyImpulse(impulse);
          }
        }

        // Determine the animation state based on the movement
        const isMoving = impulse.x !== 0 || impulse.z !== 0;
        if (isMoving && characterState !== "Run") {
          setCharacterState("Run");
        } else if (!isMoving && characterState !== "Idle") {
          setCharacterState("Idle");
        }
      }

      body.current.wakeUp();
    } else {
      setCharacterState("Idle");
    }
  });

  useEffect(() => {
    const action = animations.actions[characterState];
    action.reset().fadeIn(0.5).play();
    return () => {
      action.fadeOut(0.5);
    };
  }, [characterState]);

  return (
    <>
      <RigidBody
        ref={body}
        colliders={false}
        position={[0, 1, -0.25]}
        scale={[0.5, 0.5, 0.5]}
        linearDamping={1}
        // angularDamping={0.5}
        enabledRotations={[false, false, false]}
      >
        <primitive
          object={character.scene}
          scale={1}
          position={[0, 0, 0]}
          rotation-y={0.3}
        />
        <CapsuleCollider args={[0.4, 0.4]} position={[0, 0.8, 0]} />
      </RigidBody>
    </>
  );
}
