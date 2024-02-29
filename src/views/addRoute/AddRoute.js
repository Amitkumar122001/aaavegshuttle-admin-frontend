import React, { useState } from 'react';
import { TextField, Button, FormControl } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
export const AddRoute = () => {
  const [routeForm, setRouteForm] = useState({
    startpointname: '',
    startlat: '',
    startlng: '',
    endpointname: '',
    endlat: '',
    endlng: '',
    totalroutedistance: '',
    routestarttime: '00:00:00',
    routeendtime: '00:00:00',
    routeNo: '',
    fixedRate: '',
    baseRate: ''
  });

  const [startpointnameErr, setStartPointNameErr] = useState(false);
  const [startlatErr, setStartlatErr] = useState(false);
  const [startlngErr, setStartlngErr] = useState(false);
  const [routestarttimeErr, setRouteStartTimeErr] = useState(false);
  const [endpointnameErr, setEndPointNameErr] = useState(false);
  const [endlatErr, setEndlatErr] = useState(false);
  const [endlngErr, setEndlngErr] = useState(false);
  const [totalroutedistanceErr, setTotalRouteDistanceErr] = useState(false);
  const [routeendtimeErr, setRouteEndTimeErr] = useState(false);
  const [routeNumberErr, setRouteNumberErr] = useState(false);
  const [fixedRateErr, setFixedRateErr] = useState(false);
  const [baseRateErr, setBaseRateErr] = useState(false);
  const handleTimeInput = (e) => {
    const inputValue = e.target.value;
    const field = e.target.name;
    // Use a regular expression to validate the input
    const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (regex.test(inputValue) || inputValue === '') {
      setRouteForm({ ...routeForm, [field]: inputValue });
    }
  };

  const handleRoute = () => {
    if (
      routeForm.endlat != '' &&
      routeForm.endlng != '' &&
      routeForm.endpointname != '' &&
      routeForm.startpointname != '' &&
      routeForm.startlat != '' &&
      routeForm.startlng != '' &&
      routeForm.totalroutedistance != '' &&
      routeForm.routeendtime > routeForm.routestarttime &&
      routeForm.fixedRate != '' &&
      routeForm.baseRate != '' &&
      routeForm.routeNo != ''
    ) {
      const body = {
        startPointName: routeForm.startpointname,
        startLat: routeForm.startlat,
        startLng: routeForm.startlng,
        endStopName: routeForm.endpointname,
        endLat: routeForm.endlat,
        endLng: routeForm.endlng,
        totalDistance: routeForm.totalroutedistance,
        endTime: routeForm.routeendtime,
        startTime: routeForm.routestarttime,
        routeFixedRate: routeForm.fixedRate,
        routeBasePrice: routeForm.baseRate,
        routeNumber: routeForm.routeNo
      };
      // console.log(body)
      axios
        .post('http://192.168.1.230:3000/app/v1/route/createRoute', body, { headers: {} })
        .then((res) => {
          console.log(res.data);
          toast.success('Route Add Successfully');
        })
        .catch((e) => {
          console.log('Api Failed : ', e);
          toast.error('Error');
        });
      setRouteEndTimeErr(false);
      setRouteStartTimeErr(false);
      setStartPointNameErr(false);
      setStartlatErr(false);
      setStartlngErr(false);
      setEndPointNameErr(false);
      setEndlatErr(false);
      setEndlngErr(false);
      setTotalRouteDistanceErr(false);
      setBaseRateErr(false);
      setFixedRateErr(false);
      setRouteNumberErr(false);
    } else {
      // route time
      if (routeForm.routeendtime <= routeForm.routestarttime) {
        setRouteEndTimeErr(true);
        setRouteStartTimeErr(true);
      } else {
        setRouteEndTimeErr(false);
        setRouteStartTimeErr(false);
      }
      // start name
      routeForm.startpointname == '' ? setStartPointNameErr(true) : setStartPointNameErr(false);
      // start latitude
      routeForm.startlat == '' ? setStartlatErr(true) : setStartlatErr(false);
      // start longitude
      routeForm.startlng == '' ? setStartlngErr(true) : setStartlngErr(false);
      //end name
      routeForm.endpointname == '' ? setEndPointNameErr(true) : setEndPointNameErr(false);
      // end latitude
      routeForm.endlat == '' ? setEndlatErr(true) : setEndlatErr(false);
      // end longitude
      routeForm.endlng == '' ? setEndlngErr(true) : setEndlngErr(false);
      // Total route Distance
      routeForm.totalroutedistance == '' ? setTotalRouteDistanceErr(true) : setTotalRouteDistanceErr(false);
      // fixed rate
      routeForm.fixedRate == '' ? setFixedRateErr(true) : setFixedRateErr(false);
      //base rate
      routeForm.baseRate == '' ? setBaseRateErr(true) : setBaseRateErr(false);
      //route number
      routeForm.routeNo == '' ? setRouteNumberErr(true) : setRouteNumberErr(false);
    }
  };
  const handleClear = () => {
    console.log('error');
  };
  return (
    <div>
      <div>
        <Toaster />
      </div>
      <div className=" flex flex-col gap-10 bg-white p-6 max-lg:p-4 max-lg:gap-5 rounded-xl">
        <div>
          <p className="text-3xl text-gray-600 text-center">Route Details</p>
          <p className=" border border-gray-300 mt-5"></p>
        </div>
        <div className=" grid grid-cols-2 max-md:grid-cols-1 gap-10 px-20 py-0 max-lg:px-2 max-lg:py-5 max-lg:gap-5">
          <div className="grid-1">
            <FormControl fullWidth>
              <TextField
                type="number"
                label="Route Number"
                id="oulined-basic"
                variant="outlined"
                value={routeForm.routeNo}
                onChange={(e) => setRouteForm({ ...routeForm, routeNo: e.target.value })}
              />
            </FormControl>
            {routeNumberErr && <p className="text-red-500 text-xs ml-2">Total Route distance Error</p>}
          </div>
          <div>
            <FormControl fullWidth>
              <TextField
                type="number"
                label="Total Distance"
                id="oulined-basic"
                variant="outlined"
                value={routeForm.totalroutedistance}
                onChange={(e) => setRouteForm({ ...routeForm, totalroutedistance: e.target.value })}
              />
            </FormControl>
            {totalroutedistanceErr && <p className="text-red-500 text-xs ml-2">Total Route distance Error</p>}
          </div>
          <div>
            <FormControl fullWidth>
              <TextField
                type="text"
                id="outlined-basi"
                label="Start Point Name"
                variant="outlined"
                value={routeForm.startpointname}
                onChange={(e) => setRouteForm({ ...routeForm, startpointname: e.target.value })}
                required={true}
              />
            </FormControl>
            {startpointnameErr && <p className="text-red-500 text-xs ml-2">Start Point Name Error</p>}
          </div>
          <div>
            <FormControl fullWidth>
              <TextField
                type="text"
                id="outlined-bic"
                label="End Point Name"
                variant="outlined"
                value={routeForm.endpointname}
                onChange={(e) => setRouteForm({ ...routeForm, endpointname: e.target.value })}
              />
            </FormControl>
            {endpointnameErr && <p className="text-red-500 text-xs ml-2">end Point</p>}
          </div>
          <div>
            <FormControl fullWidth>
              <TextField
                type="number"
                id="ouined-basic"
                label="Start latitude"
                variant="outlined"
                value={routeForm.startlat}
                onChange={(e) => setRouteForm({ ...routeForm, startlat: e.target.value })}
              />
            </FormControl>
            {startlatErr && <p className="text-red-500 text-xs ml-2">Start Latitude Point</p>}
          </div>
          <div>
            <FormControl fullWidth>
              <TextField
                type="number"
                id="outned-basic"
                label="Start longitude"
                variant="outlined"
                value={routeForm.startlng}
                onChange={(e) => setRouteForm({ ...routeForm, startlng: e.target.value })}
              />
            </FormControl>
            {startlngErr && <p className="text-red-500 text-xs ml-2">Start longitude Point</p>}
          </div>
          <div>
            <FormControl fullWidth>
              <TextField
                type="number"
                id="outlid-basic"
                label="End Latitude"
                variant="outlined"
                value={routeForm.endlat}
                onChange={(e) => setRouteForm({ ...routeForm, endlat: e.target.value })}
              />
            </FormControl>
            {endlatErr && <p className="text-red-500 text-xs ml-2">end latitude Point</p>}
          </div>
          <div>
            <FormControl fullWidth>
              <TextField
                type="number"
                id="outlind-basic"
                label="End Longitude"
                variant="outlined"
                value={routeForm.endlng}
                onChange={(e) => setRouteForm({ ...routeForm, endlng: e.target.value })}
              />
            </FormControl>
            {endlngErr && <p className="text-red-500 text-xs ml-2">end longitude Point</p>}
          </div>
          <div>
            <FormControl fullWidth>
              <TextField
                type="time"
                label="Route Start Time"
                variant="outlined"
                name="routestarttime"
                value={routeForm.routestarttime}
                onChange={handleTimeInput}
                format="HH:mm:ss"
                inputProps={{
                  step: 1
                }}
              />
            </FormControl>
            {routestarttimeErr && <p className="text-red-500 text-xs ml-2">route start time Err </p>}
          </div>
          <div>
            <FormControl fullWidth>
              <TextField
                type="time"
                id="outlined-asic"
                label="Route End time"
                variant="outlined"
                value={routeForm.routeendtime}
                format="HH:mm:ss"
                onChange={handleTimeInput}
                name="routeendtime"
                inputProps={{
                  step: 1
                }}
              />
            </FormControl>
            {routeendtimeErr && <p className="text-red-500 text-xs ml-2">route End time err</p>}
          </div>

          <div>
            <FormControl fullWidth>
              <TextField
                type="number"
                label="Fixed Rate"
                id="oulined-basic"
                variant="outlined"
                value={routeForm.fixedRate}
                onChange={(e) => setRouteForm({ ...routeForm, fixedRate: e.target.value })}
              />
            </FormControl>
            {fixedRateErr && <p className="text-red-500 text-xs ml-2">Fixed Rate Error</p>}
          </div>
          <div>
            <FormControl fullWidth>
              <TextField
                type="number"
                label="Base Rate"
                id="oulined-basic"
                variant="outlined"
                value={routeForm.baseRate}
                onChange={(e) => setRouteForm({ ...routeForm, baseRate: e.target.value })}
              />
            </FormControl>
            {baseRateErr && <p className="text-red-500 text-xs ml-2">Base Rate Error</p>}
          </div>
        </div>

        <div>
          <div className="flex gap-10 justify-around">
            <Button variant="contained" className="bg-blue-700" onClick={handleRoute}>
              Add Route
            </Button>{' '}
            <Button variant="outlined" color="error" onClick={handleClear}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
