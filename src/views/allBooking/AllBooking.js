import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Box } from '@mui/material';
import axios from 'axios';
import { BackendUrl } from 'utils/config';
import toast, { Toaster } from 'react-hot-toast';

function getCurrentDate() {
  let today = new Date();
  let day = String(today.getDate()).padStart(2, '0');
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let year = today.getFullYear();
  let currDate = `${year}-${month}-${day}`;
  return currDate;
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  p: 4
};
const columns = [
  { id: 'reservation_id', label: 'res. Id', align: 'center', minWidth: 150 },
  { id: 'booking_status', label: 'Booking Status', align: 'center', minWidth: 130 },
  { id: 'booking_date', label: 'Date', align: 'center', minWidth: 150 },
  { id: 'pickuptime', label: 'Pickup time', align: 'center', minWidth: 150 },
  { id: 'droptime', label: 'Drop time', align: 'center', minWidth: 150 },
  { id: 'bus_picklocation', label: 'Bus Picklocation', align: 'center', minWidth: 150 },
  { id: 'bus_droplocation', label: 'Bus Droplocation', align: 'center', minWidth: 150 },
  { id: 'total_seats', label: 'total_seats', align: 'center', minWidth: 50 },
  { id: 'view', label: 'View', align: 'center', minWidth: 150 }
];
export const AllBooking = () => {
  const [allBooking, setAllBooking] = useState([]);
  const [tripDate, setTripDate] = useState(getCurrentDate());
  const [pageNo] = useState(1);
  useEffect(() => {
    axios
      .post(`${BackendUrl}/app/v1/booking/getBookingListByDate`, {
        pageNo: pageNo,
        limitPerPage: 10,
        bookingDate: tripDate
      })
      .then((res) => {
        // console.log(res.data);
        if (!res.data.bookingExists) {
          setAllBooking([]);
          toast.error(res.data.result);
        } else {
          setAllBooking(res.data.result);
        }
      })
      .catch((err) => {
        toast.error(res.data.result);
        console.log(err);
      });
  }, [tripDate]);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div>
        <div>
          <Toaster />
        </div>
        <div className=" flex flex-col gap-5 bg-white p-4 rounded-xl">
          {/* heading */}
          <div>
            <div>
              <p className="text-3xl text-gray-600 text-center">Booking Details</p>
              <p className=" border border-gray-300"></p>
            </div>
            <div className="mt-5 w-56 px-4">
              <input
                type="date"
                value={tripDate}
                onChange={(e) => setTripDate(e.target.value)}
                className="border border-gray-300 rounded w-full"
              />
            </div>
          </div>

          <div>
            <div>
              <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} className="bg-gray-300">
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allBooking?.map((item, i) => {
                        return (
                          <TableRow
                            key={i}
                            className={`${item.booking_status == 2 && 'bg-red-400 text-white'} ${
                              item.booking_status == 1 && 'bg-yellow-200 text-white'
                            }`}
                          >
                            <TableCell align="center">{item.reservation_id}</TableCell>
                            <TableCell align="center">{item.booking_status == 2 ? 'Completed' : 'Pending'}</TableCell>
                            <TableCell align="center">{item.booking_date}</TableCell>
                            <TableCell align="center">{item.pickuptime}</TableCell>
                            <TableCell align="center">{item.droptime}</TableCell>
                            <TableCell align="center">{item.bus_picklocation}</TableCell>
                            <TableCell align="center">{item.bus_droplocation}</TableCell>
                            <TableCell align="center">{item.total_seats}</TableCell>
                            <TableCell align="center">
                              <button className="p-2 text-lg text-blue-600" onClick={() => setModalOpen(true)}>
                                View
                              </button>
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
      </div>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="bg-white">
          modal
        </Box>
      </Modal>
    </>
  );
};
