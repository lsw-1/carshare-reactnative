import { MapView, Location, Permissions } from "expo";

export const getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    this.setState({
      errorMessage: "Permission to access location was denied"
    });
    console.log("ERROR");
  }

  const region = await Location.getCurrentPositionAsync({});
  console.log("ERROR" + region);
  return region.coords;
};
