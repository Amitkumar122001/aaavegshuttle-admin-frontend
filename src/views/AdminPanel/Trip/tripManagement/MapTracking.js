import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { BackendUrl } from 'utils/config';
// const gogSecretApi = process.env.googleMapsApiKey;
// console.log(gogSecretApi);

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const vehicleIcon = {
  url: 'http://maps.google.com/mapfiles/ms/icons/bus.png'
};

const mapOptions = {
  styles: [
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#d6e2e6'
        }
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#cddbe0'
        }
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#7492a8'
        }
      ]
    },
    {
      featureType: 'administrative.neighborhood',
      elementType: 'labels.text.fill',
      stylers: [
        {
          lightness: 25
        }
      ]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#d6e2e6'
        }
      ]
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#cddbe0'
        }
      ]
    },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#dae6eb'
        }
      ]
    },
    {
      featureType: 'landscape.natural',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#7492a8'
        }
      ]
    },
    {
      featureType: 'landscape.natural.terrain',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#d6e2e6'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#588ca4'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'labels.icon',
      stylers: [
        {
          saturation: -100
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#cae7a8'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#bae6a1'
        }
      ]
    },
    {
      featureType: 'poi.sports_complex',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#c6e8b3'
        }
      ]
    },
    {
      featureType: 'poi.sports_complex',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#bae6a1'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#41626b'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [
        {
          saturation: -25
        },
        {
          lightness: 10
        },
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#f7fdff'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#beced4'
        }
      ]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#eef3f5'
        }
      ]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#cddbe0'
        }
      ]
    },
    {
      featureType: 'road.local',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#edf3f5'
        }
      ]
    },
    {
      featureType: 'road.local',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#cddbe0'
        }
      ]
    },
    {
      featureType: 'road.local',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'transit',
      elementType: 'labels.icon',
      stylers: [
        {
          saturation: -70
        }
      ]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#588ca4'
        }
      ]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#008cb5'
        }
      ]
    },
    {
      featureType: 'transit.station.airport',
      elementType: 'geometry.fill',
      stylers: [
        {
          saturation: -100
        },
        {
          lightness: -5
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#a6cbe3'
        }
      ]
    }
  ]
};

// const StopMarker = ({ position, stopName }) => {
//   console.log(position);
//   return (
//     <div
//       style={{
//         position: 'absolute',
//         top: position.y - 30, // Adjust position as needed
//         left: position.x - 70, // Adjust position as needed
//         backgroundColor: 'cream',
//         border: '1px solid black',
//         borderRadius: '5px',
//         padding: '5px'
//       }}
//     >
//       {stopName}
//     </div>
//   );
// };

export const MapTracking = ({ busId, tripId, tripDate, routeId }) => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [center, setCenter] = useState({});
  const [map, setMap] = useState(null);
  const [vehicleCoordinates, setVehicleCoordinates] = useState({});
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [busInfo, setBusInfo] = useState({});
  const [StopInfo, setStopInfo] = useState([]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAXVR7rD8GXKZ2HBhLn8qOQ2Jj_-mPfWSo',
    libraries
  });

  const fetchCoordinatesFromAPI = async () => {
    try {
      const response = await axios.post(`${BackendUrl}/app/v1/tripstatus/userTrack`, {
        busId: busId,
        routeId: routeId,
        tripId: tripId,
        tripDate: tripDate
      });
      setCenter({ lat: parseFloat(response.data.stopsData.stops[0].stopLat), lng: parseFloat(response.data.stopsData.stops[0].stopLong) });
      // console.log(response.data.stopsData.stops);
      setStopInfo(response.data.stopsData.stops);
      setBusInfo(response.data.busTrackingData);
      setVehicleCoordinates({
        lat: parseFloat(response.data.busTrackingData.latitude),
        lng: parseFloat(response.data.busTrackingData.longitude)
      });
      let newRouteCoordinates = [];
      for (let i = 0; i < response.data.stopsData.stops.length; i++) {
        let obj = response.data.stopsData.stops[i];
        // console.log(' lat ' + parseFloat(obj.stopLat) + ' lng ' + parseFloat(obj.stopLong));
        newRouteCoordinates.push({
          lat: parseFloat(obj.stopLat),
          lng: parseFloat(obj.stopLong),
          stopName: obj.stopName + `\n${obj.stopStatus == 0 ? 'ETA - ' + obj.eta : 'Stop Reach Time  -' + obj.stopReachTime}`
        });
      }
      setRouteCoordinates(newRouteCoordinates);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCoordinatesFromAPI();
    const timeout = setTimeout(() => {
      if (isLoaded) {
        const directionsServiceObject = new window.google.maps.DirectionsService();
        const directionsRendererObject = new window.google.maps.DirectionsRenderer({
          suppressMarkers: true // Suppress default markers
        });
        setDirectionsService(directionsServiceObject);
        setDirectionsRenderer(directionsRendererObject);
      }
    }, 3000);
    return () => clearTimeout(timeout);
  }, [isLoaded]);

  // Api call on every 10s
  useEffect(() => {
    setInterval(() => {
      fetchCoordinatesFromAPI();
    }, 10000);
  }, []);
  useEffect(() => {
    if (map && directionsService && directionsRenderer) {
      const waypoints = routeCoordinates.slice(1, -1).map((coord) => ({
        location: new window.google.maps.LatLng(coord.lat, coord.lng),
        stopover: true
      }));

      directionsService.route(
        {
          origin: new window.google.maps.LatLng(parseFloat(routeCoordinates[0].lat), parseFloat(routeCoordinates[0].lng)),
          destination: new window.google.maps.LatLng(
            routeCoordinates[routeCoordinates.length - 1].lat,
            routeCoordinates[routeCoordinates.length - 1].lng
          ),
          waypoints: waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (response, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(response);
          } else {
            console.error('Directions request failed:', status);
          }
        }
      );
      directionsRenderer.setMap(null); // Clear previous route
      directionsRenderer.setMap(map); // Set map for new route
    }
  }, [map, directionsService, directionsRenderer, routeCoordinates]);

  const onMapLoad = (map) => {
    console.log('map', map);
    // map.setCenter(center);
    map.setZoom(10);
    setMap(map);
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className="flex h-[100%] w-full max-md:flex-col overflow-y-scroll">
      {/* Map */}
      <div className="w-3/5 h-[100%] relative max-md:w-full max-md:h-96">
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 flex ">
          <div className="flex items-center justify-center bg-white p-2 rounded">
            <p className="flex  items-center  w-32 ">
              <span className="h-3 w-3 block bg-green-500"></span> Start Point
            </p>
            <p className="flex items-center  w-32 ">
              <span className="h-3 w-3 block bg-red-500"></span> End Point
            </p>
            <p className="flex  items-center  w-32 ">
              <span className="h-3 w-3 block bg-blue-500"></span> Stops point
            </p>
            <p className="flex  items-center  w-32 ">
              <span className="h-3 w-3 block bg-purple-500"></span> Reached
            </p>
            <p className="flex  items-center  w-32 ">
              <span className="h-3 w-3 block bg-yellow-500"></span> Unreached
            </p>
          </div>
        </div>
        {directionsService && directionsRenderer ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center}
            options={{
              mapTypeId: 'roadmap',
              disableDefaultUI: true,
              options: mapOptions
            }}
            onLoad={onMapLoad}
            // options={mapOptions}
          >
            {/* Render markers for each coordinate */}
            {routeCoordinates.map((coord, index, arr) => (
              <React.Fragment key={index}>
                <div className="w-fit h-20 bg-red-800">
                  <Marker
                    key={index}
                    position={coord}
                    icon={{
                      url:
                        index === 0
                          ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                          : index === arr.length - 1
                          ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                          : StopInfo[index].stopReachTime == 1
                          ? 'http://maps.google.com/mapfiles/ms/micons/purple-dot.png'
                          : StopInfo[index].stopReachTime == 0
                          ? 'http://maps.google.com/mapfiles/ms/micons/yellow-dot.png'
                          : 'http://maps.google.com/mapfiles/ms/micons/purple-dot.png'
                    }}
                    title={index === 0 ? 'Start Point' : index === arr.length - 1 ? 'End Point' : `Stop ${coord.stopName}`}
                  />
                  <div className="w-2 h-2 bg-red-400">sdfwsfxfcdsvfdgvsadasgvf</div>
                </div>

                {/* <StopMarker position={map.getProjection().fromLatLngToPoint(coord)} stopName={coord.stopName} /> */}
              </React.Fragment>
            ))}

            {/* Render vehicle marker - The vehicle lat lng will be dynamic and will come by a continuous api call  */}

            <Marker position={vehicleCoordinates} icon={vehicleIcon} />
          </GoogleMap>
        ) : (
          'Loading ... '
        )}
      </div>
      {/* Details */}
      <div className="w-2/5 h-full max-md:w-[100%] max-md:h-full flex flex-col p-2  gap-2">
        <div>
          <h1 className="text-xl font-semibold">Bus Details</h1>
          <div>
            <p>
              Bus Name : <span className="font-semibold text-md">{busInfo.name || 'Not Yet'}</span>
            </p>
            <p>
              Speed : <span className="font-semibold text-md">{Math.floor(busInfo.speed).toFixed(2) || 'Not Yet'} Km/hr</span>
            </p>
            <p>
              BatteryLevel : <span className="font-semibold text-md">{busInfo.batteryLevel || 'Not Yet'} %</span>
            </p>
          </div>
        </div>
        {/* Stop Details */}
        <div className="overflow-y-scroll grid grid-cols-1 gap-2">
          <h1 className="text-xl font-semibold">Stops Detail</h1>
          {StopInfo.map((item, i) => {
            return (
              <p key={i} className={`${item.stopStatus == 1 ? 'bg-green-500' : 'bg-yellow-500'} p-2`}>
                {item.stopName} {item.stopStatus == 0 ? <span>ETA : {item.eta}</span> : <span>ReachTime : {item.stopReachTime}</span>}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};
//
