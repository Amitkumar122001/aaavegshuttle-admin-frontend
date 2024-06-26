import React, { useState, useEffect } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, Pagination, Stack, Modal } from '@mui/material';
import { IconX } from '@tabler/icons-react';
import LoaderCircular from 'ui-component/LoaderCircular';
import { BackendUrl } from 'utils/config';
import { UploadDocumenttos3Bucket } from 'utils/AwsS3Bucket';
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

  useEffect(() => {
    setRefreshPage(false);
    fetch(`${BackendUrl}/app/v1/bus/getAllBuses`) // getAllActiveInactiveBus
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
  const handleOpen = (item) => {
    console.log(item);
    setUpdateObj(item);
    setUpdateOpen(true);
  };
  const handleClose = () => setUpdateOpen(false);
  // error State
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
  const [regEndDateErr, setRegEndDateErr] = useState(false);
  const [tourStartdateErr, setTourStartdateErr] = useState(false);
  const [insurStartdateErr, setInsurStartdateErr] = useState(false);
  const [pollutionStartdateErr, setPollutionStartdateErr] = useState(false);
  const [carriageStartdateErr, setCarriageStartdateErr] = useState(false);
  const [fitnessdateStartErr, setFitnessStartdateErr] = useState(false);
  const [fitnessEnddateErr, setFitnessEnddateErr] = useState(false);
  const [tourEnddateErr, setTourEnddateErr] = useState(false);
  const [insurEnddateErr, setInsurEnddateErr] = useState(false);
  const [pollutionEnddateErr, setPollutionEnddateErr] = useState(false);
  const [carriageEnddateErr, setCarriageEnddateErr] = useState(false);
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
      updateObj.make_date != undefined &&
      updateObj.contract_carriage_end_date != undefined &&
      updateObj.contract_carriage_start_date != undefined &&
      updateObj.driverContact != undefined &&
      updateObj.fitness_certificate_end_date != undefined &&
      updateObj.fitness_certificate_start_date != undefined &&
      updateObj.insurance_end_date != undefined &&
      updateObj.insurance_start_date != undefined &&
      updateObj.pollution_end_date != undefined &&
      updateObj.pollution_start_date != undefined &&
      updateObj.registration_end_date != undefined &&
      updateObj.tourist_permit_end_date != undefined &&
      updateObj.tourist_permit_start_date != undefined
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
        busDocuments: document,
        insuranceStart: updateObj.insurance_start_date,
        insuranceEnd: updateObj.insurance_end_date,
        pollutionStart: updateObj.pollution_start_date,
        pollutionEnd: updateObj.pollution_end_date,
        touristPermitStart: updateObj.tourist_permit_start_date,
        touristPermitEnd: updateObj.tourist_permit_end_date,
        contractCarriageStart: updateObj.contract_carriage_start_date,
        contractCarriageEnd: updateObj.contract_carriage_end_date,
        fitnessCertificateStart: updateObj.fitness_certificate_start_date,
        fitnessCertificateEnd: updateObj.fitness_certificate_end_date,
        registrationEnd: updateObj.registration_end_date
      };
      console.log(body);
      axios
        .patch(`${BackendUrl}/app/v1/bus/editBus`, body)
        .then((res) => {
          if (res.data.busUpdated) {
            window.alert(res.data.message);
            handleClose();
          } else {
            toast.error(res.data.message);
          }
          setRefreshPage(true);
          console.log(res.data);
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
      updateObj.pollution_end_date == undefined ? setPollutionEnddateErr(true) : setPollutionEnddateErr(false);
      updateObj.pollution_start_date == undefined ? setPollutionStartdateErr(true) : setPollutionStartdateErr(false);
      updateObj.contract_carriage_end_date == undefined ? setCarriageEnddateErr(true) : setCarriageEnddateErr(false);
      updateObj.contract_carriage_start_date == undefined ? setCarriageStartdateErr(true) : setCarriageStartdateErr(false);
      updateObj.insurance_end_date == undefined ? setInsurEnddateErr(true) : setInsurEnddateErr(false);
      updateObj.insurance_start_date == undefined ? setInsurStartdateErr(true) : setInsurStartdateErr(false);
      updateObj.fitness_certificate_end_date == undefined ? setFitnessEnddateErr(true) : setFitnessEnddateErr(false);
      updateObj.fitness_certificate_start_date == undefined ? setFitnessStartdateErr(true) : setFitnessStartdateErr(false);
      updateObj.tourist_permit_end_date == undefined ? setTourEnddateErr(true) : setTourEnddateErr(false);
      updateObj.tourist_permit_start_date == undefined ? setTourStartdateErr(true) : setTourStartdateErr(false);
      updateObj.registration_end_date == undefined ? setRegEndDateErr(true) : setRegEndDateErr(false);
    }
  };

  // handle document upload
  const handleDocumentPhoto = async (event) => {
    const name = event.target.name;
    // console.log(event, field);
    setisLoading(true);
    const link = await UploadDocumenttos3Bucket(event, 'driverimages');
    setUpdateObj({ ...updateObj, bus_document: { ...updateObj.bus_document, [name]: link } });
    setisLoading(false);
  };

  // const imageUploadApi = async (value) => {
  //   let result = await axios.request(value);
  //   // console.log(result.data.name);
  //   let imageName = result.data.name;
  //   return imageName;
  // };

  // const UploadDocumenttos3Bucket = async (e) => {
  //   const reader = new FormData();
  //   reader.append('file', e.target.files[0]);
  //   let config = {
  //     method: 'post',
  //     maxBodyLength: Infinity,
  //     url: `${AwsBucketUrl}/app/v1/aws/upload/driverimages`,
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     },
  //     data: reader
  //   };
  //   let imageName = await imageUploadApi(config);
  //   let totalUrl = `${AwsBucketUrl}/app/v1/aws/getImage/driverimages/` + imageName;
  //   return totalUrl;
  // };

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
  const handleChange = (event, value) => {
    setCurrentPage(value);
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
              <div className="flex  justify-center">
                <Stack spacing={2}>
                  <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
                </Stack>{' '}
              </div>
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
                      <TextField id="demo-simple-seect" label="vendor name" disabled={true} value={updateObj.vendor_name} />
                    </FormControl>
                  </div>
                  {/* Driver Id*/}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField id="demo-simple-seet" label="driver name" disabled={true} value={updateObj.driver_name} />
                    </FormControl>
                  </div>
                  {/* Conductor Id */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField id="demo-simple-seec" label="conductor name" disabled={true} value={updateObj.conductor_name} />
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
                        <MenuItem value="Electric">Electric</MenuItem>
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
                      <InputLabel>Reg End Date</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="demo-simple-seect"
                          label=""
                          value={updateObj.registration_end_date}
                          onChange={(e) => setUpdateObj({ ...updateObj, registration_end_date: e.target.value })}
                        ></TextField>
                      </FormControl>
                      {regEndDateErr && <p className="text-xs text-red-500 ml-2">Reg End date Error</p>}
                    </div>
                    {/* insurance start date */}
                    <div className="">
                      <InputLabel>Insurance Start</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="demo-simple-ct"
                          label=""
                          value={updateObj.insurance_start_date}
                          onChange={(e) => setUpdateObj({ ...updateObj, insurance_start_date: e.target.value })}
                        ></TextField>
                      </FormControl>
                      {insurStartdateErr && <p className="text-xs text-red-500 ml-2">Insurance start Error</p>}
                    </div>
                    {/* insurance expiry */}
                    <div className="w-full">
                      <InputLabel>Insurance expiry</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="demo-simple"
                          label=""
                          value={updateObj.insurance_end_date}
                          onChange={(e) => setUpdateObj({ ...updateObj, insurance_end_date: e.target.value })}
                        ></TextField>
                      </FormControl>
                      {insurEnddateErr && <p className="text-xs text-red-500 ml-2">insurance end date Error</p>}
                    </div>
                    {/*  polution start  */}
                    <div className="">
                      <InputLabel>polution Start Date</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="demo-simple-ct"
                          label=""
                          value={updateObj.pollution_start_date}
                          onChange={(e) => setUpdateObj({ ...updateObj, pollution_start_date: e.target.value })}
                        ></TextField>
                      </FormControl>
                      {pollutionStartdateErr && <p className="text-xs text-red-500 ml-2">pollutionStart Error</p>}
                    </div>
                    {/* pollution cert Expiry */}
                    <div className="w-full">
                      <InputLabel>pollution expiry</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="demo-seect"
                          label=""
                          value={updateObj.pollution_end_date}
                          onChange={(e) => setUpdateObj({ ...updateObj, pollution_end_date: e.target.value })}
                        ></TextField>
                      </FormControl>
                      {pollutionEnddateErr && <p className="text-xs text-red-500 ml-2">pollution end date Error</p>}
                    </div>
                    {/*  Tourpermit start  */}
                    <div className="">
                      <InputLabel>TourPermit Start Date</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="demo-simple-ct"
                          label=""
                          value={updateObj.tourist_permit_start_date}
                          onChange={(e) => setUpdateObj({ ...updateObj, tourist_permit_start_date: e.target.value })}
                        ></TextField>
                      </FormControl>
                      {tourStartdateErr && <p className="text-xs text-red-500 ml-2">TourPermit start date Error</p>}
                    </div>
                    {/* TourPermit Expiry */}
                    <div className="w-full">
                      <InputLabel>TourPermit Expiry</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="d-simple-seect"
                          label=""
                          value={updateObj.tourist_permit_end_date}
                          onChange={(e) => setUpdateObj({ ...updateObj, tourist_permit_end_date: e.target.value })}
                        ></TextField>
                      </FormControl>
                      {tourEnddateErr && <p className="text-xs text-red-500 ml-2">tourPermit Expiry Error</p>}
                    </div>
                    {/*  carriage start  */}
                    <div className="">
                      <InputLabel>carriage Start Date</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="demo-simple-ct"
                          label=""
                          value={updateObj.contract_carriage_start_date}
                          onChange={(e) => setUpdateObj({ ...updateObj, contract_carriage_start_date: e.target.value })}
                        ></TextField>
                      </FormControl>
                      {carriageStartdateErr && <p className="text-xs text-red-500 ml-2">carriageStartdateErr date Error</p>}
                    </div>
                    {/* carriagePermit expiry */}
                    <div className="w-full">
                      <InputLabel>carriagePermit expiry</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="demle-seect"
                          label=""
                          value={updateObj.contract_carriage_end_date}
                          onChange={(e) => setUpdateObj({ ...updateObj, contract_carriage_end_date: e.target.value })}
                        ></TextField>
                      </FormControl>
                      {carriageEnddateErr && <p className="text-xs text-red-500 ml-2">carriage End Error</p>}
                    </div>
                    {/*  fitness start  */}
                    <div className="">
                      <InputLabel>polution Start Date</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="demo-simple-ct"
                          label=""
                          value={updateObj.fitness_certificate_start_date}
                          onChange={(e) => setUpdateObj({ ...updateObj, fitness_certificate_start_date: e.target.value })}
                        ></TextField>
                      </FormControl>
                      {fitnessdateStartErr && <p className="text-xs text-red-500 ml-2">fitnessdateStartErr Error</p>}
                    </div>
                    {/* fitness expriry */}
                    <div className="w-full">
                      <InputLabel>FitnessCert expiry</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="demo-simect"
                          label=""
                          value={updateObj.fitness_certificate_end_date}
                          onChange={(e) => setUpdateObj({ ...updateObj, fitness_certificate_end_date: e.target.value })}
                        ></TextField>
                      </FormControl>
                      {fitnessEnddateErr && <p className="text-xs text-red-500 ml-2">fitness end date Error</p>}
                    </div>
                    {/*  */}
                    <div className="w-full">
                      <InputLabel className="capitalize">regCert</InputLabel>
                      {updateObj.bus_document?.regCert == undefined ? (
                        <>
                          <FormControl fullWidth>
                            <TextField type="file" variant="outlined" name="regCert" onChange={(e) => handleDocumentPhoto(e)} />
                          </FormControl>
                        </>
                      ) : (
                        <div className="flex justify-between">
                          <a href={updateObj.bus_document.regCert} target="_blank" rel="noreferrer">
                            <img src={updateObj.bus_document.regCert} alt="regCert" className="w-16 h-16 rounded" />
                          </a>
                          <Button
                            onClick={() => setUpdateObj({ ...updateObj, bus_document: { ...updateObj.bus_document, regCert: undefined } })}
                            variant="outlined"
                            color="error"
                          >
                            <IconX />
                          </Button>
                        </div>
                      )}
                      {regCertErr && <p className="text-xs text-red-500 ml-2">Bus reg cert Error</p>}
                    </div>
                    <div>
                      <InputLabel className="capitalize">insuranceCert</InputLabel>
                      {updateObj.bus_document?.insuranceCert == undefined ? (
                        <>
                          <FormControl fullWidth>
                            <TextField type="file" variant="outlined" name="insuranceCert" onChange={(e) => handleDocumentPhoto(e)} />
                          </FormControl>
                        </>
                      ) : (
                        <div className="flex justify-between">
                          <a href={updateObj.bus_document.insuranceCert} target="_blank" rel="noreferrer">
                            <img src={updateObj.bus_document?.insuranceCert} alt="insuranceCert" className="w-16 h-16 rounded" />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, bus_document: { ...updateObj.bus_document, insuranceCert: undefined } })
                            }
                            variant="outlined"
                            color="error"
                          >
                            <IconX />
                          </Button>
                        </div>
                      )}
                      {insurImgErr && <p className="text-red-500 text-xs ml-2">insuranceImg error</p>}
                    </div>
                    <div>
                      {' '}
                      <InputLabel className="capitalize">pollutionCert</InputLabel>
                      {updateObj.bus_document?.pollutionCert == undefined ? (
                        <>
                          <FormControl fullWidth>
                            <TextField type="file" variant="outlined" name="pollutionCert" onChange={(e) => handleDocumentPhoto(e)} />
                          </FormControl>
                        </>
                      ) : (
                        <div className="flex justify-between">
                          <a href={updateObj.bus_document.pollutionCert} target="_blank" rel="noreferrer">
                            <img src={updateObj.bus_document.pollutionCert} alt="pollutionCert" className="w-16 h-16 rounded" />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, bus_document: { ...updateObj.bus_document, pollutionCert: undefined } })
                            }
                            variant="outlined"
                            color="error"
                          >
                            <IconX />
                          </Button>
                        </div>
                      )}
                      {pollutionImgErr && <p className="text-red-500 text-xs ml-2">pollutionCert error</p>}
                    </div>
                    <div>
                      {' '}
                      <InputLabel className="capitalize">touriestPermitCert</InputLabel>
                      {updateObj.bus_document?.touriestPermitCert == undefined ? (
                        <>
                          <FormControl fullWidth>
                            <TextField type="file" variant="outlined" name="touriestPermitCert" onChange={(e) => handleDocumentPhoto(e)} />
                          </FormControl>
                        </>
                      ) : (
                        <div className="flex justify-between">
                          <a href={updateObj.bus_document.touriestPermitCert} target="_blank" rel="noreferrer">
                            <img src={updateObj.bus_document.touriestPermitCert} alt="touriestPermitCert" className="w-16 h-16 rounded" />
                          </a>{' '}
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
                            <IconX />
                          </Button>
                        </div>
                      )}
                      {tourImgErr && <p className="text-red-500 text-xs ml-2">touriestPermitCert error</p>}
                    </div>
                    <div>
                      {' '}
                      <InputLabel className="capitalize">carriagePermitCert</InputLabel>
                      {updateObj.bus_document?.carriagePermitCert == undefined ? (
                        <>
                          <FormControl fullWidth>
                            <TextField type="file" variant="outlined" name="carriagePermitCert" onChange={(e) => handleDocumentPhoto(e)} />
                          </FormControl>
                        </>
                      ) : (
                        <div className="flex justify-between">
                          <a href={updateObj.bus_document.carriagePermitCert} target="_blank" rel="noreferrer">
                            {' '}
                            <img src={updateObj.bus_document?.carriagePermitCert} alt="carriagePermitCert" className="w-16 h-16 rounded" />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, bus_document: { ...updateObj.bus_document, carriagePermitCert: undefined } })
                            }
                            variant="outlined"
                            color="error"
                          >
                            <IconX />
                          </Button>
                        </div>
                      )}
                      {carriageImgErr && <p className="text-red-500 text-xs ml-2">carriagePermitCert error</p>}
                    </div>
                    <div>
                      <InputLabel className="capitalize">fitnessCert</InputLabel>
                      {updateObj.bus_document?.fitnessCert == undefined ? (
                        <>
                          <FormControl fullWidth>
                            <TextField type="file" variant="outlined" name="fitnessCert" onChange={(e) => handleDocumentPhoto(e)} />
                          </FormControl>
                        </>
                      ) : (
                        <div className="flex justify-between">
                          <a href={updateObj.bus_document.fitnessCert} target="_blank" rel="noreferrer">
                            <img src={updateObj.bus_document?.fitnessCert} alt="fitnessCert" className="w-16 h-16 rounded" />
                          </a>{' '}
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, bus_document: { ...updateObj.bus_document, fitnessCert: undefined } })
                            }
                            variant="outlined"
                            color="error"
                          >
                            <IconX />
                          </Button>
                        </div>
                      )}
                      {fitnessImgErr && <p className="text-red-500 text-xs ml-2">fitnessCert error</p>}
                    </div>{' '}
                    <div className="flex items-center justify-center">
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
                  </div>
                </div>
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
                    Update Bus
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
