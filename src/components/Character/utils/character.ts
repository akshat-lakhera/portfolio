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
                const nameLower = name.toLowerCase();

                // ── Match Akshat's real appearance (Case-Insensitive) ──
                if (mesh.material) {
                  const cloneMat = () =>
                    (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;

                  // 1. Hide Cap (Akshat does not wear one)
                  if (nameLower.includes("cap")) {
                    mesh.visible = false;
                    const mat = cloneMat();
                    mat.transparent = true;
                    mat.opacity = 0;
                    mesh.material = mat;
                  }
                  // 2. Skin (Face, Ear, Neck, Hand)
                  else if (
                    nameLower.includes("face") ||
                    nameLower.includes("ear") ||
                    nameLower.includes("neck") ||
                    nameLower.includes("hand")
                  ) {
                    const mat = cloneMat();
                    mat.color = new THREE.Color("#c58b68"); // Natural warm tan
                    mat.roughness = 0.6;
                    mesh.material = mat;
                  }
                  // 3. Hair & Eyebrows
                  else if (
                    nameLower.includes("hair") ||
                    nameLower.includes("eyebrow") ||
                    nameLower.includes("brow")
                  ) {
                    const mat = cloneMat();
                    mat.color = new THREE.Color("#0f0d0b"); // Jet black
                    mat.roughness = 0.85;
                    mesh.material = mat;
                  }
                  // 4. Eyes
                  else if (nameLower.includes("eye")) {
                    const mat = cloneMat();
                    mat.color = new THREE.Color("#2c1a0e");
                    mesh.material = mat;
                  }
                  // 5. Lips, Mouth & Teeth
                  else if (
                    nameLower.includes("lip") ||
                    nameLower.includes("mouth") ||
                    nameLower.includes("teeth")
                  ) {
                    const mat = cloneMat();
                    mat.color = new THREE.Color("#7a5040");
                    mesh.material = mat;
                  }
                  // 6. Shirt / Body
                  else if (nameLower.includes("shirt") || nameLower.includes("body")) {
                    const mat = cloneMat();
                    mat.color = new THREE.Color("#2a2d32"); // Charcoal sweater
                    mesh.material = mat;
                  }
                  // 7. Pants
                  else if (nameLower.includes("pant")) {
                    const mat = cloneMat();
                    mat.color = new THREE.Color("#111111");
                    mesh.material = mat;
                  }
                  // 8. Shoes & Feet
                  else if (
                    nameLower.includes("shoe") ||
                    nameLower.includes("foot") ||
                    nameLower.includes("sole")
                  ) {
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
