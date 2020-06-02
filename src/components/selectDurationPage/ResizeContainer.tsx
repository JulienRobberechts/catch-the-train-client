import React from "react";
import { SizeMe, SizeMeProps } from "react-sizeme";
import GeoContainer from "./GeoContainer";
import { MapPosition, MapExactSize } from "../../domains/map/geoTypes";
import ActionPanel from "./TopPanel";
import AppTitle, { FixedAppTitleHeightRem } from "../appBar/appTitle";

function convertRemToPixels(rem: number) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

const getMapExactSizePx = (
  sizePx: SizeMeProps["size"],
  minusPx: number
): MapExactSize => ({
  width: sizePx.width ?? 400,
  height: sizePx.height
    ? Math.max(100, Math.min(sizePx.height - minusPx, 2000))
    : 400,
});

interface Props {
  stationName: string | undefined;
  initialDuration: number;
  initialStationPosition: MapPosition;
  onValidate: (duration: number) => void;
}

const ResizeContainer: React.FC<Props> = ({
  stationName,
  initialDuration,
  initialStationPosition,
  onValidate,
}) => {
  const topPanelHeightRem = 7;
  const heightExceptMapInPx = convertRemToPixels(
    FixedAppTitleHeightRem + topPanelHeightRem
  );

  const backgroundColor = "#252149";
  const [duration, setDuration] = React.useState<number>(initialDuration);
  const [durationHighlighted, setDurationHighlighted] = React.useState<boolean>(
    false
  );

  const onRouteDurationChanged = React.useCallback(
    (newDuration: number) => {
      setDuration(newDuration);
      setDurationHighlighted(false);
    },
    [setDuration]
  );

  const onDurationChangedByUser = React.useCallback(
    (newDuration: number) => {
      setDuration(newDuration);
      setDurationHighlighted(true);
    },
    [setDuration]
  );

  return (
    <SizeMe monitorHeight>
      {({ size: sizePx }) => (
        <div style={{ height: "100vh", backgroundColor: backgroundColor }}>
          <AppTitle title={"Temps de trajet - " + stationName} />
          <GeoContainer
            backgroundColor={backgroundColor}
            initialStationPosition={initialStationPosition}
            onRouteDurationChanged={onRouteDurationChanged}
            mapExactSize={getMapExactSizePx(sizePx, heightExceptMapInPx)}
          />
          <ActionPanel
            duration={duration}
            heightRem={topPanelHeightRem}
            backgroundColor={backgroundColor}
            highlighted={durationHighlighted}
            onDurationChangedByUser={onDurationChangedByUser}
            onValidate={onValidate}
          />
        </div>
      )}
    </SizeMe>
  );
};

export default ResizeContainer;
