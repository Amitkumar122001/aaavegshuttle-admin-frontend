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
  AccordionDetails
} from '@mui/material';
// accordian
// import Accordion from '@mui/material/Accordion';
// import AccordionActions from '@mui/material/AccordionActions';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { IconX, IconChevronLeft } from '@tabler/icons-react'; // IconArrowDownSquare
// import { TripCard } from './TripCard';

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
    route_no: 1,
    trip: 'T3',
    time: '14:25-16:47',
    bus_no: 'busno3',
    driver_name: 'xyz',
    conductor_name: 'abc',
    No_of_booking: 58
  }
];
const allStop = [
  {
    stopName: 'Abc Mall',
    adhoc: 5,
    drop: 10,
    pickup: 8
  },
  {
    stopName: 'Abc Mall',
    adhoc: 5,
    drop: 10,
    pickup: 8
  },
  {
    stopName: 'cybercity',
    adhoc: 4,
    drop: 9,
    pickup: 12
  },
  {
    stopName: 'mulsari',
    adhoc: 10,
    drop: 2,
    pickup: 0
  },
  {
    stopName: 'A Dot',
    adhoc: 6,
    drop: 35,
    pickup: 23
  },
  {
    stopName: 'D21',
    adhoc: 100,
    drop: 26,
    pickup: 76
  },
  {
    stopName: 'sector 9',
    adhoc: 50,
    drop: 77,
    pickup: 65
  },
  {
    stopName: 'mulsari',
    adhoc: 10,
    drop: 2,
    pickup: 0
  },
  {
    stopName: 'A Dot',
    adhoc: 6,
    drop: 35,
    pickup: 23
  },
  {
    stopName: 'D21',
    adhoc: 100,
    drop: 26,
    pickup: 76
  },
  {
    stopName: 'mulsari',
    adhoc: 10,
    drop: 2,
    pickup: 0
  },
  {
    stopName: 'A Dot',
    adhoc: 6,
    drop: 35,
    pickup: 23
  },
  {
    stopName: 'D21',
    adhoc: 100,
    drop: 26,
    pickup: 76
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
export const PendingTrip = () => {
  const [modalopen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    setShowModal({ ...showModal, allDetail: true, bdBool: false, tsBool: false });
  };
  const [tripStatus, setTripStatus] = useState('');
  const [showModal, setShowModal] = useState({
    allDetail: true,
    bdBool: false,
    tsBool: false,
    sdBool: false
  });
  // fetch Data state And filter state
  const [allTrip] = useState(trips);
  const [filterTripData, setFilterTripData] = useState(allTrip);
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
        <div className="flex gap-2">
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
        {/* card:-total trip  && total route */}
        {/* <div className="grid grid-cols-3 max-md:grid-cols-1 gap-10 max-md:gap-5">
          <TripCard name="Total Trip" value={`Trip : ${10}`} total={50} />
          <TripCard name="Total Route" value={`Route : ${25}`} total={100} />
          <TripCard name="Total Rte" value={`Rte : ${3}`} total={5} />
        </div> */}
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
                          <TableCell align="center">{item.route_no}</TableCell>
                          <TableCell align="center">{item.bus_no}</TableCell>
                          <TableCell align="center">{item.driver_name}</TableCell>
                          <TableCell align="center">{`${tripTime[0]} - ${tripTime[1]}`}</TableCell>
                          <TableCell align="center">{item.conductor_name}</TableCell>
                          <TableCell align="center">{item.No_of_booking}</TableCell>
                          <TableCell align="center">
                            <button className="p-2 text-md text-blue-600" onClick={handleOpen}>
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
          className={`rounded bg-gray-200 max-lg:w-[70%] max-md:w-[80%] ${showModal.allDetail && 'h-[90%] w-[60%]'} 
          ${showModal.bdBool && 'h-[70%] max-md:h-[50%] w-[30%] rounded-xl'} ${
            showModal.tsBool && 'h-[40%] max-md:h-[30%] sm:w-[25%] rounded-xl flex items-center justify-center'
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
                        <p>bus no. : bic3ei938</p>
                        <p>Reg no. : 04-04-2024</p>
                        <p>Insurance no. : 04-04-2024</p>
                        <p>fuel type : petrol</p>
                        <p>capacity : 35</p>
                        <p>bus model : unknown</p>
                        <p>Vendor : unknown</p>
                      </div>
                      {/* Driver details */}
                      <div className=" bg-cyan-900 text-gray-300 rounded p-2 h-56 grid grid-cols-1 gap-0  ">
                        <h1 className="text-white text-xl">Driver details</h1>
                        <span className="bg-white w-full block h-[0.2px] mb-1"></span>
                        <p>driver_name. : ram</p>
                        <p>Primary no. : 04-04-2024</p>
                        <p>Emergency no. : 04-04-2024</p>
                        <p>License No.: 364827648533</p>
                        <p>License Img : view</p>
                        <p>License Expiry Date : 04-04-2024</p>
                      </div>
                      {/* trip details */}
                      <div className=" bg-cyan-900 text-gray-300 rounded p-2 h-56 grid grid-cols-1 -gap-2 ">
                        <h1 className="text-white text-xl -mb-4">Trip details</h1>
                        <span className="bg-white w-full block h-[0.2px] "></span>
                        <p>Trip status: pending</p>
                        <p>Start time : 00:00:00</p>
                        <p>End time : 00:00:00</p>
                        <p>Trip day: SMTWTFS</p>
                      </div>
                      {/* Route details */}
                      <div className=" bg-cyan-900 text-gray-300 rounded p-2 h-56 grid grid-cols-1 gap-0  ">
                        <h1 className="text-white text-xl">Route details</h1>
                        <span className="bg-white w-full block h-[0.2px] mb-1"></span>
                        <p>Route No. : 13</p>
                        <p>Start point: xyz</p>
                        <p>End point: abc</p>
                        <p>Distance : 24.7 km</p>
                        <p>Fixed rate: 100</p>
                        <p>Base rate: 100</p>
                        <p>rate/km: 100</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-between mt-2">
                    <Button
                      variant="contained"
                      className="bg-blue-500"
                      onClick={() => setShowModal({ ...showModal, allDetail: false, bdBool: true, tsBool: false, sdBool: false })}
                    >
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
                      <div>
                        <FormControl fullWidth>
                          <TextField label="Trip Id." disabled={true} className="font-semibold text-black" />
                        </FormControl>
                      </div>
                      <div>
                        <FormControl fullWidth>
                          <TextField label="Bus No." />
                        </FormControl>
                      </div>
                      <div>
                        <FormControl fullWidth>
                          <TextField label="Driver Name." />
                        </FormControl>
                      </div>
                      <div>
                        <Button variant="contained" fullWidth className="bg-blue-600 p-3 rounded-xl">
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
                    <div className="flex justify-between gap-1 text-xl font-semibold">
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
                            <MenuItem value={2}>Ongoing</MenuItem>
                            <MenuItem value={3}>Completed</MenuItem>
                            <MenuItem value={4}>BreakDown</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div>
                        <Button variant="contained" fullWidth className="bg-blue-600 p-3 rounded-xl">
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
                        {allStop.map((item, i) => {
                          return (
                            <div key={i}>
                              <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                                  <p>{item.stopName}</p>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <div className="flex justify-around">
                                    <p>PickTime : 11:12</p>
                                    <p>DropTime : 01:25</p>
                                    <p>Drop : {item.drop}</p>
                                    <p>Pick : {item.pickup}</p>
                                    <p>Adhoc : {item.adhoc}</p>
                                  </div>
                                </AccordionDetails>
                              </Accordion>
                            </div>
                          );
                        })}
                      </div>{' '}
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
