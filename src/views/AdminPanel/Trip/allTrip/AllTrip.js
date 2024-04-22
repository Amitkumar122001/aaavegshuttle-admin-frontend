import React, { useState, useEffect } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { IconX } from '@tabler/icons-react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  FormControl,
  // Select,
  // InputLabel,
  // MenuItem,
  Modal,
  Box
} from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { BackendUrl } from 'utils/config';
const columns = [
  { id: 'trip_id', label: 'Tip Id', align: 'center', minWidth: 100 },
  { id: 'route', label: 'Route', align: 'center', minWidth: 250 },
  { id: 'bus_number', label: 'Bus Number', align: 'center', minWidth: 150 },

  {
    id: 'driver_name',
    label: 'Driver Name',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'startendTime',
    label: 'Start-End Time',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'vendor_name',
    label: 'Vendor Name',
    minWidth: 140,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'running_days',
    label: 'Running Days',
    minWidth: 140,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },

  {
    id: 'edit',
    label: 'UPDATE',
    minWidth: 25,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  }
];

export const AllTrip = () => {
  const [allTrip, setAllTrip] = useState([]);
  const [field, setField] = useState('');
  const [value, setValue] = useState('');
  const [searchBool, setSearchBool] = useState(false);
  const [updateObj, setUpdateObj] = useState({});

  const [filterData, setFilterData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = (item) => {
    // console.log(item);
    setUpdateObj(item);
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);
  useEffect(() => {
    fetch(`${BackendUrl}/app/v1/trip/getAllMstTrip`)
      .then((res) => res.json())
      .then((data) => {
        setAllTrip(data.result);
      })
      .catch((e) => console.log('Api fail ', e));
  }, []);
  useEffect(() => {
    if (value.length > 0) {
      let res;
      if (field == 'routenumber') {
        // console.log('hello');
        res = allTrip?.filter((item) => String(item[field])?.includes(String(value)));
      } else {
        res = allTrip?.filter((item) => item[field]?.includes(value));
      }
      setFilterData(res);
    } else {
      setFilterData(allTrip);
    }
  }, [value, allTrip, field]);
  // handle input field
  const handleSearchField = (inputField) => {
    switch (inputField) {
      case 'bus_number': {
        setField('bus_number');
        break;
      }
      case 'driver_id': {
        setField('driver_id');
        break;
      }
      case 'routname': {
        setField('routname');
        break;
      }
      case 'routenumber': {
        setField('routenumber');
        break;
      }
      default:
        setField('');
    }
    setSearchBool(false);
  };

  //updateTrip
  const updateTrip = () => {
    console.log(updateObj);
    toast.success('Eror');
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    p: 4
  };
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
    buttonDisable: true
  });

  // const [runningErr, setRunningErr] = useState(false);
  const handleFullWeek = () => {
    setUpdateObj({ ...updateObj, runningDays: ['0', '1', '2', '3', '4', '5', '6'] });
    setDayDis({ ...dayDis, fullweek: true, weekday: false });
  };
  // console.log(updateObj);
  const handleWeekDay = () => {
    setUpdateObj({ ...updateObj, runningDays: ['1', '2', '3', '4', '5'] });
    setDayDis({ ...dayDis, weekday: true, fullweek: false });
  };
  const handleSelectButton = () => {
    setDayDis({ ...dayDis, buttonDisable: false });
    setUpdateObj({ ...updateObj, runningDays: [] });
  };
  // select day and disable button using object state
  const handleSelectedDays = (day, value) => {
    setUpdateObj({ ...updateObj, runningDays: [...updateObj.runningDays, value] });
    setDayDis({ ...dayDis, [day]: true });
  };
  function deleteSelectedDays(day, val) {
    let idx = updateObj.runningDays?.indexOf(val);
    updateObj.runningDays?.splice(idx, 1);
    setDayDis({ ...dayDis, [day]: false });
  }
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
      buttonDisable: true
    });
    setUpdateObj({ ...updateObj, runningDays: [] });
  };
  return (
    <>
      <div className="">
        <div className=" flex flex-col gap-10 bg-white p-4 max-lg:gap-5 rounded-xl relative">
          <div>
            <p className="text-3xl text-gray-600 text-center">All Trip Details</p>
            <p className=" border border-gray-300 mt-2"></p>
          </div>
          {/* dropdown */}
          <div className="absolute right-6 max-md:right-2 max-sm:right-0 z-10">
            <button onClick={() => setSearchBool(!searchBool)} className="absolute right-2 max-md:right-1 bg-gray-200 rounded-full p-1">
              <FilterListIcon className="text-3xl max-lg:text-2xl max-md:text-lg " />
            </button>
            {searchBool && (
              <div className="flex flex-col gap-1 bg-gray-100 rounded p-4 absolute top-10 right-0 w-32">
                <button onClick={() => handleSearchField('routenumber')} className="py-1 text-sm rounded hover:bg-gray-300">
                  Route Number
                </button>
                <button onClick={() => handleSearchField('bus_number')} className="py-1 text-sm rounded hover:bg-gray-300">
                  Bus Number
                </button>
                <button onClick={() => handleSearchField('routname')} className="py-1 text-sm rounded hover:bg-gray-300">
                  Route Name
                </button>
              </div>
            )}
          </div>
          {field != '' && (
            <div className=" px-4 -my-3 w-full">
              <TextField label={field} className="w-1/2 max-lg:w-full" onChange={(e) => setValue(e.target.value)} value={value} />
            </div>
          )}
          <div>
            <div>
              <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filterData?.map((item, i) => {
                        return (
                          <TableRow key={i} hover>
                            <TableCell align="center">{item.trip_id}</TableCell>
                            <TableCell align="center">{` ${item.routname} (${item.routenumber})`}</TableCell>
                            <TableCell align="center">{item.bus_number}</TableCell>
                            <TableCell align="center">{item.driver_name}</TableCell>
                            <TableCell align="center">{`${item.startTime} - ${item.endTime}`}</TableCell>
                            <TableCell align="center">{item.vendor_name}</TableCell>
                            <TableCell align="center">{String(item.runningDays)}</TableCell>
                            <TableCell align="center">
                              <button className="p-2 text-lg text-blue-600" onClick={() => handleOpen(item)}>
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
      </div>

      <Modal open={modalOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} className=" w-[80%] max-lg:h-screen max-lg:w-screen p-4 ">
          <div>
            <Toaster />
          </div>
          <div className=" max-lg:w-full flex flex-col gap-1 bg-white my-4 p-8 rounded-xl">
            <div className="flex justify-between pb-5">
              <p className="text-xl font-bold">Update Trip</p>
              <button onClick={handleClose} className="">
                <IconX />
              </button>
            </div>
            <>
              <div>
                <div className="grid grid-cols-3 max-lg:grid-cols-2 max-lg:gap-5 max-sm:grid-cols-1 max-sm:gap-3 gap-10">
                  {/* Route Name*/}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        id="demo-simple-seect"
                        label="Route"
                        disabled={true}
                        value={`${updateObj.routenumber} ${updateObj.routname}`}
                      />
                    </FormControl>
                  </div>
                  {/* Driver Name */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField id="demo-simple-seec" label="Driver Name" disabled={true} value={updateObj.driver_name} />
                    </FormControl>
                  </div>
                  {/* bus no */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField id="demo-simple-seect" label="bus no" value={updateObj.bus_number} disabled={true} />
                    </FormControl>
                  </div>
                  {/* Start Time */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        type="time"
                        fullWidth
                        id="outlined-basi"
                        label="Start time"
                        variant="outlined"
                        value={updateObj.startTime}
                        format="HH:mm:ss"
                        inputProps={{
                          step: 1
                        }}
                      />
                    </FormControl>
                  </div>
                  {/* End Time */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basi"
                        label="End time"
                        variant="outlined"
                        value={updateObj.endTime}
                        disabled={true}
                      />
                    </FormControl>
                  </div>
                  {/* vendor_name */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlind-basic"
                        label="Tablet IMEI"
                        variant="outlined"
                        value={updateObj.vendor_name}
                        disabled={true}
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className=" flex flex-col items-center">
                    <p className="text-xl text-gray-600 ">Select Running Days</p>
                    <p className="border w-1/2  border-gray-300 my-2"></p>
                  </div>
                  <div className="flex gap-10 justify-center px-10 mt-4">
                    {(JSON.stringify(updateObj.runningDays) == JSON.stringify(['0', '1', '2', '3', '4', '5', '6']) ||
                      JSON.stringify(updateObj.runningDays) == JSON.stringify(['1', '2', '3', '4', '5']) ||
                      updateObj.runningDays?.length == 0) &&
                    dayDis.buttonDisable ? (
                      <>
                        <div>
                          {JSON.stringify(updateObj.runningDays) == JSON.stringify(['0', '1', '2', '3', '4', '5', '6']) ? (
                            <Button variant="contained" className={'bg-green-700'} onClick={clearField}>
                              Full Weeked
                            </Button>
                          ) : (
                            <Button variant="contained" className={'bg-blue-700'} onClick={handleFullWeek}>
                              Full Weeks
                            </Button>
                          )}
                        </div>
                        <div>
                          {JSON.stringify(updateObj.runningDays) == JSON.stringify(['1', '2', '3', '4', '5']) ? (
                            <Button variant="contained" className={'bg-green-700'} onClick={clearField}>
                              Week Dayed
                            </Button>
                          ) : (
                            <Button variant="contained" className={'bg-blue-700'} onClick={handleWeekDay}>
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
                      <div className="grid  justify-center items-center w-full gap-3 grid-cols-4 max-sm:grid-cols-2">
                        {/* sunday */}
                        {updateObj.runningDays?.includes('0') ? (
                          <Button variant="contained" className="bg-green-600" onClick={() => deleteSelectedDays('sunday', '0')}>
                            Sunday
                          </Button>
                        ) : (
                          <Button variant="contained" className="bg-blue-600" onClick={() => handleSelectedDays('sunday', '0')}>
                            Sunday
                          </Button>
                        )}
                        {/* monday */}
                        {updateObj.runningDays?.includes('1') ? (
                          <Button variant="contained" className="bg-green-600" onClick={() => deleteSelectedDays('monday', '1')}>
                            monday
                          </Button>
                        ) : (
                          <Button variant="contained" className="bg-blue-600" onClick={() => handleSelectedDays('monday', '1')}>
                            monday
                          </Button>
                        )}
                        {/* tuesday */}
                        {updateObj.runningDays?.includes('2') ? (
                          <Button variant="contained" className="bg-green-600" onClick={() => deleteSelectedDays('tuesday', '2')}>
                            Tuesday
                          </Button>
                        ) : (
                          <Button variant="contained" className="bg-blue-600" onClick={() => handleSelectedDays('tuesday', '2')}>
                            Tuesday
                          </Button>
                        )}
                        {/* wednesday */}
                        {updateObj.runningDays?.includes('3') ? (
                          <Button variant="contained" className="bg-green-600" onClick={() => deleteSelectedDays('wednesday', '3')}>
                            wednesday
                          </Button>
                        ) : (
                          <Button variant="contained" className="bg-blue-600" onClick={() => handleSelectedDays('wednesday', '3')}>
                            wednesday
                          </Button>
                        )}

                        {/* thursday */}
                        {updateObj.runningDays?.includes('4') ? (
                          <Button variant="contained" className="bg-green-600" onClick={() => deleteSelectedDays('thursday', '4')}>
                            thursday
                          </Button>
                        ) : (
                          <Button variant="contained" className="bg-blue-600" onClick={() => handleSelectedDays('thursday', '4')}>
                            thursday
                          </Button>
                        )}
                        {/* friday */}
                        {updateObj.runningDays?.includes('5') ? (
                          <Button variant="contained" className="bg-green-600" onClick={() => deleteSelectedDays('friday', '5')}>
                            friday
                          </Button>
                        ) : (
                          <Button variant="contained" className="bg-blue-600" onClick={() => handleSelectedDays('friday', '5')}>
                            friday
                          </Button>
                        )}
                        {/* saturday */}
                        {updateObj.runningDays?.includes('6') ? (
                          <Button variant="contained" className="bg-green-600" onClick={() => deleteSelectedDays('saturday', '6')}>
                            saturday
                          </Button>
                        ) : (
                          <Button variant="contained" className="bg-blue-600" onClick={() => handleSelectedDays('saturday', '6')}>
                            saturday
                          </Button>
                        )}
                        <Button variant="outlined" color="error" onClick={() => clearField()}>
                          Clear
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="flex gap-10 justify-between mb-3">
                  <Button variant="contained" className={'bg-blue-700'} onClick={updateTrip}>
                    Update Trip
                  </Button>
                  <Button variant="outlined" color="error">
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          </div>
          <div className="mt-2"></div>
        </Box>
      </Modal>
      {/* update modal end */}
    </>
  );
};
