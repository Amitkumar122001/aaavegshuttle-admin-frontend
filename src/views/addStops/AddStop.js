import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { BackendUrl } from 'utils/config';
import { IconCirclePlus } from '@tabler/icons-react';
export const AddStop = () => {
  const [route, setRoute] = useState([]);
  const [stopForm, setStopForm] = useState({
    routeId: '',
    stopName: '',
    stopLatitude: '',
    stopLongitude: '',
    stopETA: '',
    stopDistance: ''
  });
  const [routeIdErr, setRouteIdErr] = useState(false);
  const [stopNameErr, setStopNameErr] = useState(false);
  const [stopLatitudeErr, setStopLatitudeErr] = useState(false);
  const [stopLongitudeErr, setStopLongitudeErr] = useState(false);
  const [stopETAErr, setStopETAErr] = useState(false);
  const [stopDistanceErr, setStopDistanceErr] = useState(false);
  useEffect(() => {
    axios
      .get(`${BackendUrl}/app/v1/route/getAllRoutes`)
      .then((res) => setRoute(res?.data?.result))
      .catch((e) => console.log('Route API error', e));
  }, []);
  // console.log(route);
  const handleStopETAInput = (e) => {
    const inputValue = e.target.value;
    // Use a regular expression to validate the input
    const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (regex.test(inputValue) || inputValue === '') {
      setStopForm({ ...stopForm, stopETA: inputValue });
    }
  };
  const clearRoute = () => {
    setStopForm({
      routeId: '',
      stopName: '',
      stopLatitude: '',
      stopLongitude: '',
      stopETA: '',
      stopDistance: ''
    });
  };
  const handleAddStop = () => {
    if (
      stopForm.routeId != '' &&
      stopForm.stopETA != '' &&
      stopForm.stopLatitude != '' &&
      stopForm.stopLongitude != '' &&
      stopETAErr.stopName != '' &&
      stopForm.stopDistance != ''
    ) {
      const body = {
        routeId: stopForm.routeId,
        stopName: stopForm.stopName,
        stopLat: stopForm.stopLatitude,
        stopLng: stopForm.stopLongitude,
        stopEta: stopForm.stopETA,
        stopDistanceFromStart: stopForm.stopDistance
      };
      console.log(body);
      axios
        .post(`${BackendUrl}/app/v1/stops/createstop`, body, { headers: {} })
        .then((res) => {
          console.log(res.data);
          toast.success(`${res.data.result}`);
          clearRoute();
        })
        .catch((e) => {
          console.log(e);
          toast.error('Error');
        });
      setStopLongitudeErr(false);
      setStopETAErr(false);
      setStopNameErr(false);
      setStopLatitudeErr(false); 
      setRouteIdErr(false);
    } else {
      stopForm.routeId == '' ? setRouteIdErr(true) : setRouteIdErr(false);
      stopForm.stopName == '' ? setStopNameErr(true) : setStopNameErr(false);
      stopForm.stopLatitude == '' ? setStopLatitudeErr(true) : setStopLatitudeErr(false);
      stopForm.stopLongitude == '' ? setStopLongitudeErr(true) : setStopLongitudeErr(false);
      stopForm.stopETA == '' ? setStopETAErr(true) : setStopETAErr(false);
      stopForm.stopDistance == '' ? setStopDistanceErr(true) : setStopDistanceErr(false);
    }
  };

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <div className=" flex flex-col gap-6 bg-white p-4 rounded-xl">
        {/* heading */}
        <div className="relative">
          <p className="text-3xl text-gray-600 text-center">Add Stop Details</p>
          <p className=" border border-gray-300 mt-5"></p>
          <p className="absolute top-2 right-2 max-md:right-0">
            <button>
              <IconCirclePlus />
            </button>
          </p>
        </div>
        <div>
          <div>
            {/* Stop Route */}
            <FormControl fullWidth>
              <InputLabel id="Route">Route</InputLabel>
              <Select
                labelId="Route"
                id="demo-sple-select"
                label="Route"
                value={stopForm.routeId}
                onChange={(e) => setStopForm({ ...stopForm, routeId: e.target.value })}
              >
                {route.map((item, i) => (
                  <MenuItem value={item.route_id} key={i}>
                    {item.route_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {routeIdErr && <p className="text-red-500 text-xs ml-2">select your route</p>}
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 max-lg:grid-cols-1 max-lg:gap-6 gap-8">
            <div>
              {/* Stop Name */}
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Stop Name"
                  variant="outlined"
                  disabled={stopForm.routeId == '' ? true : false}
                  value={stopForm.stopName}
                  onChange={(e) => setStopForm({ ...stopForm, stopName: e.target.value })}
                />
              </FormControl>
              {stopNameErr && <p className="text-red-500 text-xs ml-2">Enter your stop name</p>}
            </div>
            <div>
              {/* Stop Latitude */}
              <FormControl fullWidth>
                <TextField
                  type="number"
                  id="outlined-basi"
                  label="Stop Latitude"
                  variant="outlined"
                  value={stopForm.stopLatitude}
                  onChange={(e) => setStopForm({ ...stopForm, stopLatitude: e.target.value })}
                  disabled={stopForm.routeId == '' ? true : false}
                />
              </FormControl>
              {stopLatitudeErr && <p className="text-red-500 text-xs ml-2">Enter your stop latitude</p>}
            </div>
            <div>
              {/* Stop Longitude */}
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Stop Longitude"
                  type="text"
                  variant="outlined"
                  value={stopForm.stopLongitude}
                  onChange={(e) => setStopForm({ ...stopForm, stopLongitude: e.target.value })}
                  disabled={stopForm.routeId == '' ? true : false}
                />
              </FormControl>
              {stopLongitudeErr && <p className="text-red-500 text-xs ml-2">Enter your stop longitude</p>}
            </div>
            <div>
              <FormControl fullWidth>
                <TextField
                  type="time"
                  label="ETA"
                  variant="outlined"
                  value={stopForm.stopETA}
                  onChange={handleStopETAInput}
                  format="HH:mm:ss"
                  inputProps={{
                    step: 1
                  }}
                  disabled={stopForm.routeId == '' ? true : false}
                />
              </FormControl>
              {stopETAErr && <p className="text-red-500 text-xs ml-2">select your ETA</p>}
            </div>
            <div>
              <FormControl fullWidth>
                <TextField
                  type="number"
                  label="Stop Distance"
                  variant="outlined"
                  value={stopForm.stopDistance}
                  onChange={(e) => setStopForm({ ...stopForm, stopDistance: e.target.value })}
                  disabled={stopForm.routeId == '' ? true : false}
                />
              </FormControl>
              {stopDistanceErr && <p className="text-red-500 text-xs ml-2">Stop distance err</p>}
            </div>
          </div>
        </div>
        {/* button */}
        <div>
          <div className="flex justify-between">
            <Button variant="contained" className="bg-blue-700" onClick={() => handleAddStop()}>
              Add Stop
            </Button>
            <Button variant="outlined" color="error" onClick={() => clearRoute()}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
