import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Input } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import LoaderCircular from 'ui-component/LoaderCircular';
export const AddConductor = () => {
  const [conductorForm, setConductorForm] = useState({
    conName: '',
    conMobile: '',
    conAddress: '',
    vendorId: '',
    conPhoto: '',
    conPancard: '',
    covidVaccination: '',
    conAadharFront: '',
    conAadharBack: '',
    conAlternatemobile: '',
    police_verification: '',
    pccEnd: '',
    pccStart: '',
    currAddress: '',
    currAddressProof: '',
    prmtAddress: '',
    prmtAddressProof: '',
    conPanNO: '',
    conBGV: '',
    IMEI_No: '',
    conFingerPrint: '',
    conResume: ''
  });
  const [vendorData, setVendorData] = useState([]);
  useEffect(() => {
    axios
      .get('http://192.168.1.230:3000/app/v1/vendor/getAllVendors')
      .then((res) => setVendorData(res.data?.result))
      .catch((err) => console.log(err));
  }, []);
  const [conNameErr, setConNameErr] = useState(false);
  const [conMobileErr, setConMobileErr] = useState(false);
  const [conAddressErr, setConAddressErr] = useState(false);
  const [conProfileErr, setConProfileErr] = useState(false);
  const [conAdharErr, setConAdharErr] = useState(false);
  const [conPancardErr, setConPancardErr] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const handleDocumentPhoto = async (event) => {
    const name = event.target.name;
    setisLoading(true);
    const link = await UploadDocumenttos3Bucket(event);
    setConductorForm({ ...conductorForm, [name]: link });
    setisLoading(false);
  };
  const imageUploadApi = async (value) => {
    let result = await axios.request(value);
    // console.log(result.data.name);
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
  const clearAll = () => {
    setConductorForm({
      conName: '',
      conMobile: '',
      conAddress: '',
      vendorId: '',
      conProfile: '',

      conPancard: ''
    });
    setConNameErr(false);
    setConMobileErr(false);
    setConAddressErr(false);
    setConProfileErr(false);
    setConAdharErr(false);
    setConPancardErr(false);
  };
  const handleConductor = () => {
    if (
      conductorForm.conName != '' &&
      conductorForm.conMobile?.length == 10 &&
      conductorForm.conAddress != '' &&
      conductorForm.conAadhar != '' &&
      conductorForm.conPancard != ''
    ) {
      const document = {
        pancard: conductorForm.conPancard
      };

      const body = {
        conductorName: conductorForm.conName,

        conductorMobile: conductorForm.conMobile,
        conductorDocument: document,
        vendorId: conductorForm.vendorId
      };
      console.log(body);
      axios
        .post('http://192.168.1.230:3000/app/v1/conductor/insertConductor', body)
        .then((res) => {
          // console.log(res.data)
          toast.success(`${res.data.result}`);
          clearAll();
        })
        .catch((err) => {
          console.log('Api error ', err);
          toast.success('Error');
        });
    } else {
      conductorForm.conName == '' ? setConNameErr(true) : setConNameErr(false);
      conductorForm.conMobile == '' ? setConMobileErr(true) : setConMobileErr(false);

      conductorForm.conProfile == '' ? setConProfileErr(true) : setConProfileErr(false);
      conductorForm.conPancard == '' ? setConPancardErr(true) : setConPancardErr(false);
    }
  };

  return (
    <div>
      <div>
        <Toaster />
      </div>
      {isLoading && (
        <div>
          <LoaderCircular />
        </div>
      )}
      <div className="flex flex-col gap-10 bg-white p-4 rounded-xl">
        {/* heading */}
        <div>
          <p className="text-3xl text-gray-600 text-center">Conductor Details</p>
          <p className=" border border-gray-300 mt-5"></p>
        </div>
        <div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="Vendor Id">Vendors</InputLabel>
              <Select
                labelId="Vendor Id"
                id="demo-sple-select"
                label="Vendor Id"
                value={conductorForm.vendorId}
                onChange={(e) => setConductorForm({ ...conductorForm, vendorId: e.target.value })}
              >
                {vendorData.map((item, i) => (
                  <MenuItem key={i} value={item.vendorId}>
                    {item.vendorName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        {conductorForm.vendorId && (
          <>
            <div>
              <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-6">
                <div>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-basic"
                      type="text"
                      label="Name"
                      variant="outlined"
                      value={conductorForm.conName}
                      onChange={(e) => setConductorForm({ ...conductorForm, conName: e.target.value })}
                    />
                  </FormControl>
                  {conNameErr && <p className="text-red-500 text-xs ml-2">name error</p>}
                </div>
                <div>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-basic"
                      label="IMEI NO"
                      type="text"
                      variant="outlined"
                      value={conductorForm.IMEI_No}
                      onChange={(e) => setConductorForm({ ...conductorForm, IMEI_No: e.target.value })}
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
                      value={conductorForm.conMobile}
                      pattern="[0-9]{10}"
                      onChange={(e) => setConductorForm({ ...conductorForm, conMobile: e.target.value })}
                    />
                  </FormControl>
                  {conMobileErr && <p className="text-red-500 text-xs ml-2">number error</p>}
                </div>
                <div>
                  <FormControl fullWidth>
                    <TextField
                      type="tel"
                      inputProps={{ maxLength: 10, minLength: 10 }}
                      label="Alternate Number"
                      variant="outlined"
                      value={conductorForm.conAlternatemobile}
                      pattern="[0-9]{10}"
                      onChange={(e) => setConductorForm({ ...conductorForm, conAlternatemobile: e.target.value })}
                    />
                  </FormControl>
                  <p className="text-red-500 text-xs ml-2">alternatemobile error</p>
                </div>
                <div>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-basic"
                      label="Address"
                      type="text"
                      variant="outlined"
                      value={conductorForm.conAddress}
                      onChange={(e) => setConductorForm({ ...conductorForm, conAddress: e.target.value })}
                    />
                  </FormControl>
                  {conAddressErr && <p className="text-red-500 text-xs ml-2">Address error</p>}
                </div>
                <div>
                  {conductorForm.conPhoto == '' ? (
                    <p className="w-full flex justify-between border rounded-xl p-3  border-gray-400">
                      <label htmlFor="photo" className="w-full block text-gray-500">
                        Upload pofile{' '}
                      </label>{' '}
                      <input type="file" id="photo" name="conPhoto" onChange={(e) => handleDocumentPhoto(e)} className="text-xs w-24" />
                    </p>
                  ) : (
                    <div className="flex justify-between">
                      <img src={conductorForm.conPhoto} alt="photo" className="w-20 h-20 rounded-xl" />
                      <Button onClick={() => setConductorForm({ ...drPhoto, conPhoto: '' })} variant="outlined" color="error">
                        remove
                      </Button>
                    </div>
                  )}
                  <p className="text-red-500 text-xs ml-2">upload photo</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-xl text-gray-500">Address details</p>
                  <p className=" border border-gray-300 mt-1"></p>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex gap-6 max-md:flex-col items-center w-full">
                    <div className="w-full ">
                      <FormControl fullWidth>
                        <TextField
                          type="text"
                          id="outlined-basic"
                          label="Current Address"
                          variant="outlined"
                          value={conductorForm.currAddress}
                          onChange={(e) => setConductorForm({ ...conductorForm, currAddress: e.target.value })}
                        />
                      </FormControl>
                      <p className="text-red-500 text-xs ml-2">currAddress error</p>
                    </div>
                    <div className="w-full ">
                      {conductorForm.currAddressProof == '' ? (
                        <p className="w-full flex justify-between border rounded-xl p-3  border-gray-400">
                          <label htmlFor="currAddress" className="w-full block text-gray-500">
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
                          <img src={conductorForm.currAddressProof} alt="currAddress" className="w-20 h-20 rounded-xl" />
                          <Button
                            onClick={() => setVendorForm({ ...conductorForm, currAddressProof: '' })}
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      )}
                      <p className="text-red-500 text-xs ml-2">upload Curr Address </p>
                    </div>
                  </div>
                  <div className="flex gap-6 max-md:flex-col items-center w-full">
                    <div className="w-full">
                      <FormControl fullWidth>
                        <TextField
                          type="text"
                          id="outlined-basic"
                          label="Parmanent Address"
                          variant="outlined"
                          value={conductorForm.prmtAddress}
                          onChange={(e) => setVendorForm({ ...conductorForm, prmtAddress: e.target.value })}
                        />
                      </FormControl>
                      <p className="text-red-500 ml-2">prmtAddress error</p>
                    </div>
                    <div className="w-full ">
                      {conductorForm.prmtAddressProof == '' ? (
                        <p className="w-full flex justify-between border rounded-xl p-3  border-gray-400">
                          <label htmlFor="prmtAddress" className="w-full block text-gray-500">
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
                          <img src={conductorForm.prmtAddressProof} alt="prmtAddressProof" className="w-20 h-20 rounded-xl" />
                          <Button
                            onClick={() => setConductorForm({ ...conductorForm, prmtAddressProof: '' })}
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      )}
                      <p className="text-red-500 text-xs ml-2">upload parmanent Address </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
                          value={conductorForm.drAadharNO}
                          onChange={(e) => setConductorForm({ ...conductorForm, drAadharNO: e.target.value })}
                        />
                      </FormControl>
                      <p className="text-red-500  ml-2">Adhar number error</p>
                    </div>
                    <div>
                      {conductorForm.conAadharFront == '' ? (
                        <p className="w-full flex justify-between border rounded-xl p-3 border-gray-400">
                          <label htmlFor="aadharFront" className="w-full block text-gray-500 ">
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
                          <img src={conductorForm.conAadharFront} alt="aadharFront" className="w-20 h-20 rounded-xl" />
                          <Button
                            onClick={() => setConductorForm({ ...conductorForm, conAadharFront: '' })}
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      )}
                      <p className="text-red-500 text-xs ml-2">upload AadharFront card </p>
                    </div>
                    <div>
                      {conductorForm.conAadharBack == '' ? (
                        <p className="w-full flex justify-between border rounded-xl p-3  border-gray-400">
                          <label htmlFor="aadharBack" className="w-full block text-gray-500  ">
                            Upload aadharBack{' '}
                          </label>{' '}
                          <input
                            type="file"
                            id="aadharBack"
                            name="conAadharBack"
                            onChange={(e) => handleDocumentPhoto(e)}
                            className="text-xs w-28"
                          />
                        </p>
                      ) : (
                        <div className="flex justify-between">
                          {' '}
                          <img src={conductorForm.conAadharBack} alt="aadharBack" className="w-20 h-20 rounded-xl" />
                          <Button
                            onClick={() => setConductorForm({ ...conductorForm, conAadharBack: '' })}
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      )}
                      <p className="text-red-500 text-xs ml-2">upload aadharBack card </p>
                    </div>
                  </div>
                </div>
                {/* PCC */}
                <div>
                  <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 max-md:gap-3">
                    <div>
                      {conductorForm.police_verification == '' ? (
                        <>
                          <p className="w-full flex justify-between border rounded-xl p-3  border-gray-400">
                            <label htmlFor="pancard" className="w-full block text-gray-500 ">
                              police_verification{' '}
                            </label>{' '}
                            <input
                              type="file"
                              id="police"
                              name="police_verification"
                              onChange={(e) => handleDocumentPhoto(e)}
                              className="text-xs w-28"
                            />
                          </p>
                        </>
                      ) : (
                        <div className="flex justify-between">
                          {' '}
                          <img src={conductorForm.police_verification} alt="police_verification" className="w-20 h-20 rounded-xl" />
                          <Button
                            onClick={() => setConductorForm({ ...conductorForm, police_verification: '' })}
                            variant="outlined"
                            color="error"
                          >
                            remove
                          </Button>
                        </div>
                      )}
                      <p className="text-red-500 text-xs ml-2">upload police Verification </p>
                    </div>
                    <div>
                      <p className='flex flex-col border border-gray-400 rounded-xl px-2'>
                        <label className="text-md">pcc start</label>
                        <Input
                          type="date"
                          className=''
                          id="component-simple"
                          value={conductorForm.pccStart}
                          onChange={(e) => setConductorForm({ ...conductorForm, pccStart: e.target.value })}
                        />
                      </p>

                      <p className="text-red-500  ml-2">Pcc start error</p>
                    </div>
                    <div>
                    <p className='flex flex-col border border-gray-400 rounded-xl px-2'>
                        <label className="text-md">pcc end</label>
                        <Input
                          type="date"
                          className=''
                          id="component-simple"
                          value={conductorForm.pccEnd}
                          onChange={(e) => setConductorForm({ ...conductorForm, pccEnd: e.target.value })}
                        />
                      </p>
                      <p className="text-red-500  ml-2">PCC end error</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 max-md:grid-cols-1 max-lg:gap-7 gap-5">
                  <div className="w-full">
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        id="outlined-basic"
                        label="Pan Card Number"
                        variant="outlined"
                        value={conductorForm.conPanNO}
                        onChange={(e) => setConductorForm({ ...conductorForm, conPanNO: e.target.value })}
                      />
                    </FormControl>
                    <p className="text-red-500 ml-2">pan number error</p>
                  </div>
                  <div>
                    {conductorForm.conPancard == '' ? (
                      <>
                        <p className="w-full flex justify-between border rounded-xl p-3  border-gray-400">
                          <label htmlFor="pancard" className="w-full block text-gray-500 ">
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
                        <img src={conductorForm.drPancard} alt="pancard" className="w-20 h-20 rounded-xl" />
                        <Button onClick={() => setConductorForm({ ...conductorForm, drPancard: '' })} variant="outlined" color="error">
                          remove
                        </Button>
                      </div>
                    )}
                    <p className="text-red-500 text-xs ml-2">upload pan card </p>
                  </div>

                  <div>
                    {conductorForm.covidVaccination == '' ? (
                      <>
                        {' '}
                        <InputLabel>Covid Vaccination</InputLabel>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="covidVaccination" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <img src={conductorForm.covidVaccination} alt="covidVaccination" className="w-20 h-20 rounded-xl" />
                        <Button
                          onClick={() => setConductorForm({ ...conductorForm, covidVaccination: '' })}
                          variant="outlined"
                          color="error"
                        >
                          remove
                        </Button>
                      </div>
                    )}
                    <p className="text-red-500 text-xs ml-2">upload covidVaccination </p>
                  </div>
                  <div>
                    {conductorForm.conFingerPrint == '' ? (
                      <>
                        {' '}
                        <InputLabel>FingerPrints</InputLabel>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="conFingerPrint" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <img src={conductorForm.conFingerPrint} alt="conFingerPrint" className="w-20 h-20 rounded-xl" />
                        <Button onClick={() => setConductorForm({ ...conductorForm, conFingerPrint: '' })} variant="outlined" color="error">
                          remove
                        </Button>
                      </div>
                    )}
                    <p className="text-red-500 text-xs ml-2">upload conFingerPrint </p>
                  </div>
                  <div>
                    {conductorForm.conBGV == '' ? (
                      <>
                        {' '}
                        <InputLabel>conBGV</InputLabel>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="conBGV" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <img src={conductorForm.conBGV} alt="conBGV" className="w-20 h-20 rounded-xl" />
                        <Button onClick={() => setConductorForm({ ...conductorForm, conBGV: '' })} variant="outlined" color="error">
                          remove
                        </Button>
                      </div>
                    )}
                    <p className="text-red-500 text-xs ml-2">upload conBGV </p>
                  </div>
                  <div>
                    {conductorForm.conResume == '' ? (
                      <>
                        {' '}
                        <InputLabel>Resume</InputLabel>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="conResume" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <img src={conductorForm.conResume} alt="conResume" className="w-20 h-20 rounded-xl" />
                        <Button onClick={() => setConductorForm({ ...conductorForm, conResume: '' })} variant="outlined" color="error">
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
                <Button variant="contained" className="bg-blue-700" onClick={handleConductor}>
                  Add Conductor
                </Button>
                <Button variant="outlined" color="error">
                  Cancel
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
