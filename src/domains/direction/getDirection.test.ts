import getDirection from "./getDirection";
import { MapPosition } from "../map/geoTypes";

const fromPosition: MapPosition = [2.092178, 48.901555];
const toPosition: MapPosition = [2.094677, 48.898316];

describe.skip("getDirection", () => {
  it("should return data", async () => {
    const route = await getDirection(fromPosition, toPosition);
    expect(route).toBeTruthy();
    expect(route).toMatchSnapshot("direction-response");
  });
});
