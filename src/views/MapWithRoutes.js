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
import { graphql, Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
class MapWithRoutes extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 59.1681872,
        longitude: 18.1377503,
        latitudeDelta: 70,
        longitudeDelta: 70
      }
    };
  }

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

  setMarkerLocation = async () => {
    try {
      const fromCrd = await Location.geocodeAsync(this.state.fromInp);
      const toCrd = await Location.geocodeAsync(this.state.ToInp);

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
        },
        showConf: true
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Query
          query={QUERY}
          loading={() => (
            <View>
              <Text>Loading</Text>
            </View>
          )}
        >
          {({ loading, error, data }) => (
            <MapView
              style={styles.map}
              region={this.state.region}
              onRegionChange={this.onRegionChange}
            >
              <Text>{JSON.stringify(data.routes)}</Text>
              <Text>{JSON.stringify(error)}</Text>
              {data.routes &&
                data.routes.map(route => (
                  <View key={route.id}>
                    <Marker
                      coordinate={{
                        latitude: route.fromLatitude,
                        longitude: route.fromLongitude
                      }}
                    />
                    <Polyline
                      strokeColor="#ffaaaa"
                      strokeWidth={2}
                      coordinates={[
                        {
                          latitude: route.fromLatitude,
                          longitude: route.fromLongitude
                        },
                        {
                          latitude: route.toLatitude,
                          longitude: route.toLongitude
                        }
                      ]}
                    />
                    <Marker
                      draggable
                      coordinate={{
                        latitude: route.toLatitude,
                        longitude: route.toLongitude
                      }}
                    />
                  </View>
                ))}
            </MapView>
          )}
        </Query>
      </View>
    );
  }
}

const QUERY = gql`
  query {
    routes {
      id
      description
      toLogitude
      toLatitude
      fromLogitude
      fromLatitude
    }
  }
`;

export default MapWithRoutes;

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
