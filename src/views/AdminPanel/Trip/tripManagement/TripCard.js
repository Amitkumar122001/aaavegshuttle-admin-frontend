import React from 'react';
export const TripCard = ({ name, value, total }) => {
  return (
    <div className="rounded-xl overflow-hidden p-4 bg-gray-100 flex flex-col gap-3">
      <div>
        <p className="bg-blue-400 text-white text-xl text-center rounded font-semibold">{name}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold">No {value}</p>
        <p className="font-semibold">Total : {total}</p>
      </div>
    </div>
  );
};
