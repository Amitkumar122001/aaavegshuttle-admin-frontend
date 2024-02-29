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
  Modal,
  InputLabel
} from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { IconX } from '@tabler/icons-react';
import FilterListIcon from '@mui/icons-material/FilterList';
import LoaderCircular from 'ui-component/LoaderCircular';
import axios from 'axios';
const columns = [
  { id: 'conductor_id', label: 'Id', align: 'center', minWidth: 25 },
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
    id: 'conductor_document',
    label: 'Document',
    minWidth: 25,
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

  useEffect(() => {
    axios
      .get('http://192.168.1.230:3000/app/v1/conductor/getAllConductors')
      .then((res) => setConductorData(res.data?.result))
      .catch((e) => console.log('Api fail ', e));
  }, []);
  useEffect(() => {
    if (value.length > 0) {
      let res = conductorData?.filter((item) => item[field]?.includes(value));
      setFilterData(res);
    } else {
      setFilterData(conductorData);
    }
  }, [value, conductorData]);

  const [pancardErr, setPancardErr] = useState(false);
  const [adharErr, setAdharErr] = useState(false);
  const [conductorAddressErr, setConductorAddressErr] = useState(false);
  const [conductorNameErr, setConductorNameErr] = useState(false);
  const [conductorMobileErr, setConductorMobileErr] = useState(false);

  // handle document upload
  const handleDocumentPhoto = async (event) => {
    const name = event.target.name;
    // console.log(event, field);
    setisLoading(true);
    const link = await UploadDocumenttos3Bucket(event);
    setUpdateObj({ ...updateObj, vendorDocument: { ...updateObj.vendorDocument, [name]: link } });
    setisLoading(false);
  };
  const imageUploadApi = async (value) => {
    let result = await axios.request(value);
    console.log(result.data.name);
    let imageName = result.data.name;
    return imageName;
  };

  const UploadDocumenttos3Bucket = async (e) => {
    console.log(e.target.files[0]);
    const reader = new FormData();
    reader.append('file', e.target.files[0]);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://13.200.168.251:3000/app/v1/aws/upload/conductorimages`,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: reader
    };
    let imageName = await imageUploadApi(config);
    let totalUrl = `http://13.200.168.251:3000/app/v1/aws/getImage/conductorimages/` + imageName;

    return totalUrl;
  };

  const updateConductor = () => {
    if (
      updateObj.conductor_name != '' &&
      updateObj.conductor_mobile?.length == 10 &&
      updateObj.conductor_address != '' &&
      updateObj.conductor_document?.aadhar != '' &&
      updateObj.conductor_document?.pancard != ''
    ) {
      const document = {
        aadhar: updateObj.conductor_document?.aadhar,
        pancard: updateObj.conductor_document?.pancard
      };
      if (updateObj?.conductor_document?.voterId !== undefined) {
        document.voterId = updateObj.conductor_document?.voterId;
      }

      const body = {
        conductorId: updateObj.conductor_id,
        conductorName: updateObj.conductor_name,
        conductorMobile: updateObj.conductor_mobile,
        conductorAddress: updateObj.conductor_address,
        conductorDocument: document,
        vendorId: updateObj.vendor_id,
        activeStatus: Boolean(updateObj.activeStatus)
      };

      console.log(body);
      axios
        .patch('http://192.168.1.230:3000/app/v1/conductor/updateconductors', body)
        .then((res) => {
          console.log(res);
          toast.success('update successfully');
          clearAllField();
        })
        .catch((err) => {
          console.log('Api Err ', err);
          toast.error('Api Error');
        });
    } else {
      updateObj.conductor_name == '' ? setConductorNameErr(true) : setConductorNameErr(false);
      updateObj.conductor_mobile == '' ? setConductorMobileErr(true) : setConductorMobileErr(false);
      updateObj.conductor_address == '' ? setConductorAddressErr(true) : setConductorAddressErr(false);
      updateObj.conductor_document?.aadhar == '' ? setAdharErr(true) : setAdharErr(false);
      updateObj.conductor_document?.pancard == '' ? setPancardErr(true) : setPancardErr(false);
    }
  };
  const clearAllField = () => {
    setConductorNameErr(false);
    setConductorMobileErr(false);
    setConductorAddressErr(false);
    setPancardErr(false);
    setAdharErr(false);
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
                      const document = [];
                      for (const ele in item.conductor_document) {
                        document.push(ele);
                      }
                      return (
                        <TableRow key={i} hover>
                          <TableCell align="center">{item.conductor_id}</TableCell>
                          <TableCell align="center">{item.conductor_name}</TableCell>
                          <TableCell align="center">{item.conductor_mobile}</TableCell>
                          <TableCell align="center">{item.conductor_address}</TableCell>
                          <TableCell align="center">
                            {document.map((text, idx) => (
                              <span key={idx} className="capitalize">
                                {text}
                                {', '}
                              </span>
                            ))}
                          </TableCell>
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
      <Modal open={updateOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} className=" w-full max-lg:h-screen max-lg:w-screen p-4 overflow-y-scroll">
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
                <div className="grid grid-cols-3 max-lg:grid-cols-2 max-lg:gap-5 max-md:grid-cols-1 max-sm:gap-3 gap-10">
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

                  {/* conductor mobile */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basi"
                        label="Mobile"
                        variant="outlined"
                        type="tel"
                        inputProps={{ maxLength: 10, minLength: 10 }}
                        value={updateObj.conductor_mobile}
                        onChange={(e) => setUpdateObj({ ...updateObj, conductor_mobile: e.target.value })}
                      />
                      {conductorMobileErr && <p className="text-red-500 ml-2 text-xs">mobile number error</p>}
                    </FormControl>
                  </div>

                  {/* conductor address*/}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basi"
                        label="conductorAddress"
                        variant="outlined"
                        type="text"
                        value={updateObj.conductor_address}
                        onChange={(e) => setUpdateObj({ ...updateObj, conductor_address: e.target.value })}
                      />
                    </FormControl>
                    {conductorAddressErr && <p className="text-red-500 ml-2 text-xs">Address Error</p>}
                  </div>
                </div>{' '}
                <div className=" grid grid-cols-3 gap-6 mt-4 max-lg:grid-cols-2 max-lg:gap-4  max-md:grid-cols-1">
                  <div>
                    {updateObj?.conductor_document?.aadhar === undefined ? (
                      <>
                        <InputLabel id="aadhar">Aadhar Card</InputLabel>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="aadhar" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {adharErr && <p className="text-red-500 ml-2 text-xs">upload Aadhar</p>}
                      </>
                    ) : (
                      <div>
                        <p className="text-md">Aadhar Card</p>
                        <div className="flex justify-between">
                          {' '}
                          <img src={updateObj?.conductor_document?.aadhar} alt="aadhar" className="w-20 h-20 rounded-xl" />
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, conductor_document: { ...updateObj.conductor_document, aadhar: undefined } })
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
                    {updateObj?.conductor_document?.pancard === undefined ? (
                      <>
                        {/* onChange={(e) => handleDocumentPhoto(e)} */}
                        <InputLabel id="pancard">Pan Card</InputLabel>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="pancard" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {pancardErr && <p className="text-red-500 ml-2 text-xs">Pan Card Error</p>}
                      </>
                    ) : (
                      <div>
                        <p>Pan Card</p>
                        <div className="flex justify-between">
                          {' '}
                          <img src={updateObj?.conductor_document?.pancard} alt="pancard" className="w-20 h-20 rounded-xl" />
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, conductor_document: { ...updateObj.conductor_document, pancard: undefined } })
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
                    {updateObj?.conductor_document?.voterId === undefined ? (
                      <>
                        {/*  */}
                        <InputLabel>Voter Id</InputLabel>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="voterId" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                      </>
                    ) : (
                      <div>
                        <p>VoterId</p>
                        <div className="flex justify-between">
                          {' '}
                          <img src={updateObj?.conductor_document?.voterId} alt="voterId" className="w-20 h-20 rounded-xl" />
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, conductor_document: { ...updateObj.conductor_document, voterId: undefined } })
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
