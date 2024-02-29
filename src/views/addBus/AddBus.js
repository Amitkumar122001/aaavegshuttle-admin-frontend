import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Select, FormControl, MenuItem, InputLabel, Button } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
export const AddBus = () => {
  const [addBusForm, setAddBusForm] = useState({
    vendorId: '', // no
    busNo: '', // yes
    capacity: '',
    driverId: '',
    category: '', // no
    conductorId: '', //no
    fuelType: '',
    tabletIMEI: '',
    passengerType: false,

    makeDate: '',
    busModel: '',

    regDate: '',
    regCert: '',

    busAC: '',

    insuranceImg: '',
    insuranceStart: '',
    insuranceEnd: '',

    pollutionImg: '',
    pollutionStart: '',
    pollutionEnd: '',

    tourPermitImg: '',
    tourPermitStart: '',
    tourPermitEnd: '',

    carriagePermitImg: '',
    carriagePermitStart: '',
    carriagePermitEnd: '',

    fitnessImg: '',
    fitnessStart: '',
    fitnessEnd: ''
  });
  const [vendorData, setVendorData] = useState([]);
  useEffect(() => {
    axios
      .get('http://192.168.1.230:3000/app/v1/vendor/getAllVendor') // s
      .then((res) => setVendorData(res.data?.result))
      .catch((err) => console.log(err));
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
      addBusForm.passengerType != ''
    ) {
      const body = {
        vendorid: addBusForm.vendorId,
        busNumber: addBusForm.busNo,
        capacity: +addBusForm.capacity,
        driverid: +addBusForm.driverId,
        category: addBusForm.category,
        conductorid: addBusForm.conductorId,
        fueltype: addBusForm.fuelType,
        tabletimei: addBusForm.tabletIMEI,
        femalebus: addBusForm.passengerType
      };
      // console.log(body);

      axios
        .post('http://13.200.168.251:3000/app/v1/bus/insertBus', body, { headers: {} })
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
      addBusForm.vendorId == '' ? setVendorIdErr(true) : setVendorIdErr(false);
      addBusForm.busNo == '' ? setBusNoErr(true) : setBusNoErr(false);
      addBusForm.capacity == '' ? setCapacityErr(true) : setCapacityErr(false);
      addBusForm.driverId == '' ? setDriverIdErr(true) : setDriverIdErr(false);
      addBusForm.category == '' ? setCategoryErr(true) : setCategoryErr(false);
      addBusForm.conductorId == '' ? setConductorIdErr(true) : setConductorIdErr(false);
      addBusForm.fuelType == '' ? setFuelTypeErr(true) : setFuelTypeErr(false);
      addBusForm.tabletIMEI == '' ? setTabletIMEIErr(true) : setTabletIMEIErr(false);
      toast.error('input Field Error ');
    }
  };

  return (
    <div>
      <div>
        <Toaster />
      </div>

      <div className=" flex flex-col gap-10 bg-white p-4 rounded-xl">
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
                <MenuItem value={'hello'}>hello</MenuItem>
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
              <div className="grid grid-cols-3 max-lg:grid-cols-2 max-lg:gap-5 max-md:grid-cols-1 max-sm:gap-3 gap-10">
                {/* make date */}
                <div className="w-full">
                  <FormControl fullWidth>
                    <TextField
                      type="date"
                      id="demo-simple-seect"
                      label="Make Date"
                      value={addBusForm.makeDate}
                      onChange={(e) => setAddBusForm({ ...addBusForm, makeDate: e.target.value })}
                    ></TextField>
                  </FormControl>
                  {busNoErr && <p className="text-xs text-red-500 ml-2">make Date Error</p>}
                </div>
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
                  {busNoErr && <p className="text-xs text-red-500 ml-2">Bus Model Error</p>}
                </div>

                <div className="w-full">
                  <FormControl fullWidth>
                    <TextField
                      type="date"
                      id="demo-simple-seect"
                      label="busAC"
                      value={addBusForm.busAC}
                      onChange={(e) => setAddBusForm({ ...addBusForm, busAC: e.target.value })}
                    ></TextField>
                  </FormControl>
                  {busNoErr && <p className="text-xs text-red-500 ml-2">Bus No Error</p>}
                </div>
                <div className="w-full">
                  <FormControl fullWidth>
                    <TextField
                      type="date"
                      id="demo-simple-seect"
                      label="regDate"
                      value={addBusForm.regDate}
                      onChange={(e) => setAddBusForm({ ...addBusForm, regDate: e.target.value })}
                    ></TextField>
                  </FormControl>
                  {busNoErr && <p className="text-xs text-red-500 ml-2">Bus No Error</p>}
                </div>
                <div className="w-full">
                  <FormControl fullWidth>
                    <TextField
                      type="date"
                      id="demo-simple-seect"
                      label="regCert"
                      value={addBusForm.regCert}
                      onChange={(e) => setAddBusForm({ ...addBusForm, regCert: e.target.value })}
                    ></TextField>
                  </FormControl>
                  {busNoErr && <p className="text-xs text-red-500 ml-2">Bus No Error</p>}
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
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                    </Select>
                  </FormControl>
                  {driverIdErr && <p className="text-xs text-red-500 ml-2">Driver Id Error</p>}
                </div>

                {/* Category */}
                <div className="w-full">
                  <FormControl fullWidth>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                      labelId="category"
                      id="demo-simle-select"
                      label="Category"
                      value={addBusForm.category}
                      onChange={(e) => setAddBusForm({ ...addBusForm, category: e.target.value })}
                    >
                      <MenuItem value={'1'}>Small</MenuItem>
                      <MenuItem value={'2'}>Medium</MenuItem>
                      <MenuItem value={'3'}>Large</MenuItem>
                    </Select>
                  </FormControl>
                  {categoryErr && <p className="text-xs text-red-500 ml-2">Category Error</p>}
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
                      <MenuItem value={1}>Ten</MenuItem>
                      <MenuItem value={2}>Twenty</MenuItem>
                      <MenuItem value={3}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                  {conductorIdErr && <p className="text-xs text-red-500 ml-2">Conductor ID Error</p>}
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
                      <MenuItem value="CNG">Diesel</MenuItem>
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
                      value={addBusForm.tabletIMEI}
                      onChange={(e) => setAddBusForm({ ...addBusForm, tabletIMEI: e.target.value })}
                    />
                  </FormControl>
                  {tabletIMEIErr && <p className="text-xs text-red-500 ml-2">Tablet Imei Error</p>}
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
                <div className="flex flex-col gap-8">
                  <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 max-md:gap-3">
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
                      <p className="text-red-500 text-xs ml-2">insuranceImg error</p>
                    </div>
                    <div>
                      <InputLabel className="capitalize">insuranceStart</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="outlined-basic"
                          label=""
                          variant="outlined"
                          value={addBusForm.insuranceStart}
                          onChange={(e) => setAddBusForm({ ...addBusForm, insuranceStart: e.target.value })}
                        />
                      </FormControl>
                      <p className="text-red-500  ml-2">insuranceStart error</p>
                    </div>
                    <div>
                      {' '}
                      <InputLabel className="capitalize">insuranceEnd</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="outlined-basic"
                          label=""
                          variant="outlined"
                          value={addBusForm.insuranceEnd}
                          onChange={(e) => setAddBusForm({ ...addBusForm, insuranceEnd: e.target.value })}
                        />
                      </FormControl>
                      <p className="text-red-500  ml-2">insuranceEnd error</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 max-md:gap-3">
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
                      <p className="text-red-500 text-xs ml-2">pollutionImg error</p>
                    </div>
                    <div>
                      <InputLabel className="capitalize">pollutionStart</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="outlined-basic"
                          label=""
                          variant="outlined"
                          value={addBusForm.pollutionStart}
                          onChange={(e) => setAddBusForm({ ...addBusForm, pollutionStart: e.target.value })}
                        />
                      </FormControl>
                      <p className="text-red-500  ml-2">pollutionStart error</p>
                    </div>
                    <div>
                      {' '}
                      <InputLabel className="capitalize">pollutionEnd</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="outlined-basic"
                          label=""
                          variant="outlined"
                          value={addBusForm.pollutionEnd}
                          onChange={(e) => setAddBusForm({ ...addBusForm, pollutionEnd: e.target.value })}
                        />
                      </FormControl>
                      <p className="text-red-500  ml-2">pollutionEnd error</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 max-md:gap-3">
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
                      <p className="text-red-500 text-xs ml-2">tourPermitImg error</p>
                    </div>
                    <div>
                      <InputLabel className="capitalize">tourPermitStart</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="outlined-basic"
                          label=""
                          variant="outlined"
                          value={addBusForm.tourPermitStart}
                          onChange={(e) => setAddBusForm({ ...addBusForm, tourPermitStart: e.target.value })}
                        />
                      </FormControl>
                      <p className="text-red-500  ml-2">tourPermitStart error</p>
                    </div>
                    <div>
                      {' '}
                      <InputLabel className="capitalize">tourPermitEnd</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="outlined-basic"
                          label=""
                          variant="outlined"
                          value={addBusForm.tourPermitEnd}
                          onChange={(e) => setAddBusForm({ ...addBusForm, tourPermitEnd: e.target.value })}
                        />
                      </FormControl>
                      <p className="text-red-500  ml-2">tourPermitEnd error</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 max-md:gap-3">
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
                      <p className="text-red-500 text-xs ml-2">carriagePermitImg error</p>
                    </div>
                    <div>
                      <InputLabel className="capitalize">carriagePermitStart</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="outlined-basic"
                          label=""
                          variant="outlined"
                          value={addBusForm.carriagePermitStart}
                          onChange={(e) => setAddBusForm({ ...addBusForm, carriagePermitStart: e.target.value })}
                        />
                      </FormControl>
                      <p className="text-red-500  ml-2">carriagePermitStart error</p>
                    </div>
                    <div>
                      {' '}
                      <InputLabel className="capitalize">carriagePermitEnd</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="outlined-basic"
                          label=""
                          variant="outlined"
                          value={addBusForm.carriagePermitEnd}
                          onChange={(e) => setAddBusForm({ ...addBusForm, carriagePermitEnd: e.target.value })}
                        />
                      </FormControl>
                      <p className="text-red-500  ml-2">carriagePermitEnd error</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 max-md:gap-3">
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
                      <p className="text-red-500 text-xs ml-2">fitnessImg error</p>
                    </div>
                    <div>
                      <InputLabel className="capitalize">fitnessStart</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="outlined-basic"
                          label=""
                          variant="outlined"
                          value={addBusForm.fitnessStart}
                          onChange={(e) => setAddBusForm({ ...addBusForm, fitnessStart: e.target.value })}
                        />
                      </FormControl>
                      <p className="text-red-500  ml-2">fitnessStart error</p>
                    </div>
                    <div>
                      {' '}
                      <InputLabel className="capitalize">fitnessEnd</InputLabel>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          id="outlined-basic"
                          label=""
                          variant="outlined"
                          value={addBusForm.fitnessEnd}
                          onChange={(e) => setAddBusForm({ ...addBusForm, fitnessEnd: e.target.value })}
                        />
                      </FormControl>
                      <p className="text-red-500  ml-2">fitnessEnd error</p>
                    </div>
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
