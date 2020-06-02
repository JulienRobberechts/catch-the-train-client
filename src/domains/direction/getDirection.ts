import { MapPosition } from "../map/geoTypes";
import axios from "axios";
import config from "../../config";

const access_token = config.MAPBOX_ACCESS_TOKEN;
const language = "fr";

const getDirection = async (
  userOfficialPosition: MapPosition | undefined,
  stationPosition: MapPosition | undefined
) => {
  if (!userOfficialPosition || !stationPosition) return undefined;
  const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${userOfficialPosition};${stationPosition}`;
  const response = await axios.get(url, {
    params: {
      access_token,
      language,
      geometries: "geojson",
    },
  });
  return response?.data.routes[0];
};

export default getDirection;
