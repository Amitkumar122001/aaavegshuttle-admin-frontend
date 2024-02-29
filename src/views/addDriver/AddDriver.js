import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../ui-component/LoaderCircular';
export const AddDriver = () => {
  const [driverForm, setDriverForm] = useState({
    drName: '',
    drmobile: '',
    drAddress: '',
    vendorId: '',
    drProfile: '',
    drAadharNO: '',
    drAadharFront: '',
    drAadharBack: '',
    drPancard: '',
    drPanNO: '',
    drLicense: '',
    drPhoto: '',
    drAlternatemobile: '',
    currAddress: '',
    currAddressProof: '',
    prmtAddress: '',
    prmtAddressProof: '',
    drBGV: '',
    police_verification: '',
    IMEI_No: '',
    covidVaccination: '',
    drFingerPrint: '',
    drResume: '',
    drLicenseStart: '',
    drLicenseEnd: ''
  });
  const [vendorData, setVendorData] = useState([]);
  useEffect(() => {
    axios
      .get('http://192.168.1.230:3000/app/v1/vendor/getAllVendors')
      .then((res) => setVendorData(res.data?.result))
      .catch((err) => console.log(err));
  }, []);
  const [drNameErr, setDrNameErr] = useState(false);
  const [drmobileErr, setDrMobileErr] = useState(false);
  const [drAddressErr, setDrAddressErr] = useState(false);
  const [drProfileErr, setDrProfileErr] = useState(false);
  const [drAdharErr, setDrAdharErr] = useState(false);
  const [drPancardErr, setDrPancardErr] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [drLicenseErr, setDrLicenseErr] = useState(true);
  const handleDocumentPhoto = async (event) => {
    const name = event.target.name;
    setisLoading(true);
    const link = await UploadDocumenttos3Bucket(event);
    setDriverForm({ ...driverForm, [name]: link });
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
  const handleDriver = () => {
    if (driverForm.drName != '' && driverForm.drmobile?.length == 10 && driverForm.drPancard != '' && driverForm.drLicense != '') {
      const document = {
        pancard: driverForm.drPancard
      };

      const body = {
        driverName: driverForm.drName,
        driverPhonenumber: driverForm.drmobile,
        driverDocument: document,
        vendorId: driverForm.vendorId
      };
      console.log(body);
      axios
        .post('http://192.168.1.230:3000/app/v1/driver/createDriver', body)
        .then((res) => {
          toast.success(res.data.result || 'Driver Added SuccessFully');
          console.log(res);
        })
        .catch((err) => {
          console.log('Api error ', err);
          toast.error('Error');
        });
      setDrNameErr(false);
      setDrMobileErr(false);

      setDrPancardErr(false);
      setDrLicenseErr(false);
    } else {
      driverForm.drName == '' ? setDrNameErr(true) : setDrNameErr(false);
      driverForm.drmobile == '' ? setDrMobileErr(true) : setDrMobileErr(false);

      driverForm.drPancard == '' ? setDrPancardErr(true) : setDrPancardErr(false);
      driverForm.drLicense == '' ? setDrLicenseErr(true) : setDrLicenseErr(false);
    }
  };
  return (
    <div>
      <div>
        <Toaster />
      </div>
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
      <div className="flex flex-col gap-10 bg-white p-4 rounded-xl">
        {/* heading */}
        <div>
          <p className="text-3xl text-gray-600 text-center">Driver Details</p>
          <p className=" border border-gray-300 mt-5"></p>
        </div>
        <div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="Vendor Id">Select Vendor</InputLabel>
              <Select
                labelId="Vendor Id"
                id="demo-sple-select"
                label="Select Vendor"
                value={driverForm.vendorId}
                onChange={(e) => setDriverForm({ ...driverForm, vendorId: e.target.value })}
              >
                <MenuItem value="value">value</MenuItem>
                {vendorData.map((item, i) => (
                  <MenuItem key={i} value={item.vendorId}>
                    {item.vendorName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        {driverForm.vendorId && (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-8">
              <div>
                <FormControl fullWidth>
                  <TextField
                    id="outlined-basic"
                    type="text"
                    label="Name"
                    variant="outlined"
                    value={driverForm.drName}
                    onChange={(e) => setDriverForm({ ...driverForm, drName: e.target.value })}
                  />
                </FormControl>
                {drNameErr && <p className="text-red-500 text-xs ml-2">name error</p>}
              </div>
              <div>
                <FormControl fullWidth>
                  <TextField
                    id="outlined-basic"
                    label="IMEI NO"
                    type="text"
                    variant="outlined"
                    value={driverForm.IMEI_No}
                    onChange={(e) => setDriverForm({ ...driverForm, IMEI_No: e.target.value })}
                  />
                </FormControl>
                <p className="text-red-500 text-xs ml-2">IMEI_No error</p>
              </div>
              <div>
                <FormControl fullWidth>
                  <TextField
                    type="tel"
                    inputProps={{ maxLength: 10, minLength: 10 }}
                    label="Mobile Number"
                    variant="outlined"
                    value={driverForm.drmobile}
                    pattern="[0-9]{10}"
                    onChange={(e) => setDriverForm({ ...driverForm, drmobile: e.target.value })}
                  />
                </FormControl>
                {drmobileErr && <p className="text-red-500 text-xs ml-2">number error</p>}
              </div>
              <div>
                <FormControl fullWidth>
                  <TextField
                    type="tel"
                    inputProps={{ maxLength: 10, minLength: 10 }}
                    label="Alternate Number"
                    variant="outlined"
                    value={driverForm.drAlternatemobile}
                    pattern="[0-9]{10}"
                    onChange={(e) => setDriverForm({ ...driverForm, drAlternatemobile: e.target.value })}
                  />
                </FormControl>
                <p className="text-red-500 text-xs ml-2">alternatemobile error</p>
              </div>

              <div>
                {driverForm.drPhoto == '' ? (
                  <p className="w-full flex justify-between border rounded-xl p-3  border-gray-400">
                    <label htmlFor="photo" className="w-full block text-gray-500">
                      Upload current Address{' '}
                    </label>{' '}
                    <input type="file" id="photo" name="drPhoto" onChange={(e) => handleDocumentPhoto(e)} className="text-xs w-24" />
                  </p>
                ) : (
                  <div className="flex justify-between">
                    <img src={driverForm.drPhoto} alt="photo" className="w-20 h-20 rounded-xl" />
                    <Button onClick={() => setDriverForm({ ...drPhoto, photo: '' })} variant="outlined" color="error">
                      remove
                    </Button>
                  </div>
                )}
                <p className="text-red-500 text-xs ml-2">upload photo</p>
              </div>
            </div>

            {/* Address */}
            <div>
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-xl text-gray-500">Address details</p>
                  <p className=" border border-gray-300 mt-1"></p>
                </div>

                <div className="flex flex-col gap-10">
                  <div className="flex gap-10 max-md:flex-col items-center w-full">
                    <div className="w-full ">
                      <FormControl fullWidth>
                        <TextField
                          type="text"
                          id="outlined-basic"
                          label="Current Address"
                          variant="outlined"
                          value={driverForm.currAddress}
                          onChange={(e) => setDriverForm({ ...driverForm, currAddress: e.target.value })}
                        />
                      </FormControl>
                      <p className="text-red-500 text-xs ml-2">currAddress error</p>
                    </div>
                    <div className="w-full ">
                      {driverForm.currAddress == '' ? (
                        <p className="w-full flex justify-between border rounded-xl p-3  border-gray-400">
                          <label htmlFor="currAddress" className="w-full block max-lg:text-[12px] max-md:text-[10px]">
                            Upload current Address{' '}
                          </label>{' '}
                          <input
                            type="file"
                            id="currAddress"
                            name="currAddressProof"
                            onChange={(e) => handleDocumentPhoto(e)}
                            className="text-xs w-24"
                          />
                        </p>
                      ) : (
                        <div className="flex justify-between">
                          {' '}
                          <img src={driverForm.currAddressProof} alt="currAddress" className="w-20 h-20 rounded-xl" />
                          <Button onClick={() => setVendorForm({ ...vendorForm, currAddressProof: '' })} variant="outlined" color="error">
                            remove
                          </Button>
                        </div>
                      )}
                      <p className="text-red-500 text-xs ml-2">upload Curr Address </p>
                    </div>
                  </div>
                  <div className="flex gap-10 max-md:flex-col  items-center w-full">
                    <div className="w-full">
                      <FormControl fullWidth>
                        <TextField
                          type="text"
                          id="outlined-basic"
                          label="Parmanent Address"
                          variant="outlined"
                          value={driverForm.prmtAddress}
                          onChange={(e) => setVendorForm({ ...driverForm, prmtAddress: e.target.value })}
                        />
                      </FormControl>
                      <p className="text-red-500  ml-2">currAddress error</p>
                    </div>
                    <div className="w-full ">
                      {driverForm.prmtAddressProof == '' ? (
                        <p className="w-full flex justify-between border rounded-xl p-3  border-gray-400">
                          <label htmlFor="currAddress" className="w-full block max-lg:text-[12px] max-md:text-[10px]">
                            Upload permanent Address{' '}
                          </label>{' '}
                          <input
                            type="file"
                            id="prmtAddress"
                            name="prmtAddressProof"
                            onChange={(e) => handleDocumentPhoto(e)}
                            className="text-xs w-24"
                          />
                        </p>
                      ) : (
                        <div className="flex justify-between">
                          {' '}
                          <img src={driverForm.prmtAddressProof} alt="prmtAddressProof" className="w-20 h-20 rounded-xl" />
                          <Button onClick={() => setDriverForm({ ...driverForm, prmtAddressProof: '' })} variant="outlined" color="error">
                            remove
                          </Button>
                        </div>
                      )}
                      <p className="text-red-500 text-xs ml-2">parmanent Address error</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* document */}
            <div>
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-xl text-gray-500">Document</p>
                  <p className="border border-gray-300 mt-2"></p>
                </div>
                {/* Adhar card */}
                <div>
                  <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 max-md:gap-3">
                    <div>
                      <FormControl fullWidth>
                        <TextField
                          type="number"
                          id="outlined-basic"
                          label="Aadhar Number"
                          variant="outlined"
                          value={driverForm.drAadharNO}
                          onChange={(e) => setDriverForm({ ...driverForm, drAadharNO: e.target.value })}
                        />
                      </FormControl>
                      <p className="text-red-500  ml-2">Adhar number error</p>
                    </div>
                    <div>
                      {driverForm.drAadharFront == '' ? (
                        <p className="w-full flex justify-between border rounded-xl p-3 border-gray-400">
                          <label htmlFor="aadharFront" className="w-full block max-lg:text-[12px] max-md:text-[10px]">
                            Upload aadharFront{' '}
                          </label>{' '}
                          <input
                            type="file"
                            id="aadharFront"
                            name="drAadharFront"
                            onChange={(e) => handleDocumentPhoto(e)}
                            className="text-xs w-28 "
                          />
                        </p>
                      ) : (
                        <div className="flex justify-between">
                          {' '}
                          <img src={driverForm.drAadharFront} alt="aadharFront" className="w-20 h-20 rounded-xl" />
                          <Button onClick={() => setDriverForm({ ...driverForm, drAadharFront: '' })} variant="outlined" color="error">
                            remove
                          </Button>
                        </div>
                      )}
                      <p className="text-red-500 text-xs ml-2">upload AadharFront card </p>
                    </div>
                    <div>
                      {driverForm.drAadharBack == '' ? (
                        <p className="w-full flex justify-between border rounded-xl p-3  border-gray-400">
                          <label htmlFor="aadharBack" className="w-full block max-lg:text-[12px] max-md:text-[10px]">
                            Upload aadharBack{' '}
                          </label>{' '}
                          <input
                            type="file"
                            id="aadharBack"
                            name="drAadharBack"
                            onChange={(e) => handleDocumentPhoto(e)}
                            className="text-xs w-28"
                          />
                        </p>
                      ) : (
                        <div className="flex justify-between">
                          {' '}
                          <img src={driverForm.drAadharBack} alt="aadharBack" className="w-20 h-20 rounded-xl" />
                          <Button onClick={() => setDriverForm({ ...driverForm, drAadharBack: '' })} variant="outlined" color="error">
                            remove
                          </Button>
                        </div>
                      )}
                      <p className="text-red-500 text-xs ml-2">upload aadharBack card </p>
                    </div>
                  </div>
                </div>
                {/* Driving License */}
                <div>
                  <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 max-md:gap-3">
                    <div>
                      {driverForm.drLicense == '' ? (
                        <>
                          <InputLabel>Driving License</InputLabel>
                          <FormControl fullWidth>
                            <TextField type="file" variant="outlined" name="drLicense" onChange={(e) => handleDocumentPhoto(e)} />
                          </FormControl>
                        </>
                      ) : (
                        <div className="flex justify-between">
                          <img src={driverForm.drLicense} alt="drLicence" className="w-20 h-20 rounded-xl" />
                          <Button onClick={() => setDriverForm({ ...driverForm, drLicense: '' })} variant="outlined" color="error">
                            remove
                          </Button>
                        </div>
                      )}
                      {drLicenseErr && <p className="text-red-500 text-xs ml-2">upload License error</p>}
                    </div>
                    <div>
                      <InputLabel>License validity From</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="outlined-basic"
                          label=""
                          variant="outlined"
                          value={driverForm.drLicenseStart}
                          onChange={(e) => setDriverForm({ ...driverForm, drLicenseStart: e.target.value })}
                        />
                      </FormControl>
                      <p className="text-red-500  ml-2">drLicenseStart error</p>
                    </div>
                    <div>
                      {' '}
                      <InputLabel>License validity Till</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="outlined-basic"
                          label=""
                          variant="outlined"
                          value={driverForm.drLicenseEnd}
                          onChange={(e) => setDriverForm({ ...driverForm, drLicenseEnd: e.target.value })}
                        />
                      </FormControl>
                      <p className="text-red-500  ml-2">drLicenseEnd error</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 max-md:grid-cols-1 max-lg:gap-7 gap-10">
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        id="outlined-basic"
                        label="Pan Number"
                        variant="outlined"
                        value={driverForm.drPanNO}
                        onChange={(e) => setDriverForm({ ...driverForm, drPanNO: e.target.value })}
                      />
                    </FormControl>
                    <p className="text-red-500 ml-2">pan number error</p>
                  </div>
                  <div>
                    {driverForm.drPancard == '' ? (
                      <>
                        <p className="w-full flex justify-between border rounded-xl p-3  border-gray-400">
                          <label htmlFor="pancard" className="w-full block max-lg:text-[12px] max-md:text-[10px]">
                            Upload pancard{' '}
                          </label>{' '}
                          <input
                            type="file"
                            id="pancard"
                            name="drPancard"
                            onChange={(e) => handleDocumentPhoto(e)}
                            className="text-xs w-24"
                          />
                        </p>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        {' '}
                        <img src={driverForm.drPancard} alt="pancard" className="w-20 h-20 rounded-xl" />
                        <Button onClick={() => setDriverForm({ ...driverForm, drPancard: '' })} variant="outlined" color="error">
                          remove
                        </Button>
                      </div>
                    )}
                    <p className="text-red-500 text-xs ml-2">upload pan card </p>
                  </div>
                  <div>
                    {driverForm.drLicense == '' ? (
                      <>
                        <InputLabel>Driving License</InputLabel>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="drLicense" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <img src={driverForm.drLicense} alt="drLicence" className="w-20 h-20 rounded-xl" />
                        <Button onClick={() => setDriverForm({ ...driverForm, drLicense: '' })} variant="outlined" color="error">
                          remove
                        </Button>
                      </div>
                    )}
                    {drLicenseErr && <p className="text-red-500 text-xs ml-2">upload License error</p>}
                  </div>

                  <div>
                    {driverForm.police_verification == '' ? (
                      <>
                        {' '}
                        <InputLabel>Police Verification</InputLabel>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="police_verification" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <img src={driverForm.police_verification} alt="police_verification" className="w-20 h-20 rounded-xl" />
                        <Button onClick={() => setDriverForm({ ...driverForm, police_verification: '' })} variant="outlined" color="error">
                          remove
                        </Button>
                      </div>
                    )}
                    <p className="text-red-500 text-xs ml-2">upload police_verification </p>
                  </div>
                  <div>
                    {driverForm.covidVaccination == '' ? (
                      <>
                        {' '}
                        <InputLabel>Covid Vaccination</InputLabel>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="covidVaccination" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <img src={driverForm.covidVaccination} alt="covidVaccination" className="w-20 h-20 rounded-xl" />
                        <Button onClick={() => setDriverForm({ ...driverForm, covidVaccination: '' })} variant="outlined" color="error">
                          remove
                        </Button>
                      </div>
                    )}
                    <p className="text-red-500 text-xs ml-2">upload covidVaccination </p>
                  </div>
                  <div>
                    {driverForm.drFingerPrint == '' ? (
                      <>
                        {' '}
                        <InputLabel>FingerPrints</InputLabel>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="drFingerPrint" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <img src={driverForm.drFingerPrint} alt="drFingerPrint" className="w-20 h-20 rounded-xl" />
                        <Button onClick={() => setDriverForm({ ...driverForm, drFingerPrint: '' })} variant="outlined" color="error">
                          remove
                        </Button>
                      </div>
                    )}
                    <p className="text-red-500 text-xs ml-2">upload drFingerPrint </p>
                  </div>
                  <div>
                    {driverForm.drBGV == '' ? (
                      <>
                        {' '}
                        <InputLabel>drBGV</InputLabel>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="drBGV" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <img src={driverForm.drBGV} alt="drBGV" className="w-20 h-20 rounded-xl" />
                        <Button onClick={() => setDriverForm({ ...driverForm, drBGV: '' })} variant="outlined" color="error">
                          remove
                        </Button>
                      </div>
                    )}
                    <p className="text-red-500 text-xs ml-2">upload drBGV </p>
                  </div>
                  <div>
                    {driverForm.drResume == '' ? (
                      <>
                        {' '}
                        <InputLabel>Resume</InputLabel>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="drResume" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <img src={driverForm.drResume} alt="drResume" className="w-20 h-20 rounded-xl" />
                        <Button onClick={() => setDriverForm({ ...driverForm, drResume: '' })} variant="outlined" color="error">
                          remove
                        </Button>
                      </div>
                    )}
                    <p className="text-red-500 text-xs ml-2">upload dr Resume</p>
                  </div>
                </div>
              </div>
            </div>

            {/* button */}
            <div>
              <div className="flex justify-between">
                <Button variant="contained" className="bg-blue-700" onClick={handleDriver}>
                  Add Driver
                </Button>
                <Button variant="outlined" color="error">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
