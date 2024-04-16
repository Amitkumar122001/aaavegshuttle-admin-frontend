import React from 'react';
export const TripCard = ({ name, value, total }) => {
  return (
    <div className="rounded-xl overflow-hidden p-2 bg-gray-100 flex flex-col gap-2">
      <p className="bg-blue-400 text-white text-xl text-center rounded">{name}</p>
      <p>No {value}</p>
      <p>Total : {total}</p>
    </div>
  );
};
