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
          saturation: -45
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

// const center = {
//   lat: routeCoordinates[0].lat,
//   lng: routeCoordinates[0].lng
// };
// http://localhost:3000/app/v1/tripstatus/userTrack
// {
//   "busId":1,
//   "routeId":2,
//   "tripId":7,
//   "tripDate":"2024-04-25"
// }

// const StopMarker = ({ position, stopName }) => {
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
  console.log(busId, tripId, tripDate, routeId);

  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [center, setCenter] = useState({});
  const [map, setMap] = useState(null);
  const [vehicleCoordinates, setVehicleCoordinates] = useState({});
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    // googleMapsApiKey: 'AIzaSyAXVR7rD8GXKZ2HBhLn8qOQ2Jj_-mPfWSo',
    libraries
  });

  const fetchCoordinatesFromAPI = async () => {
    try {
      const response = await axios.post(`${BackendUrl}/app/v1/tripstatus/userTrack`, {
        busId: 1,
        routeId: 2,
        tripId: 7,
        tripDate: '2024-04-29'
      });
      setCenter({ lat: parseFloat(response.data.stopsData.stops[0].stopLat), lng: parseFloat(response.data.stopsData.stops[0].stopLong) });
      // console.log('bus tracking');
      console.log(response.data);
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
    <div className="flex h-full w-full">
      {/* Map */}
      <div className="w-3/4 ">
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
              <>
                <Marker
                  key={index}
                  position={coord}
                  icon={{
                    url:
                      index === 0
                        ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                        : index === arr.length - 1
                        ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                        : 'http://maps.google.com/mapfiles/ms/micons/blue-dot.png'
                  }}
                  title={index === 0 ? 'Start Point' : index === arr.length - 1 ? 'End Point' : `Stop ${coord.stopName}`}
                />
                {/* <StopMarker position={map.getProjection().fromLatLngToPoint(coord)} stopName={coord.stopName} /> */}
              </>
            ))}

            {/* Render vehicle marker - The vehicle lat lng will be dynamic and will come by a continuous api call  */}

            <Marker position={vehicleCoordinates} icon={vehicleIcon} />
          </GoogleMap>
        ) : (
          'Loading ... '
        )}
      </div>
      {/* Details */}
      <div className="w-1/4 h-full bg-green-500">evkusgc</div>
    </div>
  );
};
