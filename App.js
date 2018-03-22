import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Entry from "./src";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql"
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        {/* <View style={styles.container}> */}
        <Entry />
        {/* </View> */}
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});
