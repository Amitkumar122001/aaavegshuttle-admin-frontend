import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField
} from '@mui/material';
import { IconX, IconChevronLeft } from '@tabler/icons-react'; // IconArrowDownSquare
import { getCurrentDate, findDay, addTwoTime, diffTwoTime, compareTwoTime } from 'utils/TimeDate';
import axios from 'axios';
import { MapTracking } from './MapTracking';
import { BackendUrl } from 'utils/config';
const columns = [
  { id: 'route no', label: 'Route No.', align: 'center', minWidth: 100 },
  { id: 'route name', label: 'Route Name.', align: 'center', minWidth: 250 },
  {
    id: 'bus_no',
    label: 'Bus No.',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'driver',
    label: 'Driver',
    minWidth: 80,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'trip time',
    label: 'Trip Time',
    minWidth: 250,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'vendor',
    label: 'Vendor',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'No of pax',
    label: 'No of booking',
    minWidth: 140,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'boarded',
    label: 'Boarded',
    minWidth: 75,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'unboarded',
    label: 'Unboarded',
    minWidth: 75,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'edit',
    label: 'View',
    minWidth: 25,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  }
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2
};
export const OngoingTrip = () => {
  const [allTrip, setAllTrips] = useState([]);
  const [filterTripData, setFilterTripData] = useState(allTrip);
  const [modalopen, setModalOpen] = useState(false);
  const [tripStatus, setTripStatus] = useState('');
  const [showModal, setShowModal] = useState({
    allDetail: true,
    tsBool: false,
    sdBool: false,
    mapTracking: false
  });
  const [routeNoF, setRouteNoF] = useState('');
  const [busNoF, setBusNoF] = useState('');
  const [startDate, setStartDate] = useState(getCurrentDate());
  const [endDate, setEndDate] = useState(getCurrentDate());
  const [updateObj, setUpdateObj] = useState({});
  // Api call
  useEffect(() => {
    if (startDate >= getCurrentDate() && endDate >= startDate) {
      axios
        .get(`${BackendUrl}/app/v1/tripManagement/ongoing/${startDate}/${endDate}`)
        .then((res) => setAllTrips(res.data.result))
        .catch((err) => {
          console.log('Api error : ', err);
        });
    } else {
      window.alert('Please Select the correct Date,\n End Date >= Start Date');
    }
  }, [startDate, endDate]);
  // filter
  useEffect(() => {
    let res = '';
    if (routeNoF != '' && busNoF != '') {
      res = allTrip.filter((item) => {
        // Check if all fields match the criteria
        return String(item.basicInfo?.routeNumber).includes(String(routeNoF)) && String(item.basicInfo?.busNumber).includes(busNoF);
      });
      // console.log('routeno, busno and trip : ', res);
      setFilterTripData(res);
      return;
    } else if (routeNoF != '') {
      res = allTrip.filter((item) => {
        // Check if all fields match the criteria
        return String(item.basicInfo?.routeNumber).includes(String(routeNoF));
      });
      // console.log('routeno, busno and trip : ', res);
      setFilterTripData(res);
      return;
    } else if (busNoF != '') {
      res = allTrip.filter((item) => {
        // Check if all fields match the criteria
        return String(item.basicInfo?.busNumber).includes(busNoF);
      });
      // console.log('busno : ', res);
      setFilterTripData(res);
      return;
    } else {
      setFilterTripData(allTrip);
    }
  }, [allTrip, routeNoF, busNoF]);

  // modal
  const handleOpen = (item) => {
    // console.log(item);
    setUpdateObj(item);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setShowModal({ ...showModal, allDetail: true, tsBool: false, sdBool: false, mapTracking: false });
  };
  const handleLiveTracking = () => {
    setShowModal({ ...showModal, allDetail: false, tsBool: false, sdBool: false, mapTracking: true });
  };
  // Change The Status Of Particular Trip
  const ChangeTripStatusOnPending = () => {
    if (tripStatus != '' && updateObj.tripMapId != '') {
      console.log('tripStatus And TripMapId', tripStatus, updateObj.tripMapId);
      axios
        .post(`${BackendUrl}/app/v/tripstatus/status${tripStatus}`, { tripMapId: updateObj.tripMapId }) // v1
        .then((res) => {
          if (res.data.created) {
            window.alert('Trip Status Changed');
          }
          console.log(res.data);
        })
        .catch((err) => console.log('Api Error', err));
    }
  };

  return (
    <>
      <div className="flex flex-col gap-10 max-md:gap-5 ">
        {/* filter */}
        <div className="grid grid-cols-4 max-md:grid-cols-2 gap-2">
          <div className="flex flex-col border p-1 rounded-lg w-full">
            <label htmlFor="StartDate">Start Date</label>
            <input
              type="date"
              id="StartDate"
              className="bg-transparent outline-none"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={getCurrentDate()}
            />
          </div>
          <div className="flex flex-col border p-1 rounded-lg w-full">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent outline-none"
              min={getCurrentDate()}
            />
          </div>
          <div>
            <FormControl fullWidth>
              <TextField
                label="Route No."
                type="number"
                value={routeNoF}
                onChange={(e) => setRouteNoF(e.target.value)}
                inputProps={{
                  min: 0
                }}
              />
            </FormControl>
          </div>
          <div>
            <FormControl fullWidth>
              <TextField label="Bus No" type="text" value={busNoF} onChange={(e) => setBusNoF(e.target.value)} />
            </FormControl>
          </div>
        </div>
        {/* All trip */}
        <div>
          <div className="my-1">
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                          className="bg-gray-200 text-gray-600"
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filterTripData?.map((item, i) => {
                      return (
                        <TableRow hover key={i}>
                          <TableCell align="center">{item.basicInfo.routeNumber}</TableCell>
                          <TableCell align="center">{item.basicInfo.routeName}</TableCell>
                          <TableCell align="center">{item.basicInfo.busNumber}</TableCell>
                          <TableCell align="center">{item.basicInfo.driverName}</TableCell>
                          <TableCell align="center">{item.basicInfo.tripTime}</TableCell>
                          <TableCell align="center">{item.basicInfo.vendorName}</TableCell>
                          <TableCell align="center">{item.basicInfo.noOfBookings}</TableCell>
                          <TableCell align="center">{item.basicInfo.noOfBookings}</TableCell>
                          <TableCell align="center">{item.basicInfo.noOfBookings}</TableCell>
                          <TableCell align="center">
                            <button className="p-2 text-md text-blue-600" onClick={() => handleOpen(item)}>
                              View
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

      <Modal
        open={modalopen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=""
      >
        <Box
          sx={style}
          className={`rounded  ${showModal.allDetail && 'h-[90%] w-[60%]'} 
         ${showModal.tsBool && 'h-[60%] max-md:h-[70%] sm:w-[50%] rounded-xl flex items-center justify-center'} ${
            showModal.sdBool && 'h-[90%] w-[60%] max-lg:w-[70%] max-md:w-[80%]'
          } ${showModal.mapTracking && 'w-[85%] h-[90%] p-0 '}
          } overflow-hidden`}
        >
          <div className="h-[100%] w-[100%]">
            {showModal.allDetail && (
              <>
                <div className="">
                  <div className="flex justify-between text-xl my-2 max-md:my-1 font-bold ">
                    <p>Trip Details </p>
                    <button onClick={handleClose} className="hover:bg-gray-400 rounded-full">
                      <IconX />
                    </button>
                  </div>

                  <div className="overflow-y-scroll w-[100%] h-[420px] max-md:h-[600px] px-1">
                    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4  h-full w-full">
                      {/* bus details */}
                      <div className=" h-56 bg-cyan-900 text-gray-300 rounded p-2  grid grid-cols-1 gap-0 ">
                        <h1 className="text-white text-xl">Bus details</h1>
                        <span className="bg-white w-full block h-[0.2px] mb-1"></span>
                        <p>bus no. : {updateObj.busDetails?.busNumber}</p>
                        <p>Reg no. : {updateObj.busDetails?.busRegistrationDate}</p>
                        <p>isAC. : {updateObj.busDetails?.busIsAc ? `${updateObj.busDetails?.busIsAc ? 'Yes' : 'No'}` : 'not yet'}</p>
                        <p>fuel type : {updateObj.busDetails?.fuelType}</p>
                        <p>capacity : {updateObj.busDetails?.busCapacity}</p>
                        <p>femaleBus : {updateObj.busDetails?.femalBus ? `${updateObj.busDetails?.femalBus ? 'Yes' : 'No'}` : 'not yet'}</p>
                      </div>
                      {/* Driver details */}
                      <div className=" bg-cyan-900 text-gray-300 rounded p-2 h-56 grid grid-cols-1 gap-0  ">
                        <h1 className="text-white text-xl">Driver details</h1>
                        <span className="bg-white w-full block h-[0.2px] mb-1"></span>
                        <p>driver_name. : {updateObj.driverDetails?.driverName}</p>
                        <p>Primary no. : {updateObj.driverDetails?.driverContact}</p>
                        <p>Emergency no. : {updateObj.driverDetails?.driverEmergencyContact || 'not yet'}</p>
                        <p>License Img : view (pending)</p>
                        <p>Address : {updateObj.driverDetails?.driverAddress}</p>
                      </div>
                      {/* trip details */}
                      <div className=" bg-cyan-900 text-gray-300 rounded p-2 h-56 grid grid-cols-1  ">
                        <h1 className="text-white text-xl">Trip details</h1>
                        <span className="bg-white w-full block h-[0.2px] "></span>
                        <p>Trip status: Ongoing</p>
                        <p>Start time : {String(updateObj.tripDetails?.tripStartTime)}</p>
                        <p>End time : {updateObj.tripDetails?.tripEndTime}</p>
                        <p>Trip day: {updateObj.tripDetails?.tripRunningDays.map((item) => findDay(item))} </p>
                      </div>
                      {/* Route details */}
                      <div className=" bg-cyan-900 text-gray-300 rounded p-2 h-56 grid grid-cols-1 gap-0  ">
                        <h1 className="text-white text-xl">Route details</h1>
                        <span className="bg-white w-full block h-[0.2px] mb-1"></span>
                        <p>Route No. : {updateObj.routeDetails?.routeNumber}</p>
                        <p>Start point: {updateObj.routeDetails?.startingPoint}</p>
                        <p>End point: {updateObj.routeDetails?.endPoint}</p>
                        <p>Distance : {updateObj.routeDetails?.totalDistance} km</p>
                        {Boolean(updateObj.routeDetails?.routeFixedRate) == false ? (
                          <>
                            <p>Base rate: {updateObj.routeDetails?.routeBasePrice}</p>
                            <p>Adhoc PRice: {updateObj.routeDetails?.routeBasePriceAdhoc}</p>
                            <p>rate/km: {updateObj.routeDetails?.perKmRoutePrice}</p>
                            <p>max fare: {updateObj.routeDetails?.maxRouteFare}</p>
                          </>
                        ) : (
                          <p>fixed price : {updateObj.routeDetails?.routeFixedRatePrice || 'Backend'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-between mt-2">
                    <Button
                      variant="contained"
                      className="bg-yellow-700 text-sm "
                      onClick={() => setShowModal({ ...showModal, allDetail: false, tsBool: true, sdBool: false, mapTracking: false })}
                    >
                      trip Status
                    </Button>
                    <Button variant="contained" className="bg-blue-700 text-sm" onClick={() => handleLiveTracking()}>
                      Live Track
                    </Button>
                    <Button
                      variant="contained"
                      className="bg-blue-700 text-sm "
                      onClick={() => setShowModal({ ...showModal, allDetail: false, tsBool: false, sdBool: true, mapTracking: false })}
                    >
                      Stops
                    </Button>
                  </div>
                </div>
              </>
            )}
            {showModal.tsBool && (
              <>
                <div className="flex items-center justify-center ">
                  <div className="flex flex-col gap-5">
                    <div className="flex justify-between gap-1 text-xl font-semibold">
                      <button
                        onClick={() => setShowModal({ ...showModal, allDetail: true, sdBool: false, tsBool: false, mapTracking: false })}
                        className="hover:text-blue-400 rounded-full"
                      >
                        <IconChevronLeft />
                      </button>
                      <p className="">Change Trip Status </p>
                    </div>
                    <div className="flex flex-col gap-5">
                      <div className="w-56">
                        <p className="text-md">
                          Route Name : <span className="font-semibold">{updateObj.basicInfo.routeName}</span>
                        </p>
                      </div>
                      <div className="w-56">
                        <p>
                          Trip Time : <span className="font-semibold">{updateObj.basicInfo.tripTime}</span>
                        </p>
                      </div>
                      <div>
                        <FormControl fullWidth>
                          <InputLabel id="tripStatus">Trip Status</InputLabel>
                          <Select
                            labelId="tripStatus"
                            label="Trip Status"
                            value={tripStatus}
                            onChange={(e) => setTripStatus(e.target.value)}
                          >
                            <MenuItem value={'Completed'}>Completed</MenuItem>
                            <MenuItem value={''} disabled>
                              BreakDown
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div>
                        <Button variant="contained" fullWidth className="bg-blue-600 p-3 rounded-xl" onClick={ChangeTripStatusOnPending}>
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {showModal.sdBool && (
              <>
                <div className="">
                  <div className="flex text-xl my-2 max-md:my-1 font-bold gap-2">
                    <button
                      onClick={() => setShowModal({ ...showModal, allDetail: true, tsBool: false, sdBool: false, mapTracking: false })}
                      className="hover:text-blue-400 rounded-full"
                    >
                      <IconChevronLeft />
                    </button>
                    <p>All Stop Detail</p>
                  </div>
                  <div className="overflow-y-scroll w-[100%] h-[470px] max-md:h-[640px] px-1 ">
                    <div>
                      <div className="grid grid-cols-1 gap-4 justify-center">
                        <>
                          {updateObj.stopsWithBooking?.map((item, i, arr) => {
                            if (i == 0) {
                              let stopreachtime = item.stopStatus == 0 ? item.eta : item.stopReachTime;
                              let desiredTime = updateObj.tripDetails.tripStartTime;
                              let timeDiff = diffTwoTime(desiredTime, stopreachtime);
                              let isGreater = compareTwoTime(desiredTime, stopreachtime);
                              return (
                                <div key={i} className={`rounded ${Boolean(item.stopStatus) == false ? 'bg-yellow-300' : 'bg-green-500'}`}>
                                  <div className="p-2 flex flex-col gap-3">
                                    <div>
                                      <p className="text-xl font-bold">{item.stopName}</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                      <div className="flex justify-around items-center">
                                        <p className="font-semibold text-lg">Desired Reach time : {desiredTime}</p>
                                        <p className="font-semibold text-lg">
                                          Actual Reach time : {Boolean(item.stopStatus) == false ? item.eta : item.stopReachTime}
                                        </p>
                                        <p className="font-semibold text-lg">
                                          Time Diff:{' '}
                                          <span className={isGreater ? 'text-green-500' : 'text-red-400'}>
                                            {isGreater ? '+' : '-'} {timeDiff}
                                          </span>
                                        </p>
                                      </div>

                                      <div className="grid grid-cols-2">
                                        <div className="text-white bg-green-500 p-2">
                                          <p className="font-bold text-center">OnBoarded</p>
                                          <div className="grid justify-center grid-cols-1">
                                            <p className="grid grid-cols-2">
                                              <span className="text-center">Name</span>
                                              <span className="text-center">Seats</span>
                                            </p>
                                            {item.onBoardingArr?.map((ele, x) => {
                                              return (
                                                <p key={x} className="grid grid-cols-2">
                                                  <span className="text-center">{ele.userName}</span>
                                                  <span className="text-center">{ele.totalSeats}</span>
                                                </p>
                                              );
                                            })}
                                          </div>
                                        </div>
                                        <div className="text-white bg-red-500 p-2">
                                          <p className="font-bold text-center">OffBoarded</p>
                                          <div>
                                            <p className="grid grid-cols-2">
                                              <span className="text-center">Name</span>
                                              <span className="text-center">Seats</span>
                                            </p>
                                            {item.offBoardingArr?.map((ele, x) => {
                                              return (
                                                <p key={x} className="grid grid-cols-2">
                                                  <span className="text-center">{ele.userName}</span>
                                                  <span className="text-center">{ele.totalSeats}</span>
                                                </p>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            } else if (i == arr.length - 1) {
                              let stopreachtime = item.stopStatus == 0 ? item.eta : item.stopReachTime;
                              let desiredTime = updateObj.tripDetails.tripEndTime;
                              let timeDiff = diffTwoTime(desiredTime, stopreachtime);
                              let isGreater = compareTwoTime(desiredTime, stopreachtime);
                              // console.log(timeDiff);

                              return (
                                <div key={i} className={`rounded ${Boolean(item.stopStatus) == false ? 'bg-yellow-300' : 'bg-green-500'}`}>
                                  <div className="p-2 flex flex-col gap-3">
                                    <div>
                                      <p className="text-xl font-bold">{item.stopName}</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                      <div className="flex justify-around items-center">
                                        <p className="font-semibold text-lg">Desired Reach time : {desiredTime}</p>
                                        <p className="font-semibold text-lg">
                                          Actual Reach time : {Boolean(item.stopStatus) == false ? item.eta : item.stopReachTime}
                                        </p>
                                        <p className="font-semibold text-lg">
                                          Time Diff:{' '}
                                          <span className={isGreater ? 'text-green-500' : 'text-red-400'}>
                                            {isGreater ? '+' : '-'} {timeDiff}
                                          </span>
                                        </p>
                                      </div>

                                      <div className="grid grid-cols-2">
                                        <div className="text-white bg-green-500 p-2">
                                          <p className="font-bold text-center">OnBoarded</p>
                                          <div>
                                            <p className="grid grid-cols-2">
                                              <span className="text-center">Name</span>
                                              <span className="text-center">Seats</span>
                                            </p>
                                            {item.onBoardingArr?.map((ele, x) => {
                                              return (
                                                <p key={x} className="grid grid-cols-2">
                                                  <span className="text-center">{ele.userName}</span>
                                                  <span className="text-center">{ele.totalSeats}</span>
                                                </p>
                                              );
                                            })}
                                          </div>
                                        </div>
                                        <div className="text-white bg-red-500 p-2">
                                          <p className="font-bold text-center">OffBoarded</p>
                                          <div>
                                            <p className="grid grid-cols-2">
                                              <span>Name</span>
                                              <span>Seats</span>
                                            </p>
                                            {item.offBoardingArr?.map((ele, x) => {
                                              return (
                                                <p key={x} className="grid grid-cols-2">
                                                  <span>{ele.userName}</span>
                                                  <span>{ele.totalSeats}</span>
                                                </p>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            } else {
                              let stopreachtime = item.stopStatus == 0 ? item.eta : item.stopReachTime;
                              let desiredTime = addTwoTime(
                                updateObj.tripDetails.tripStartTime,
                                updateObj.stopsWithoutBooking[i - 1].stopEta
                              );
                              // console.log(desiredTime);
                              let timeDiff = diffTwoTime(desiredTime, stopreachtime);
                              let isGreater = compareTwoTime(desiredTime, stopreachtime);
                              // console.log("ongoing",timeDiff);
                              return (
                                <div key={i} className={Boolean(item.stopStatus) == false ? 'bg-yellow-300' : 'bg-green-500'}>
                                  <div className="p-3 grid grid-cols-1 gap-3">
                                    <div>
                                      <p className="font-bold text-xl">{item.stopName}</p>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                      <div className="flex justify-around items-center">
                                        <p className="font-semibold text-lg">Desired Reach time :{desiredTime}</p>
                                        <p className="font-semibold text-lg">
                                          Actual Reach time : {Boolean(item.stopStatus) == false ? item.eta : item.stopReachTime}
                                        </p>
                                        <p className="font-semibold text-lg">
                                          Time Diff:{' '}
                                          <span className={isGreater ? 'text-green-500' : 'text-red-400'}>
                                            {isGreater ? '+' : '-'} {timeDiff}
                                          </span>
                                        </p>
                                      </div>

                                      <div className="grid grid-cols-2">
                                        <div className="text-white bg-green-500 p-2">
                                          <p className="font-bold text-center">OnBoarded</p>
                                          <div>
                                            <p className="grid grid-cols-2">
                                              <span>Name</span>
                                              <span>Seats</span>
                                            </p>
                                            {item.onBoardingArr?.map((ele, x) => {
                                              return (
                                                <p key={x} className="grid grid-cols-2">
                                                  <span>{ele.userName}</span>
                                                  <span>{ele.totalSeats}</span>
                                                </p>
                                              );
                                            })}
                                          </div>
                                        </div>
                                        <div className="text-white bg-red-500 p-2">
                                          <p className="font-bold text-center">OffBoarded</p>
                                          <div>
                                            <p className="grid grid-cols-2">
                                              <span>Name</span>
                                              <span>Seats</span>
                                            </p>
                                            {item.offBoardingArr?.map((ele, x) => {
                                              return (
                                                <p key={x} className="grid grid-cols-2">
                                                  <span>{ele.userName}</span>
                                                  <span>{ele.totalSeats}</span>
                                                </p>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          })}
                        </>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {showModal.mapTracking && (
              <MapTracking
                busId={updateObj.busDetails.busId}
                tripId={updateObj.tripDetails.tripId}
                tripDate={updateObj.tripDate}
                routeId={updateObj.routeDetails.routeId}
              />
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};
