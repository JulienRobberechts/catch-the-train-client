import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTime } from "../../domains/toTheStation/slice";
import { selectNow } from "../../domains/toTheStation/selectors";
import config from "../../config";

// to transform into hooks
const PageRefresher = ({ refreshInterval }) => {
  // update the time every 1s
  const dispatch = useDispatch();
  const lastTime = useSelector(selectNow);
  useEffect(() => {
    // console.log("init setInterval");
    const interval = setInterval(() => {
      // console.log("This will run every X second!");
      dispatch(
        updateTime({
          calculateByInterval: config.MOCK_TIME,
          lastTime,
          refreshInterval,
        })
      );
    }, refreshInterval);
    return () => clearInterval(interval);
  }, [dispatch, lastTime, refreshInterval]);

  return <></>;
};

export default PageRefresher;
