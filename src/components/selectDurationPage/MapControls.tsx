import React from "react";
import styled from "styled-components";

import { GpsPositionIcon } from "./assets";
import { UserPosition } from "../../domains/map/geoTypes";
import { LogoIcon } from "../../design/icons";

const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, "0");

const getColorGpsIconColor = (userPosition: UserPosition) => {
  if (userPosition.PermissionDenied === true) return "#5b5a59";
  if (userPosition.Unavailable === true) return "#E6716E";
  return "#00aaaa";
};

const getColorGpsMessageColor = (userPosition: UserPosition) => {
  if (userPosition.PermissionDenied === true) return "#FFF";
  if (userPosition.Unavailable === true) return "#E6716E";
  return "#00aaaa";
};

const getGpsMessage = (userPosition: UserPosition) => {
  if (userPosition.PermissionDenied === true)
    return "Autorisez l'utilisation de votre position dans le navigateur\nou indiquez votre point de départ sur la carte.";
  if (userPosition.Unavailable === true)
    return "Impossible d' acceder à votre position";
  return "recherche de votre position en cours...";
};
interface Props {
  updateUserPosition: () => void;
  userPosition: UserPosition;
  selectedRoute:
    | {
        distance: number;
        duration: number;
      }
    | undefined;
  showGpsMessage: boolean;
}

const MapControls: React.FC<Props> = ({
  updateUserPosition,
  userPosition,
  selectedRoute,
  showGpsMessage,
}) => {
  const duration = selectedRoute?.duration;
  const distance = selectedRoute?.distance;

  const gpsMessage = getGpsMessage(userPosition);
  return (
    <>
      <TopControlPanel>
        <GpsPositionIconContainer
          size={3}
          color={getColorGpsIconColor(userPosition)}
          onClick={() => updateUserPosition()}
        >
          <GpsPositionIcon />
        </GpsPositionIconContainer>
        {showGpsMessage && (
          <GpsMessage size={3} color={getColorGpsMessageColor(userPosition)}>
            {gpsMessage}
          </GpsMessage>
        )}
      </TopControlPanel>
      <BottomControlPanel>
        <RowPanel>
          <MapPanel>
            <RowPanel>
              <Walk2IconContainer size={3}>
                <LogoIcon />
              </Walk2IconContainer>
              {duration && distance && (
                <ColumnPanel>
                  <span>
                    {Math.floor(duration / 60)} min{" "}
                    {zeroPad(Math.floor(duration % 60), 2)}
                  </span>
                  <span>{distance.toFixed(0)} mètres</span>
                </ColumnPanel>
              )}
            </RowPanel>
          </MapPanel>
        </RowPanel>
      </BottomControlPanel>
    </>
  );
};

const TopControlPanel = styled.div`
  position: absolute;
  width: 100%;
  top: 0.2rem;
  left: 0.2rem;
  display: flex;
`;

const BottomControlPanel = styled.div`
  position: absolute;
  width: 100%;
  bottom: 1.4rem;
`;

const ColumnPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RowPanel = styled.div`
  display: flex;
  justify-content: center;
`;

const MapPanel = styled.div`
  padding: 0.3rem;
  margin: 0.2rem;
  background-color: #252149;
  border-radius: 4px;
  text-align: center;

  opacity: 0.6;
  color: #ffffff;
`;

const GpsPositionIconContainer = styled.button<{ size: number; color: string }>`
  position: relative;
  width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;

  background-color: rgba(120, 120, 120, 0.3);

  padding: 0.4rem;
  border-radius: 4px;
  cursor: pointer;
  border: none;

  svg {
    fill: ${(props) => props.color};
  }
`;

const GpsMessage = styled.button<{ size: number; color: string }>`
  position: relative;
  width: calc(100vw - ${(props) => props.size}rem - 0.8rem);
  min-height: ${(props) => props.size}rem;

  background-color: rgba(120, 120, 120, 0.3);

  padding: 0.4rem;
  border-radius: 4px;
  border: none;
  margin: 0 0.3rem;

  white-space: pre-line;
  color: ${(props) => props.color};
`;

const Walk2IconContainer = styled.div<{ size: number }>`
  position: relative;
  width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;

  background-color: transparent;

  padding: 0;

  svg {
    fill: #00aaaa;
  }
`;

export default MapControls;
