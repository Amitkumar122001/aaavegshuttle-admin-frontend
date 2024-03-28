import React, { useState } from 'react';
import { ReAssignDriver } from './ReAssignDriver';
import { AssignDriver } from './AssignDriver';
export const PairBusDriver = () => {
  // tabs
  const [show, setShow] = useState({
    assign: true,
    reassign: false
  });

  return (
    <div className="bg-white rounded-xl w-full h-full">
      <div className=" flex flex-col gap-3 bg-white p-4 max-lg:p-2 max-lg:gap-5 rounded-xl">
        <div>
          <p className="text-3xl text-gray-600 text-center">Pair Bus Driver</p>
          <p className=" border border-gray-300 mt-2"></p>
        </div>
        {/* tab button */}
        <div>
          <button
            onClick={() => setShow({ ...show, assign: true, reassign: false })}
            className={`p-2 font-semibold rounded ${show.assign ? 'bg-green-600 text-white' : 'text-gray-600'}`}
          >
            Assign
          </button>
          <button
            onClick={() => setShow({ ...show, assign: false, reassign: true })}
            className={`p-2 font-semibold rounded ${show.reassign ? 'bg-green-600 text-white' : 'text-gray-600'}`}
          >
            ReAssign
          </button>
        </div>
        {show.assign && <AssignDriver />}
        {show.reassign && <ReAssignDriver />}
      </div>
    </div>
  );
};
