import React, { useState, useEffect } from 'react';
import { Select, FormControl, MenuItem, InputLabel, Box, TextField, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { IconPencil, IconX } from '@tabler/icons-react'; // IconArrowDownSquare
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { BackendUrl } from 'utils/config';
// time picker
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

import { timePickerMUI } from 'utils/TimeDate';
export const AllStop = () => {
  const [route, setRoute] = useState([]);
  // console.log(route)
  const [searchStopRoute, setSearchStopRoute] = useState('');
  const [allStop, setAllStop] = useState([]);
  // console.log(allStop);
  const [updateObj, setUpdateObj] = useState({});
  const [stopNameErr, setStopNameErr] = useState(false);
  const [stoplngErr, setStoplngErr] = useState(false);
  const [stoplatErr, setStoplatErr] = useState(false);
  const [stopETAErr, setStopETAErr] = useState(false);
  const [stopForm, setStopForm] = useState({
    prevStopId: '',
    stopName: '',
    stopLatitude: '',
    stopLongitude: '',
    stopETA: '',
    stopDistance: ''
  });
  const [addStopBool, setAddStopBool] = useState(false);
  useEffect(() => {
    axios
      .get(`${BackendUrl}/app/v1/route/getAllRoutes`)
      .then((res) => {
        setRoute(res?.data?.result);
      })
      .catch((err) => console.log('API error', err));
  }, []);
  useEffect(() => {
    if (searchStopRoute) {
      axios
        .post(`${BackendUrl}/app/v1/stops/getSpecificRouteStops`, { routeId: searchStopRoute })
        .then((res) => {
          setAllStop([...res.data.result]);
        })
        .catch((err) => console.log('API error ', err));
    }
  }, [searchStopRoute]);
  // console.log(allStop);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (value) => {
    // console.log(value);
    setOpen(true);
    setUpdateObj(value);
  };
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2
  };
  const handleStopETAInput = (e) => {
    const inputValue = e.target.value;
    // Use a regular expression to validate the input
    const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (regex.test(inputValue) || inputValue === '') {
      setUpdateObj({ ...updateObj, stopEta: inputValue });
    }
  };

  const updateStop = () => {
    if (updateObj.stopname != '' && updateObj.stoplat != '' && updateObj.stoplng != '' && updateObj.stopETA != '') {
      const body = {
        stopName: updateObj.stopName,
        stopLat: updateObj.stopLat,
        stopLng: updateObj.stopLng,
        stopEta: updateObj.stopEta,
        stopId: updateObj.stopsId,
        routeId: searchStopRoute,
        activeStatus: true
      };
      console.log(body);
      axios
        .patch(`${BackendUrl}/app/v1/stops/editStop`, body)
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.result);
          handleClose();
        })
        .catch((err) => console.log('API error ', err));
    } else {
      updateObj.stopname == '' ? setStopNameErr(true) : setStopNameErr(false);
      updateObj.stoplat == '' ? setStoplatErr(true) : setStoplatErr(false);
      updateObj.stoplng == '' ? setStoplngErr(true) : setStoplngErr(false);
      updateObj.stopETA == '' ? setStopETAErr(true) : setStopETAErr(false);
    }
  };

  const handleStopETATime = (e) => {
    setStopForm({ ...stopForm, stopETA: timePickerMUI(e) });
  };
  const addStopInBTW = () => {
    if (
      stopForm.prevStopId != '' &&
      stopForm.stopName != '' &&
      stopForm.stopLatitude != '' &&
      stopForm.stopLongitude != '' &&
      stopForm.stopETA != '' &&
      stopForm.stopDistance != ''
    ) {
      const body = {
        StopIdIn: stopForm.prevStopId,
        routeId: searchStopRoute,
        stopName: stopForm.stopName,
        stopLat: stopForm.stopLatitude,
        stopLng: stopForm.stopLongitude,
        stopEta: stopForm.stopETA,
        stopDistanceFromStart: stopForm.stopDistance
      };
      console.log(body);
      axios
        .post(`https://048d-125-19-80-210.ngrok-free.app/app/v1/stops/addStopsBetweenExistingStops`, body)
        .then((res) => {
          console.log(res.data);
          toast.success('Add stop in between');
        })
        .catch((err) => console.log(err));
    } else {
      // console.log(stopForm);
      window.alert('Some field are Missing...');
    }
  };
  return (
    <>
      <div>
        <div>
          <Toaster />
        </div>
        <div className=" flex flex-col gap-10 bg-white p-4 max-lg:gap-5 rounded-xl">
          <div>
            <p className="text-3xl max-lg:text-2xl text-gray-600 text-center">All Stop Details</p>
            <p className=" border border-gray-300 mt-2"></p>
          </div>
          {/* dropdown */}
          <div>
            <div>
              {/* Route ID */}
              <FormControl fullWidth>
                <InputLabel id="Route">Route</InputLabel>
                <Select
                  labelId="Route"
                  id="demo-sple-select"
                  label="Route"
                  value={searchStopRoute}
                  onChange={(e) => setSearchStopRoute(e.target.value)}
                >
                  {route.map((item, i) => (
                    <MenuItem value={item.route_id} key={i}>
                      {item.route_name}
                    </MenuItem>
                  ))}
                  {route.length == 0 && <MenuItem value="">not Route</MenuItem>}
                </Select>
              </FormControl>
            </div>
            {searchStopRoute != '' && (
              <div>
                <Button
                  className={` ${addStopBool ? 'bg-red-700 hover:bg-red-500' : 'bg-blue-700 hover:bg-blue-500'} mt-2 text-white`}
                  onClick={() => setAddStopBool(!addStopBool)}
                >
                  {addStopBool ? 'Back' : 'Add Stop In Between'}
                </Button>
              </div>
            )}
          </div>
          {addStopBool ? (
            <div>
              <div>
                <div>
                  {/* Stop Route */}
                  <FormControl fullWidth>
                    <InputLabel id="Allstop">After which stop you want to add?</InputLabel>
                    <Select
                      labelId="Allstop"
                      id="demo-sple-select"
                      label="After which stop you want to add?"
                      value={stopForm.prevStopId}
                      onChange={(e) => setStopForm({ ...stopForm, prevStopId: e.target.value })}
                    >
                      {allStop.map((item, i) => (
                        <MenuItem value={i == 0 ? item.stopId : item.stopsId} key={i} disabled={item.stopsId == -2 ? true : false}>
                          {item.stopName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              {/* form */}
              <div className="my-4">
                <div className="grid grid-cols-2 max-lg:grid-cols-1  gap-4">
                  <div>
                    {/* Stop Name */}
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-basic"
                        type="text"
                        label="Stop Name"
                        variant="outlined"
                        disabled={stopForm.prevStopId == '' ? true : false}
                        value={stopForm.stopName}
                        onChange={(e) => setStopForm({ ...stopForm, stopName: e.target.value })}
                      />
                    </FormControl>
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
                        disabled={stopForm.prevStopId == '' ? true : false}
                      />
                    </FormControl>
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
                        disabled={stopForm.prevStopId == '' ? true : false}
                      />
                    </FormControl>
                  </div>
                  <div className="flex items-center w-full">
                    <InputLabel className="w-24">Stop ETA :</InputLabel>
                    <FormControl className="w-full">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileTimePicker
                          defaultValue={dayjs('2022-04-17T00:00')}
                          ampm={false}
                          onChange={(e) => handleStopETATime(e)}
                          className="w-full "
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        label="Stop Distance(km)"
                        variant="outlined"
                        value={stopForm.stopDistance}
                        onChange={(e) => setStopForm({ ...stopForm, stopDistance: e.target.value })}
                        disabled={stopForm.prevStopId == '' ? true : false}
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
              {/* button */}
              <div>
                <div className="flex justify-between">
                  <Button variant="contained" className="bg-blue-700" onClick={addStopInBTW}>
                    Add Stop
                  </Button>
                  <Button variant="outlined" color="error">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className=" flex flex-1 flex-col gap-4 items-center w-full">
              {allStop.length > 0 && (
                <div className="w-1/2 max-lg:w-2/3 max-md:w-full flex-1">
                  <p className="px-20 py-6 max-md:py-3 bg-green-600 text-white rounded-t-full text-xl text-center">Start</p>
                </div>
              )}
              {allStop?.map((item, i) => (
                <div className="w-1/2 max-lg:w-2/3 max-md:w-full flex-1" key={i}>
                  <div className={` flex flex-col rounded-xl p-4 gap-4 relative bg-gray-100 `}>
                    <span className="absolute top-3 left-2 max-lg:h-1 max-lg:w-1 h-2 w-2 inline-block rounded-full bg-green-500"></span>{' '}
                    <div className="flex justify-between">
                      <p className="text-2xl max-lg:text-xl text-red-700 font-semibold">{item.stopName}</p>
                      <button onClick={() => handleOpen(item)} className="hover:bg-gray-200 rounded-full p-2">
                        <IconPencil className="text-blue-600" />
                      </button>
                    </div>
                    <div className="flex text-lg max-lg:text-sm gap-20 max-lg:gap-5 max-md:flex-col">
                      <div>
                        <p>Stop latitude</p>
                        <p className="font-semibold">{String(item.stopLat).slice(0, 20)}</p>
                      </div>{' '}
                      <div>
                        <p>Stop longitude</p>
                        <p className="font-semibold">{String(item.stopLng).slice(0, 18)}</p>
                      </div>
                    </div>
                    <div className="text-lg max-lg:text-sm">
                      <p>
                        ETA : <span className="font-semibold">{item.stopEta}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center mt-2 -mb-2">
                    <div className=" flex flex-col items-center justify-center w-[10px] ">
                      <div className="flex flex-col gap-1 max-lg:gap-0.5">
                        <div className="inline-block bg-gray-500 h-1 w-1 rounded-full"></div>
                        <div className="inline-block bg-gray-500 h-1 w-1 rounded-full"></div>
                        <div className="inline-block bg-gray-500 h-1 w-1 rounded-full"></div>
                        <div className="inline-block bg-gray-500 h-1 w-1 rounded-full"></div>
                      </div>
                      <div className="flex gap-3 max-lg:gap-2 -mt-2 max-lg:-mt-1">
                        <div className="inline-block bg-gray-500 w-0.5 h-5 max-lg:h-4 transform -rotate-45"></div>
                        <div className=" inline-block bg-gray-500 w-0.5 h-5 max-lg:h-4 transform rotate-45"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {allStop.length > 0 && (
                <div className="w-1/2 max-lg:w-2/3 max-md:w-full flex-1">
                  <p className="px-20 py-6 max-md:py-3 bg-red-700 text-white rounded-b-full text-xl text-center">End</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} className="w-1/2 max-lg:w-2/3 max-md:w-5/6 rounded-xl">
          <div className="  max-lg:w-full flex flex-col gap-1 bg-white my-4 p-4 ">
            <div>
              <Toaster />
            </div>
            <div className="flex justify-between pb-5">
              <p className="text-xl font-bold">Update Stop</p>
              <button onClick={handleClose} className="">
                <IconX />
              </button>
            </div>
            <div>
              <div className=" flex flex-col gap-6 bg-white rounded-xl">
                {/* heading */}

                <div>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      {/* Stop Name */}
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-basic"
                          type="text"
                          label="RouteId"
                          variant="outlined"
                          value={searchStopRoute}
                          disabled={true}
                        />
                      </FormControl>
                    </div>
                    <div>
                      {/* Stop Name */}
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-basic"
                          type="text"
                          label="Stop Name"
                          variant="outlined"
                          value={updateObj.stopName}
                          onChange={(e) => setUpdateObj({ ...updateObj, stopName: e.target.value })}
                        />
                      </FormControl>
                      {stopNameErr && <p className="text-xs text-red-500 ml-2">Stop name error</p>}
                    </div>
                    <div>
                      {/* Stop Latitude */}
                      <FormControl fullWidth>
                        <TextField
                          type="number"
                          id="outlined-basi"
                          label="Stop Latitude"
                          variant="outlined"
                          value={updateObj.stopLat}
                          onChange={(e) => setUpdateObj({ ...updateObj, stopLat: e.target.value })}
                        />
                      </FormControl>
                      {stoplatErr && <p className="text-xs text-red-500 ml-2">Stop latitude error</p>}
                    </div>
                    <div>
                      {/* Stop Longitude */}
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-basic"
                          label="Stop Longitude"
                          type="text"
                          variant="outlined"
                          value={updateObj.stopLng}
                          onChange={(e) => setUpdateObj({ ...updateObj, stopLng: e.target.value })}
                        />
                      </FormControl>
                      {stoplngErr && <p className="text-xs text-red-500 ml-2">Stop longitude error</p>}
                    </div>
                    <div>
                      <FormControl fullWidth>
                        <TextField
                          value={updateObj.stopEta}
                          onChange={handleStopETAInput}
                          type="time"
                          label=""
                          variant="outlined"
                          format="HH:mm:ss"
                          inputProps={{
                            step: 1
                          }}
                        />
                      </FormControl>
                      {stopETAErr && <p className="text-xs text-red-500 ml-2">Stop ETA error</p>}
                    </div>
                  </div>
                  {/* <div className="mt-2 flex gap-2 items-center">
                    <input type="checkbox" id="stopupdate" />
                    <label htmlFor="stopupdate">Active status</label>
                  </div> */}
                </div>
                {/* button */}
                <div>
                  <div className="flex justify-center">
                    <Button variant="contained" className="bg-blue-700" onClick={updateStop}>
                      Update Stop
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};
