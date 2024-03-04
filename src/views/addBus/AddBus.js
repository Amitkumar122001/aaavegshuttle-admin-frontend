import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Select, FormControl, MenuItem, InputLabel, Button } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import Loader from 'ui-component/LoaderCircular';

{
  /* 
    <TableCell align="center">{item.conductor_id}</TableCell>
    <TableCell align="center">{item.conductor_name}</TableCell>
    <TableCell align="center">{item.driver_id}</TableCell>
    <TableCell align="center">{item.driver_name}</TableCell> 
*/
}
export const AddBus = () => {
  const [addBusForm, setAddBusForm] = useState({
    vendorId: '',
    busNo: '',
    capacity: '',
    driverId: '',
    category: '',
    conductorId: '',
    fuelType: '',
    tabletIMEI: '',
    passengerType: false,
    makeDate: '',
    busModel: '',
    regDate: '',
    regCert: '',
    busAC: false,
    insuranceImg: '',
    pollutionImg: '',
    tourPermitImg: '',
    carriagePermitImg: '',
    fitnessImg: ''
  });
  const [vendorData, setVendorData] = useState([]);
  const [driverData, setDriverData] = useState([]);
  const [conductorData, setConductorData] = useState([]);
  useEffect(() => {
    axios
      .get('http://192.168.1.230:3000/app/v1/vendor/getAllVendors')
      .then((res) => setVendorData(res.data?.result))
      .catch((err) => console.log(err));
    axios
      .get('http://192.168.1.230:3000/app/v1/conductor/getAllConductors')
      .then((res) => setConductorData(res.data?.result))
      .catch((e) => console.log('Api fail ', e));
    axios
      .get('http://192.168.1.230:3000/app/v1/driver/getAllDriver')
      .then((res) => setDriverData(res.data?.result))
      .catch((e) => console.log('Api fail ', e));
  }, []);
  // error handling
  const [vendorIdErr, setVendorIdErr] = useState(false);
  const [busNoErr, setBusNoErr] = useState(false);
  const [capacityErr, setCapacityErr] = useState(false);
  const [driverIdErr, setDriverIdErr] = useState(false);
  const [categoryErr, setCategoryErr] = useState(false);
  const [conductorIdErr, setConductorIdErr] = useState(false);
  const [fuelTypeErr, setFuelTypeErr] = useState(false);
  const [tabletIMEIErr, setTabletIMEIErr] = useState(false);

  const [busModelErr, setBusModelErr] = useState(false);
  const [makeDateErr, setMakeDateErr] = useState(false);
  const [tourImgErr, setTourImgErr] = useState(false);
  const [regCertErr, setRegCertErr] = useState(false);

  const [insurImgErr, setInsurErr] = useState(false);
  const [pollutionImgErr, setPollutionImgErr] = useState(false);
  const [regDateErr, setRegDateErr] = useState(false);
  const [carriageImgErr, setCarriageImgErr] = useState(false);
  const [fitnessImgErr, setFitnessImgErr] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const handleDocumentPhoto = async (event) => {
    const name = event.target.name;
    setisLoading(true);
    const link = await UploadDocumenttos3Bucket(event);
    setAddBusForm({ ...addBusForm, [name]: link });
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
      url: `http://13.200.168.251:3000/app/v1/aws/upload/driverimages`,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: reader
    };
    let imageName = await imageUploadApi(config);
    let totalUrl = `http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/` + imageName;
    return totalUrl;
  };
  const handleBus = () => {
    if (
      addBusForm.vendorId != '' &&
      addBusForm.busNo != '' &&
      addBusForm.capacity != '' &&
      addBusForm.driverId != '' &&
      addBusForm.category != '' &&
      addBusForm.conductorId != '' &&
      addBusForm.fuelType != '' &&
      addBusForm.tabletIMEI != '' &&
      addBusForm.makeDate != '' &&
      addBusForm.busModel != '' &&
      addBusForm.regDate != '' &&
      addBusForm.regCert != '' &&
      addBusForm.insuranceImg != '' &&
      addBusForm.pollutionImg != '' &&
      addBusForm.tourPermitImg != '' &&
      addBusForm.carriagePermitImg != '' &&
      addBusForm.fitnessImg != ''
    ) {
      const document = {
        pollutionCert: addBusForm.pollutionImg,
        touriestPermitCert: addBusForm.tourPermitImg,
        fitnessCert: addBusForm.fitnessImg,
        carriagePermitCert: addBusForm.carriagePermitImg,
        insuranceCert: addBusForm.insuranceImg,
        regCert: addBusForm.regCert
      };
      const body = {
        vendorid: addBusForm.vendorId,
        busNumber: addBusForm.busNo,
        capacity: +addBusForm.capacity,
        driverid: +addBusForm.driverId,
        category: addBusForm.category,
        conductorid: addBusForm.conductorId,
        fueltype: addBusForm.fuelType,
        tabletimei: addBusForm.tabletIMEI,
        femalebus: addBusForm.passengerType,
        busDocuments: document,
        makeDate: addBusForm.makeDate,
        registrationDate: addBusForm.regDate,
        isBusAC: addBusForm.busAC
      };
      console.log(body);

      axios
        .post('http://192.168.1.230:3000/app/v1/bus/insertBus', body, { headers: {} })
        .then((res) => {
          console.log(res);
          toast.success('Bus Added SuccessFully');
        })
        .catch((e) => {
          console.log('api Failed ', e);
          toast.error('Error');
        });
      setBusNoErr(false);
      setVendorIdErr(false);
      setCapacityErr(false);
      setDriverIdErr(false);
      setCategoryErr(false);
      setConductorIdErr(false);
      setFuelTypeErr(false);
      setTabletIMEIErr(false);
    } else {
      addBusForm.tourPermitImg == '' ? setTourImgErr(true) : setTourImgErr(false);
      addBusForm.makeDate == '' ? setMakeDateErr(true) : setMakeDateErr(false);
      addBusForm.busModel == '' ? setBusModelErr(true) : setBusModelErr(false);
      addBusForm.carriagePermitImg == '' ? setCarriageImgErr(true) : setCarriageImgErr(false);
      addBusForm.regDate == '' ? setRegDateErr(true) : setRegDateErr(false);
      addBusForm.fitnessImg == '' ? setFitnessImgErr(true) : setFitnessImgErr(false);
      addBusForm.regCert == '' ? setRegCertErr(true) : setRegCertErr(false);
      addBusForm.pollutionImg == '' ? setPollutionImgErr(true) : setPollutionImgErr(false);
      addBusForm.insuranceImg == '' ? setInsurErr(true) : setInsurErr(false);

      addBusForm.vendorId == '' ? setVendorIdErr(true) : setVendorIdErr(false);
      addBusForm.busNo == '' ? setBusNoErr(true) : setBusNoErr(false);
      addBusForm.capacity == '' ? setCapacityErr(true) : setCapacityErr(false);
      addBusForm.driverId == '' ? setDriverIdErr(true) : setDriverIdErr(false);
      addBusForm.category == '' ? setCategoryErr(true) : setCategoryErr(false);
      addBusForm.conductorId == '' ? setConductorIdErr(true) : setConductorIdErr(false);
      addBusForm.fuelType == '' ? setFuelTypeErr(true) : setFuelTypeErr(false);
      addBusForm.tabletIMEI == '' ? setTabletIMEIErr(true) : setTabletIMEIErr(false);
      addBusForm.busModel == '';
      toast.error('input Field Error ');
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

      <div className=" flex flex-col gap-10 max-md:gap-6 bg-white p-4 rounded-xl">
        {/* heading */}
        <div>
          <div>
            <p className="text-3xl text-gray-600 text-center">Bus Details</p>
            <p className=" border border-gray-300"></p>
          </div>
        </div>
        <div>
          <div className="">
            {/* Vendor Id */}
            <FormControl fullWidth>
              <InputLabel id="vendor_id">Vendor Id</InputLabel>
              <Select
                labelId="vendor_id"
                id="demo-simple-select"
                label="Vendor Id"
                value={addBusForm.vendorId}
                onChange={(e) => setAddBusForm({ ...addBusForm, vendorId: e.target.value })}
              >
                {vendorData.map((item, i) => (
                  <MenuItem key={i} value={item.vendorId}>
                    {item.vendorName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {vendorIdErr && <p className="text-xs text-red-500 ml-2">vender error</p>}
          </div>
        </div>
        {/* form */}
        {addBusForm.vendorId && (
          <>
            <div>
              <div className="grid grid-cols-3 max-lg:grid-cols-2 max-lg:gap-5 max-md:grid-cols-1 max-sm:gap-3 gap-6">
                {/* model */}

                <div className="w-full">
                  <FormControl fullWidth>
                    <TextField
                      id="demo-simple-seect"
                      label="Bus Model"
                      value={addBusForm.busModel}
                      onChange={(e) => setAddBusForm({ ...addBusForm, busModel: e.target.value })}
                    ></TextField>
                  </FormControl>
                  {busModelErr && <p className="text-xs text-red-500 ml-2">Bus Model Error</p>}
                </div>

                {/* bus no */}
                <div className="w-full">
                  <FormControl fullWidth>
                    <TextField
                      id="demo-simple-seect"
                      label="bus no"
                      value={addBusForm.busNo}
                      onChange={(e) => setAddBusForm({ ...addBusForm, busNo: e.target.value })}
                    ></TextField>
                  </FormControl>
                  {busNoErr && <p className="text-xs text-red-500 ml-2">Bus No Error</p>}
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
                      value={addBusForm.capacity}
                      onChange={(e) => setAddBusForm({ ...addBusForm, capacity: e.target.value })}
                    />
                  </FormControl>
                  {capacityErr && <p className="text-xs text-red-500 ml-2">CapacityError</p>}
                </div>

                {/* select Driver Id*/}
                <div className="w-full">
                  <FormControl fullWidth>
                    <InputLabel id="driver_id">Driver Id</InputLabel>
                    <Select
                      labelId="driver_id"
                      id="demo-simpl-select"
                      label="Driver Id"
                      value={addBusForm.driverId}
                      onChange={(e) => setAddBusForm({ ...addBusForm, driverId: e.target.value })}
                    >
                      {driverData.map((item, i) => (
                        <MenuItem value={item.driver_id} key={i}>
                          {item.driver_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {driverIdErr && <p className="text-xs text-red-500 ml-2">Driver Id Error</p>}
                </div>

                {/* Conductor Id */}
                <div className="w-full">
                  <FormControl fullWidth>
                    <InputLabel id="conductor_id">Conductor Id</InputLabel>
                    <Select
                      labelId="conductor_id"
                      id="demo-smple-select"
                      value={addBusForm.conductorId}
                      label="Conductor Id"
                      onChange={(e) => setAddBusForm({ ...addBusForm, conductorId: e.target.value })}
                    >
                      {conductorData.map((item, i) => (
                        <MenuItem value={item.conductor_id} key={i}>
                          {item.conductor_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {conductorIdErr && <p className="text-xs text-red-500 ml-2">Conductor ID Error</p>}
                </div>
                {/* Category */}
                <div className="w-full">
                  <FormControl fullWidth>
                    <TextField
                      id="demo-simle-select"
                      label="Category"
                      value={addBusForm.category}
                      onChange={(e) => setAddBusForm({ ...addBusForm, category: e.target.value })}
                    />
                  </FormControl>
                  {categoryErr && <p className="text-xs text-red-500 ml-2">Category Error</p>}
                </div>

                {/* Fuel Type */}
                <div className="w-full">
                  <FormControl fullWidth>
                    <InputLabel id="fuel_type">Fuel Type</InputLabel>
                    <Select
                      labelId="fuel_type"
                      id="demo-imple-select"
                      label="Fuel Type"
                      value={addBusForm.fuelType}
                      onChange={(e) => setAddBusForm({ ...addBusForm, fuelType: e.target.value })}
                    >
                      <MenuItem value="Petrol">Petrol</MenuItem>
                      <MenuItem value="Diesel">Diesel</MenuItem>
                      <MenuItem value="CNG">CNG</MenuItem>
                      <MenuItem value="Electric">Electric</MenuItem>
                    </Select>
                  </FormControl>
                  {fuelTypeErr && <p className="text-xs text-red-500 ml-2">Fuel Type Error</p>}
                </div>

                {/* Passenger Type */}
                <div className="w-full">
                  <FormControl fullWidth>
                    <InputLabel id="Passenger_type">Passenger Type</InputLabel>
                    <Select
                      labelId="Passenger_type"
                      id="demo-sple-select"
                      label="Passenger Type"
                      value={addBusForm.passengerType}
                      onChange={(e) => setAddBusForm({ ...addBusForm, passengerType: e.target.value })}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
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
                      value={addBusForm.tabletIMEI}
                      onChange={(e) => setAddBusForm({ ...addBusForm, tabletIMEI: e.target.value })}
                    />
                  </FormControl>
                  {tabletIMEIErr && <p className="text-xs text-red-500 ml-2">Tablet Imei Error</p>}
                </div>
                <div className="w-full">
                  <FormControl fullWidth>
                    <InputLabel id="busAc">Bus AC/Non-Ac</InputLabel>
                    <Select
                      labelId="busAc"
                      id="demo-simpl-select"
                      label="Bus AC/Non-Ac"
                      value={addBusForm.busAC}
                      onChange={(e) => setAddBusForm({ ...addBusForm, busAC: e.target.value })}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                  </FormControl>
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

                {/* insurance */}
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8 max-lg:gap-6 max-md:gap-4">
                  <div className="w-full">
                    <InputLabel>Make Date</InputLabel>
                    <FormControl fullWidth>
                      <TextField
                        type="date"
                        id="demo-simple-seect"
                        label=""
                        value={addBusForm.makeDate}
                        onChange={(e) => setAddBusForm({ ...addBusForm, makeDate: e.target.value })}
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
                        value={addBusForm.regDate}
                        onChange={(e) => setAddBusForm({ ...addBusForm, regDate: e.target.value })}
                      ></TextField>
                    </FormControl>
                    {regDateErr && <p className="text-xs text-red-500 ml-2">Reg date Error</p>}
                  </div>
                  <div className="w-full">
                    {addBusForm.regCert == '' ? (
                      <>
                        <InputLabel className="capitalize">regCert</InputLabel>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="regCert" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <img src={addBusForm.regCert} alt="regCert" className="w-20 h-20 rounded-xl" />
                        <Button onClick={() => setAddBusForm({ ...addBusForm, regCert: '' })} variant="outlined" color="error">
                          remove
                        </Button>
                      </div>
                    )}
                    {regCertErr && <p className="text-xs text-red-500 ml-2">Bus reg cert Error</p>}
                  </div>

                  <div>
                    {addBusForm.insuranceImg == '' ? (
                      <>
                        <InputLabel className="capitalize">insuranceImg</InputLabel>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="insuranceImg" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <img src={addBusForm.insuranceImg} alt="insuranceImg" className="w-20 h-20 rounded-xl" />
                        <Button onClick={() => setAddBusForm({ ...addBusForm, insuranceImg: '' })} variant="outlined" color="error">
                          remove
                        </Button>
                      </div>
                    )}
                    {insurImgErr && <p className="text-red-500 text-xs ml-2">insuranceImg error</p>}
                  </div>

                  <div>
                    {addBusForm.pollutionImg == '' ? (
                      <>
                        <InputLabel className="capitalize">pollutionImg</InputLabel>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="pollutionImg" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <img src={addBusForm.pollutionImg} alt="pollutionImg" className="w-20 h-20 rounded-xl" />
                        <Button onClick={() => setAddBusForm({ ...addBusForm, pollutionImg: '' })} variant="outlined" color="error">
                          remove
                        </Button>
                      </div>
                    )}
                    {pollutionImgErr && <p className="text-red-500 text-xs ml-2">pollutionImg error</p>}
                  </div>

                  <div>
                    {addBusForm.tourPermitImg == '' ? (
                      <>
                        <InputLabel className="capitalize">tourPermitImg</InputLabel>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="tourPermitImg" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <img src={addBusForm.tourPermitImg} alt="tourPermitImg" className="w-20 h-20 rounded-xl" />
                        <Button onClick={() => setAddBusForm({ ...addBusForm, tourPermitImg: '' })} variant="outlined" color="error">
                          remove
                        </Button>
                      </div>
                    )}
                    {tourImgErr && <p className="text-red-500 text-xs ml-2">tourPermitImg error</p>}
                  </div>

                  <div>
                    {addBusForm.carriagePermitImg == '' ? (
                      <>
                        <InputLabel className="capitalize">carriagePermitImg</InputLabel>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="carriagePermitImg" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <img src={addBusForm.carriagePermitImg} alt="carriagePermitImg" className="w-20 h-20 rounded-xl" />
                        <Button onClick={() => setAddBusForm({ ...addBusForm, carriagePermitImg: '' })} variant="outlined" color="error">
                          remove
                        </Button>
                      </div>
                    )}
                    {carriageImgErr && <p className="text-red-500 text-xs ml-2">carriagePermitImg error</p>}
                  </div>

                  <div>
                    {addBusForm.fitnessImg == '' ? (
                      <>
                        <InputLabel className="capitalize">fitnessImg</InputLabel>
                        <FormControl fullWidth>
                          <TextField type="file" variant="outlined" name="fitnessImg" onChange={(e) => handleDocumentPhoto(e)} />
                        </FormControl>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <img src={addBusForm.fitnessImg} alt="fitnessImg" className="w-20 h-20 rounded-xl" />
                        <Button onClick={() => setAddBusForm({ ...addBusForm, fitnessImg: '' })} variant="outlined" color="error">
                          remove
                        </Button>
                      </div>
                    )}
                    {fitnessImgErr && <p className="text-red-500 text-xs ml-2">fitnessImg error</p>}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-10 justify-between">
                <Button variant="contained" className={'bg-blue-700'} onClick={handleBus}>
                  Add Bus
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
