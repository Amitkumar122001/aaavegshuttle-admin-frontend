import React, { useState, useEffect } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
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
  Select,
  Button,
  FormControl,
  InputLabel,
  MenuItem
} from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
const columns = [
  { id: 'bus_id', label: 'Bus Id', align: 'center', minWidth: 100 },
  { id: 'bus_number', label: 'Bus Number', align: 'center', minWidth: 150 },
  {
    id: 'capacity',
    label: 'Capacity',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'driver_id',
    label: 'Driver Id',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'category',
    label: 'Category',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'conductor_id',
    label: 'Conductor Id',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'fuel_type',
    label: 'Fuel Type',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'tablet_imei',
    label: 'TabletIMEI',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'female_bus',
    label: 'Female Bus',
    minWidth: 150,
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
  const [busData, setBusData] = useState([]);
  const [field, setField] = useState('');
  const [value, setValue] = useState('');
  const [searchBool, setSearchBool] = useState(false);
  const [updateObj, setUpdateObj] = useState({});

  const [filterData, setFilterData] = useState([]);
  const [updateOpen, setUpdateOpen] = useState(false);

  const handleOpen = (item) => {
    setUpdateObj(item);
    setUpdateOpen(true);
  };
  const handleClose = () => setUpdateOpen(false);
  useEffect(() => {
    fetch('http://192.168.1.230:3000/app/v1/bus/getAllBuses')
      .then((res) => res.json())
      .then((data) => {
        setBusData(data.buses);
      })
      .catch((e) => console.log('Api fail ', e));
  }, []);
  useEffect(() => {
    if (value.length > 0) {
      let res;
      if (field == 'driver_id' || field == 'conductor_id') {
        res = busData?.filter((item) => item[field] == value);
      } else {
        res = busData?.filter((item) => item[field]?.includes(value));
      }
      setFilterData(res);
    } else {
      setFilterData(busData);
    }
  }, [value, busData]);
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
      case 'category': {
        setField('category');
        break;
      }
      case 'tablet_imei': {
        setField('tablet_imei');
        break;
      }
      case 'conductor_id': {
        setField('conductor_id');
        break;
      }
      default:
        setField('');
    }
    setSearchBool(false);
  };

  const [errBusNO, setErrBusNo] = useState(false);
  const [errCategory, setErrCategory] = useState(false);
  const [errFuelType, setErrFuelType] = useState(false);
  const [errTabletImei, setErrTabletImei] = useState(false);
  const [errCapacity, setErrCapacity] = useState(false);

  //updatebus
  const updateBus = () => {
    if (updateObj.bus_number != '') {
      toast.success('update successfully');
      console.log('right');
      setErrBusNo(false);
      setErrCapacity(false);
      setErrCategory(false);
      setErrFuelType(false);
      setErrTabletImei(false);
    } else {
      updateObj.bus_number == '' ? setErrBusNo(true) : setErrBusNo(false);
      updateObj.category == '' ? true : setErrCategory(false);
      updateObj.tablet_imei == '' ? setErrTabletImei(true) : setErrTabletImei(false);
      updateObj.fuel_type == '' ? setErrFuelType(true) : setErrFuelType(false);
      updateObj.capacity == '' ? setErrCapacity(true) : setErrCapacity(false);
    }
  };
  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -40%)',
    p: 4
  };
  return (
    <div className="">
      <div className="">
        <div className=" flex flex-col gap-10 bg-white p-8 max-lg:p-4 max-lg:gap-5 rounded-xl relative">
          <div>
            <p className="text-3xl text-gray-600 text-center">All Bus Details</p>
            <p className=" border border-gray-300 mt-5"></p>
          </div>
          {/* dropdown */}
          <div className="absolute right-6 max-md:right-2 max-sm:right-0 z-10">
            <button onClick={() => setSearchBool(!searchBool)} className="absolute right-2 max-md:right-1 bg-gray-200 rounded-full p-1">
              <FilterListIcon className="text-3xl max-lg:text-2xl max-md:text-lg " />
            </button>
            {searchBool && (
              <div className="flex flex-col gap-1 bg-gray-100 rounded p-4 absolute top-10 right-0 w-32">
                <button onClick={() => handleSearchField('bus_number')} className="py-1 text-sm rounded hover:bg-gray-300">
                  Bus Number
                </button>
                <button onClick={() => handleSearchField('driver_id')} className="py-1 text-sm rounded hover:bg-gray-300">
                  Driver ID
                </button>
                <button onClick={() => handleSearchField('category')} className="py-1 text-sm rounded hover:bg-gray-300">
                  category
                </button>
                <button onClick={() => handleSearchField('tablet_imei')} className="py-1 text-sm rounded hover:bg-gray-300">
                  tablet IMEI
                </button>
                <button onClick={() => handleSearchField('conductor_id')} className="py-1 text-sm rounded hover:bg-gray-300">
                  conductor Id
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
                            <TableCell align="center">{item.bus_id}</TableCell>
                            <TableCell align="center">{item.bus_number}</TableCell>
                            <TableCell align="center">{item.capacity}</TableCell>
                            <TableCell align="center">{item.driver_id}</TableCell>
                            <TableCell align="center">{item.category}</TableCell>
                            <TableCell align="center">{item.conductor_id}</TableCell>
                            <TableCell align="center">{item.fuel_type}</TableCell>
                            <TableCell align="center">{item.tablet_imei}</TableCell>
                            <TableCell align="center">{item.female_bus ? 'Yes' : 'No'}</TableCell>
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

      <Modal open={updateOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} className=" w-full max-lg:h-screen max-lg:w-screen p-4 ">
          <div>
            <Toaster />
          </div>
          <div className=" max-lg:w-full flex flex-col gap-1 bg-white my-4 p-4 rounded-xl">
            <div className="flex justify-between pb-5">
              <p className="text-xl font-bold">Update Bus</p>
              <button onClick={handleClose} className="">
                <IconX />
              </button>
            </div>
            <>
              <div>
                <div className="grid grid-cols-3 max-lg:grid-cols-2 max-lg:gap-5 max-sm:grid-cols-1 max-sm:gap-3 gap-10">
                  {/* bus ID*/}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField id="demo-simple-set" label="bus Id" disabled={true} value={updateObj.bus_id} />
                    </FormControl>
                  </div>
                  {/* vender Id */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField id="demo-simple-seect" label="vendor Id" disabled={true} />
                    </FormControl>
                  </div>
                  {/* Driver Id*/}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField id="demo-simple-seect" label="driver Id" disabled={true} value={updateObj.driver_id} />
                    </FormControl>
                  </div>
                  {/* Conductor Id */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField id="demo-simple-seec" label="conductor Id" disabled={true} value={updateObj.conductor_id} />
                    </FormControl>
                  </div>
                  {/* bus no */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        id="demo-simple-seect"
                        label="bus no"
                        value={updateObj.bus_number}
                        onChange={(e) => setUpdateObj({ ...updateObj, bus_number: e.target.value })}
                      />
                    </FormControl>
                    {errBusNO && <p className="text-red-500 ml-2 text-xs">bus no error</p>}
                  </div>
                  {/* Bus Capacity */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basi"
                        label="Capacity"
                        variant="outlined"
                        type="number"
                        value={updateObj.capacity}
                        onChange={(e) => setUpdateObj({ ...updateObj, capacity: e.target.value })}
                      />
                    </FormControl>
                    {errCapacity && <p className="text-red-500 ml-2 text-xs">Capacity error</p>}
                  </div>

                  {/* Category */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <InputLabel id="category">Category</InputLabel>
                      <Select
                        labelId="category"
                        id="demo-simle-select"
                        label="Category"
                        value={updateObj.category}
                        onChange={(e) => setUpdateObj({ ...updateObj, category: e.target.value })}
                      >
                        <MenuItem value={'1'}>Small</MenuItem>
                        <MenuItem value={'2'}>Medium</MenuItem>
                        <MenuItem value={'3'}>Large</MenuItem>
                      </Select>
                      {errCategory && <p className="text-red-500 ml-2 text-xs">category error</p>}
                    </FormControl>
                  </div>

                  {/* Fuel Type */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <InputLabel id="fuel_type">Fuel Type</InputLabel>
                      <Select
                        labelId="fuel_type"
                        id="demo-imple-select"
                        label="Fuel Type"
                        value={updateObj.fuel_type}
                        onChange={(e) => setUpdateObj({ ...updateObj, fuel_type: e.target.value })}
                      >
                        <MenuItem value="Petrol">Petrol</MenuItem>
                        <MenuItem value="Diesel">Diesel</MenuItem>
                        <MenuItem value="CNG">CNG</MenuItem>
                      </Select>
                    </FormControl>
                    {errFuelType && <p className="text-red-500 ml-2 text-xs">Category Error</p>}
                  </div>

                  {/* Passenger Type */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <InputLabel id="female_bus">Female bus</InputLabel>
                      <Select
                        labelId="female_bus"
                        id="demo-sple-select"
                        label="Female bus"
                        value={updateObj.female_bus}
                        onChange={(e) => setUpdateObj({ ...updateObj, female_bus: e.target.value })}
                      >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false} selected>
                          No
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlind-basic"
                        label="Tablet IMEI"
                        variant="outlined"
                        value={updateObj.tablet_imei}
                        onChange={(e) => setUpdateObj({ ...updateObj, tablet_imei: e.target.value })}
                      />
                    </FormControl>
                    {errTabletImei && <p className="text-red-500 ml-2 text-xs">tablet imei err</p>}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex gap-10 justify-between mb-3">
                  <Button variant="contained" className={'bg-blue-700'} onClick={updateBus}>
                    Add Bus
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
    </div>
  );
};
