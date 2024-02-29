import React from 'react';
import { TextField, Button, FormControl } from '@mui/material';

export const AddBooking = () => {
  return (
    <div>
      <div className=" flex flex-col gap-10 bg-white p-4 rounded-xl">
        {/* heading */}
        <div>
          <div>
            <p className="text-3xl text-gray-600 text-center">Add Booking Details</p>
            <p className=" border border-gray-300"></p>
          </div>
        </div>
        {/* form */}
        <div>
          <div className="grid grid-cols-2 max-lg:grid-cols-1 max-lg:gap-7 gap-10">
            <div>
              <FormControl fullWidth>
                <TextField id="outlined-basic" type="text" label="Name" variant="outlined" />
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth>
                <TextField type="number" id="outlined-basic" label="Mobile Number" variant="outlined" pattern="[0-9]{10}" />
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth>
                <TextField id="outlined-basic" label="Address" type="text" variant="outlined" />
              </FormControl>
            </div>
          </div>
        </div>
        {/* button */}
        <div>
          <div className="flex justify-between">
            <Button variant="contained" className="bg-blue-700">
              Add Driver
            </Button>
            <Button variant="outlined" color="error">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
