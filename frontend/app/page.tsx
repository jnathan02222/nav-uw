'use client'
import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MapboxExample = () => {
  //Constants
  const images = ["_017MC_01FLR"]
  const homeCoord : [number, number] = [-80.54273214750569, 43.471054068640456]

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
      const marker = new mapboxgl.Marker({
        draggable: true
      })
        .setLngLat(homeCoord)
        .addTo(mapRef.current)

      function onDragEnd() {
        const lngLat = marker.getLngLat()
        console.log(lngLat)
        mapRef.current.getSource(img).updateImage({
          coordinates: [[lngLat.lng,lngLat.lat],[-80.54326904638356,43.47185045491588],[-80.54405495562503,43.47155847346985],[-80.54458556318968,43.472402900479494]]
        });
      }
      marker.on('dragend', onDragEnd)
    })
    
    //Add overlays
    mapRef.current.on('load', () => {
      images.forEach((img)=>{
        mapRef.current.addSource(img, {
          type: 'image',
          url: `/${img}.png`,
          coordinates: [homeCoord,[-80.54326904638356,43.47185045491588],[-80.54405495562503,43.47155847346985],[-80.54458556318968,43.472402900479494]]
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

