import {useRef, useEffect} from 'react'
import {mountScene,cleanUpScene} from './Script';

const Scene = () => {

    const mountRef = useRef(null);

    useEffect(() => {
       mountScene(mountRef)

      //Limpiar escena

    return () => {
     
    //  currentMount.removeChild(renderer.domElement)
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