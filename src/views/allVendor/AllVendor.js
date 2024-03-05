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
  Box
} from '@mui/material';
import axios from 'axios';
import FilterListIcon from '@mui/icons-material/FilterList';
import { IconX } from '@tabler/icons-react';
import toast, { Toaster } from 'react-hot-toast';

const columns = [
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
  const [currAddressErr, setCurrAddressErr] = useState(false);
  const [prmtAddressErr, setPrmtAddressErr] = useState(false);
  const [currAddressProofErr, setCurrAddressProofErr] = useState(false);
  const [prmtAddressProofErr, setPrmtAddressProofErr] = useState(false);
  const [holderNameErr, setHolderNameErr] = useState(false);
  const [ifscErr, setIFSCErr] = useState(false);
  const [aadharFrontErr, setAdharFrontErr] = useState(false);
  const [aadharBackErr, setAdharBackErr] = useState(false);
  const [pancardErr, setPancardErr] = useState(false);
  const [photoErr, setPhotoErr] = useState(false);
  const [bankNameErr, setBankNameErr] = useState(false);
  const [bankDetailsErr, setBankDetailsErr] = useState(false);
  const [adharNoErr, setAdharNoErr] = useState(false);
  const [panNoErr, setPanNoErr] = useState(false);
  const [gstNoErr, setGstNoErr] = useState(false);
  const [gstImgErr, setGstImgErr] = useState(false);
  const [pccErr, setPccErr] = useState(false);
  const [vagreeErr, setvagreeErr] = useState(false);
  const [accountNumberErr, setAccountNumberErr] = useState(false);
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
  // console.log(updateObj.vendorDocument);
  const UploadDocumenttos3Bucket = async (e) => {
    // console.log(e.target.files[0]);
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
      updateObj.currentAddress != '' &&
      updateObj.permanentAddress != '' &&
      updateObj.adhaarNumber != '' &&
      updateObj.panNumber != '' &&
      updateObj.gstNumber != '' &&
      updateObj.ifsc != '' &&
      updateObj.holderName != '' &&
      updateObj.accountNumber != '' &&
      updateObj.bankName != '' &&
      updateObj.vendorDocument?.pcc != '' &&
      updateObj.vendorDocument?.gstImg != '' &&
      updateObj.vendorDocument?.pancard != '' &&
      updateObj.vendorDocument?.profile != '' &&
      updateObj.vendorDocument?.aadharBack != '' &&
      updateObj.vendorDocument?.aadharFront != '' &&
      updateObj.vendorDocument?.bankDetails != '' &&
      updateObj.vendorDocument?.venderAggrement != '' &&
      updateObj.vendorDocument?.currentAddressProof != '' &&
      updateObj.vendorDocument?.parmanentAddressProof != ''
    ) {
      const document = {
        aadharFront: updateObj.vendorDocument?.aadharFront,
        aadharBack: updateObj.vendorDocument?.aadharBack,
        pancard: updateObj.vendorDocument?.pancard,
        gstImg: updateObj.vendorDocument.gstImg,
        pcc: updateObj.vendorDocument?.pcc,
        venderAggrement: updateObj.vendorDocument?.venderAggrement,
        bankDetails: updateObj.vendorDocument?.bankDetails,
        currentAddressProof: updateObj.vendorDocument?.currentAddressProof,
        parmanentAddressProof: updateObj.vendorDocument?.parmanentAddressProof,
        profile: updateObj.vendorDocument?.profile
      };

      const body = {
        vendorId: updateObj.vendorId,
        vendorName: updateObj.vendorName,
        vendorEmail: updateObj.vendorEmail,
        vendorMobile: updateObj.vendorMobile,
        currentAddress: updateObj.currentAddress,
        permanentAddress: updateObj.permanentAddress,
        vendorDocuments: document,
        ifsc: updateObj.ifsc,
        holderName: updateObj.holderName,
        accountNumber: updateObj.accountNumber,
        bankName: updateObj.bankName,
        activeStatus: Boolean(updateObj.activeStatus),
        adhaarNumber: updateObj.adhaarNumber,
        panNumber: updateObj.panNumber,
        gstNumber: updateObj.gstNumber
      };
      // console.log(body);
      axios
        .patch('http://192.168.1.230:3000/app/v1/vendor/updateVendors', body)
        .then((res) => {
          console.log(res);
          setLoader(true);
          toast.success('update successfully');
          clearAllField();
        })
        .catch((err) => {
          console.log('Api Err ', err);
          toast.error('Api Error');
        });
    } else {
      window.alert('kj');
      updateObj.vendorName == '' ? setVendorNameErr(true) : setVendorNameErr(false);
      validateEmail(updateObj.vendorEmail) ? setVendorEmailErr(false) : setVendorEmailErr(true);
      updateObj.vendorMobile == '' ? setVendorMobileErr(true) : setVendorMobileErr(false);
      updateObj.accountNumber == '' ? setAccountNumberErr(true) : setAccountNumberErr(false);
      updateObj.ifsc == '' ? setIFSCErr(true) : setIFSCErr(false);
      updateObj.holderName == '' ? setHolderNameErr(true) : setHolderNameErr(false);
      updateObj.vendorDocument.pcc == '' ? setPccErr(true) : setPccErr(false);
      updateObj.vendorDocument.gstImg == '' ? setGstImgErr(true) : setGstImgErr(false);
      updateObj.vendorDocument.pancard == '' ? setPancardErr(true) : setPancardErr(false);
      updateObj.vendorDocument.profile == '' ? setPhotoErr(true) : setPhotoErr(false);
      updateObj.vendorDocument.aadharBack == '' ? setAdharBackErr(true) : setAdharBackErr(false);
      updateObj.vendorDocument.aadharFront == '' ? setAdharFrontErr(true) : setAdharFrontErr(false);
      updateObj.vendorDocument.bankDetails == '' ? setBankDetailsErr(true) : setBankDetailsErr(false);
      updateObj.vendorDocument.venderAggrement == '' ? setvagreeErr(true) : setvagreeErr(false);
      updateObj.vendorDocument.currentAddressProof == '' ? setCurrAddressProofErr(true) : setCurrAddressProofErr(false);
      updateObj.vendorDocument.parmanentAddressProof == '' ? setPrmtAddressProofErr(true) : setPrmtAddressProofErr(false);
      updateObj.currentAddress == '' ? setCurrAddressErr(true) : setCurrAddressErr(false);
      updateObj.permanentAddress == '' ? setPrmtAddressErr(true) : setPrmtAddressErr(false);
      updateObj.adhaarNumber == '' ? setAdharNoErr(true) : setAdharNoErr(false);
      updateObj.panNumber == '' ? setPanNoErr(true) : setPanNoErr(false);
      updateObj.gstNumber == '' ? setGstNoErr(true) : setGstNoErr(false);
      updateObj.bankName == '' ? setBankNameErr(true) : setBankNameErr(false);
    }
  };
  const clearAllField = () => {
    setUpdateOpen(false);
    setVendorNameErr(false);
    setVendorEmailErr(false);
    setVendorMobileErr(false);
    setAccountNumberErr(false);
    setIFSCErr(false);
    setHolderNameErr(false);
    setPancardErr(false);
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
                      return (
                        <TableRow key={i} hover>
                          <TableCell align="center" className="capitalize">
                            {item.vendorName || 'NA'}
                          </TableCell>
                          <TableCell align="center">{item.vendorEmail || 'NA'}</TableCell>
                          <TableCell align="center">{item.vendorMobile || 'NA'}</TableCell>
                          <TableCell align="center">{item.currentAddress || 'NA'}</TableCell>
                          <TableCell align="center">{item?.holderName || 'NA'}</TableCell>
                          <TableCell align="center">{item.ifsc || 'NA'}</TableCell>
                          <TableCell align="center">{item.accountNumber || 'NA'}</TableCell>
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

      {/* update api */}
      <Modal
        open={updateOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="overflow-scroll"
      >
        <Box sx={style} className=" w-full h-screen  p-4">
          <div>
            <Toaster />
          </div>
          <div className=" max-lg:w-full flex flex-col gap-1 bg-white my-4 p-4 rounded-xl ">
            <div className="flex justify-between pb-5">
              <p className="text-xl font-bold">Update Vendor</p>
              <button onClick={handleClose} className="">
                <IconX />
              </button>
            </div>
            <>
              <div className="">
                <div className="grid grid-cols-4 max-lg:grid-cols-2 max-lg:gap-5 max-sm:grid-cols-1 max-sm:gap-3 gap-5">
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

                  {/* vendor current address*/}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basi"
                        label="current Address"
                        variant="outlined"
                        type="text"
                        value={updateObj.currentAddress}
                        onChange={(e) => setUpdateObj({ ...updateObj, currentAddress: e.target.value })}
                      />
                    </FormControl>
                    {currAddressErr && <p className="text-red-500 ml-2 text-xs">Address Error</p>}
                  </div>

                  {/* vendor PERMANENT address*/}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basi"
                        label="parmanent Address"
                        variant="outlined"
                        type="text"
                        value={updateObj.permanentAddress}
                        onChange={(e) => setUpdateObj({ ...updateObj, permanentAddress: e.target.value })}
                      />
                    </FormControl>
                    {prmtAddressErr && <p className="text-red-500 ml-2 text-xs">permanent Address Error</p>}
                  </div>
                  {/* Adhar card*/}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basi"
                        label="Adhaar Number"
                        variant="outlined"
                        type="text"
                        value={updateObj.adhaarNumber}
                        onChange={(e) => setUpdateObj({ ...updateObj, adhaarNumber: e.target.value })}
                      />
                    </FormControl>
                    {adharNoErr && <p className="text-red-500 ml-2 text-xs">adhaarNumber Error</p>}
                  </div>
                  {/* Bank name*/}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basi"
                        label="Bank Name"
                        variant="outlined"
                        type="text"
                        value={updateObj.bankName}
                        onChange={(e) => setUpdateObj({ ...updateObj, bankName: e.target.value })}
                      />
                    </FormControl>
                    {bankNameErr && <p className="text-red-500 ml-2 text-xs">bank name error</p>}
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
                  {/* vendor PERMANENT address*/}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basi"
                        label="pan number"
                        variant="outlined"
                        type="text"
                        value={updateObj.panNumber}
                        onChange={(e) => setUpdateObj({ ...updateObj, panNumber: e.target.value })}
                      />
                    </FormControl>
                    {panNoErr && <p className="text-red-500 ml-2 text-xs">pan card Error</p>}
                  </div>
                  {/* gstNO*/}
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basi"
                        label="GST Number"
                        variant="outlined"
                        type="text"
                        value={updateObj.gstNumber}
                        onChange={(e) => setUpdateObj({ ...updateObj, gstNumber: e.target.value })}
                      />
                    </FormControl>
                    {gstNoErr && <p className="text-red-500 ml-2 text-xs">Gst number Error</p>}
                  </div>
                </div>{' '}
                <div className=" grid grid-cols-3 gap-6 mt-4 max-lg:grid-cols-2 max-lg:gap-4  max-md:grid-cols-1">
                  {/* Aadhar front */}
                  <div>
                    {' '}
                    <p className="text-md font-semibold">Aadhar front</p>
                    {updateObj?.vendorDocument?.aadharFront == undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="aadharFront" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {aadharFrontErr && <p className="text-red-500 ml-2 text-xs">upload Aadhar front</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          <a href={updateObj?.vendorDocument?.aadharFront} target="_blank">
                            <img src={updateObj?.vendorDocument?.aadharFront} alt="aadharFront" className="w-20 h-20 rounded-xl" />
                          </a>{' '}
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, vendorDocument: { ...updateObj.vendorDocument, aadharFront: undefined } })
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
                  {/* Aadhar back */}
                  <div>
                    {' '}
                    <p className="text-md font-semibold">Aadhar Back</p>
                    {updateObj?.vendorDocument?.aadharBack == undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="aadharBack" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {aadharBackErr && <p className="text-red-500 ml-2 text-xs">Adhar back Error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          {' '}
                          <a href={updateObj?.vendorDocument?.aadharBack} target="_blank">
                            <img src={updateObj?.vendorDocument?.aadharBack} alt="aadharBack" className="w-20 h-20 rounded-xl" />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, vendorDocument: { ...updateObj.vendorDocument, aadharBack: undefined } })
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
                  {/* pancard */}
                  <div>
                    <p className="text-md font-semibold">Pan Card</p>
                    {updateObj?.vendorDocument?.pancard == undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="pancard" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {pancardErr && <p className="text-red-500 ml-2 text-xs">Pan Card Error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          {' '}
                          <a href={updateObj?.vendorDocument?.pancard} target="_blank">
                            <img src={updateObj?.vendorDocument?.pancard} alt="pancard" className="w-20 h-20 rounded-xl" />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, vendorDocument: { ...updateObj.vendorDocument, pancard: undefined } })
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

                  {/* gstImg */}
                  <div>
                    <p className="text-md font-semibold">GST document</p>
                    {updateObj?.vendorDocument?.gstImg == undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="gstImg" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {gstImgErr && <p className="text-red-500 ml-2 text-xs">gstImg Error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          {' '}
                          <a href={updateObj?.vendorDocument?.gstImg} target="_blank">
                            <img src={updateObj?.vendorDocument?.gstImg} alt="gstImg" className="w-20 h-20 rounded-xl" />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, vendorDocument: { ...updateObj.vendorDocument, gstImg: undefined } })
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

                  {/* pcc */}
                  <div>
                    <p className="text-md font-semibold">Pcc</p>
                    {updateObj?.vendorDocument?.pcc == undefined ? (
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
                          <a href={updateObj?.vendorDocument?.pcc} target="_blank">
                            <img src={updateObj?.vendorDocument?.pcc} alt="pcc" className="w-20 h-20 rounded-xl" />
                          </a>
                          <Button
                            onClick={() => setUpdateObj({ ...updateObj, vendorDocument: { ...updateObj.vendorDocument, pcc: undefined } })}
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* venderAggrement */}
                  <div>
                    <p className="text-md font-semibold">Vender Aggrement</p>
                    {updateObj?.vendorDocument?.venderAggrement == undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="venderAggrement" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {vagreeErr && <p className="text-red-500 ml-2 text-xs">venderAggrement Error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          {' '}
                          <a href={updateObj?.vendorDocument?.venderAggrement} target="_blank">
                            {' '}
                            <img src={updateObj?.vendorDocument?.venderAggrement} alt="venderAggrement" className="w-20 h-20 rounded-xl" />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, vendorDocument: { ...updateObj.vendorDocument, venderAggrement: undefined } })
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

                  {/* bankDetails */}
                  <div>
                    <p className="text-md font-semibold">Bank Details</p>
                    {updateObj?.vendorDocument?.bankDetails == undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="bankDetails" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {bankDetailsErr && <p className="text-red-500 ml-2 text-xs">Pan Card Error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          {' '}
                          <a href={updateObj?.vendorDocument?.bankDetails} target="_blank">
                            {' '}
                            <img src={updateObj?.vendorDocument?.bankDetails} alt="bankDetails" className="w-20 h-20 rounded-xl" />
                          </a>{' '}
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, vendorDocument: { ...updateObj.vendorDocument, bankDetails: undefined } })
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

                  {/* currentAddressProof */}
                  <div>
                    <p className="text-md font-semibold">Current Address Proof</p>
                    {updateObj?.vendorDocument?.currentAddressProof == undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="currentAddressProof" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {currAddressProofErr && <p className="text-red-500 ml-2 text-xs">currentAddressProof Error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          {' '}
                          <a href={updateObj?.vendorDocument?.currentAddressProof} target="_blank">
                            <img src={updateObj?.vendorDocument?.currentAddressProof} alt="pancard" className="w-20 h-20 rounded-xl" />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({
                                ...updateObj,
                                vendorDocument: { ...updateObj.vendorDocument, currentAddressProof: undefined }
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
                  {/* parmanentAddressProof: */}
                  <div>
                    <p className="text-md font-semibold">Parmanent Address Proof</p>
                    {updateObj?.vendorDocument?.parmanentAddressProof == undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="parmanentAddressProof" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {prmtAddressProofErr && <p className="text-red-500 ml-2 text-xs">parmanentAddressProof Error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          {' '}
                          <a href={updateObj?.vendorDocument?.parmanentAddressProof} target="_blank">
                            <img
                              src={updateObj?.vendorDocument?.parmanentAddressProof}
                              alt="parmanentAddressProof"
                              className="w-20 h-20 rounded-xl"
                            />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({
                                ...updateObj,
                                vendorDocument: { ...updateObj.vendorDocument, parmanentAddressProof: undefined }
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
                  {/* profile: */}
                  <div>
                    <p className="text-md font-semibold">Profile</p>
                    {updateObj?.vendorDocument?.profile == undefined ? (
                      <>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="profile" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                        {photoErr && <p className="text-red-500 ml-2 text-xs">profile Error</p>}
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          {' '}
                          <a href={updateObj?.vendorDocument?.profile} target="_blank">
                            <img src={updateObj?.vendorDocument?.profile} alt="profile" className="w-20 h-20 rounded-xl" />
                          </a>
                          <Button
                            onClick={() =>
                              setUpdateObj({ ...updateObj, vendorDocument: { ...updateObj.vendorDocument, profile: undefined } })
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
                <div className="mt-1">
                  <input
                    type="checkbox"
                    checked={Boolean(updateObj.activeStatus)}
                    id="status"
                    onChange={(e) => setUpdateObj({ ...updateObj, activeStatus: e.target.checked })}
                  />{' '}
                  <label htmlFor="status"> Active Status</label>
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
