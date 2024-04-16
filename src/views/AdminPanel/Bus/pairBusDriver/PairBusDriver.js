import React, { useState, useEffect } from 'react';
import { Select, FormControl, InputLabel, MenuItem, Button } from '@mui/material';
import axios from 'axios';
import { BackendUrl } from 'utils/config';
import toast, { Toaster } from 'react-hot-toast';
export const PairBusDriver = () => {
  const [buses, setBuses] = useState([]);
  const [assignedData, setAssignData] = useState({});
  const [busId, setBusId] = useState('');
  const [allUnAssignDriver, setAllUnAssignDriver] = useState([]);
  const [allAssignDriver, setAllAssignDriver] = useState([]);
  const [driverId, setDriverId] = useState(0);
  useEffect(() => {
    axios
      .get(`${BackendUrl}/app/v1/bus/getAllBuses`)
      .then((res) => setBuses(res?.data?.buses))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (busId != '') {
      axios
        .post(`${BackendUrl}/app/v1/bus/getBusByBusId`, { busId: busId })
        .then((res) => {
          // console.log(res?.data.result[0]);
          setAssignData(res?.data.result[0]);
        })
        .catch((e) => console.log(e));
      axios
        .get(`${BackendUrl}/app/v1/driver/getUnAssignAndAssignDriver`)
        .then((res) => {
          // console.log(res.data);
          setAllUnAssignDriver(res.data?.unAssignDriver);
          setAllAssignDriver(res.data?.AssignDriver);
        })
        .catch((e) => console.log(e));
    }
  }, [busId]);

  const handleUnAssignedDriver = (value) => {
    setDriverId(value);
  };

  const handleAssignNewDriver = () => {
    if (driverId != 0) {
      axios
        .post(`${BackendUrl}/app/v1/bus/mappingBusDriver`, {
          busId: busId,
          driverId: driverId
        })
        .then((res) => {
          window.alert(res.data.result);
          // console.log(res.data);
          if (res.data.isNeedReassignBus) {
            setBusId(res.data.isNeedReassignBusId);
          } else {
            setBusId('');
          }
          setDriverId(0);
        })
        .catch((err) => {
          toast.error('API Error');
          console.log(err);
        });
    }
  };
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="bg-white rounded-xl w-full h-full">
        <div className=" flex flex-col gap-3 bg-white p-4 max-lg:p-2 max-lg:gap-5 rounded-xl">
          <div>
            <p className="text-3xl text-gray-600 text-center">Pair Bus Driver</p>
            <p className=" border border-gray-300 mt-2"></p>
          </div>
          {/* tab button */}

          <div>
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1 items-center justify-center ">
              <div>
                {/* Bus ID */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Bus Name</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Bus Name"
                    value={busId}
                    onChange={(e) => setBusId(e.target.value)}
                  >
                    {buses?.map((item) => {
                      return (
                        <MenuItem value={item.bus_id} key={item.bus_id}>
                          {item.bus_number}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>{' '}
              {busId != '' && (
                <div className="flex justify-center">
                  {assignedData.driver_id != null ? (
                    <div>
                      <h1 className=" text-xl max-lg:text-sm">Already Assign Driver with bus No is : {assignedData.bus_number}</h1>
                      <div className={`p-4 w-56 rounded-lg ${driverId == 0 ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>
                        <p>
                          Bus No. <span className="font-semibold">{assignedData.bus_number}</span>
                        </p>
                        <p>
                          Driver name . <span className="font-semibold">{assignedData.driver_name}</span>
                        </p>
                        <p>
                          Driver Contact. <span className="font-semibold">{assignedData.driverContact}</span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xl text-center font-bold">Please Assign Driver!</p>
                  )}
                </div>
              )}
            </div>

            {busId != '' && (
              <>
                {' '}
                <p className="border-dotted border-black border-b my-3"></p>
                {/* unAssign Driver */}
                {allUnAssignDriver.length > 0 && (
                  <div className="flex flex-col gap-5">
                    <p className=" text-xl mb-3 font-semibold underline">Assign Driver from UnAssigned Driver list ?</p>
                    <div className="flex flex-wrap gap-5">
                      {allUnAssignDriver.map((item, i) => (
                        <button key={i} onClick={() => handleUnAssignedDriver(item.driver_id)}>
                          <div
                            className={`p-4 max-md:p-2 w-56 max-md:w-48 max-sm:w-36 rounded-lg ${
                              driverId == item.driver_id ? 'bg-green-600 text-white' : 'bg-blue-300'
                            }`}
                          >
                            <p>
                              Name : <span className="text-lg max-md:text-sm">{item.driver_name}</span>
                            </p>
                            <p>
                              Ph no. <span className="text-lg max-md:text-sm">{item.primary_contact}</span>
                            </p>
                            <p></p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <p className="border-dotted border-black border-b my-10"></p>
                {/* AllAssign Driver */}
                {allAssignDriver.length > 0 && (
                  <div className="flex flex-col gap-5 mt-2 items-center">
                    <p className="text-xl mb-3 font-semibold underline">Assign Driver from Already mapped Driver list ?</p>

                    <div className="flex flex-wrap gap-3">
                      {allAssignDriver.map((item, i) => (
                        <div key={i} className={`${assignedData.driver_id == item.driver_id && 'hidden'}`}>
                          {assignedData.driver_id != item.driver_id && (
                            <button onClick={() => handleUnAssignedDriver(item.driver_id)}>
                              <div
                                className={`p-4 max-md:p-2 w-56 max-md:w-48 max-sm:w-36 rounded-lg ${
                                  driverId == item.driver_id ? 'bg-green-600 text-white' : 'bg-yellow-500'
                                } `}
                              >
                                <p>
                                  Name : <span className="text-lg max-md:text-sm">{item.driver_name}</span>
                                </p>
                                <p>
                                  Ph no. <span className="text-lg max-md:text-sm">{item.primary_contact}</span>
                                </p>
                              </div>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="text-center">
                      <Button onClick={handleAssignNewDriver} variant="contained" className="bg-blue-600">
                        Assign Driver
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
