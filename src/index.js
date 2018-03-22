import { StackNavigator } from "react-navigation";
import MapView from "./views/MapView";
import RouteSetupView from "./views/RouteSetupView";
import HomeView from "./views/HomeView";
import FindRoutes from "./views/FindRoutes";

const routes = StackNavigator(
  {
    Home: {
      screen: HomeView
    },
    Map: {
      screen: MapView
    },
    MapWithRoutes: {
      screen: FindRoutes
    },
    RouteSetup: {
      screen: RouteSetupView
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default routes;
