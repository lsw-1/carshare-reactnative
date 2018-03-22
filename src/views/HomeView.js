import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { LinearGradient } from "expo";
import { NavigationActions } from "react-navigation";
export default class HomeView extends Component {
  static navigationOptions = {
    headerTransparent: true
  };

  render() {
    return (
      <LinearGradient
        colors={["rgba(153,80,0,0.8)", "rgba(153,80,155,0.8)"]}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "stretch" }}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.dispatch(
                NavigationActions.navigate({ routeName: "Map" })
              )
            }
            style={styles.btn}
          >
            <Text style={styles.txt}>Create Route</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.dispatch(
                NavigationActions.navigate({ routeName: "MapWithRoutes" })
              )
            }
            style={styles.btn}
          >
            <Text style={styles.txt}>Find Route</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#aa4477",
    padding: 20,
    borderRadius: 10,
    margin: 2
  },
  txt: {
    fontWeight: "900",
    color: "#fff"
  }
});
