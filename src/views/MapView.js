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
import { NavigationActions } from "react-navigation";
import MapInput from "../components/MapInput";
class Map extends Component {
  state = {
    region: {
      latitude: 59.1681872,
      latitudeDelta: 0.32685991594793506,
      longitude: 18.1377503,
      longitudeDelta: 0.3000000000000256
    },
    toMarker: null,
    fromMarker: null
  };

  componentWillMount() {
    // this.getLocationAsync();
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
      console.log("ERROR");
    }

    const region = await Location.getCurrentPositionAsync({});
    this.setState({ region: { ...this.state.region, ...region.coords } });
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
        fromMarker: {
          title: "From",
          latlng: {
            latitude: fromCrd[0].latitude,
            longitude: fromCrd[0].longitude
          }
        },
        toMarker: {
          title: "To",
          latlng: {
            latitude: toCrd[0].latitude,
            longitude: toCrd[0].longitude
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  navigateToSetup = () =>
    this.props.navigation.navigate("RouteSetup", {
      from: this.state.fromMarker,
      to: this.state.toMarker
    });

  onRegionChange(region) {
    console.log(region);
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
          {this.state.toMarker && (
            <Marker
              draggable
              coordinate={this.state.toMarker.latlng}
              title={this.state.toMarker.title}
            />
          )}
          {this.state.fromMarker && (
            <View>
              <Polyline
                strokeColor="#ffaaaa"
                strokeWidth={2}
                coordinates={[
                  this.state.fromMarker.latlng,
                  this.state.toMarker.latlng
                ]}
              />
              <Marker
                draggable
                coordinate={this.state.fromMarker.latlng}
                title={this.state.fromMarker.title}
              />
            </View>
          )}
        </MapView>
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
  map: { flex: 1 },
  input: {
    paddingLeft: 30,
    marginTop: 15,
    backgroundColor: "#ddd",
    height: 45,
    borderColor: "#aaa",
    borderWidth: 2,
    borderRadius: 10,
    width: "80%"
  },
  inputContainer: {
    flex: 0.4,
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2
  },
  btn: {
    margin: 10,
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 4, height: 4 },
    backgroundColor: "#eeaabb"
  }
});
