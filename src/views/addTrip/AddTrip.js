import React, { useState, useEffect } from 'react';
import { Button, FormControl, Select, InputLabel, MenuItem, TextField } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { BackendUrl } from 'utils/config';
export const AddTrip = () => {
  const [addTripForm, setAddTripForm] = useState({
    routeId: '',
    busId: '',
    startTime: '',
    endTime: ''
  });
  // running Days Array
  const [running, setRunning] = useState([]);
  // Bus Array From API
  const [routes, setRoutes] = useState([]);
  // Route Array from API
  const [buses, setBuses] = useState([]);
  useEffect(() => {
    axios
      .get(`${BackendUrl}/app/v1/route/getAllRoutes`)
      .then((res) => setRoutes(res?.data?.result))
      .catch((e) => console.log(e));
    axios
      .get(`${BackendUrl}/app/v1/bus/getAllBuses`)
      .then((res) => setBuses(res?.data?.buses))
      .catch((e) => console.log(e));
  }, []);

  const [dayDis, setDayDis] = useState({
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    fullweek: false,
    weekday: false,
    selectDay: false,
    buttonDisable: false
  });
  // error field
  const [routeIdErr, setRouteIdErr] = useState(false);
  const [busIdErr, setBusIdErr] = useState(false);
  const [startTimeErr, setStartTimeErr] = useState(false);
  const [endTimeErr, setEndTimeErr] = useState(false);
  const [runningErr, setRunningErr] = useState(false);
  // select day button True/false
  const handleSelectButton = () => {
    setDayDis({ ...dayDis, buttonDisable: true });
    setRunning([]);
  };
  // select day and disable button using object state
  const handleSelectedDays = (day, value) => {
    setRunning([...running, value]);
    setDayDis({ ...dayDis, [day]: true });
  };
  // Clear selected days
  const clearField = () => {
    setDayDis({
      ...dayDis,
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      fullweek: false,
      weekday: false,
      selectDay: false,
      buttonDisable: false
    });
    setRunning([]);
  };
  const handleFullWeek = () => {
    setRunning(['0', '1', '2', '3', '4', '5', '6']);
    setDayDis({ ...dayDis, fullweek: true, weekday: false });
  };

  const handleWeekDay = () => {
    setRunning(['1', '2', '3', '4', '5']);
    setDayDis({ ...dayDis, weekday: true, fullweek: false });
  };

  const handleStartTimeInput = (e) => {
    const inputValue = e.target.value;
    // Use a regular expression to validate the input
    const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (regex.test(inputValue) || inputValue === '') {
      setAddTripForm({ ...addTripForm, startTime: inputValue });
    }
  };
  const handleEndTimeInput = (e) => {
    const inputValue = e.target.value;
    // Use a regular expression to validate the input
    const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (regex.test(inputValue) || inputValue === '') {
      setAddTripForm({ ...addTripForm, endTime: inputValue });
    }
  };
  const handleAddTrip = () => {
    if (addTripForm.busId != '' && addTripForm.startTime < addTripForm.endTime && addTripForm.routeId != 0 && running.length != 0) {
      const body = {
        routeId: addTripForm.routeId,
        busId: addTripForm.busId,
        startTime: addTripForm.startTime,
        endTime: addTripForm.endTime,
        runningDays: JSON.stringify(running)
      };

      axios
        .post('https://4c82-125-19-80-210.ngrok-free.app/app/v1/trip/addtrip', body, { headers: {} })
        .then((res) => {
          console.log(res);
          toast.success('Trip Added SuccessFully');
        })
        .catch((e) => {
          console.log('Api Error ', e);
          toast.error('Error');
        });
      setBusIdErr(false);
      setEndTimeErr(false);
      setStartTimeErr(false);
      setRouteIdErr(false);
    } else {
      if (addTripForm.endTime <= addTripForm.startTime) {
        setStartTimeErr(true);
        setEndTimeErr(true);
      } else {
        setStartTimeErr(false);
        setEndTimeErr(false);
      }
      addTripForm.busId == '' ? setBusIdErr(true) : setBusIdErr(false);
      addTripForm.routeId == '' ? setRouteIdErr(true) : setRouteIdErr(false);
      running.length == 0 ? setRunningErr(true) : setRunningErr(false);
    }
  };
  const clearTrip = () => {
    setAddTripForm({
      routeId: '',
      busId: '',
      startTime: '',
      endTime: ''
    });
    setRunning([]);
  };
  return (
    <div>
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col gap-5 bg-white p-8 max-lg:p-4 max-lg:gap-5 rounded-xl">
        <div>
          <p className="text-3xl text-gray-600 text-center">Add Trip</p>
          <p className="border border-gray-300 mt-5"></p>
        </div>
        <div className="flex flex-col gap-6 px-20 py-10 max-lg:px-2 max-lg:py-5 max-lg:gap-5">
          <div>
            <FormControl fullWidth>
              <InputLabel id="Route">Route</InputLabel>
              <Select
                labelId="Route"
                id="demo-sple-select"
                label="Route"
                value={addTripForm.routeId}
                onChange={(e) => setAddTripForm({ ...addTripForm, routeId: e.target.value })}
              >
                {routes.map((item, i) => (
                  <MenuItem value={item.route_id} key={i}>
                    {item.route_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {routeIdErr && <p className="ml-2 text-red-500 text-xs">Select your Route</p>}
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="Bus">Bus</InputLabel>
              <Select
                labelId="Bus"
                id="demo-sple-select"
                label="Bus"
                value={addTripForm.busId}
                onChange={(e) => setAddTripForm({ ...addTripForm, busId: e.target.value })}
              >
                {buses.map((item, i) => (
                  <MenuItem value={item.bus_id} key={i}>
                    {item.bus_number}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {busIdErr && <p className="ml-2 text-red-500 text-xs">Select your Bus</p>}
          </div>
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
            <div>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Start Time"
                  variant="filled"
                  type="time"
                  value={addTripForm.startTime}
                  onChange={handleStartTimeInput}
                  format="HH:mm:ss"
                  inputProps={{
                    step: 1
                  }}
                />
              </FormControl>
              {startTimeErr && <p className="ml-2 text-red-500 text-xs">Enter Start Time </p>}
            </div>
            <div>
              <FormControl fullWidth>
                <TextField
                  id="outlined-ba"
                  label="End Time"
                  variant="filled"
                  type="time"
                  value={addTripForm.endTime}
                  onChange={handleEndTimeInput}
                  format="HH:mm:ss"
                  inputProps={{
                    step: 1
                  }}
                />
              </FormControl>
              {endTimeErr && <p className="ml-2 text-red-500 text-xs">Enter End time</p>}
            </div>
          </div>
          <div>
            <div>
              <p className="text-xl text-gray-600 ">Select Running Days</p>
              <p className="border border-gray-300 my-5"></p>
            </div>
            <div className="flex gap-10">
              {!dayDis.buttonDisable ? (
                <>
                  <div>
                    {!dayDis.fullweek ? (
                      <Button variant="contained" className={'bg-blue-700'} onClick={handleFullWeek}>
                        Full Weeks
                      </Button>
                    ) : (
                      <Button variant="contained" className={'bg-green-700'} onClick={clearField}>
                        Full Weeks
                      </Button>
                    )}
                  </div>
                  <div>
                    {!dayDis.weekday ? (
                      <Button variant="contained" className={'bg-blue-700'} onClick={handleWeekDay}>
                        Week Days
                      </Button>
                    ) : (
                      <Button variant="contained" className={'bg-green-700'} onClick={clearField}>
                        Week Days
                      </Button>
                    )}
                  </div>
                  <div>
                    <Button variant="contained" className="bg-blue-700" onClick={() => handleSelectButton()}>
                      Select Days
                    </Button>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-8 justify-center items-center w-full gap-3 max-md:grid-cols-4 max-sm:grid-cols-2">
                  <Button
                    onClick={() => handleSelectedDays('sunday', '0')}
                    disabled={dayDis.sunday}
                    variant="contained"
                    className="bg-blue-500"
                  >
                    Sunday
                  </Button>
                  <Button
                    onClick={() => handleSelectedDays('monday', '1')}
                    disabled={dayDis.monday}
                    variant="contained"
                    className="bg-blue-500"
                  >
                    Monday
                  </Button>
                  <Button
                    onClick={() => handleSelectedDays('tuesday', '2')}
                    disabled={dayDis.tuesday}
                    variant="contained"
                    className="bg-blue-500"
                  >
                    Tuesday
                  </Button>
                  <Button
                    onClick={() => handleSelectedDays('wednesday', '3')}
                    disabled={dayDis.wednesday}
                    variant="contained"
                    className="bg-blue-500"
                  >
                    Wednesday
                  </Button>
                  <Button
                    onClick={() => handleSelectedDays('thursday', '4')}
                    disabled={dayDis.thursday}
                    variant="contained"
                    className="bg-blue-500"
                  >
                    thursday
                  </Button>
                  <Button
                    onClick={() => handleSelectedDays('friday', '5')}
                    disabled={dayDis.friday}
                    variant="contained"
                    className="bg-blue-500"
                  >
                    Friday
                  </Button>
                  <Button
                    onClick={() => handleSelectedDays('saturday', '6')}
                    disabled={dayDis.saturday}
                    variant="contained"
                    className="bg-blue-500"
                  >
                    Saturday
                  </Button>
                  <Button onClick={() => clearField()} variant="outlined" color="error">
                    Clear
                  </Button>
                </div>
              )}
            </div>
            {runningErr && <p className="ml-2 mt-2 text-sm text-red-500">Select Days</p>}
          </div>
        </div>
        <div>
          <div className="flex gap-10 justify-around">
            <Button variant="contained" className="bg-blue-700" onClick={() => handleAddTrip()}>
              Add Trip
            </Button>
            <Button variant="outlined" color="error" onClick={() => clearTrip()}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
