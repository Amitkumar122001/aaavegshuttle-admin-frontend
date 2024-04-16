import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
  // Modal,
  // Box,
  // TextField,
  // Select,
  // Button,
  // FormControl
  // InputLabel,
  // MenuItem
} from '@mui/material';
const columns = [
  { id: 'route no', label: 'Route No.', align: 'center', minWidth: 80 },
  {
    id: 'booking time',
    label: 'Booking Time',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'bus_no',
    label: 'Bus No.',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'pickup',
    label: 'PickUp',
    minWidth: 80,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'drop',
    label: 'Drop',
    minWidth: 80,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'booking status',
    label: 'Booking Status',
    minWidth: 40,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'edit',
    label: 'View',
    minWidth: 25,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  }
];
const trips = [
  {
    route_no: 1,
    trip: 'T1',
    time: '07:15-09:57',
    bus_no: 'busno1',
    driver_name: 'xyz',
    conductor_name: 'abc',
    No_of_booking: 56
  },
  {
    route_no: 1,
    trip: 'T2',
    time: '10:45-13:37',
    bus_no: 'busno2',
    driver_name: 'xyz',
    conductor_name: 'abc',
    No_of_booking: 57
  },
  {
    route_no: 1,
    trip: 'T3',
    time: '14:25-16:47',
    bus_no: 'busno3',
    driver_name: 'xyz',
    conductor_name: 'abc',
    No_of_booking: 58
  }
];

// booking_id
// reservation_id
// user_id
// user_picklocation
// user_droplocation
// bus_picklocation
// bus_droplocation
// booking_status
// booking_date
// route_id
// pickuptime
// droptime
// user_to_stop_distance
// busdrop_to_user_distance
// book_otp
// total_seats
// payment_id
// bus_id
// booking_type_id
// trip_id
// booking_created_at
// isAdhoc

export const Booking = () => {
  const [allTrip] = useState(trips);

  return (
    <>
      <div className="flex flex-col gap-10 max-md:gap-5">
        {/* All trip */}
        <div>
          <div className="my-1">
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                          className="bg-gray-200 text-gray-600"
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allTrip.map((item, i) => {
                      const tripTime = item.time.split('-');
                      return (
                        <TableRow hover key={i}>
                          <TableCell align="center">{item.route_no}</TableCell>
                          <TableCell align="center">{`${tripTime[0]} - ${tripTime[1]}`}</TableCell>
                          <TableCell align="center">{item.bus_no}</TableCell>
                          <TableCell align="center">{item.driver_name}</TableCell>
                          <TableCell align="center">{item.conductor_name}</TableCell>
                          <TableCell align="center">{item.No_of_booking}</TableCell>
                          <TableCell align="center">
                            <button className="p-2 text-md text-blue-600">View</button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};
