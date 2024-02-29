import React, { useState } from 'react';
import { Button, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
const data = [
  {
    id: 1,
    name: 'Amit'
  },
  {
    id: 2,
    name: 'kumar'
  }
];
export const UpdateTrip = () => {
  const [busId, setBusId] = useState('');
  const [routeId, setRouteId] = useState('');
  const [tripStatus, setTripStatus] = useState('');
  const handleRoute = () => {
    toast.success('Trip updated SuccessFully');
    console.log({
      busId,
      routeId,
      tripStatus
    });
  };
  const handleClear = () => {
    setRouteId('');
    setBusId('');
    setTripStatus('');
  };
  return (
    <div>
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col gap-10 bg-white p-8 max-lg:p-4 max-lg:gap-5 rounded-xl">
        <div>
          <p className="text-3xl text-gray-600 text-center">Update Trip</p>
          <p className="border border-gray-300 mt-5"></p>
        </div>
        <div className="flex flex-col gap-6 px-20 py-10 max-lg:px-2 max-lg:py-5 max-lg:gap-5">
          <div>
            <FormControl fullWidth>
              <InputLabel id="Bus_id">Bus ID</InputLabel>
              <Select labelId="Bus_id" id="demo-sple-select" label="Bus ID" value={busId} onChange={(e) => setBusId(e.target.value)}>
                {data.map((item) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="Route_id">Route ID</InputLabel>
              <Select
                labelId="Route_id"
                id="demo-sple-select"
                label="Route ID"
                value={routeId}
                onChange={(e) => setRouteId(e.target.value)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="Route_id">Status</InputLabel>
              <Select
                labelId="Status"
                id="demo-sple-select"
                label="Status"
                value={tripStatus}
                onChange={(e) => setTripStatus(e.target.value)}
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div>
          <div className="flex gap-10 justify-around">
            <Button variant="contained" className="bg-blue-700" onClick={handleRoute}>
              Update Trip
            </Button>
            <Button variant="outlined" color="error" onClick={handleClear}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
