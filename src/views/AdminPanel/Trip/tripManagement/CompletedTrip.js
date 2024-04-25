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
  //   Select,
  //   Button,
  FormControl
  //   InputLabel,
  //   MenuItem
} from '@mui/material';
import { IconX } from '@tabler/icons-react'; // IconArrowDownSquare

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
  { id: 'route no', label: 'Route No.', align: 'center', minWidth: 80 },
  { id: 'route name', label: 'Route Name.', align: 'center', minWidth: 150 },
  {
    id: 'triptype',
    label: 'Trip Type',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: ' time',
    label: 'Trip Time',
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
const trips = [
  {
    route_no: 1,
    trip: 'T1',
    time: '07:15-09:57',
    bus_no: 'busno1',
    driver_name: 'xyz',
    conductor_name: 'abc',
    No_of_booking: 56
  },
  {
    route_no: 1,
    trip: 'T2',
    time: '10:45-13:37',
    bus_no: 'busno2',
    driver_name: 'xyz',
    conductor_name: 'abc',
    No_of_booking: 57
  },
  {
    route_no: 2,
    trip: 'T3',
    time: '14:25-16:47',
    bus_no: 'busno3',
    driver_name: 'xyz',
    conductor_name: 'abc',
    No_of_booking: 58
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
export const CompletedTrip = () => {
  const [modalopen, setModalOpen] = useState(false);
  const handleOpen = (item) => {
    console.log(item);
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);
  // fetch Data state And filter state
  const [allTrip] = useState(trips);
  const [filterTripData, setFilterTripData] = useState(allTrip);
  const [tripDate, setTripDate] = useState(getCurrentDate());
  const [routeNoF, setRouteNoF] = useState('');
  const [busNoF, setBusNoF] = useState('');

  useEffect(() => {
    let res = '';
    if (routeNoF != '' && busNoF != '') {
      res = allTrip.filter((item) => {
        // Check if all fields match the criteria
        return item.route_no == routeNoF && String(item.bus_no).includes(busNoF);
      });
      // console.log('routeno, busno and trip : ', res);
      setFilterTripData(res);
      return;
    } else if (routeNoF != '') {
      res = allTrip.filter((item) => {
        // Check if all fields match the criteria
        return item.route_no == routeNoF;
      });
      // console.log('routeno, busno and trip : ', res);
      setFilterTripData(res);
      return;
    } else if (busNoF != '') {
      res = allTrip.filter((item) => {
        // Check if all fields match the criteria
        return String(item.bus_no).includes(busNoF);
      });
      // console.log('busno : ', res);
      setFilterTripData(res);
      return;
    } else {
      setFilterTripData(allTrip);
    }
  }, [allTrip, routeNoF, busNoF]);
  return (
    <>
      <div className="flex flex-col gap-10 max-md:gap-5">
        {/* filter */}
        <div className="flex max-md:flex-col gap-2">
          <div className="max-md:grow max-md:w-full text-center">
            <TextField
              type="date"
              value={tripDate}
              onChange={(e) => setTripDate(e.target.value)}
              className="border border-gray-300 rounded"
            />
          </div>
          <div className="flex gap-2">
            <div>
              <FormControl fullWidth>
                <TextField label="Route No." value={routeNoF} onChange={(e) => setRouteNoF(e.target.value)} />{' '}
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth>
                <TextField label="Bus No" value={busNoF} onChange={(e) => setBusNoF(e.target.value)} />{' '}
              </FormControl>
            </div>
          </div>
        </div>
        {/* All trip */}
        <div>
          <div className="my-1">
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
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
                    {filterTripData.map((item, i) => {
                      const tripTime = item.time.split('-');
                      return (
                        <TableRow hover key={i}>
                          <TableCell align="center">{item.route_no}</TableCell>
                          <TableCell align="center">{`${tripTime[0]} - ${tripTime[1]}`}</TableCell>
                          <TableCell align="center">{item.bus_no}</TableCell>
                          <TableCell align="center">{item.driver_name}</TableCell>
                          <TableCell align="center">{item.conductor_name}</TableCell>
                          <TableCell align="center">{item.No_of_booking}</TableCell>
                          <TableCell align="center">{item.No_of_booking}</TableCell>
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
        className="overflow-y-scroll h-screen w-screen"
      >
        <Box sx={style} className=" rounded bg-gray-200 w-[60%] max-lg:w-[70%] max-md:w-[80%] h-[90%] overflow-hidden">
          <div className="flex justify-center items-center">
            <div>
              <div className="flex justify-between text-xl my-2 max-md:my-1 font-bold">
                <p>Trip Details : Completed</p>
                <button onClick={handleClose} className="hover:bg-gray-400 rounded-full">
                  <IconX />
                </button>
              </div>
              <div className="overflow-y-scroll w-[100%] h-[430px] max-md:h-[640px]">
                <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-4  h-full w-full">
                  {/* bus details */}
                  <div className="w-56 h-56 bg-cyan-900 text-gray-300 rounded p-2  grid grid-cols-1 gap-0 ">
                    <h1 className="text-white text-xl">Bus details</h1>
                    <p>bus no. : bic3ei938</p>
                    <p>Reg no. : 04-04-2024</p>
                    <p>Insurance no. : 04-04-2024</p>
                    <p>fuel type : petrol</p>
                    <p>capacity : 35</p>
                    <p>bus model : unknown</p>
                    <p>Vendor : unknown</p>
                  </div>
                  {/* Driver details */}
                  <div className="w-56 bg-cyan-900 text-gray-300 rounded p-2 h-56 grid grid-cols-1 gap-0  ">
                    <h1 className="text-white text-xl">Driver details</h1>
                    <p>driver_name. : ram</p>
                    <p>Primary no. : 04-04-2024</p>
                    <p>Emergency no. : 04-04-2024</p>
                    <p>License No.: 364827648533</p>
                    <p>License Img : view</p>
                    <p>License Expiry Date : 04-04-2024</p>
                  </div>
                  {/* trip details */}
                  <div className="w-56 bg-cyan-900 text-gray-300 rounded p-2 h-56 grid grid-cols-1 gap-0 ">
                    <h1 className="text-white text-xl">Trip details</h1>
                    <p>Trip status: pending</p>
                    <p>Start time : 00:00:00</p>
                    <p>End time : 00:00:00</p>
                    <p>Trip day: SMTWTFS</p>
                  </div>
                  {/* Route details */}
                  <div className="w-56 bg-cyan-900 text-gray-300 rounded p-2 h-56 grid grid-cols-1 gap-0  ">
                    <h1 className="text-white text-xl">Route details</h1>
                    <p>Route No. : 13</p>
                    <p>Start point: xyz</p>
                    <p>End point: abc</p>
                    <p>Distance : 24.7 km</p>
                    <p>Fixed rate: 100</p>
                    <p>Base rate: 100</p>
                    <p>rate/km: 100</p>
                  </div>
                  {/* Booking details */}
                  <div className="w-56 bg-cyan-900 text-gray-300 rounded p-2  ">
                    <h1 className="text-white text-xl ">Booking details</h1>
                    <p>booking_id :</p>
                    <p>reservation_id : </p>
                    <p>user_id : </p>
                    <p>user_picklocation : </p>
                    <p>user_droplocation : </p>
                    <p>bus_picklocation :</p>
                    <p>bus_droplocation :</p>
                    <p>booking_status : </p>
                    <p>booking_date : </p>
                    <p>pickuptime : </p>
                    <p>droptime : </p>
                    <p>user_to_stop_distance : </p>
                    <p>busdrop_to_user_distance : </p>
                    <p>book_otp : </p>
                    <p>total_seats : </p>
                    <p>payment_id : </p>
                    <p>booking_type_id : </p>
                    <p>booking_created_at : </p>
                    <p>isAdhoc : </p>
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
