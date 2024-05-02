import React, { useState } from 'react';
import { CompletedTrip } from './CompletedTrip';
import { OngoingTrip } from './OngoingTrip';
import { PendingTrip } from './PendingTrip';
import { BreakDownTrip } from './BreakDownTrip';

const TripManagement = () => {
  const [show, setShow] = useState({
    pending: true,
    ongoing: false,
    completed: false,
    breakdown: false
  });
  const [itemsPerPage, setItemsPerPage] = useState(10);
  return (
    <div>
      <div className="bg-white p-4 rounded-lg">
        <div>
          <p className="text-3xl text-gray-600 text-center max-lg:text-xl">Trip Management</p>
          <p className=" border border-gray-300 mt-3"></p>
        </div>
        {/*  */}
        <div className="my-2 flex justify-between max-md:flex-col items-center">
          <div className="flex max-md:flex-wrap max-md:gap-2">
            <button
              onClick={() => setShow({ ...show, pending: true, ongoing: false, completed: false, breakdown: false })}
              className={`p-2 max-md:p-1 font-semibold rounded ${show.pending ? 'bg-green-600 text-white' : 'text-gray-600'}`}
            >
              Pending
            </button>
            <button
              onClick={() => setShow({ ...show, pending: false, ongoing: true, completed: false, breakdown: false })}
              className={`p-2 max-md:p-1 font-semibold rounded ${show.ongoing ? 'bg-green-600 text-white' : 'text-gray-600'}`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setShow({ ...show, pending: false, ongoing: false, completed: true, breakdown: false })}
              className={`p-2 max-md:p-1 font-semibold rounded ${show.completed ? 'bg-green-600 text-white' : 'text-gray-600'}`}
            >
              Completed
            </button>
            <button
              onClick={() => setShow({ ...show, pending: false, ongoing: false, completed: false, breakdown: true })}
              className={`p-2 max-md:p-1 font-semibold rounded ${show.breakdown ? 'bg-green-600 text-white' : 'text-gray-600'}`}
            >
              BreakDown
            </button>
          </div>
          <div className="">
            <select className="w-24 max-md:w-10" value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)}>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
        </div>
        {/*  */}
        <div className="my-4">
          {show.pending && <PendingTrip itemsPerPage={itemsPerPage} />}
          {show.ongoing && <OngoingTrip itemsPerPage={itemsPerPage} />}
          {show.completed && <CompletedTrip itemsPerPage={itemsPerPage} />}
          {show.breakdown && <BreakDownTrip itemsPerPage={itemsPerPage} />}
        </div>
      </div>
    </div>
  );
};
export default TripManagement;
