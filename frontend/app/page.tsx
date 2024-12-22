'use client'
import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MapboxExample = () => {
  //Constants
  const images = ["_017MC_01FLR"]
  const homeCoord : [number, number] = [-80.54273214750569, 43.471054068640456]
  const imageCoords :  { [key: string]: [[number, number], [number, number], [number, number], [number, number]] } = {"_017MC_01FLR" : [[-80.54380379818434,43.47267734132285],[-80.54326904638356,43.47185045491588],[-80.54405495562503,43.47155847346985],[-80.54458556318968,43.472402900479494]]}
  //Refs
  const mapContainerRef  = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  
  useEffect(() => {
    if(mapContainerRef.current == null){
      return
    }
    
    //Create map
    mapboxgl.accessToken = 'pk.eyJ1IjoibjI1amlhbmciLCJhIjoiY200dm13OGwwMDRkYjJqcG83bnF3dWtycCJ9.qo_qnQ73tFjZTHwLoAjNRA'
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      maxZoom: 20,
      minZoom: 15.5,
      zoom: 15.5,
      center: homeCoord,
      style: 'mapbox://styles/n25jiang/cm4vz63tg006v01s2gj252vps',
      attributionControl: false
    })


    //Add markers and handlers
    images.forEach((img)=>{
      for(var i = 0; i < 4; i++){
        const marker = new mapboxgl.Marker({
          draggable: true
        })
          .setLngLat(imageCoords[img][i])
          .addTo(mapRef.current)

        const index = i;
        function onDragEnd() {
          const lngLat = marker.getLngLat()
          const updatedCoords = imageCoords[img]
          updatedCoords[index] = [lngLat.lng, lngLat.lat]
          //console.log(updatedCoords)
          mapRef.current.getSource(img).updateImage({
            url: `/${img}.png`,
            coordinates: updatedCoords
          });
        }
        marker.on('dragend', onDragEnd)
      }
    })
    
    //Add overlays
    mapRef.current.on('load', () => {
      images.forEach((img)=>{
        mapRef.current.addSource(img, {
          type: 'image',
          url: `/${img}.png`,
          coordinates: imageCoords[img]
        })
        mapRef.current.addLayer({
          id: `${img}-layer`,
          type: 'raster',
          source: img,
          paint: {
            'raster-fade-duration': 0
          }
        })
      })
    })

    

    //Cleanup
    return () => {
      mapRef.current.remove()
    }

  }, [])

  return <div id="map" ref={mapContainerRef} className='w-full h-screen'></div>
}

export default MapboxExample

