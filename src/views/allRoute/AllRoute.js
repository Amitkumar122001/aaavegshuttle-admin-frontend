import React from 'react';
import { useState, useEffect } from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  Button,
  Modal,
  Box,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { IconX } from '@tabler/icons-react';
import { BackendUrl } from 'utils/config';

const columns = [
  { id: 'route_no', label: 'Route No', align: 'center', minWidth: 100 },
  { id: 'start_point', label: 'Start Point', align: 'center', minWidth: 200 },
  { id: 'start_time', label: 'Start Time', align: 'center', minWidth: 200 },
  { id: 'end_point', label: 'End Point', align: 'center', minWidth: 200 },
  { id: 'end_time', label: 'End Point', align: 'center', minWidth: 200 },
  { id: 'perkmrate', label: 'Rate/Km', align: 'center', minWidth: 100 },
  { id: 'fixed_rate', label: 'Fixed Rate', align: 'center', minWidth: 100 },
  { id: 'maxroutefare', label: 'Max Fare', align: 'center', minWidth: 100 },
  { id: 'Adhoc Seats', label: 'Adhoc Seats', align: 'center', minWidth: 140 },
  { id: 'distance', label: 'Distance(km)', align: 'center', minWidth: 120 },
  { id: 'status', label: 'Status', align: 'center', minWidth: 50 },
  { id: 'edit', label: 'Update', minWidth: 25, align: 'center' }
];
export const AllRoute = () => {
  const [routeData, setRouteData] = useState([]);

  // update state
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateObj, setUpdateObj] = useState({});
  // refreshPage
  const [refreshPage, setRefreshPage] = useState(false);

  // handle update field err
  const [startpointnameErr, setStartPointNameErr] = useState(false);
  const [startlatErr, setStartlatErr] = useState(false);
  const [startlngErr, setStartlngErr] = useState(false);
  const [routestarttimeErr, setRouteStartTimeErr] = useState(false);
  const [endpointnameErr, setEndPointNameErr] = useState(false);
  const [endlatErr, setEndlatErr] = useState(false);
  const [endlngErr, setEndlngErr] = useState(false);
  const [totalroutedistanceErr, setTotalRouteDistanceErr] = useState(false);
  const [routeendtimeErr, setRouteEndTimeErr] = useState(false);
  const [fixedRateErr, setFixedRateErr] = useState(false);
  const [baseRateErr, setBaseRateErr] = useState(false);
  const [perKmRateErr, setPerKmRateErr] = useState(false);
  const [maxRouteFareErr, setMaxRouteFareErr] = useState(false);
  const [routeBaseAdhocErr, setRouteBaseAdhocErr] = useState(false);

  useEffect(() => {
    setRefreshPage(false);
    axios
      .get(`${BackendUrl}/app/v1/route/getRouteDetails`)
      .then((res) => {
        //  setConductorData(res.data?.result);
        // console.log(res.data.result);
        setRouteData(res.data?.result);
      })
      .catch((e) => console.log('Api fail ', e));
  }, [refreshPage]);
  const handleOpen = (item) => {
    setUpdateObj(item);
    setUpdateOpen(true);
  };
  const handleClose = () => setUpdateOpen(false);
  const updateRoute = () => {
    if (
      updateObj.endlat != '' &&
      updateObj.endlng != '' &&
      updateObj.endpointname != '' &&
      updateObj.routebaseprice != '' &&
      updateObj.routeendtime != '' &&
      updateObj.routefixedrate != '' &&
      updateObj.routestarttime != '' &&
      updateObj.startlat != '' &&
      updateObj.startlng != '' &&
      updateObj.startpointname != '' &&
      updateObj.totalroutedistance != '' &&
      updateObj.routeendtime > updateObj.routestarttime
    ) {
      const body = {
        routeId: updateObj.route_id,
        startPointName: updateObj.startpointname,
        startLat: updateObj.startlat,
        startLng: updateObj.startlng,
        endPointName: updateObj.endpointname,
        endLat: updateObj.endlat,
        endLng: updateObj.endlng,
        totalRouteDistance: updateObj.totalroutedistance,
        routeStartTime: updateObj.routestarttime,
        routeEndTime: updateObj.routeendtime,
        activeStatus: Boolean(updateObj.activeStatus),
        routeFixedRateIn: updateObj.routefixedrate,
        routeBasePriceIn: updateObj.routebaseprice,
        routeNumberIn: updateObj.routenumber,
        userIsFixedRate: Boolean(updateObj.isFixedRate),
        userPerKmRate: updateObj.perkmrate,
        userBasePriceAdhoc: updateObj.routebasepriceadhoc,
        userMaxRouteFare: updateObj.maxroutefare
      };
      console.log(body);
      axios
        .patch(`${BackendUrl}/app/v1/route/updateRoute`, body)
        .then((res) => {
          // console.log(res.data);
          toast.success(res.data.result);
        })
        .catch((err) => {
          console.log('Api error : ', err);
          toast.error('error');
        });
      setStartPointNameErr(false);
      setStartlatErr(false);
      setStartlngErr(false);
      setRouteStartTimeErr(false);
      setEndPointNameErr(false);
      setEndlatErr(false);
      setEndlngErr(false);
      setTotalRouteDistanceErr(false);
      setRouteEndTimeErr(false);
      setFixedRateErr(false);
      setBaseRateErr(false);
    } else {
      updateObj.endlat == '' ? setEndlatErr(true) : setEndlatErr(false);
      updateObj.endlng == '' ? setEndlngErr(true) : setEndlngErr(false);
      updateObj.endpointname == '' ? setEndPointNameErr(true) : setEndPointNameErr(false);
      updateObj.routebaseprice == '' ? setBaseRateErr(true) : setBaseRateErr(false);
      updateObj.routeendtime == '' ? setRouteEndTimeErr(true) : setRouteEndTimeErr(false);
      updateObj.routefixedrate == '' ? setFixedRateErr(true) : setFixedRateErr(false);
      updateObj.routestarttime == '' ? setRouteStartTimeErr(true) : setRouteStartTimeErr(false);
      updateObj.startlat == '' ? setStartlatErr(true) : setStartlatErr(false);
      updateObj.startlng == '' ? setStartlngErr(true) : setStartlngErr(false);
      updateObj.startpointname == '' ? setStartPointNameErr(true) : setStartPointNameErr(false);
      updateObj.totalroutedistance == '' ? setTotalRouteDistanceErr(true) : setTotalRouteDistanceErr(false);

      updateObj.userMaxRouteFare == '' ? setMaxRouteFareErr(true) : setMaxRouteFareErr(false);
      // route base price Adhoc
      updateObj.userBasePriceAdhoc == '' ? setRouteBaseAdhocErr(true) : setRouteBaseAdhocErr(false);
      // per km rate
      updateObj.userPerKmRate == '' ? setPerKmRateErr(true) : setPerKmRateErr(false);
    }
    setRefreshPage(true);
  };
  const handleTimeInput = (e) => {
    const inputValue = e.target.value;
    const field = e.target.name;
    // Use a regular expression to validate the input
    const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (regex.test(inputValue) || inputValue === '') {
      setUpdateObj({ ...updateObj, [field]: inputValue });
    }
  };
  const handleActiveStatus = (value) => {
    if (value) {
      window.alert('Are you want to active the route');
      setUpdateObj({ ...updateObj, activeStatus: value });
    } else {
      window.alert('Are you want to DeActive the route');
      setUpdateObj({ ...updateObj, activeStatus: value });
    }
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    p: 4
  };
  return (
    <div>
      <div className=" flex flex-col gap-10 bg-white p-8 max-lg:p-4 max-lg:gap-5 rounded-xl">
        <div>
          <p className="text-3xl text-gray-600 text-center">All Route Details</p>
          <p className=" border border-gray-300 mt-5"></p>
        </div>
        {/* dropdown */}
        <div>
          <div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead className="bg-gray-300">
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {routeData?.map((item, i) => {
                      return (
                        <TableRow key={i} hover>
                          <TableCell align="center">{item.routenumber}</TableCell>
                          <TableCell align="center">{item.startpointname}</TableCell>
                          <TableCell align="center">{item.routestarttime}</TableCell>
                          <TableCell align="center">{item.endpointname}</TableCell>
                          <TableCell align="center">{item.routeendtime}</TableCell>
                          <TableCell align="center">{item.perkmrate}</TableCell>
                          <TableCell align="center">{item.routefixedrate}</TableCell>
                          <TableCell align="center">{item.maxroutefare}</TableCell>
                          <TableCell align="center">{item.routebasepriceadhoc}</TableCell>
                          <TableCell align="center">{parseFloat(item.totalroutedistance).toFixed(2)}</TableCell>
                          <TableCell align="center">{item.activeStatus == 1 ? 'Actived' : 'Deactived'}</TableCell>
                          <TableCell align="center">
                            <button className="text-blue-600" onClick={() => handleOpen(item)}>
                              edit
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </div>
      </div>

      {/* update api */}
      <Modal
        open={updateOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="overflow-y-scroll"
      >
        <Box sx={style} className=" w-full h-screen p-4 ">
          {' '}
          <div className=" max-lg:w-full flex flex-col gap-1 bg-white my-4 p-4 rounded-xl relative">
            <div className="absolute top-5 left-1/2 ">
              <Toaster />
            </div>
            <div className="flex justify-between pb-5 px-20 max-lg:px-0">
              <p className="text-xl font-bold">Update Route</p>
              <button onClick={handleClose} className="">
                <IconX />
              </button>
            </div>
            <>
              {' '}
              <div>
                <div className=" grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-10 px-20 py-0 max-lg:px-2 max-lg:py-5 max-lg:gap-5">
                  <div>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        label="Route ID"
                        id="oulined-basic"
                        variant="outlined"
                        value={updateObj.route_id}
                        disabled={true}
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        label="Route Number"
                        id="oulined-basic"
                        variant="outlined"
                        value={updateObj.routenumber}
                        disabled={true}
                      />
                    </FormControl>
                  </div>
                  {/* total distance error */}
                  <div>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        label="Total Distance"
                        id="oulined-basic"
                        variant="outlined"
                        value={updateObj.totalroutedistance}
                        onChange={(e) => setUpdateObj({ ...updateObj, totalroutedistance: e.target.value })}
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
                        value={updateObj.startpointname}
                        onChange={(e) => setUpdateObj({ ...updateObj, startpointname: e.target.value })}
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
                        value={updateObj.endpointname}
                        onChange={(e) => setUpdateObj({ ...updateObj, endpointname: e.target.value })}
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
                        value={updateObj.startlat}
                        onChange={(e) => setUpdateObj({ ...updateObj, startlat: e.target.value })}
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
                        value={updateObj.startlng}
                        onChange={(e) => setUpdateObj({ ...updateObj, startlng: e.target.value })}
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
                        value={updateObj.endlat}
                        onChange={(e) => setUpdateObj({ ...updateObj, endlat: e.target.value })}
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
                        value={updateObj.endlng}
                        onChange={(e) => setUpdateObj({ ...updateObj, endlng: e.target.value })}
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
                        value={updateObj.routestarttime}
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
                        value={updateObj.routeendtime}
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
                        value={updateObj.routefixedrate}
                        onChange={(e) => setUpdateObj({ ...updateObj, routefixedrate: e.target.value })}
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
                        value={updateObj.routebaseprice}
                        onChange={(e) => setUpdateObj({ ...updateObj, routebaseprice: e.target.value })}
                      />
                    </FormControl>
                    {baseRateErr && <p className="text-red-500 text-xs ml-2">Base Rate Error</p>}
                  </div>
                  <div>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        label="per Km Rate"
                        id="oulined-basic"
                        variant="outlined"
                        value={updateObj.perkmrate}
                        onChange={(e) => setUpdateObj({ ...updateObj, perkmrate: e.target.value })}
                      />
                    </FormControl>
                    {perKmRateErr && <p className="text-red-500 text-xs ml-2">per km Rate Error</p>}
                  </div>
                  <div>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        label="Route Base Price Adhoc"
                        id="oulined-basic"
                        variant="outlined"
                        value={updateObj.routebasepriceadhoc}
                        onChange={(e) => setUpdateObj({ ...updateObj, routebasepriceadhoc: e.target.value })}
                      />
                    </FormControl>
                    {routeBaseAdhocErr && <p className="text-red-500 text-xs ml-2">route Base Adhoc Error</p>}
                  </div>

                  <div>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        label="Max Route Fare"
                        id="oulined-basic"
                        variant="outlined"
                        value={updateObj.maxroutefare}
                        onChange={(e) => setUpdateObj({ ...updateObj, maxroutefare: e.target.value })}
                      />
                    </FormControl>
                    {maxRouteFareErr && <p className="text-red-500 text-xs ml-2">max Route Fare Error</p>}
                  </div>
                  <div>
                    <FormControlLabel
                      control={<Checkbox inputProps={{ 'aria-label': 'controlled' }} />}
                      label="IsFixedRate"
                      checked={Boolean(updateObj.isFixedRate)}
                      onChange={(e) => setUpdateObj({ ...updateObj, isFixedRate: e.target.checked })}
                    />
                  </div>
                  <div className="m2-1 flex gap-2 items-center">
                    <input
                      type="checkbox"
                      id="check"
                      checked={updateObj.activeStatus}
                      onChange={(e) => handleActiveStatus(e.target.checked)}
                    />
                    <label htmlFor="check"> Active Status</label>
                  </div>
                </div>
              </div>
              <div className="mt-1  px-20 py-5 max-lg:px-2 ">
                <div className="flex gap-10 justify-between mb-3">
                  <Button variant="contained" className={'bg-blue-700'} onClick={updateRoute}>
                    update route
                  </Button>
                  <Button variant="outlined" color="error">
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          </div>
        </Box>
      </Modal>
      {/* update modal end */}
    </div>
  );
};
