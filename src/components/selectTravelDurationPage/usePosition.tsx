import React from "react";
import { UserPosition } from "../../domains/map/geoTypes";

const getCurrentPositionAsync = async (
  options: PositionOptions = {}
): Promise<Position> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

const updateUserPosition = async (
  setUserPosition: (userPosition: UserPosition) => void
) => {
  try {
    const userPositionMs = await getCurrentPositionAsync();

    const userPosition: UserPosition = {
      Last: [userPositionMs.coords.longitude, userPositionMs.coords.latitude],
      Unavailable: false,
      PermissionDenied: false,
    };
    setUserPosition(userPosition);
  } catch (err) {
    const userPositionError: UserPosition = {
      Last: undefined,
      Unavailable: true,
      PermissionDenied: err.code === 1,
    };
    setUserPosition(userPositionError);
  }
};

type PositionHookResult = [UserPosition, () => void];

const defaultUserPosition = {
  Last: undefined,
  Unavailable: undefined,
  PermissionDenied: undefined,
};

const usePosition = (): PositionHookResult => {
  const [userPosition, setUserPosition] = React.useState<UserPosition>(
    defaultUserPosition
  );

  React.useEffect(() => {
    updateUserPosition(setUserPosition);
  }, []);
  return [userPosition, () => updateUserPosition(setUserPosition)];
};

export { usePosition };
