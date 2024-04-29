import React, { useState } from 'react';
import { CompletedTrip } from './CompletedTrip';
import { OngoingTrip } from './OngoingTrip';
import { PendingTrip } from './PendingTrip';
import { BreakDownTrip } from './BreakDownTrip';
import { Booking } from './Booking';

const TripManagement = () => {
  const [show, setShow] = useState({
    pending: true,
    ongoing: false,
    completed: false,
    breakdown: false,
    booking: false
  });

  return (
    <div>
      <div className="bg-white p-4 rounded-lg">
        <div>
          <p className="text-3xl text-gray-600 text-center max-lg:text-xl">Trip Management</p>
          <p className=" border border-gray-300 mt-3"></p>
        </div>
        {/*  */}
        <div className="my-2 flex justify-between max-md:flex-col items-center ">
          <div className="flex max-md:flex-wrap max-md: gap-2">
            <button
              onClick={() => setShow({ ...show, pending: true, ongoing: false, completed: false, breakdown: false, booking: false })}
              className={`p-2 max-md:p-1 font-semibold rounded ${show.pending ? 'bg-green-600 text-white' : 'text-gray-600'}`}
            >
              Pending
            </button>
            <button
              onClick={() => setShow({ ...show, pending: false, ongoing: true, completed: false, breakdown: false, booking: false })}
              className={`p-2 max-md:p-1 font-semibold rounded ${show.ongoing ? 'bg-green-600 text-white' : 'text-gray-600'}`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setShow({ ...show, pending: false, ongoing: false, completed: true, breakdown: false, booking: false })}
              className={`p-2 max-md:p-1 font-semibold rounded ${show.completed ? 'bg-green-600 text-white' : 'text-gray-600'}`}
            >
              Completed
            </button>
            <button
              onClick={() => setShow({ ...show, pending: false, ongoing: false, completed: false, breakdown: true, booking: false })}
              className={`p-2 max-md:p-1 font-semibold rounded ${show.breakdown ? 'bg-green-600 text-white' : 'text-gray-600'}`}
            >
              BreakDown
            </button>

            <button
              onClick={() => setShow({ ...show, pending: false, ongoing: false, completed: false, breakdown: false, booking: true })}
              className={`p-2 max-md:p-1 font-semibold rounded ${show.booking ? 'bg-green-600 text-white' : 'text-gray-600'}`}
            >
              Booking
            </button>
          </div>
        </div>
        {/*  */}
        <div className="my-4">
          {show.pending && <PendingTrip />}
          {show.ongoing && <OngoingTrip />}
          {show.completed && <CompletedTrip />}
          {show.breakdown && <BreakDownTrip />}

          {show.booking && <Booking />}
        </div>
      </div>
    </div>
  );
};
export default TripManagement;
