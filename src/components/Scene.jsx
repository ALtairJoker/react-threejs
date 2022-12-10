import {useRef, useEffect} from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const Scene = () => {

    const mountRef = useRef(null);
    useEffect(() => {
        const currentMount = mountRef.current

        //Scene

        const scene = new THREE.Scene()
        const loader = new THREE.TextureLoader();
			loader.load("./img/ezu54.jpg", function(texture){
				scene.background = texture
			})

        //Camera

        const camera = new THREE.PerspectiveCamera(
            25,
            currentMount.clientWidth / currentMount.clientHeight,
            0.1,
            1000
        )
        camera.position.z = 8
        scene.add(camera)

        //Renderer

        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(currentMount.clientWidth , currentMount.clientHeight)
        currentMount.appendChild(renderer.domElement)

        //controls

        const controls = new OrbitControls(camera, renderer.domElement)
      /*   controls.target = new THREE.Vector3(x,y,z) */
        controls.enableDamping = true

        //Texturas
        const textureLoader = new THREE.TextureLoader()
        const map = textureLoader.load('./bricks/ladrillo/Wall_Stone_010_basecolor.jpg')
        const aoMap = textureLoader.load('./bricks/ladrillo/Wall_Stone_010_ambientOcclusion.jpg')
        const roughnessMap = textureLoader.load('./bricks/ladrillo/Wall_Stone_010_roughness.jpg')
        const normalMap = textureLoader.load('./bricks/ladrillo/Wall_Stone_010_normal.jpg')
        const heightMap = textureLoader.load('./bricks/ladrillo/Wall_Stone_010_height.png')


        //Cubo

       
        const geometry3 = new THREE.BoxGeometry(1,1,1,200,200,200 );
        const material3 = new THREE.MeshStandardMaterial({
           
           //para BasicMaterial
            /* color: 0xff0000,
            transparent: true,
            opacity: 0.3,
            wireframe: true */

            //standar
            map: map,
            aoMap: aoMap,
            roughnessMap: roughnessMap,
            normalMap: normalMap,
            displacementMap: heightMap,
            displacementScale: 0.07
          }
          )
        const cube = new THREE.Mesh(geometry3, material3)

        cube.position.set(0,0,0)
        scene.add(cube)
        


        //Esfera

        const textureLoader3 = new THREE.TextureLoader()
        const map3 = textureLoader3.load('./bricks/coral/Coral_001_basecolor.jpg')
        const aoMap3 = textureLoader3.load('./bricks/coral/Coral_001_ambientOcclusion.jpg')
        const roughnessMap3 = textureLoader3.load('./bricks/coral/Coral_001_roughness.jpg')
        const normalMap3 = textureLoader3.load('./bricks/coral/Coral_001_normal.jpg')
        const heightMap3 = textureLoader3.load('./bricks/coral/Coral_001_height.png')

      /*   const textureLoader1 = new THREE.TextureLoader()
        const matcap = textureLoader1.load('./texture/texture1.png')
 */
        const geometry = new THREE.SphereGeometry( 0.6, 32, 16 );
       /*  const material = new THREE.MeshMatcapMaterial({
          matcap: matcap
         } ); */
         const material2 = new THREE.MeshStandardMaterial({
          map: map3,
          aoMap: aoMap3,
          roughnessMap: roughnessMap3,
          normalMap: normalMap3,
          displacementMap: heightMap3
        })

        const sphere = new THREE.Mesh( geometry, material2 );
        scene.add( sphere );
        sphere.position.x = 2
        sphere.scale.set(1,1,1)
        
        //torus

        const textureLoader2 = new THREE.TextureLoader()
        const map2 = textureLoader2.load('./bricks/organo/Abstract_Organic_003_basecolor.jpg')
        const aoMap2 = textureLoader2.load('./bricks/organo/Abstract_Organic_003_ambientOcclusion.jpg')
        const roughnessMap2 = textureLoader2.load('./bricks/organo/Abstract_Organic_003_roughness.jpg')
        const normalMap2 = textureLoader2.load('./bricks/organo/Abstract_Organic_003_normal.jpg')
        const heightMap2 = textureLoader2.load('./bricks/organo/Abstract_Organic_003_height.png')

        const geometry1= new THREE.TorusKnotGeometry( 0.3, 0.1, 100, 16 );
        /* const material1 = new THREE.MeshNormalMaterial(  { flatShading:true }); */
        const material1 = new THREE.MeshStandardMaterial({
          map: map2,
          aoMap: aoMap2,
          roughnessMap: roughnessMap2,
          normalMap: normalMap2,
          displacementMap: heightMap2,
          displacementScale: 0.3
        })
        const torusKnot = new THREE.Mesh( geometry1, material1 );
        scene.add( torusKnot );
        torusKnot.position.set(-2,-0.5,0)
        torusKnot.scale.set(1,1,1)

        //Luz
        /* const AO = new THREE.AmbientLight(0xffffff, 1)
        scene.add(AO) */

        const pointLight = new THREE.PointLight(0xffffff, 1.3 )

        pointLight.position.y = 2
        pointLight.position.z = 2

        /* scene.add(pointLight) */

        const directionalLight = new THREE.DirectionalLight(0xffffff,1.3)

        directionalLight.position.set(5,5,5)
        
        scene.add(directionalLight)

        //Render de la escena

          const animate = () => {
            controls.update()
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
          }
          animate()
        

        //Limpiar escena

        return () => {
          currentMount.removeChild(renderer.domElement)
        }

    },[])

  return (
    <div className='contenedor3D'
    ref={mountRef}
    style={{width:'100%', height: '100vh'}}>
    </div>
  )
}

export default Scene