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
  FormControl,
  Pagination,
  Stack
} from '@mui/material';

import { IconX } from '@tabler/icons-react';
import axios from 'axios';
import { findDay } from 'utils/TimeDate';
import { DataPacket } from 'utils/Data';

// get current Date
function getCurrentDate() {
  let today = new Date();
  let day = String(today.getDate()).padStart(2, '0');
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let year = today.getFullYear();
  let currDate = `${year}-${month}-${day}`;
  return currDate;
}

const columns = [
  { id: 'route no', label: 'Route No.', align: 'center', minWidth: 120 },
  { id: 'route name', label: 'Route Name.', align: 'center', minWidth: 300 },
  {
    id: 'bus',
    label: 'Bus',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'typetime',
    label: 'Trip Time',
    minWidth: 250,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'driver',
    label: 'Driver',
    minWidth: 150,
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
    id: 'no-show Pax',
    label: 'No-show Pax',
    minWidth: 140,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'No of adhoc',
    label: 'No of Adhoc',
    minWidth: 140,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'routehistory',
    label: 'Route History',
    minWidth: 125,
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
export const CompletedTrip = ({ itemsPerPage }) => {
  // fetch Data state And filter state
  const [allTrip, setAllTrips] = useState([...DataPacket]);
  const [filterTripData, setFilterTripData] = useState([]);
  const [startDate, setStartDate] = useState(getCurrentDate());
  const [endDate, setEndDate] = useState(getCurrentDate());
  const [routeNoF, setRouteNoF] = useState('');
  const [busNoF, setBusNoF] = useState('');
  const [updateObj, setUpdateObj] = useState({});
  const [modalopen, setModalOpen] = useState(false);
  const handleOpen = (item) => {
    // console.log(item);
    setUpdateObj(item);
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);

  // Api call
  useEffect(() => {
    if (endDate <= getCurrentDate() && startDate <= endDate) {
      axios
        .get(`http://192.168.1.167:3000/app/v1/tripManagement/completed/${startDate}/${endDate}`)
        .then((res) => setAllTrips(res.data.result))
        .catch((err) => {
          console.log('Api error : ', err);
        });
      // setAllTrips(DataPacket);
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
              max={getCurrentDate()}
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
              max={getCurrentDate()}
            />
          </div>
          <div>
            <FormControl fullWidth>
              <TextField
                type="number"
                label="Route No."
                inputProps={{
                  min: 0
                }}
                value={routeNoF}
                onChange={(e) => setRouteNoF(e.target.value)}
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
                  {/* 
                    "driverName": "Ravi",
                    "vendorName": "Aaveg",
                    "totalBookingAmountOfTrip": "0",
                    "onTime": null,
                    "onTimeBoolean": false
                }, */}
                  <TableBody>
                    {displayItems()?.map((item, i) => {
                      return (
                        <TableRow hover key={i}>
                          <TableCell align="center">{item.basicInfo.routeNumber}</TableCell>
                          <TableCell align="center">{item.basicInfo.routeName}</TableCell>
                          <TableCell align="center">{item.basicInfo.busNumber}</TableCell>
                          <TableCell align="center">{item.basicInfo.tripTime}</TableCell>
                          <TableCell align="center">{item.basicInfo.driverName}</TableCell>
                          <TableCell align="center">{item.basicInfo.noOfBookings}</TableCell>
                          <TableCell align="center">{item.basicInfo.routeNumber}</TableCell>
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
            <div className="flex justify-center">
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
        className="overflow-y-scroll h-screen w-screen"
      >
        <Box sx={style} className=" rounded bg-gray-200 w-[60%] max-lg:w-[70%] max-md:w-[80%] h-[90%] overflow-hidden">
          <div className="flex justify-center items-center">
            <div>
              <div className="flex justify-between text-xl my-2 max-md:my-1 font-bold">
                <p>Trip Details</p>
                <button onClick={handleClose} className="hover:bg-gray-400 rounded-full">
                  <IconX />
                </button>
              </div>
              <div className="overflow-y-scroll w-[100%] h-[430px] max-md:h-[640px]">
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
                  {/* trip details */}
                  <div className=" bg-cyan-900 text-gray-300 rounded p-2 h-56 grid grid-cols-1 -gap-2 ">
                    <h1 className="text-white text-xl -mb-4">Trip details</h1>
                    <span className="bg-white w-full block h-[0.2px] "></span>
                    <p>Trip status : Completed</p>
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
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};
