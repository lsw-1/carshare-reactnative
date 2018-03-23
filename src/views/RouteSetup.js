import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo";
import { graphql, Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

export default class RouteSetup extends Component {
  state = {
    descriptionInp: ""
  };
  render() {
    const { navigation: { state } } = this.props;
    console.log(state.params.route[0]);
    return (
      <LinearGradient
        colors={["rgba(1,155,100,1)", "rgba(153,222,155,1)"]}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={styles.title}>Description</Text>
        <TextInput
          underlineColorAndroid={"rgba(0,0,0,0)"}
          style={styles.txtfld}
          multiline
          numberOfLines={5}
        />
        <Mutation
          mutation={CREATE_ROUTE_MUTATION}
          variables={{
            desc: this.state.descriptionInp,
            ...state.params.route[0]
          }}
        >
          {createRoute => (
            <TouchableOpacity
              onPress={() =>
                createRoute()
                  .then(res => this.props.navigation.navigate("Home"))
                  .catch(err => console.log(err))
              }
              style={styles.btn}
            >
              <Text style={styles.btntxt}>Create Route</Text>
            </TouchableOpacity>
          )}
        </Mutation>
      </LinearGradient>
    );
  }
}

const CREATE_ROUTE_MUTATION = gql`
  mutation createRoute(
    $desc: String!
    $toLongitude: Float!
    $toLatitude: Float!
    $fromLongitude: Float!
    $fromLatitude: Float!
  ) {
    createRoute(
      description: $desc
      toLongitude: $toLongitude
      toLatitude: $toLatitude
      fromLongitude: $fromLongitude
      fromLatitude: $fromLatitude
    ) {
      id
      description
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  txtfld: {
    color: "#555",
    padding: 5,
    backgroundColor: "#fff",
    flex: 0.2,
    width: "90%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    minHeight: 200
  },
  title: {
    fontWeight: "900",
    marginBottom: 5,
    color: "#fff",
    fontSize: 32
  },
  btn: {
    backgroundColor: "#aaffaa",
    padding: 20,
    borderRadius: 10,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    elevation: 10
  },
  btntxt: {
    fontWeight: "500",
    color: "#fff"
  }
});
