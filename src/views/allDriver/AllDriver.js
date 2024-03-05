import { useState, useEffect } from 'react';
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
  Button
} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import FilterListIcon from '@mui/icons-material/FilterList';
import toast, { Toaster } from 'react-hot-toast';
import LoaderCircular from 'ui-component/LoaderCircular';
import axios from 'axios';
const columns = [
  { id: 'driver_name', label: 'Driver Name', align: 'center', minWidth: 150 },
  {
    id: 'driver_address',
    label: 'Address',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'driver_phonenumber',
    label: 'Phone Number',
    minWidth: 25,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  { id: 'dlnumber', label: 'DL No', align: 'center', minWidth: 100 },
  {
    id: 'vendor_name',
    label: 'Vendor Name',
    minWidth: 25,
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

export const AllDriver = () => {
  const [driverData, setDriverData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  // update state
  const [field, setField] = useState('');
  const [value, setValue] = useState('');
  const [searchBool, setSearchBool] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateObj, setUpdateObj] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    setRefreshPage(false);
    axios
      .get('http://192.168.1.230:3000/app/v1/driver/getAllDriver')
      .then((res) => setDriverData(res.data?.result))
      .catch((e) => console.log('Api fail ', e));
  }, [refreshPage]);
  useEffect(() => {
    if (value.length > 0) {
      let res = driverData?.filter((item) => item[field]?.includes(value));
      setFilterData(res);
    } else {
      setFilterData(driverData);
    }
  }, [value, driverData]);
  // update error
  const [pancardErr, setPancardErr] = useState(false);
  const [dlNoErr, setDlNoErr] = useState(false);
  const [driverNameErr, setDriverNameErr] = useState(false);
  const [driverMobileErr, setDriverMobileErr] = useState(false);
  const [primaryNoErr, setPrimaryNoErr] = useState(false);
  const [secondNoErr, setSecondNoErr] = useState(false);
  const [currAddressErr, setCurrAddressErr] = useState(false);
  const [prmtAddressErr, setPrmtAddressErr] = useState(false);
  const [imeiNoErr, setIMEINoErr] = useState(false);
  const [currAddressProofErr, setCurrAddressProofErr] = useState(false);
  const [prmtAddressProofErr, setPrmtAddressProofErr] = useState(false);
  const [aadharNoErr, setAdharNoErr] = useState(false);
  const [aadharFrontErr, setAdharFrontErr] = useState(false);
  const [aadharBackErr, setAdharBackErr] = useState(false);
  const [photoErr, setPhotoErr] = useState(false);
  const [pccErr, setPccErr] = useState(false);
  const [covidVErr, setCovidVErr] = useState(false);
  const [BGVErr, setBGVErr] = useState(false);
  const [fingerPrintErr, setFingerPrintErr] = useState(false);
  const [resumeErr, setResumeErr] = useState(false);

  const handleSearchField = (inputField) => {
    switch (inputField) {
      case 'driver_name': {
        setField('driver_name');
        break;
      }
      case 'driver_phonenumber': {
        setField('driver_phonenumber');
        break;
      }
      default:
        setField('');
    }
    setSearchBool(false);
  };

  //update driver
  const updateDriver = () => {
    if (
      updateObj.driver_name != '' &&
      updateObj.driver_phonenumber?.length == 10 &&
      updateObj.driver_address != '' &&
      updateObj.driver_document?.aadhar != '' &&
      updateObj.driver_document?.pancard != ''
    ) {
      const document = {
        dl: '',
        bgv: '',
        pcc: '',
        resume: '',
        profile: '',
        aadharBack: '',
        aadharfront: '',
        fingerprint: '',
        curr_address: '',
        covidVaccination: '',
        permanent_address: ''
      };
      if (updateObj?.driver_document?.voterId !== undefined) {
        document.voterId = updateObj.driver_document?.voterId;
      }

      const body = {
        driverId: updateObj.driver_id,
        driverName: updateObj.driver_name,
        driverPhonenumber: updateObj.driver_phonenumber,
        driverAddress: updateObj.driver_address,
        driverDocument: document,
        vendorId: updateObj.vendor_id,
        activeStatus: Boolean(updateObj.activeStatus)
      };

      //console.log(body);

      axios
        .patch('http://192.168.1.230:3000/app/v1/driver/updateDriver', body)
        .then((res) => {
          console.log(res.body);
          toast.success('update successfully');
          setRefreshPage(true);
          clearAllField();
        })
        .catch((err) => {
          console.log('Api Err ', err);
          toast.error('Api Error');
        });
    } else {
      updateObj.driver_name == '' ? setDriverNameErr(true) : setDriverNameErr(false);
      updateObj.primary_contact == '' ? setPrimaryNoErr(true) : setPrimaryNoErr(false);
      updateObj.emergency_contact == '' ? setSecondNoErr(true) : setSecondNoErr(false);
      updateObj.current_address == '' ? setCurrAddressErr(true) : setCurrAddressErr(false);
      updateObj.permanent_address == '' ? setPrmtAddressErr(true) : setPrmtAddressErr(false);
      updateObj.driver_document.bgv == '' ? setBGVErr(true) : setBGVErr(false);
      updateObj.driver_document.pcc == '' ? setPccErr(true) : setPccErr(false);
      updateObj.driver_document.resume == '' ? setResumeErr(true) : setResumeErr(false);
      updateObj.driver_document.profile == '' ? setPhotoErr(true) : setPhotoErr(false);
      updateObj.driver_document.aadharfront == '' ? setAdharFrontErr(true) : setAdharFrontErr(false);
      updateObj.driver_document.aadharBack == '' ? setAdharBackErr(true) : setAdharBackErr(false);
      updateObj.driver_document.fingerprint == '' ? setFingerPrintErr(true) : setFingerPrintErr(false);
      updateObj.driver_document.curr_address == '' ? setCurrAddressProofErr(true) : setCurrAddressProofErr(false);
      updateObj.driver_document.covidVaccination == '' ? setCovidVErr(true) : setCovidVErr(false);
      updateObj.driver_document.permanent_address == '' ? setPrmtAddressProofErr(true) : setPrmtAddressProofErr(false);

      updateObj.adhaar_number == '' ? setAdharNoErr(true) : setAdharNoErr(false);
      updateObj.dl_number == '' ? setDlNoErr(true) : setDlNoErr(false);
      updateObj.imei_number == '' ? setIMEINoErr(true) : setIMEINoErr(false);
    }
  };
  // console.log(updateObj);
  const clearAllField = () => {
    setDriverNameErr(false);
    setDriverMobileErr(false);

    setPancardErr(false);
  };
  // modal open
  const handleOpen = (item) => {
    setUpdateObj(item);
    setUpdateOpen(true);
  };
  // modal close
  const handleClose = () => setUpdateOpen(false);

  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -40%)',
    p: 4
  };
  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
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

  // S3BUCKET
  const handleDocumentPhoto = async (event) => {
    const name = event.target.name;
    setisLoading(true);
    const link = await UploadDocumenttos3Bucket(event);
    setUpdateObj({ ...updateObj, driver_document: { ...updateObj.driver_document, [name]: link } });
    setisLoading(false);
  };
  const imageUploadApi = async (value) => {
    let result = await axios.request(value);
    // console.log(result.data.name);
    let imageName = result.data.name;
    return imageName;
  };

  const UploadDocumenttos3Bucket = async (e) => {
    // console.log(e.target.files[0]);
    const reader = new FormData();
    reader.append('file', e.target.files[0]);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://13.200.168.251:3000/app/v1/aws/upload/driverimages`,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: reader
    };
    let imageName = await imageUploadApi(config);
    let totalUrl = `http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/` + imageName;
    // console.log(totalUrl);
    return totalUrl;
  };
  return (
    <div>
      <div className=" flex flex-col gap-10 bg-white p-8 max-lg:p-4 max-lg:gap-5 rounded-xl">
        <div>
          <p className="text-3xl text-gray-600 text-center">All Driver Details</p>
          <p className=" border border-gray-300 mt-5"></p>
        </div>
        {/* dropdown */}
        <div className="absolute right-8 max-lg:right-6 z-10">
          <button onClick={() => setSearchBool(!searchBool)} className="absolute right-4  bg-gray-200 rounded-full p-1">
            <FilterListIcon className="text-3xl max-lg:text-2xl max-md:text-lg " />
          </button>
          {searchBool && (
            <div className="flex flex-col gap-1 bg-gray-100 rounded p-4 absolute top-10 right-0 w-32">
              <button onClick={() => handleSearchField('driver_name')} className="py-1 text-sm rounded hover:bg-gray-300">
                Driver Name
              </button>
              <button onClick={() => handleSearchField('driver_phonenumber')} className="py-1 text-sm rounded hover:bg-gray-300">
                Phone Number
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
                    {displayItems()?.map((item, i) => {
                      return (
                        <TableRow key={i} hover>
                          <TableCell align="center">{item.driver_name}</TableCell>
                          <TableCell align="center">{item.current_address}</TableCell>
                          <TableCell align="center">{item.primary_contact}</TableCell>
                          <TableCell align="center">{item.dl_number}</TableCell>
                          <TableCell align="center">{item.vendor_name}</TableCell>
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
                        currentPage == pageNumber ? 'text-white' : 'text-black'
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
      <Modal
        open={updateOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="overflow-y-scroll mb-4"
      >
        <Box sx={style} className=" w-full h-screen  p-4 ">
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
              <p className="text-xl font-bold">Update Driver</p>
              <button onClick={handleClose} className="">
                <IconX />
              </button>
            </div>
            <>
              <div>
                <div className="grid grid-cols-4 max-lg:grid-cols-2 max-lg:gap-5 max-md:grid-cols-1 max-sm:gap-3 gap-10">
                  {/* driver ID*/}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField id="demo-simple-set" label="driverId" disabled={true} value={updateObj.driver_id} />
                    </FormControl>
                  </div>
                  {/* vendor ID*/}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField id="demo-simple-set" label="vendorID" disabled={true} value={updateObj.vendor_id} />
                    </FormControl>
                  </div>
                  {/* vendor name*/}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField id="demo-simple-set" label="Vendor name" disabled={true} value={updateObj.vendor_name} />
                    </FormControl>
                  </div>

                  {/* driver name */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        id="demo-simple-seect"
                        label="Name"
                        value={updateObj.driver_name}
                        onChange={(e) => setUpdateObj({ ...updateObj, driver_name: e.target.value })}
                      />
                    </FormControl>
                    {driverNameErr && <p className="text-red-500 ml-2 text-xs">driver Name error</p>}
                  </div>

                  {/* driver mobile */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basi"
                        label="Mobile"
                        variant="outlined"
                        inputProps={{ maxLength: 10, minLength: 10 }}
                        type="tel"
                        value={updateObj.primary_contact}
                        onChange={(e) => setUpdateObj({ ...updateObj, primary_contact: e.target.value })}
                      />
                      {driverMobileErr && <p className="text-red-500 ml-2 text-xs">mobile number error</p>}
                    </FormControl>
                  </div>
                  {/* emergency_contact */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-basi"
                        label="Emergency Contact"
                        variant="outlined"
                        type="tel"
                        inputProps={{ maxLength: 10, minLength: 10 }}
                        value={updateObj.emergency_contact}
                        onChange={(e) => setUpdateObj({ ...updateObj, emergency_contact: e.target.value })}
                      />
                      {secondNoErr && <p className="text-red-500 ml-2 text-xs">emergency number error</p>}
                    </FormControl>
                  </div>
                  {/* current_address */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basi"
                        label="current_address"
                        variant="outlined"
                        type="text"
                        value={updateObj.current_address}
                        onChange={(e) => setUpdateObj({ ...updateObj, current_address: e.target.value })}
                      />
                    </FormControl>
                    {currAddressErr && <p className="text-red-500 ml-2 text-xs">current_address Error</p>}
                  </div>

                  {/* permanent_address */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basi"
                        label="permanent_address"
                        variant="outlined"
                        type="text"
                        value={updateObj.permanent_address}
                        onChange={(e) => setUpdateObj({ ...updateObj, permanent_address: e.target.value })}
                      />
                    </FormControl>
                    {prmtAddressErr && <p className="text-red-500 ml-2 text-xs">permanent_address Error</p>}
                  </div>

                  {/* adhaar_number */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basi"
                        label="adhaar_number"
                        variant="outlined"
                        type="number"
                        value={updateObj.adhaar_number}
                        onChange={(e) => setUpdateObj({ ...updateObj, adhaar_number: e.target.value })}
                      />
                    </FormControl>
                    {aadharNoErr && <p className="text-red-500 ml-2 text-xs">adhaar_number Error</p>}
                  </div>
                  {/* imei_number */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basi"
                        label="imei_number"
                        variant="outlined"
                        type="number"
                        value={updateObj.imei_number}
                        onChange={(e) => setUpdateObj({ ...updateObj, imei_number: e.target.value })}
                      />
                    </FormControl>
                    {imeiNoErr && <p className="text-red-500 ml-2 text-xs">imei_number Error</p>}
                  </div>
                </div>{' '}
                <div className=" grid grid-cols-3 gap-6 mt-4 max-lg:grid-cols-2 max-lg:gap-4  max-md:grid-cols-1">
                  <div>
                    <p className="text-md font-semibold">Aadhar Front</p>
                    {updateObj?.driver_document?.aadharfront === undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="aadharfront" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {aadharFrontErr && <p className="text-red-500 ml-2 text-xs">upload Aadhar Front</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          {' '}
                          <a href={updateObj.driver_document?.aadharBack} target="_blank" rel="noreferrer">
                            <img src={updateObj?.driver_document?.aadharfront} alt="aadharfront" className="w-20 h-20 rounded-xl" />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({
                                ...updateObj,
                                driver_document: { ...updateObj.driver_document, aadharfront: undefined }
                              })
                            }
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-md font-semibold">Aadhar Back</p>
                    {updateObj?.driver_document?.aadharBack === undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="aadharBack" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {aadharBackErr && <p className="text-red-500 ml-2 text-xs">upload aadharBack</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          {' '}
                          <a href={updateObj.driver_document?.aadharBack} target="_blank" rel="noreferrer">
                            <img src={updateObj?.driver_document?.aadharBack} alt="aadharBack" className="w-20 h-20 rounded-xl" />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({
                                ...updateObj,
                                driver_document: { ...updateObj.driver_document, aadharBack: undefined }
                              })
                            }
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    {' '}
                    <p className="text-md font-semibold">Resume</p>
                    {updateObj?.driver_document?.resume === undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="resume" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {resumeErr && <p className="text-red-500 ml-2 text-xs">resume Error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          <a href={updateObj?.driver_document?.resume} target="_blank" rel="noreferrer">
                            <img src={updateObj?.driver_document?.resume} alt="resume" className="w-20 h-20 rounded-xl" />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, driver_document: { ...updateObj.driver_document, resume: undefined } })
                            }
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-md font-semibold">Fingerprint</p>
                    {updateObj?.driver_document?.fingerprint === undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="fingerprint" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {fingerPrintErr && <p className="text-red-500 ml-2 text-xs">fingerprint Error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          <a href={updateObj?.driver_document?.fingerprint} target="_blank" rel="noreferrer">
                            <img src={updateObj?.driver_document?.fingerprint} alt="fingerprint" className="w-20 h-20 rounded-xl" />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({
                                ...updateObj,
                                driver_document: { ...updateObj.driver_document, fingerprint: undefined }
                              })
                            }
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-md font-semibold">Profile</p>
                    {updateObj?.driver_document?.profile === undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="profile" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {photoErr && <p className="text-red-500 ml-2 text-xs">profile Error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          <a href={updateObj?.driver_document?.profile} target="_blank" rel="noreferrer">
                            <img src={updateObj?.driver_document?.profile} alt="profile" className="w-20 h-20 rounded-xl" />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, driver_document: { ...updateObj.driver_document, profile: undefined } })
                            }
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {' '}
                    <p className="txet-md font-semibold">Covid Vaccination</p>
                    {updateObj?.driver_document?.covidVaccination === undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="covidVaccination" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {covidVErr && <p className="text-red-500 ml-2 text-xs">covidVaccination Error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          <a href={updateObj?.driver_document?.covidVaccination} target="_blank" rel="noreferrer">
                            <img
                              src={updateObj?.driver_document?.covidVaccination}
                              alt="covidVaccination"
                              className="w-20 h-20 rounded-xl"
                            />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({
                                ...updateObj,
                                driver_document: { ...updateObj.driver_document, covidVaccination: undefined }
                              })
                            }
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {' '}
                    <p className="text-md font-semibold">Current Address</p>
                    {updateObj?.driver_document?.curr_address === undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="curr_address" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {currAddressProofErr && <p className="text-red-500 ml-2 text-xs">curr_address Error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          <a href={updateObj?.driver_document?.curr_address} target="_blank" rel="noreferrer">
                            <img src={updateObj?.driver_document?.curr_address} alt="cur_address" className="w-20 h-20 rounded-xl" />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({
                                ...updateObj,
                                driver_document: { ...updateObj.driver_document, curr_address: undefined }
                              })
                            }
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {' '}
                    <p className="text-md font-semibold">Permanent Address</p>
                    {updateObj?.driver_document?.permanent_address === undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="permanent_address" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {prmtAddressProofErr && <p className="text-red-500 ml-2 text-xs">permanent_address Error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          <a href={updateObj?.driver_document?.permanent_address} target="_blank" rel="noreferrer">
                            <img
                              src={updateObj?.driver_document?.permanent_address}
                              alt="permanent_address"
                              className="w-20 h-20 rounded-xl"
                            />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({
                                ...updateObj,
                                driver_document: { ...updateObj.driver_document, permanent_address: undefined }
                              })
                            }
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {' '}
                    <p className="text-md font-semibold">PCC</p>
                    {updateObj?.driver_document?.pcc === undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="pcc" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {pccErr && <p className="text-red-500 ml-2 text-xs">PCC Error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          {' '}
                          <a href={updateObj?.driver_document?.pcc} target="_blank" rel="noreferrer">
                            {' '}
                            <img src={updateObj?.driver_document?.pcc} alt="pcc" className="w-20 h-20 rounded-xl" />
                          </a>{' '}
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, driver_document: { ...updateObj.driver_document, pcc: undefined } })
                            }
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {' '}
                    <p className="text-md font-semibold">BGV</p>
                    {updateObj?.driver_document?.bgv === undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="bgv" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {BGVErr && <p className="ml-2 text-md">bgv error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          {' '}
                          <a href={updateObj?.driver_document?.bgv} target="_blank" rel="noreferrer">
                            <img src={updateObj?.driver_document?.bgv} alt="voterId" className="w-20 h-20 rounded-xl" />
                          </a>{' '}
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, driver_document: { ...updateObj.driver_document, bgv: undefined } })
                            }
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  <label>
                    <input
                      type="checkbox"
                      checked={Boolean(updateObj.activeStatus)}
                      onChange={(e) => setUpdateObj({ ...updateObj, activeStatus: e.target.checked })}
                    />
                    Active Status
                  </label>
                </div>
              </div>

              <div className="mt-2">
                <div className="flex gap-10 justify-between mb-3">
                  <Button variant="contained" className={'bg-blue-700'} onClick={updateDriver}>
                    update Driver
                  </Button>
                  <Button variant="outlined" color="error" onClick={handleClose}>
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
