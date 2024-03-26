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
  const [driverId, setDriverId] = useState(0);
  // page refresh
  const [refreshPage, setRefreshPage] = useState(false);
  // tabs
  const [show, setShow] = useState({
    assign: true,
    reassign: false
  });

  useEffect(() => {
    setRefreshPage(false);
    axios
      .get(`${BackendUrl}/app/v1/bus/getAllBuses`)
      .then((res) => setBuses(res?.data?.buses))
      .catch((e) => console.log(e));
  }, [refreshPage]);

  useEffect(() => {
    if (busId != '') {
      axios
        .get(`${BackendUrl}/app/v1/driver/getUnAssignDriver`)
        .then((res) => setAllUnAssignDriver(res.data.result))
        .catch((err) => console.log(err));
    }
  }, [busId]);

  const handleUnAssignedDriver = (value) => {
    setDriverId(value);
  };
  const HandleAssignNewDriver = () => {
    if (driverId != 0) {
      axios
        .post(`${BackendUrl}/app/v1/bus/mappingBusDriver`, {
          busId: busId,
          driverId: driverId
        })
        .then((res) => {
          toast.success(res.data.result);
          setRefreshPage(true);
          setBusId('');
          setAllUnAssignDriver([]);
          setDriverId(0);
        })
        .catch((err) => {
          toast.error('API Error');
          console.log(err);
        });
    }
  };
  return (
    <div className="bg-white rounded-xl w-full h-full">
      <div>
        <Toaster />
      </div>
      <div className=" flex flex-col gap-6 bg-white p-4 max-lg:p-2 max-lg:gap-5 rounded-xl">
        <div>
          <p className="text-3xl text-gray-600 text-center">Pair Bus Driver</p>
          <p className=" border border-gray-300 mt-2"></p>
        </div>
        {/* tab button */}
        <div>
          <button
            onClick={() => setShow({ ...show, assign: true, reassign: false })}
            className={`p-2 rounded ${show.assign ? 'bg-green-600 text-white' : 'text-gray-600'}`}
          >
            Assign
          </button>
          <button
            onClick={() => setShow({ ...show, assign: false, reassign: true })}
            className={`p-2 rounded ${show.reassign ? 'bg-green-600 text-white' : 'text-gray-600'}`}
          >
            ReAssign
          </button>
        </div>
        {show.assign && (
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
                        <MenuItem value={item.bus_id} key={item.bus_id} onClick={() => setAssignData(item)}>
                          {item.bus_number}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              {busId != '' && (
                <div>
                  <div className={`p-4 w-56 rounded-lg ${driverId == 0 ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>
                    {' '}
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
              )}
            </div>
            <p className="border-dotted border-black border-b my-3"></p>

            {allUnAssignDriver.length > 0 && (
              <div className="flex flex-col gap-5">
                <p className="text-center text-xl mb-3 font-semibold underline">All UnAssigned Driver</p>
                <div className="flex flex-wrap gap-5">
                  {allUnAssignDriver.map((item, i) => (
                    <button key={i} onClick={() => handleUnAssignedDriver(item.driver_id)}>
                      <div className={`p-4 w-56 rounded-lg ${driverId == item.driver_id ? 'bg-green-600 text-white' : 'bg-blue-300'}`}>
                        <p>
                          Name : <span className="text-lg">{item.driver_name}</span>
                        </p>
                        <p>
                          Ph no. <span className="text-lg">{item.primary_contact}</span>
                        </p>
                        <p></p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="text-right">
                  <Button onClick={HandleAssignNewDriver} variant="contained" className="bg-blue-600">
                    Assign Driver
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
        {show.reassign && <div>helo world</div>}
      </div>
    </div>
  );
};
