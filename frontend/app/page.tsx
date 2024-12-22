'use client'
import Map, {Source, Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Home() {
  return (
    <div className="flex h-screen w-full ">
      <Map
        mapboxAccessToken="pk.eyJ1IjoibjI1amlhbmciLCJhIjoiY200dm13OGwwMDRkYjJqcG83bnF3dWtycCJ9.qo_qnQ73tFjZTHwLoAjNRA"
        initialViewState={{
          latitude: 43.471054068640456,
          longitude: -80.54273214750569,
          zoom: 15.5
        }}
        
        mapStyle="mapbox://styles/n25jiang/cm4vz63tg006v01s2gj252vps"
        attributionControl={false}
      >
        <Marker longitude={-80.54390849514651} latitude={43.472702732652365} color="red" />
        <Marker longitude={-80.54331115845638} latitude={43.47191340742358} color="red" />
        <Marker longitude={-80.54403467054422} latitude={43.47157147919427} color="red" />
        <Marker longitude={-80.5446144385124} latitude={43.47240369435188} color="red" />
        <Source id="MC_01" type="image" url="/_017MC_01FLR.png" coordinates={[[-80.54390849514651, 43.472702732652365],[-80.54331115845638, 43.47191340742358],[-80.54403467054422, 43.47157147919427],[-80.5446144385124, 43.47240369435188]]}></Source>
      </Map>
    </div>
  );
}


