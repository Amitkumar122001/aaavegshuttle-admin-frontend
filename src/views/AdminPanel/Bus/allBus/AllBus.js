import React, { useState, useEffect } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IconX } from '@tabler/icons-react';
import LoaderCircular from 'ui-component/LoaderCircular';
import { BackendUrl, AwsBucketUrl } from 'utils/config';
import axios from 'axios';
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
  { id: 'bus_number', label: 'Bus Number', align: 'center', minWidth: 150 },
  {
    id: 'capacity',
    label: 'Capacity',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'vendor_name',
    label: 'Vendor Name',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'driver_name',
    label: 'Driver Name',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'conductor_name',
    label: 'Conductor Name',
    minWidth: 150,
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

export const AllBus = () => {
  const [busData, setBusData] = useState([]);
  const [field, setField] = useState('');
  const [value, setValue] = useState('');
  const [searchBool, setSearchBool] = useState(false);
  const [updateObj, setUpdateObj] = useState({});

  const [filterData, setFilterData] = useState([]);
  const [updateOpen, setUpdateOpen] = useState(false);
  // for refresh the page
  const [refreshPage, setRefreshPage] = useState(false);
  const handleOpen = (item) => {
    //console.log(item);
    setUpdateObj(item);
    setUpdateOpen(true);
  };
  const handleClose = () => setUpdateOpen(false);
  useEffect(() => {
    setRefreshPage(false);
    fetch(`${BackendUrl}/app/v1/bus/getAllActiveInactiveBus`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setBusData(data.buses);
      })
      .catch((e) => console.log('Api fail ', e));
  }, [refreshPage]);
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
  }, [value, busData, field]);
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

  const [busNoErr, setBusNoErr] = useState(false);
  const [categoryErr, setCategoryErr] = useState(false);
  const [fuelTypeErr, setFuelTypeErr] = useState(false);
  const [tabletImeiErr, setTabletImeiErr] = useState(false);
  const [capacityErr, setCapacityErr] = useState(false);
  const [makeDateErr, setMakeDateErr] = useState(false);
  const [tourImgErr, setTourImgErr] = useState(false);
  const [regCertErr, setRegCertErr] = useState(false);

  const [insurImgErr, setInsurErr] = useState(false);
  const [pollutionImgErr, setPollutionImgErr] = useState(false);
  const [regDateErr, setRegDateErr] = useState(false);
  const [carriageImgErr, setCarriageImgErr] = useState(false);
  const [fitnessImgErr, setFitnessImgErr] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  //updatebus
  const updateBus = () => {
    if (
      updateObj.bus_number != undefined &&
      updateObj.category != undefined &&
      updateObj.fuel_type != undefined &&
      updateObj.capacity != undefined &&
      updateObj.tablet_imei != undefined &&
      updateObj.bus_document.fitnessCert != undefined &&
      updateObj.bus_document.carriagePermitCert != undefined &&
      updateObj.bus_document.touriestPermitCert !== undefined &&
      updateObj.bus_document.pollutionCert != undefined &&
      updateObj.bus_document.insuranceCert != undefined &&
      updateObj.bus_document.regCert != undefined &&
      updateObj.registration_date != undefined &&
      updateObj.make_date != undefined
    ) {
      const document = {
        pollutionCert: updateObj.bus_document?.pollutionCert,
        touriestPermitCert: updateObj.bus_document?.touriestPermitCert,
        fitnessCert: updateObj.bus_document?.fitnessCert,
        carriagePermitCert: updateObj.bus_document?.carriagePermitCert,
        insuranceCert: updateObj.bus_document?.insuranceCert,
        regCert: updateObj.bus_document?.regCert
      };
      const body = {
        busid: updateObj.bus_id,
        busNumber: updateObj.bus_number,
        busCapacity: updateObj.capacity,
        busCategory: updateObj.category,
        busFuelType: updateObj.fuel_type,
        busTabletImei: updateObj.tablet_imei,
        femaleBus: Boolean(updateObj.female_bus),
        activeStatus: Boolean(updateObj.isActive),
        makeDate: updateObj.make_date,
        registrationDate: updateObj.registration_date,
        isBusAC: Boolean(updateObj.isAC),
        busDocuments: document
      };
      console.log(body);
      axios
        .patch(`${BackendUrl}/app/v1/bus/editBus`, body, { headers: {} })
        .then((res) => {
          if (res.data.busUpdated) {
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
          // console.log(res);
          // toast.success('Bus updated SuccessFully');
        })
        .catch((e) => {
          console.log('api Failed ', e);
          toast.error('Error');
        });
    } else {
      updateObj.bus_number == undefined ? setBusNoErr(true) : setBusNoErr(false);
      updateObj.category == undefined ? setCategoryErr(true) : setCategoryErr(false);
      updateObj.fuel_type == undefined ? setFuelTypeErr(true) : setFuelTypeErr(false);
      updateObj.capacity == undefined ? setCapacityErr(true) : setCapacityErr(false);
      updateObj.tablet_imei == undefined ? setTabletImeiErr(true) : setTabletImeiErr(false);
      updateObj.bus_document?.fitnessCert == undefined ? setFitnessImgErr(true) : setFitnessImgErr(false);
      updateObj.bus_document?.carriagePermitCert == undefined ? setCarriageImgErr(true) : setCarriageImgErr(false);
      updateObj.bus_document?.touriestPermitCert == undefined ? setTourImgErr(true) : setTourImgErr(false);
      updateObj.bus_document?.pollutionCert == undefined ? setPollutionImgErr(true) : setPollutionImgErr(false);
      updateObj.bus_document?.insuranceCert == undefined ? setInsurErr(true) : setInsurErr(false);
      updateObj.bus_document?.regCert == undefined ? setRegCertErr(true) : setRegCertErr(false);
      updateObj.registration_date == undefined ? setRegDateErr(true) : setRegDateErr(false);
      updateObj.make_date == undefined ? setMakeDateErr(true) : setMakeDateErr(false);
    }
    setRefreshPage(true);
  };

  // handle document upload
  const handleDocumentPhoto = async (event) => {
    const name = event.target.name;
    // console.log(event, field);
    setisLoading(true);
    const link = await UploadDocumenttos3Bucket(event);
    setUpdateObj({ ...updateObj, bus_document: { ...updateObj.bus_document, [name]: link } });
    setisLoading(false);
  };
  const imageUploadApi = async (value) => {
    let result = await axios.request(value);
    // console.log(result.data.name);
    let imageName = result.data.name;
    return imageName;
  };

  const UploadDocumenttos3Bucket = async (e) => {
    const reader = new FormData();
    reader.append('file', e.target.files[0]);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${AwsBucketUrl}/app/v1/aws/upload/driverimages`,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: reader
    };
    let imageName = await imageUploadApi(config);
    let totalUrl = `${AwsBucketUrl}/app/v1/aws/getImage/driverimages/` + imageName;
    return totalUrl;
  };

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  // const [itemsPerPage,setItemPerPAge]=useState(5);
  const totalPages = Math.ceil(filterData.length / itemsPerPage);

  const displayItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filterData.slice(startIndex, endIndex);
  };
  const handlePrev = () => {
    if (currentPage <= 1) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage((page) => page - 1);
    }
  };
  const handleNext = () => {
    if (currentPage >= totalPages) {
      setCurrentPage(1);
    } else {
      setCurrentPage((page) => page + 1);
    }
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    p: 4
  };

  // child modal setstate

  const [activeState, setActiveState] = useState(false);
  const [isactive, setisactive] = useState(null);
  const [textData, setTextData] = useState('');
  const handleActiveStatus = (value) => {
    setTextData(value);
    setActiveState(true);
  };
  useEffect(() => {
    setUpdateObj({ ...updateObj, isActive: isactive });
  }, [isactive]);
  // console.log(updateObj);
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
                      {displayItems()?.map((item, i) => {
                        // console.log(item)
                        return (
                          <TableRow key={i} hover>
                            <TableCell align="center">{item.bus_number}</TableCell>
                            <TableCell align="center">{item.capacity}</TableCell>
                            <TableCell align="center">{item.vendor_name}</TableCell>
                            <TableCell align="center">{item.driver_name}</TableCell>
                            <TableCell align="center">{item.conductor_name}</TableCell>
                            <TableCell align="center">{item.category}</TableCell>
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
              {totalPages > 0 && (
                <div className="mt-2">
                  <div className="flex justify-center gap-4">
                    <button className="font-bold bg-blue-600 px-3 text-white rounded" onClick={() => handlePrev()}>
                      {'<<'}
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`flex justify-center items-center bg-blue-500 px-2 py-1 rounded-full ${
                          currentPage == pageNumber ? 'text-white bg-red-500' : 'text-black'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    ))}

                    <button className="font-bold bg-blue-600 px-3 text-white rounded" onClick={() => handleNext()}>
                      {'>>'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={updateOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="overflow-y-scroll h-screen"
      >
        <Box sx={style} className="w-full h-screen p-4">
          <div>
            <Toaster />
          </div>
          {isLoading && (
            <div>
              <LoaderCircular />
            </div>
          )}
          <div className=" max-lg:w-full flex flex-col gap-1 bg-white my-4 p-4 rounded-xl">
            <div className="flex justify-between pb-5">
              <p className="text-xl font-bold">Update Bus</p>
              <button onClick={handleClose} className="">
                <IconX />
              </button>
            </div>
            <>
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-3 max-lg:grid-cols-2 max-lg:gap-5 max-sm:grid-cols-1 max-sm:gap-3 gap-5">
                  {/* bus ID*/}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField id="demo-simple-set" label="bus Id" disabled={true} value={updateObj.bus_id} />
                    </FormControl>
                  </div>
                  {/* vender Id */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField id="demo-simple-seect" label="vendor Id" disabled={true} value={updateObj.vendor_id} />
                    </FormControl>
                  </div>
                  {/* Driver Id*/}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField id="demo-simple-seet" label="driver Id" disabled={true} value={updateObj.driver_id} />
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
                        id="demo-simple-sect"
                        label="bus no"
                        value={updateObj.bus_number}
                        onChange={(e) => setUpdateObj({ ...updateObj, bus_number: e.target.value })}
                      />
                    </FormControl>
                    {busNoErr && <p className="text-red-500 ml-2 text-xs">bus no error</p>}
                  </div>
                  {/* Bus Capacity */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-basi"
                        label="Capacity"
                        variant="outlined"
                        type="number"
                        value={updateObj.capacity}
                        onChange={(e) => setUpdateObj({ ...updateObj, capacity: e.target.value })}
                      />
                    </FormControl>
                    {capacityErr && <p className="text-red-500 ml-2 text-xs">Capacity error</p>}
                  </div>
                  {/* Category */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-basi"
                        label="Category"
                        variant="outlined"
                        value={updateObj.category}
                        onChange={(e) => setUpdateObj({ ...updateObj, category: e.target.value })}
                      />
                    </FormControl>
                    {categoryErr && <p className="text-red-500 ml-2 text-xs">category error</p>}
                  </div>
                  {/* Fuel Type */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <InputLabel id="fuel_type">Fuel Type</InputLabel>
                      <Select
                        labelId="fuel_type"
                        id="demo-imple-select"
                        label="Fuel Type"
                        value={updateObj.fuel_type || 'Na'}
                        onChange={(e) => setUpdateObj({ ...updateObj, fuel_type: e.target.value })}
                      >
                        <MenuItem value="Petrol">Petrol</MenuItem>
                        <MenuItem value="Diesel">Diesel</MenuItem>
                        <MenuItem value="CNG">CNG</MenuItem>
                      </Select>
                    </FormControl>
                    {fuelTypeErr && <p className="text-red-500 ml-2 text-xs">Category Error</p>}
                  </div>
                  {/* Passenger Type */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <InputLabel id="female_bus">Female bus</InputLabel>
                      <Select
                        labelId="female_bus"
                        id="demo-sple-select"
                        label="Female bus"
                        value={Boolean(updateObj.female_bus)}
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
                    {tabletImeiErr && <p className="text-red-500 ml-2 text-xs">tablet imei err</p>}
                  </div>{' '}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <InputLabel id="busAc">Bus AC/Non-Ac</InputLabel>
                      <Select
                        labelId="busAc"
                        id="demo-simpl-select"
                        label="Bus AC/Non-Ac"
                        value={Boolean(updateObj.isAC)}
                        onChange={(e) => setUpdateObj({ ...updateObj, isAC: e.target.value })}
                      >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div>
                  {/* sldfj */}
                  <div className="grid grid-cols-3 max-md:grid-cols-1 gap-8 max-lg:gap-6 max-md:gap-4">
                    <div className="w-full">
                      <InputLabel>Make Date</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="demo-simple-seect"
                          label=""
                          value={updateObj.make_date}
                          onChange={(e) => setUpdateObj({ ...updateObj, make_date: e.target.value })}
                        ></TextField>
                      </FormControl>
                      {makeDateErr && <p className="text-xs text-red-500 ml-2">make Date Error</p>}
                    </div>

                    <div className="w-full">
                      <InputLabel>Reg Date</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="demo-simple-seect"
                          label=""
                          value={updateObj.registration_date}
                          onChange={(e) => setUpdateObj({ ...updateObj, registration_date: e.target.value })}
                        ></TextField>
                      </FormControl>
                      {regDateErr && <p className="text-xs text-red-500 ml-2">Reg date Error</p>}
                    </div>
                    <div className="w-full">
                      {updateObj.bus_document?.regCert == undefined ? (
                        <>
                          <InputLabel className="capitalize">regCert</InputLabel>
                          <FormControl fullWidth>
                            <TextField type="file" variant="outlined" name="regCert" onChange={(e) => handleDocumentPhoto(e)} />
                          </FormControl>
                        </>
                      ) : (
                        <div className="flex justify-between">
                          <img src={updateObj.bus_document.regCert} alt="regCert" className="w-20 h-20 rounded-xl" />
                          <Button
                            onClick={() => setUpdateObj({ ...updateObj, bus_document: { ...updateObj.bus_document, regCert: undefined } })}
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      )}
                      {regCertErr && <p className="text-xs text-red-500 ml-2">Bus reg cert Error</p>}
                    </div>

                    <div>
                      {updateObj.bus_document?.insuranceCert == undefined ? (
                        <>
                          <InputLabel className="capitalize">insuranceCert</InputLabel>
                          <FormControl fullWidth>
                            <TextField type="file" variant="outlined" name="insuranceCert" onChange={(e) => handleDocumentPhoto(e)} />
                          </FormControl>
                        </>
                      ) : (
                        <div className="flex justify-between">
                          <img src={updateObj.bus_document?.insuranceCert} alt="insuranceCert" className="w-20 h-20 rounded-xl" />
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, bus_document: { ...updateObj.bus_document, insuranceCert: undefined } })
                            }
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      )}
                      {insurImgErr && <p className="text-red-500 text-xs ml-2">insuranceImg error</p>}
                    </div>

                    <div>
                      {updateObj.bus_document?.pollutionCert == undefined ? (
                        <>
                          <InputLabel className="capitalize">pollutionCert</InputLabel>
                          <FormControl fullWidth>
                            <TextField type="file" variant="outlined" name="pollutionCert" onChange={(e) => handleDocumentPhoto(e)} />
                          </FormControl>
                        </>
                      ) : (
                        <div className="flex justify-between">
                          <img src={updateObj.bus_document.pollutionCert} alt="pollutionCert" className="w-20 h-20 rounded-xl" />
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, bus_document: { ...updateObj.bus_document, pollutionCert: undefined } })
                            }
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      )}
                      {pollutionImgErr && <p className="text-red-500 text-xs ml-2">pollutionCert error</p>}
                    </div>

                    <div>
                      {updateObj.bus_document?.touriestPermitCert == undefined ? (
                        <>
                          <InputLabel className="capitalize">touriestPermitCert</InputLabel>
                          <FormControl fullWidth>
                            <TextField type="file" variant="outlined" name="touriestPermitCert" onChange={(e) => handleDocumentPhoto(e)} />
                          </FormControl>
                        </>
                      ) : (
                        <div className="flex justify-between">
                          <img src={updateObj.bus_document.touriestPermitCert} alt="touriestPermitCert" className="w-20 h-20 rounded-xl" />
                          <Button
                            onClick={() =>
                              setUpdateObj({
                                ...updateObj,
                                bus_document: {
                                  ...updateObj.bus_document,
                                  touriestPermitCert: undefined
                                }
                              })
                            }
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      )}
                      {tourImgErr && <p className="text-red-500 text-xs ml-2">touriestPermitCert error</p>}
                    </div>

                    <div>
                      {updateObj.bus_document?.carriagePermitCert == undefined ? (
                        <>
                          <InputLabel className="capitalize">carriagePermitCert</InputLabel>
                          <FormControl fullWidth>
                            <TextField type="file" variant="outlined" name="carriagePermitCert" onChange={(e) => handleDocumentPhoto(e)} />
                          </FormControl>
                        </>
                      ) : (
                        <div className="flex justify-between">
                          <img src={updateObj.bus_document?.carriagePermitCert} alt="carriagePermitCert" className="w-20 h-20 rounded-xl" />
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, bus_document: { ...updateObj.bus_document, carriagePermitCert: undefined } })
                            }
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      )}
                      {carriageImgErr && <p className="text-red-500 text-xs ml-2">carriagePermitCert error</p>}
                    </div>

                    <div>
                      {updateObj.bus_document?.fitnessCert == undefined ? (
                        <>
                          <InputLabel className="capitalize">fitnessCert</InputLabel>
                          <FormControl fullWidth>
                            <TextField type="file" variant="outlined" name="fitnessCert" onChange={(e) => handleDocumentPhoto(e)} />
                          </FormControl>
                        </>
                      ) : (
                        <div className="flex justify-between">
                          <img src={updateObj.bus_document?.fitnessCert} alt="fitnessCert" className="w-20 h-20 rounded-xl" />
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, bus_document: { ...updateObj.bus_document, fitnessCert: undefined } })
                            }
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      )}
                      {fitnessImgErr && <p className="text-red-500 text-xs ml-2">fitnessCert error</p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                {updateObj.isActive == 1 ? (
                  <Button onClick={() => handleActiveStatus('Deactivate')} className="bg-green-500 text-white">
                    Activated
                  </Button>
                ) : (
                  <Button onClick={() => handleActiveStatus('Activate')} className="bg-red-600 text-white">
                    Deactivated
                  </Button>
                )}
              </div>
              <ActiveStatusModal
                setisactive={setisactive}
                updateObj={updateObj}
                textData={textData}
                activeState={activeState}
                setActiveState={setActiveState}
              />

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
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  //border: '0px solid #000',
  boxShadow: 24,
  p: 3
  // pt: 2,
  // px: 4,
  // pb: 3
};

function ActiveStatusModal({ setisactive, textData, activeState, setActiveState }) {
  const handleClose = () => {
    setActiveState(false);
  };
  const handleActiveStatusChange = () => {
    textData == 'Deactivate' ? setisactive(false) : setisactive(true);
    handleClose();
  };
  return (
    <>
      <Modal open={activeState} onClose={handleClose} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
        <Box sx={{ ...style, width: 320 }} className="rounded">
          <h2 id="child-modal-title" className="font-semibold text-lg mb-4">
            Do you want to {textData} the Bus ?
          </h2>

          <div className="flex justify-between">
            {
              <Button
                onClick={() => handleActiveStatusChange()}
                className={textData == 'Deactivate' ? 'bg-red-700 text-white' : 'bg-green-700 text-white hover:bg-green-500'}
              >
                {textData}
              </Button>
            }

            <Button onClick={handleClose} variant="outlined" color="error">
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
