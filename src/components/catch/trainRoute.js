import React from "react";

const TrainRoute = ({ station, direction }) => {
  return (
    <div>
      <span>{station}</span>
      {direction && (
        <>
          <span> > </span>
          <span>{direction}</span>
        </>
      )}
    </div>
  );
};

export default TrainRoute;
