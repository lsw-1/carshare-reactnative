import { StackNavigator } from "react-navigation";
import MapView from "./views/CreateRoute";
import RouteSetupView from "./views/RouteSetup";
import HomeView from "./views/Home";
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
