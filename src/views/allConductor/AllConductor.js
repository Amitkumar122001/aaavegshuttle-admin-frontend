import { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Button,
  TableRow,
  TextField,
  FormControl,
  Box,
  Modal
} from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import FilterListIcon from '@mui/icons-material/FilterList';
import { IconX } from '@tabler/icons-react';
import LoaderCircular from 'ui-component/LoaderCircular';
import axios from 'axios';
import { BackendUrl, AwsBucketUrl } from 'utils/config';

const columns = [
  { id: 'conductor_name', label: 'Name', align: 'center', minWidth: 150 },
  {
    id: 'conductor_phonenumber',
    label: 'Phone Number',
    minWidth: 25,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'conductor_address',
    label: 'Address',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'vendor_name',
    label: 'vendor Name',
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
export const AllConductor = () => {
  const [conductorData, setConductorData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  // update state
  const [field, setField] = useState('');
  const [value, setValue] = useState('');
  const [searchBool, setSearchBool] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateObj, setUpdateObj] = useState({});
  const [isLoading, setisLoading] = useState(false);
  // for refresh the page
  const [refreshPage, setRefreshPage] = useState(false);
  useEffect(() => {
    setRefreshPage(false);
    axios
      .get(`${BackendUrl}/app/v1/conductor/getAllConductors`)
      .then((res) => setConductorData(res.data?.result))
      .catch((e) => console.log('Api fail ', e));
  }, [refreshPage]);
  useEffect(() => {
    if (value.length > 0) {
      let res = conductorData?.filter((item) => item[field]?.includes(value));
      setFilterData(res);
    } else {
      setFilterData(conductorData);
    }
  }, [value, conductorData, field]);

  const [conductorNameErr, setConductorNameErr] = useState(false);
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

  // handle document upload
  const handleDocumentPhoto = async (event) => {
    const name = event.target.name;
    // console.log(event, field);
    setisLoading(true);
    const link = await UploadDocumenttos3Bucket(event);
    setUpdateObj({ ...updateObj, conductor_document: { ...updateObj.conductor_document, [name]: link } });
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

  const updateConductor = () => {
    if (
      updateObj.conductor_name != '' &&
      updateObj.conductor_address != '' &&
      updateObj.conductor_id != '' &&
      updateObj.current_address != '' &&
      updateObj.permanent_address != '' &&
      updateObj.primary_contact != '' &&
      updateObj.emergency_contact != '' &&
      updateObj.adhaar_number != '' &&
      updateObj.imei_number != '' &&
      updateObj.vendor_name != '' &&
      updateObj.vendor_id != '' &&
      updateObj.conductor_document?.bgv != '' &&
      updateObj.conductor_document?.pcc != '' &&
      updateObj.conductor_document?.resume != '' &&
      updateObj.conductor_document?.profile != '' &&
      updateObj.conductor_document?.aadharBack != '' &&
      updateObj.conductor_document?.aadharfront != '' &&
      updateObj.conductor_document?.fingerprint != '' &&
      updateObj.conductor_document?.curr_address != '' &&
      updateObj.conductor_document?.covidVaccination != '' &&
      updateObj.conductor_document?.permanent_address != ''
    ) {
      if (updateObj.primary_contact == updateObj.emergency_contact) {
        window.alert('primary and emergency contact is same');
        return;
      }
      const document = {
        profile: updateObj.conductor_document?.profile,
        covidVaccination: updateObj.conductor_document?.covidVaccination,
        aadharfront: updateObj.conductor_document?.aadharfront,
        aadharBack: updateObj.conductor_document?.aadharBack,
        pcc: updateObj.conductor_document?.pcc,
        curr_address: updateObj.conductor_document?.curr_address,
        permanent_address: updateObj.conductor_document?.permanent_address,
        bgv: updateObj.conductor_document?.bgv,
        fingerprint: updateObj.conductor_document?.fingerprint,
        resume: updateObj.conductor_document?.resume
      };

      const body = {
        conductorId: updateObj.conductor_id,
        conductorName: updateObj.conductor_name,
        conductorMobile: updateObj.conductor_mobile,
        conductorAddress: updateObj.conductor_address,
        conductorDocument: document,
        vendorId: updateObj.vendor_id,
        activeStatus: Boolean(updateObj.activeStatus),
        currentAddress: updateObj.current_address,
        permanentAddress: updateObj.permanent_address,
        primaryContact: updateObj.primary_contact,
        emergencyContact: updateObj.emergency_contact,
        adhaarNumber: updateObj.adhaar_number,
        imeiNumber: updateObj.imei_number
      };

      console.log(body);
      axios
        .patch(`${BackendUrl}/app/v1/conductor/updateconductors`, body)
        .then((res) => {
          console.log(res.data);
          toast.success('update successfully');
          clearAllField();
        })
        .catch((err) => {
          console.log('Api Err ', err);
          toast.error('Api Error');
        });
    } else {
      updateObj.conductor_name == '' ? setConductorNameErr(true) : setConductorNameErr(false);
      updateObj.primary_contact == '' ? setPrimaryNoErr(true) : setPrimaryNoErr(false);
      updateObj.emergency_contact == '' ? setSecondNoErr(true) : setSecondNoErr(false);
      updateObj.current_address == '' ? setCurrAddressErr(true) : setCurrAddressErr(false);
      updateObj.permanent_address == '' ? setPrmtAddressErr(true) : setPrmtAddressErr(false);
      updateObj.adhaar_number == '' ? setAdharNoErr(true) : setAdharNoErr(false);
      updateObj.imei_number == '' ? setIMEINoErr(true) : setIMEINoErr(false);
      updateObj.conductor_document.bgv == '' ? setBGVErr(true) : setBGVErr(false);
      updateObj.conductor_document.pcc == '' ? setPccErr(true) : setPccErr(false);
      updateObj.conductor_document.resume == '' ? setResumeErr(true) : setResumeErr(false);
      updateObj.conductor_document.profile == '' ? setPhotoErr(true) : setPhotoErr(false);
      updateObj.conductor_document.aadharfront == '' ? setAdharFrontErr(true) : setAdharFrontErr(false);
      updateObj.conductor_document.aadharBack == '' ? setAdharBackErr(true) : setAdharBackErr(false);
      updateObj.conductor_document.fingerprint == '' ? setFingerPrintErr(true) : setFingerPrintErr(false);
      updateObj.conductor_document.curr_address == '' ? setCurrAddressProofErr(true) : setCurrAddressProofErr(false);
      updateObj.conductor_document.covidVaccination == '' ? setCovidVErr(true) : setCovidVErr(false);
      updateObj.conductor_document.permanent_address == '' ? setPrmtAddressProofErr(true) : setPrmtAddressProofErr(false);
    }
    setRefreshPage(true);
  };
  const clearAllField = () => {
    setConductorNameErr(false);
    setPrimaryNoErr(false);
  };
  //handle field
  const handleSearchField = (inputField) => {
    switch (inputField) {
      case 'conductor_name': {
        setField('conductor_name');
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
  // modal open
  const handleOpen = (item) => {
    setUpdateObj(item);
    // console.log(item);
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
  // console.log(updateObj);
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
  return (
    <div>
      <div className=" flex flex-col gap-10 bg-white p-8 max-lg:p-4 max-lg:gap-5 rounded-xl">
        <div>
          <p className="text-3xl text-gray-600 text-center">All Conductor Details</p>
          <p className=" border border-gray-300 mt-5"></p>
        </div>
        {/* dropdown */}
        <div className="absolute right-8 max-lg:right-6 z-10">
          <button onClick={() => setSearchBool(!searchBool)} className="absolute right-4  bg-gray-200 rounded-full p-1">
            <FilterListIcon className="text-3xl max-lg:text-2xl max-md:text-lg " />
          </button>
          {searchBool && (
            <div className="flex flex-col gap-1 bg-gray-100 rounded p-4 absolute top-10 right-0 w-32">
              <button onClick={() => handleSearchField('conductor_name')} className="py-1 text-sm rounded hover:bg-gray-300">
                conductor Name
              </button>
              <button onClick={() => handleSearchField('conductor_mobile')} className="py-1 text-sm rounded hover:bg-gray-300">
                conductor Mobile
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
                          <TableCell align="center">{item.conductor_name}</TableCell>
                          <TableCell align="center">{item.primary_contact}</TableCell>
                          <TableCell align="center">{item.current_address}</TableCell>
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
        className="overflow-y-scroll"
      >
        <Box sx={style} className=" w-full h-screen p-4 ">
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
              <p className="text-xl font-bold">Update conductor</p>
              <button onClick={handleClose} className="">
                <IconX />
              </button>
            </div>
            <>
              <div>
                <div className="grid grid-cols-3 max-lg:grid-cols-2 max-lg:gap-5 max-md:grid-cols-1 max-sm:gap-3 gap-5">
                  {/* conductor ID*/}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField id="demo-simple-set" label="conductorId" disabled={true} value={updateObj.conductor_id} />
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

                  {/* conductor name */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        id="demo-simple-seect"
                        label="Name"
                        value={updateObj.conductor_name}
                        onChange={(e) => setUpdateObj({ ...updateObj, conductor_name: e.target.value })}
                      />
                    </FormControl>
                    {conductorNameErr && <p className="text-red-500 ml-2 text-xs">conductor Name error</p>}
                  </div>

                  {/* primary_contact */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-basi"
                        label="Primary Contact"
                        variant="outlined"
                        type="tel"
                        inputProps={{ maxLength: 10, minLength: 10 }}
                        value={updateObj.primary_contact}
                        onChange={(e) => setUpdateObj({ ...updateObj, primary_contact: e.target.value })}
                      />
                      {primaryNoErr && <p className="text-red-500 ml-2 text-xs">primary number error</p>}
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
                  <div>
                    <p className="w-full border border-gray-400 rounded-xl px-2 py-1">
                      <label htmlFor="pccstart" className="text-md w-full block">
                        pcc Start
                      </label>
                      <input
                        type="date"
                        className="outline-none border-none w-full"
                        id="pccstart"
                        // value={conductorForm.pccStart}
                        // onChange={(e) => setConductorForm({ ...conductorForm, pccStart: e.target.value })}
                      />
                    </p>
                    {true && <p className="text-red-500  ml-2">PCC start error</p>}
                  </div>

                  <div>
                    <p className="w-full border border-gray-400 rounded-xl px-2 py-1">
                      <label htmlFor="pccEnd" className="text-md w-full block">
                        pcc end
                      </label>
                      <input
                        type="date"
                        className="outline-none border-none w-full"
                        id="pccEnd"
                        // value={conductorForm.pccEnd}
                        // onChange={(e) => setConductorForm({ ...conductorForm, pccEnd: e.target.value })}
                      />
                    </p>
                    {true && <p className="text-red-500  ml-2">PCC end error</p>}
                  </div>
                </div>{' '}
                <div className=" grid grid-cols-3 gap-6 mt-4 max-lg:grid-cols-2 max-lg:gap-4  max-md:grid-cols-1">
                  <div>
                    <p className="text-md font-semibold">Aadhar Front</p>
                    {updateObj?.conductor_document?.aadharfront === undefined ? (
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
                          <a href={updateObj.conductor_document?.aadharBack} target="_blank" rel="noreferrer">
                            <img src={updateObj?.conductor_document?.aadharfront} alt="aadharfront" className="w-20 h-20 rounded-xl" />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({
                                ...updateObj,
                                conductor_document: { ...updateObj.conductor_document, aadharfront: undefined }
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
                    {updateObj?.conductor_document?.aadharBack === undefined ? (
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
                          <a href={updateObj.conductor_document?.aadharBack} target="_blank" rel="noreferrer">
                            <img src={updateObj?.conductor_document?.aadharBack} alt="aadharBack" className="w-20 h-20 rounded-xl" />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({
                                ...updateObj,
                                conductor_document: { ...updateObj.conductor_document, aadharBack: undefined }
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
                    {updateObj?.conductor_document?.resume === undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="resume" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {resumeErr && <p className="text-red-500 ml-2 text-xs">resume Error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          <a href={updateObj?.conductor_document?.resume} target="_blank" rel="noreferrer">
                            <img src={updateObj?.conductor_document?.resume} alt="resume" className="w-20 h-20 rounded-xl" />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, conductor_document: { ...updateObj.conductor_document, resume: undefined } })
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
                    {updateObj?.conductor_document?.fingerprint === undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="fingerprint" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {fingerPrintErr && <p className="text-red-500 ml-2 text-xs">fingerprint Error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          <a href={updateObj?.conductor_document?.fingerprint} target="_blank" rel="noreferrer">
                            <img src={updateObj?.conductor_document?.fingerprint} alt="fingerprint" className="w-20 h-20 rounded-xl" />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({
                                ...updateObj,
                                conductor_document: { ...updateObj.conductor_document, fingerprint: undefined }
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
                    {updateObj?.conductor_document?.profile === undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="profile" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {photoErr && <p className="text-red-500 ml-2 text-xs">profile Error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          <a href={updateObj?.conductor_document?.profile} target="_blank" rel="noreferrer">
                            <img src={updateObj?.conductor_document?.profile} alt="profile" className="w-20 h-20 rounded-xl" />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, conductor_document: { ...updateObj.conductor_document, profile: undefined } })
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
                    {updateObj?.conductor_document?.covidVaccination === undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="covidVaccination" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {covidVErr && <p className="text-red-500 ml-2 text-xs">covidVaccination Error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          <a href={updateObj?.conductor_document?.covidVaccination} target="_blank" rel="noreferrer">
                            <img
                              src={updateObj?.conductor_document?.covidVaccination}
                              alt="covidVaccination"
                              className="w-20 h-20 rounded-xl"
                            />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({
                                ...updateObj,
                                conductor_document: { ...updateObj.conductor_document, covidVaccination: undefined }
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
                    {updateObj?.conductor_document?.curr_address === undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="curr_address" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {currAddressProofErr && <p className="text-red-500 ml-2 text-xs">curr_address Error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          <a href={updateObj?.conductor_document?.curr_address} target="_blank" rel="noreferrer">
                            <img src={updateObj?.conductor_document?.curr_address} alt="cur_address" className="w-20 h-20 rounded-xl" />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({
                                ...updateObj,
                                conductor_document: { ...updateObj.conductor_document, curr_address: undefined }
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
                    {updateObj?.conductor_document?.permanent_address === undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="permanent_address" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {prmtAddressProofErr && <p className="text-red-500 ml-2 text-xs">permanent_address Error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          <a href={updateObj?.conductor_document?.permanent_address} target="_blank" rel="noreferrer">
                            <img
                              src={updateObj?.conductor_document?.permanent_address}
                              alt="permanent_address"
                              className="w-20 h-20 rounded-xl"
                            />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({
                                ...updateObj,
                                conductor_document: { ...updateObj.conductor_document, permanent_address: undefined }
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
                    {updateObj?.conductor_document?.pcc === undefined ? (
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
                          <a href={updateObj?.conductor_document?.pcc} target="_blank" rel="noreferrer">
                            {' '}
                            <img src={updateObj?.conductor_document?.pcc} alt="pcc" className="w-20 h-20 rounded-xl" />
                          </a>{' '}
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, conductor_document: { ...updateObj.conductor_document, pcc: undefined } })
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
                    {updateObj?.conductor_document?.bgv === undefined ? (
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
                          <img src={updateObj?.conductor_document?.bgv} alt="voterId" className="w-20 h-20 rounded-xl" />
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, conductor_document: { ...updateObj.conductor_document, bgv: undefined } })
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
              <div className="mt-2">
                <div className="flex gap-10 justify-between mb-3">
                  <Button variant="contained" className={'bg-blue-700'} onClick={updateConductor}>
                    Add Bus
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
