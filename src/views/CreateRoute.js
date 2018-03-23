// @flow
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { MapView, Location, Permissions } from "expo";
import { Marker, Polyline } from "react-native-maps";

import MapInput from "../components/MapInput";
import MapWithRoutes from "../components/MapWithRoutes";
import { getLocationAsync } from "../utils";
class Map extends Component {
  static navigationOptions = {
    title: "Create Route",
    headerTintColor: "#fff",
    headerStyle: {
      backgroundColor: "#2f3948"
    },
    headerTransparent: true
  };
  state = {
    region: {
      latitude: 59.1681872,
      latitudeDelta: 0.32685991594793506,
      longitude: 18.1377503,
      longitudeDelta: 0.3000000000000256
    },
    SearchedRoute: []
  };

  componentWillMount() {
    this.handleGetLocationAsync();
  }

  handleGetLocationAsync = async () => {
    const res = await getLocationAsync();
    this.setState({ region: { ...this.state.region, ...res } });
  };

  setMarkerLocation = async (from, to) => {
    try {
      const fromCrd = await Location.geocodeAsync(from);
      const toCrd = await Location.geocodeAsync(to);

      this.setState({
        region: {
          ...this.state.region,
          latitude: fromCrd[0].latitude,
          longitude: fromCrd[0].longitude
        },
        SearchedRoute: [
          {
            fromLatitude: fromCrd[0].latitude,
            fromLongitude: fromCrd[0].longitude,
            toLatitude: toCrd[0].latitude,
            toLongitude: toCrd[0].longitude
          }
        ]
      });
    } catch (error) {
      console.log(error);
    }
  };

  navigateToSetup = () =>
    this.props.navigation.navigate("RouteSetup", {
      route: this.state.SearchedRoute
    });

  onRegionChange = region => {
    console.log(region);
  };
  render() {
    return (
      <View style={styles.container}>
        <MapWithRoutes
          // onRegionChange={this.onRegionChange}
          routes={this.state.SearchedRoute}
          locationOfMap={this.state.region}
        />

        <MapInput
          handleConfirm={this.navigateToSetup}
          handleSetRoute={this.setMarkerLocation}
        />
      </View>
    );
  }
}

export default Map;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 }
});
