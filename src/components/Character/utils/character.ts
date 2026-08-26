import * as THREE from "three";
import { DRACOLoader, type GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          `/models/character.enc?v=${Date.now()}`,
          "MyCharacter12"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                const name = mesh.name;

                // ── Match Akshat's real appearance ──
                if (mesh.material) {
                  const cloneMat = () =>
                    (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;

                  // Hide cap — Akshat doesn't wear one, show natural hair
                  if (name === "CAP.001" || name === "CAP.002") {
                    mesh.visible = false;
                  }
                  // Skin — natural warm tan matching Akshat's photo
                  else if (
                    name === "Face.002" || name === "Ear.001" ||
                    name === "Neck" || name === "Hand"
                  ) {
                    const mat = cloneMat();
                    mat.color = new THREE.Color("#c58b68");
                    mat.roughness = 0.6;
                    mesh.material = mat;
                  }
                  // Hair — jet black, thick texture
                  else if (
                    name.toLowerCase().includes("hair") ||
                    name.toLowerCase().includes("brow")
                  ) {
                    const mat = cloneMat();
                    mat.color = new THREE.Color("#0f0d0b");
                    mat.roughness = 0.85;
                    mesh.material = mat;
                  }
                  // Eyes — dark brown iris
                  else if (name.toLowerCase().includes("eye")) {
                    const mat = cloneMat();
                    mat.color = new THREE.Color("#2c1a0e");
                    mesh.material = mat;
                  }
                  // Lips — natural warm tone, slightly darker than skin
                  else if (name.toLowerCase().includes("lip") || name.toLowerCase().includes("mouth")) {
                    const mat = cloneMat();
                    mat.color = new THREE.Color("#7a5040");
                    mesh.material = mat;
                  }
                  // Charcoal sweater
                  else if (name === "BODY.SHIRT") {
                    const mat = cloneMat();
                    mat.color = new THREE.Color("#2a2d32");
                    mesh.material = mat;
                  }
                  // Dark pants
                  else if (name === "Pant") {
                    const mat = cloneMat();
                    mat.color = new THREE.Color("#111111");
                    mesh.material = mat;
                  }
                  // Shoes — dark to match
                  else if (name.toLowerCase().includes("shoe") || name.toLowerCase().includes("foot")) {
                    const mat = cloneMat();
                    mat.color = new THREE.Color("#1a1a1a");
                    mesh.material = mat;
                  }
                }

                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;

            // Monitor scale is handled by GsapScroll.ts animations

            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
