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
import MapWithRoutes from "../components/MapWithRoutes";
import { getLocationAsync } from "../utils";
class FindRoutes extends Component {
  static navigationOptions = {
    title: "Find a Route",
    headerTintColor: "#fff",
    headerStyle: {
      backgroundColor: "#2f3948"
    },
    headerTransparent: true
  };
  state = {
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 7,
      longitudeDelta: 70
    }
  };

  componentWillMount() {
    this.handleGetLocationAsync();
  }

  handleGetLocationAsync = async () => {
    const res = await getLocationAsync();
    this.setState({ region: { ...this.state.region, ...res } });
  };

  onRegionChange = region => {
    console.log(region);
  };

  render() {
    return (
      <View style={styles.container}>
        <Query query={QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <Text>Loading...</Text>;
            return (
              <MapWithRoutes
                locationOfMap={this.state.region}
                routes={data && data.routes}
                // onRegionChange={this.onRegionChange}
              />
            );
          }}
        </Query>
        {/* <View
          style={{
            position: "absolute",
            height: 250,
            width: 250,
            backgroundColor: "#fff",
            top: "30%",
            alignSelf: "center",
            borderRadius: 5
          }}
        >
          <Text>hej</Text>
        </View> */}
      </View>
    );
  }
}

const QUERY = gql`
  query {
    routes {
      id
      description
      toLongitude
      toLatitude
      fromLongitude
      fromLatitude
    }
  }
`;

export default FindRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
  },
  map: { flex: 1 }
});
