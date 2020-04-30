import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTime } from "../../domains/toTheStation/slice";
import { selectNow } from "../../domains/toTheStation/selectors";
import config from "../../config";

interface Props {
  refreshInterval: number;
}

// to transform into hooks
const PageRefresher: React.FC<Props> = ({ refreshInterval }) => {
  // update the time every 1s
  const dispatch = useDispatch();
  const lastTime = useSelector(selectNow);
  useEffect(() => {
    const interval = setInterval(() => {
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
