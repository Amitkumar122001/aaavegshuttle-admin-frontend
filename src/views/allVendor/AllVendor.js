import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  Button,
  Modal,
  Box,
  InputLabel
} from '@mui/material';
import axios from 'axios';
import FilterListIcon from '@mui/icons-material/FilterList';
import { IconX } from '@tabler/icons-react';
import toast, { Toaster } from 'react-hot-toast';

const columns = [
  { id: 'vendorId', label: 'Id', align: 'center', minWidth: 100 },
  { id: 'vendorName', label: 'Name', align: 'center', minWidth: 150 },
  {
    id: 'vendorEmail',
    label: 'Email',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'vendorMobile',
    label: 'Mobile',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'vendorAddress',
    label: 'Address',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },

  {
    id: 'Document',
    label: 'Document ',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },

  {
    id: 'holderName',
    label: 'Holder Name',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'ifsc',
    label: 'IFSC code',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'accountNumber',
    label: 'Account Number',
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
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
export const AllVendor = () => {
  const [vendorData, setVendorData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [field, setField] = useState('');
  const [value, setValue] = useState('');
  const [searchBool, setSearchBool] = useState(false);
  // update state
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateObj, setUpdateObj] = useState({});
  // console.log(updateObj);

  // update error state
  const [pancardErr, setPancardErr] = useState(false);
  const [adharErr, setAdharErr] = useState(false);
  const [accountNumberErr, setAccountNumberErr] = useState(false);
  const [holderNameErr, setHolderNameErr] = useState(false);
  const [ifscErr, setifscErr] = useState(false);
  const [vendorAddressErr, setVendorAddressErr] = useState(false);
  const [vendorEmailErr, setVendorEmailErr] = useState(false);
  const [vendorNameErr, setVendorNameErr] = useState(false);
  const [vendorMobileErr, setVendorMobileErr] = useState(false);
  useEffect(() => {
    axios
      .get('http://192.168.1.230:3000/app/v1/vendor/getAllVendors')
      .then((res) => setVendorData(res?.data?.result))
      .catch((err) => console.log('Api Error ', err));
    setLoader(false);
  }, [loader]);
  useEffect(() => {
    if (value.length > 0) {
      let res = vendorData?.filter((item) => item[field]?.includes(value));
      setFilterData(res);
    } else {
      setFilterData(vendorData);
    }
  }, [value, vendorData]);
  const handleSearchField = (inputField) => {
    switch (inputField) {
      case 'vendorMobile': {
        setField('vendorMobile');
        break;
      }
      case 'vendorName': {
        setField('vendorName');
        break;
      }
      default:
        setField('');
    }
    setSearchBool(false);
  };
  // handle document upload
  const handleDocumentPhoto = async (event) => {
    const name = event.target.name;
    // console.log(event, field);
    //   setisLoading(true);
    const link = await UploadDocumenttos3Bucket(event);
    setUpdateObj({ ...updateObj, vendorDocument: { ...updateObj.vendorDocument, [name]: link } });
    //   setisLoading(false);
  };
  // const imageUploadApi = async (value) => {
  //   let result = await axios.request(value);
  //   console.log(result.data.name);
  //   let imageName = result.data.name;
  //   return imageName;
  // };
  // console.log(vendorForm);
  const UploadDocumenttos3Bucket = async (e) => {
    console.log(e.target.files[0]);
    // const reader = new FormData();
    // reader.append('file', e.target.files[0]);
    // let config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: `apiposttos3bucket`,
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   data: reader
    // };
    // let imageName = await imageUploadApi(config);
    // let totalUrl = `apitogets3bucket` + imageName;
    // console.log(totalUrl);
    // setTitleImage(totalUrl);
    // return totalUrl;
    return 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  };
  //update vendor
  const updateVendor = () => {
    if (
      updateObj.vendorName != '' &&
      validateEmail(updateObj.vendorEmail) &&
      updateObj.vendorMobile?.length == 10 &&
      updateObj.vendorAddress != '' &&
      updateObj.accountNumber != '' &&
      updateObj.ifsc != '' &&
      updateObj.holderName != '' &&
      updateObj.vendorDocument?.aadhar != '' &&
      updateObj.vendorDocument?.pancard != ''
    ) {
      const document = {
        aadhar: updateObj.vendorDocument?.aadhar,
        pancard: updateObj.vendorDocument?.pancard
      };
      if (updateObj?.vendorDocument?.voterId != '') {
        document.voterId = updateObj.vendorDocument?.voterId;
      }
      const body = {
        vendorId: updateObj.vendorId,
        vendorName: updateObj.vendorName,
        vendorEmail: updateObj.vendorEmail,
        vendorMobile: updateObj.vendorMobile,
        vendorAddress: updateObj.vendorAddress,
        vendorDocuments: document,
        ifsc: updateObj.ifsc,
        holderName: updateObj.holderName,
        accountNumber: updateObj.accountNumber,
        activeStatus: Boolean(updateObj.activeStatus)
      };
      // console.log(body);
      axios
        .patch('http://192.168.1.230:3000/app/v1/vendor/updateVendors', body)
        .then((res) => {
          //console.log(res);
          setLoader(true);
          toast.success('update successfully');
          clearAllField();
        })
        .catch((err) => {
          console.log('Api Err ', err);
          toast.error('Api Error');
        });
    } else {
      updateObj.vendorName == '' ? setVendorNameErr(true) : setVendorNameErr(false);
      validateEmail(updateObj.vendorEmail) ? setVendorEmailErr(false) : setVendorEmailErr(true);
      updateObj.vendorMobile == '' ? setVendorMobileErr(true) : setVendorMobileErr(false);
      updateObj.accountNumber == '' ? setAccountNumberErr(true) : setAccountNumberErr(false);
      updateObj.vendorAddress == '' ? setVendorAddressErr(true) : setVendorAddressErr(false);
      updateObj.ifsc == '' ? setifscErr(true) : setifscErr(false);
      updateObj.holderName == '' ? setHolderNameErr(true) : setHolderNameErr(false);
      updateObj.vendorDocument?.aadhar == '' ? setAdharErr(true) : setAdharErr(false);
      updateObj.vendorDocument?.pancard == '' ? setPancardErr(true) : setPancardErr(false);
    }
  };
  const clearAllField = () => {
    setUpdateOpen(false);
    setVendorNameErr(false);
    setVendorEmailErr(false);
    setVendorMobileErr(false);
    setAccountNumberErr(false);
    setVendorAddressErr(false);
    setifscErr(false);
    setHolderNameErr(false);
    setPancardErr(false);
    setAdharErr(false);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    p: 4
  };
  //update
  const handleOpen = (item) => {
    setUpdateObj(item);
    // console.log(item);
    setUpdateOpen(true);
  };
  const handleClose = () => setUpdateOpen(false);
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
          <p className="text-3xl text-gray-600 text-center max-lg:text-xl">All Vendor Details</p>
          <p className=" border border-gray-300 mt-5"></p>
        </div>
        {/* dropdown */}
        <div className="absolute right-6 z-10">
          <button onClick={() => setSearchBool(!searchBool)} className="absolute right-4  bg-gray-200 rounded-full p-1">
            <FilterListIcon className="text-3xl max-lg:text-2xl max-md:text-lg " />
          </button>
          {searchBool && (
            <div className="flex flex-col gap-1 bg-gray-100 rounded p-4 absolute top-10 right-0 w-32">
              <button onClick={() => handleSearchField('vendorName')} className="py-1 text-sm rounded hover:bg-gray-300">
                vendorName
              </button>
              <button onClick={() => handleSearchField('vendorMobile')} className="py-1 text-sm rounded hover:bg-gray-300">
                vendorMobile
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
              <TableContainer sx={{}}>
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
                      for (const ele in item.vendorDocument) {
                        document.push(ele);
                      }
                      return (
                        <TableRow key={i} hover>
                          <TableCell align="center">{item.vendorId}</TableCell>
                          <TableCell align="center" className="capitalize">
                            {item.vendorName}
                          </TableCell>
                          <TableCell align="center">{item.vendorEmail}</TableCell>
                          <TableCell align="center">{item.vendorMobile}</TableCell>
                          <TableCell align="center">{item.vendorAddress}</TableCell>
                          <TableCell align="center">
                            {document.map((text, i) => (
                              <span key={i} className="capitalize">
                                {text}{' '}
                              </span>
                            ))}
                          </TableCell>
                          <TableCell align="center">{item?.holderName}</TableCell>
                          <TableCell align="center">{item.ifsc}</TableCell>
                          <TableCell align="center">{item.accountNumber}</TableCell>
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

      {/* update api */}
      <Modal open={updateOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} className=" w-full max-lg:h-screen max-lg:w-screen p-4 overflow-y-scroll">
          <div>
            <Toaster />
          </div>
          <div className=" max-lg:w-full flex flex-col gap-1 bg-white my-4 p-4 rounded-xl">
            <div className="flex justify-between pb-5">
              <p className="text-xl font-bold">Update Vendor</p>
              <button onClick={handleClose} className="">
                <IconX />
              </button>
            </div>
            <>
              <div>
                <div className="grid grid-cols-3 max-lg:grid-cols-2 max-lg:gap-5 max-sm:grid-cols-1 max-sm:gap-3 gap-10">
                  {/* vendor ID*/}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField id="demo-simple-set" label="vendorId" disabled={true} value={updateObj.vendorId} />
                    </FormControl>
                  </div>

                  {/* vendor name */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        id="demo-simple-seect"
                        label="Name"
                        value={updateObj.vendorName}
                        onChange={(e) => setUpdateObj({ ...updateObj, vendorName: e.target.value })}
                      />
                    </FormControl>
                    {vendorNameErr && <p className="text-red-500 ml-2 text-xs">vendor Name error</p>}
                  </div>
                  {/* vendor email*/}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basi"
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={updateObj.vendorEmail}
                        onChange={(e) => setUpdateObj({ ...updateObj, vendorEmail: e.target.value })}
                      />
                    </FormControl>
                    {vendorEmailErr && <p className="text-red-500 ml-2 text-xs">email error</p>}
                  </div>

                  {/* vendor mobile */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basi"
                        label="Mobile"
                        variant="outlined"
                        type="tel"
                        inputProps={{ maxLength: 10, minLength: 10 }}
                        value={updateObj.vendorMobile}
                        onChange={(e) => setUpdateObj({ ...updateObj, vendorMobile: e.target.value })}
                      />
                      {vendorMobileErr && <p className="text-red-500 ml-2 text-xs">mobile number error</p>}
                    </FormControl>
                  </div>

                  {/* vendor address*/}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basi"
                        label="vendorAddress"
                        variant="outlined"
                        type="text"
                        value={updateObj.vendorAddress}
                        onChange={(e) => setUpdateObj({ ...updateObj, vendorAddress: e.target.value })}
                      />
                    </FormControl>
                    {vendorAddressErr && <p className="text-red-500 ml-2 text-xs">Address Error</p>}
                  </div>
                  {/* IFSC code */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        label="IFSC code"
                        type="text"
                        value={updateObj.ifsc}
                        onChange={(e) => setUpdateObj({ ...updateObj, ifsc: e.target.value })}
                      />
                    </FormControl>
                    {ifscErr && <p className="text-red-500 ml-2 text-xs">IFSC Error</p>}
                  </div>

                  {/* holder name */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        type="text"
                        id="outlind-basic"
                        label="Holder Name"
                        variant="outlined"
                        value={updateObj.holderName}
                        onChange={(e) => setUpdateObj({ ...updateObj, holderName: e.target.value })}
                      />
                    </FormControl>
                    {holderNameErr && <p className="text-red-500 ml-2 text-xs">Holder name err</p>}
                  </div>
                  {/* Account Number */}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        label="Account Number"
                        type="number"
                        value={updateObj.accountNumber}
                        onChange={(e) => setUpdateObj({ ...updateObj, accountNumber: e.target.value })}
                      />
                    </FormControl>
                    {accountNumberErr && <p className="text-red-500 ml-2 text-xs">Account Number Error</p>}
                  </div>
                </div>{' '}
                <div className=" grid grid-cols-3 gap-6 mt-4 max-lg:grid-cols-2 max-lg:gap-4  max-md:grid-cols-1">
                  <div>
                    {updateObj?.vendorDocument?.aadhar == undefined ? (
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
                          <img src={updateObj?.vendorDocument?.aadhar} alt="aadhar" className="w-20 h-20 rounded-xl" />
                          <Button
                            onClick={() => setUpdateObj({ ...updateObj, vendorDocument: { ...updateObj.vendorDocument, aadhar: '' } })}
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
                    {updateObj?.vendorDocument?.pancard == undefined ? (
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
                          <img src={updateObj?.vendorDocument?.pancard} alt="pancard" className="w-20 h-20 rounded-xl" />
                          <Button
                            onClick={() => setUpdateObj({ ...updateObj, vendorDocument: { ...updateObj.vendorDocument, pancard: '' } })}
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
                    {updateObj?.vendorDocument?.voterId == undefined ? (
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
                          <img src={updateObj?.vendorDocument?.voterId} alt="voterId" className="w-20 h-20 rounded-xl" />
                          <Button
                            onClick={() => setUpdateObj({ ...updateObj, vendorDocument: { ...updateObj.vendorDocument, voterId: '' } })}
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
                <div>
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
                  <Button variant="contained" className={'bg-blue-700'} onClick={updateVendor}>
                    update vendor
                  </Button>
                  <Button variant="outlined" color="error" onClick={clearAllField}>
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          </div>
        </Box>
      </Modal>
      {/* update modal end */}
    </div>
  );
};
