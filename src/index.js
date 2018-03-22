import { StackNavigator } from "react-navigation";
import MapView from "./views/MapView";
import RouteSetupView from "./views/RouteSetupView";
import HomeView from "./views/HomeView";
import MapWithRoutes from "./views/MapWithRoutes";

const routes = StackNavigator(
  {
    Home: {
      screen: HomeView
    },
    Map: {
      screen: MapView
    },
    MapWithRoutes: {
      screen: MapWithRoutes
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
