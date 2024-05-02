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
  TextField,
  Select,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Pagination,
  Stack
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconX, IconChevronLeft } from '@tabler/icons-react'; // IconArrowDownSquare
import { getCurrentDate, findDay, addTwoTime } from 'utils/TimeDate';
import axios from 'axios';
import { BackendUrl } from 'utils/config';

const columns = [
  { id: 'route no', label: 'Route No.', align: 'center', minWidth: 80 },
  { id: 'route name', label: 'Route Name.', align: 'center', minWidth: 150 },
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
    label: 'Vendor Name',
    minWidth: 80,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'No of pax',
    label: 'No of booking',
    minWidth: 40,
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
  p: 1
};
export const PendingTrip = ({ itemsPerPage }) => {
  const [modalopen, setModalOpen] = useState(false);

  const [tripStatus, setTripStatus] = useState('');
  const [showModal, setShowModal] = useState({
    allDetail: true,
    bdBool: false,
    tsBool: false,
    sdBool: false
  });
  // fetch Data state And filter state
  const [allTrip, setAllTrips] = useState([]);
  // console.log(allTrip);
  const [filterTripData, setFilterTripData] = useState(allTrip);
  const [routeNoF, setRouteNoF] = useState('');
  const [busNoF, setBusNoF] = useState('');
  const [startDate, setStartDate] = useState(getCurrentDate());
  const [endDate, setEndDate] = useState(getCurrentDate());
  const [updateObj, setUpdateObj] = useState({});
  // Assign ReAssign Case
  const [unAssignedBus, setUnAssignedBus] = useState([]);
  const [UnAssignDriverName, setUnAssignDriverName] = useState('');
  const [newBusId, setNewBusId] = useState('');

  // Api call
  useEffect(() => {
    if (startDate >= getCurrentDate() && endDate >= startDate) {
      // console.log(startDate, endDate);
      axios
        .get(`${BackendUrl}/app/v1/tripManagement/pending/${startDate}/${endDate}`) //'
        .then((res) => setAllTrips(res.data.result))
        .catch((err) => {
          setAllTrips([]);
          console.log('Api error : ', err);
        });
    } else {
      console.log('else', startDate, endDate);
      setStartDate(getCurrentDate());
      setEndDate(getCurrentDate());
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

  // Assign Reassign Bus On A Particular Trip

  // modal
  const handleOpen = (item) => {
    // console.log(item);
    setUpdateObj(item);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setShowModal({ ...showModal, allDetail: true, tsBool: false });
  };
  // Change The Status Of Particular Trip
  const ChangeTripStatusOnPending = () => {
    if (tripStatus != '' && updateObj.tripMapId != '') {
      console.log('tripStatus And TripMapId', tripStatus, updateObj.tripMapId);
      let warningBool = window.confirm('Do You want to change the trip Status?');
      if (warningBool) {
        axios
          .post(`${BackendUrl}/app/v1/tripstatus/status${tripStatus}`, { tripMapId: updateObj.tripMapId })
          .then((res) => {
            if (res.data.created) {
              window.alert('Trip Status Changed');
            }
            console.log(res.data);
          })
          .catch((err) => console.log('Api Error', err));
      } else {
        console.log('thanks for Your Confirmation');
      }
    }
  };
  // get All UnAssign Bus And Driver
  const GetAllUnAssignedBus = () => {
    setShowModal({ ...showModal, allDetail: false, bdBool: true, tsBool: false, sdBool: false });
    if (updateObj.tripDetails.tripId && updateObj.tripDate) {
      axios
        .post(`${BackendUrl}/app/v1/tripManagement/getAvailableBusesForReassign`, {
          TripId: updateObj.tripDetails.tripId,
          TripDate: updateObj.tripDate
        })
        .then((res) => setUnAssignedBus(res.data.result))
        .catch((err) => console.log('Api Error : ', err));
    }
  };
  // Change Bus Driver On A particular trip Route
  const ChangeBusDriverOnParticularTrip = () => {
    if (newBusId != '' && updateObj.tripDetails.tripId && updateObj.tripDate) {
      axios
        .patch(`${BackendUrl}/app/v1/tripManagement/updateBusInPending`, {
          tripId: updateObj.tripDetails.tripId,
          tripDate: updateObj.tripDate,
          newBus: newBusId
        })
        .then((res) => {
          if (res.data.updated) {
            window.alert('Bus And Driver Changes on Particular Trip Route');
          }
        })
        .catch((err) => console.log('Api Error : ', err));
    }
  };
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPages = itemsPerPage;
  const totalPages = Math.ceil(filterTripData.length / itemsPerPages);

  const displayItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filterTripData.slice(startIndex, endIndex);
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div className="flex flex-col gap-10 max-md:gap-5">
        {/* filter */}
        <div className="grid grid-cols-4 max-md:grid-cols-2 gap-2">
          <div className="flex flex-col border p-1 rounded-lg w-full">
            <label htmlFor="StartDate">Start Date</label>
            <input
              type="date"
              id="StartDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent outline-none"
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
              <TextField type="number" label="Route No." value={routeNoF} onChange={(e) => setRouteNoF(e.target.value)} />
            </FormControl>
          </div>
          <div>
            <FormControl fullWidth>
              <TextField label="Bus No" value={busNoF} onChange={(e) => setBusNoF(e.target.value)} />
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
                    {displayItems().map((item, i) => {
                      return (
                        <TableRow hover key={i}>
                          <TableCell align="center">{item.basicInfo.routeNumber}</TableCell>
                          <TableCell align="center">{item.basicInfo.routeName}</TableCell>
                          <TableCell align="center">{item.basicInfo.busNumber}</TableCell>
                          <TableCell align="center">{item.basicInfo.driverName}</TableCell>
                          <TableCell align="center">{item.basicInfo.tripTime}</TableCell>
                          <TableCell align="center">{item.basicInfo.vendorName}</TableCell>
                          <TableCell align="center">{item.basicInfo.noOfBookings}</TableCell>
                          <TableCell align="center">
                            <Button className="p-2 text-md text-blue-600" onClick={() => handleOpen(item)}>
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <div className="flex  justify-center">
              <Stack spacing={2}>
                <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
              </Stack>
            </div>
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
          className={`rounded bg-gray-200 max-lg:w-[70%] max-md:w-[80%] ${showModal.allDetail && 'h-[90%] w-[60%]'} 
          ${showModal.bdBool && 'h-[70%] max-md:h-[70%] w-[50%] rounded-xl'} ${
            showModal.tsBool && 'h-[70%] w-[70%] max-md:h-[70%] sm:w-[50%] rounded-xl flex items-center justify-center'
          } ${showModal.sdBool && 'h-[90%] w-[60%] max-lg:w-[70%] max-md:w-[80%]'}
          } overflow-hidden`}
        >
          <div>
            {showModal.allDetail && (
              <>
                <div className="">
                  <div className="flex justify-between text-xl my-2 max-md:my-1 font-bold">
                    <p>Trip Details </p>
                    <button onClick={handleClose} className="hover:bg-gray-400 rounded-full">
                      <IconX />
                    </button>
                  </div>

                  <div className="overflow-y-scroll w-[100%] h-[420px] max-md:h-[600px] px-1">
                    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4  h-full w-full">
                      {/* bus details */}
                      <div className=" h-56 bg-cyan-900 text-gray-300 rounded p-3  grid grid-cols-1 gap-0 ">
                        <h1 className="text-white text-xl">Bus details</h1>
                        <span className="bg-white w-full block h-[0.2px] mb-1"></span>
                        <p>bus no. : {updateObj.busDetails?.busNumber}</p>
                        <p>Reg no. : {updateObj.busDetails?.busRegistrationDate}</p>
                        <p>isAC. : {updateObj.busDetails?.busIsAc ? `${updateObj.busDetails?.busIsAc ? 'Yes' : 'No'}` : 'not yet'}</p>
                        <p>fuel type : {updateObj.busDetails?.fuelType}</p>
                        <p>capacity : {updateObj.busDetails?.busCapacity}</p>
                        <p>femaleBus : {updateObj.busDetails?.femalBus || 'not yet'}</p>
                      </div>
                      {/* Driver details */}
                      <div className=" bg-cyan-900 text-gray-300 rounded p-2 h-56 grid grid-cols-1 gap-0  ">
                        <h1 className="text-white text-xl">Driver details</h1>
                        <span className="bg-white w-full block h-[0.2px] mb-1"></span>
                        <p>driver_name. : {updateObj.driverDetails?.driverName}</p>
                        <p>Primary no. : {updateObj.driverDetails?.driverContact}</p>
                        <p>Emergency no. : {updateObj.driverDetails?.driverEmergencyContact || 'not yet'}</p>
                        <p>License Img : view pending</p>
                        <p>Address : {updateObj.driverDetails?.driverAddress}</p>
                      </div>
                      {/* trip details  */}
                      <div className=" bg-cyan-900 text-gray-300 rounded p-2 h-56 grid grid-cols-1 -gap-2 ">
                        <h1 className="text-white text-xl -mb-4">Trip details</h1>
                        <span className="bg-white w-full block h-[0.2px] "></span>
                        <p>Trip status: pending</p>
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
                          <p>fixed price : {updateObj.routeDetails?.routeFixedRatePrice}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-between mt-2">
                    <Button variant="contained" className="bg-blue-500" onClick={GetAllUnAssignedBus}>
                      ReAssign
                    </Button>
                    <Button
                      variant="contained"
                      className="bg-green-700 text-sm"
                      onClick={() => setShowModal({ ...showModal, allDetail: false, bdBool: false, tsBool: false, sdBool: true })}
                    >
                      Stops
                    </Button>
                    <Button
                      variant="contained"
                      className="bg-yellow-700 text-sm"
                      onClick={() => setShowModal({ ...showModal, allDetail: false, bdBool: false, tsBool: true, sdBool: false })}
                    >
                      trip Status
                    </Button>
                  </div>
                </div>
              </>
            )}
            {showModal.bdBool && (
              <>
                <div className="flex items-center justify-center mt-10">
                  <div className="flex flex-col gap-5">
                    <div className="flex justify-between gap-2 text-xl font-semibold">
                      <button
                        onClick={() => setShowModal({ ...showModal, allDetail: true, bdBool: false, tsBool: false, sdBool: false })}
                        className="hover:text-blue-400 rounded-full"
                      >
                        <IconChevronLeft />
                      </button>
                      <p className="">Change Driver and Bus</p>
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
                          <InputLabel id="BusNo">Bus No.</InputLabel>
                          <Select labelId="BusNo" label="Bus No." value={newBusId} onChange={(e) => setNewBusId(e.target.value)}>
                            {unAssignedBus?.map((item, i) => {
                              return (
                                <MenuItem key={i} value={item.bus_id} onClick={() => setUnAssignDriverName(item.driver_name)}>
                                  {item.bus_number}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </div>
                      <div>
                        <FormControl fullWidth>
                          <TextField label="Driver Name." disabled={true} value={UnAssignDriverName} />
                        </FormControl>
                      </div>
                      <div>
                        <Button
                          variant="contained"
                          fullWidth
                          className="bg-blue-600 p-3 rounded-xl"
                          onClick={ChangeBusDriverOnParticularTrip}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {showModal.tsBool && (
              <>
                <div className="flex items-center justify-center ">
                  <div className="flex flex-col gap-5">
                    <div className="flex  gap-1 text-xl font-semibold">
                      {' '}
                      <button
                        onClick={() => setShowModal({ ...showModal, allDetail: true, bdBool: false, tsBool: false, sdBool: false })}
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
                            <MenuItem value={''} disabled>
                              Pending
                            </MenuItem>
                            <MenuItem value={'Ongoing'}>Ongoing</MenuItem>
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
                      onClick={() => setShowModal({ ...showModal, allDetail: true, bdBool: false, tsBool: false, sdBool: false })}
                      className="hover:text-blue-400 rounded-full"
                    >
                      <IconChevronLeft />
                    </button>
                    <p>All Stop Details</p>
                  </div>
                  <div className="overflow-y-scroll w-[100%] h-[470px] max-md:h-[640px] px-1 ">
                    <div>
                      <div className="grid grid-cols-1 gap-4 justify-center">
                        {updateObj.basicInfo.noOfBookings == 0 ? (
                          <>
                            <div>
                              <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                                  <p>{updateObj.routeDetails?.startingPoint}</p>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <div className="flex justify-around">
                                    <p>ETA : {String(updateObj.tripDetails?.tripStartTime)}</p>
                                    <p>Booking : 0</p>
                                  </div>
                                </AccordionDetails>
                              </Accordion>
                            </div>
                            {updateObj.stopsWithoutBooking?.map((item, i) => {
                              return (
                                <div key={i}>
                                  <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                                      <p>{item.stopName}</p>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <div className="flex justify-around">
                                        <p>ETA : {addTwoTime(updateObj.tripDetails?.tripStartTime, item.stopEta)}</p>
                                        <p>Booking : 0</p>
                                      </div>
                                    </AccordionDetails>
                                  </Accordion>
                                </div>
                              );
                            })}
                            <div>
                              <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                                  <p>{updateObj.routeDetails?.endPoint}</p>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <div className="flex justify-around">
                                    <p>ETA : {updateObj.tripDetails?.tripEndTime}</p>
                                    <p>Booking : 0</p>
                                    {/* <p><button className='text-blue-500' onClick={()=>setShowHide(i)}>View</button></p> */}
                                  </div>
                                </AccordionDetails>
                              </Accordion>
                            </div>
                          </>
                        ) : (
                          <>
                            {updateObj.stopsWithBooking?.map((item, i) => {
                              return (
                                <div key={i}>
                                  <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                                      <p>{item.stopName}</p>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <div className="flex justify-around items-center">
                                        <p>Reach Time : {item.eta}</p>
                                        <p>OnBoarding :{item.onBoardingNumber} </p>
                                        <p>OffBoarding : {item.offBoardingNumber}</p>
                                      </div>

                                      {(item.onBoardingArr?.length > 0 || item.offBoardingArr?.length > 0) && (
                                        <div className="grid grid-cols-2">
                                          <div className="text-white bg-green-500 p-2">
                                            <p className="font-bold">OnBoarded</p>
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
                                            <p className="font-bold">OffBoarded</p>
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
                                      )}
                                    </AccordionDetails>
                                  </Accordion>
                                </div>
                              );
                            })}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};
