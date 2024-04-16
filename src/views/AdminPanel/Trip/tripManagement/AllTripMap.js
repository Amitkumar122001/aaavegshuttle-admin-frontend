import React from 'react';
import { Map, Marker, ZoomControl, Overlay } from 'pigeon-maps';
export const AllTripMap = () => {
  const positions = [
    { lat: 28.505479764150166, lng: 77.09513091231467 },
    { lat: 28.50473795237281, lng: 77.09480786850449 },
    { lat: 28.49704575931438, lng: 77.09129975769926 },
    { lat: 28.49526229199556, lng: 77.09299494442767 },
    { lat: 28.493753604435224, lng: 77.09216444742248 }
  ];

  const res = positions.map((item) => [item.lat, item.lng]);
  return (
    <div>
      <div>AllTripMap</div>
      <div className="">
        <Map height={'400px'} width={'310px'} defaultCenter={res[0]} defaultZoom={10}>
          <ZoomControl />
          <Overlay anchor={[50.879, 4.6997]} offset={[120, 79]}></Overlay>
          {res.map((item, i) => (
            <Marker key={i} width={50} anchor={item} />
          ))}
        </Map>
      </div>
    </div>
  );
};
