import React from "react";
import { SizeMe, SizeMeProps } from "react-sizeme";
import GeoContainer from "./GeoContainer";
import { MapPosition, MapExactSize } from "../../domains/map/geoTypes";
import TopPanel from "./TopPanel";

const stationPosition: MapPosition = [2.094677, 48.898316];

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
  onValidation: (duration: number) => void;
}

const ResizeContainer: React.FC<Props> = () => {
  const topPanelHeightRem = 8.75;
  const topPanelHeightPx = convertRemToPixels(topPanelHeightRem);

  const backgroundColor = "#252149";
  const defaultDuration = 600;
  const [duration, setDuration] = React.useState<number>(defaultDuration);
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
          <TopPanel
            duration={duration}
            height={topPanelHeightPx}
            backgroundColor={backgroundColor}
            highlighted={durationHighlighted}
            onDurationChangedByUser={onDurationChangedByUser}
          />
          <GeoContainer
            backgroundColor={backgroundColor}
            initialStationPosition={stationPosition}
            onRouteDurationChanged={onRouteDurationChanged}
            mapExactSize={getMapExactSizePx(sizePx, topPanelHeightPx)}
          />
        </div>
      )}
    </SizeMe>
  );
};

export default ResizeContainer;
