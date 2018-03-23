import React, { Component } from "react";
import { MapView, Location, Permissions } from "expo";
import debounce from "lodash.debounce";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";

class MapInput extends Component {
  state = {
    fromInp: "",
    ToInp: "",
    showConf: false,
    fromSuggestion: {
      street: "",
      name: ""
    },
    toSuggestion: {
      street: "",
      name: ""
    }
  };

  handleSetRoute = () => {
    const { handleSetRoute } = this.props;
    handleSetRoute(this.state.fromInp, this.state.ToInp);
    this.setState({ showConf: true });
  };

  fromInpChange = debounce(async txt => {
    const res = await Location.geocodeAsync(txt);
    const crd = await Location.reverseGeocodeAsync({
      ...res[0]
    });
    this.setState({ fromSuggestion: { ...crd[0] } });
  }, 2000);

  toInpChange = debounce(async txt => {
    const res = await Location.geocodeAsync(txt);
    const crd = await Location.reverseGeocodeAsync({
      ...res[0]
    });
    this.setState({ toSuggestion: crd[0] });
  }, 2000);

  render() {
    const { handleConfirm } = this.props;
    const { toSuggestion, fromSuggestion } = this.state;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={150}
        style={styles.inputContainer}
      >
        <TextInput
          onChangeText={this.fromInpChange}
          placeholder="From"
          style={styles.input}
          underlineColorAndroid={"rgba(0,0,0,0)"}
        />
        <Text style={{ color: "#fff", marginTop: 2 }}>
          {fromSuggestion.street} {fromSuggestion.city}
        </Text>
        <TextInput
          onChangeText={this.toInpChange}
          placeholder="To"
          style={styles.input}
          underlineColorAndroid={"rgba(0,0,0,0)"}
        />
        <Text style={{ color: "#fff", marginTop: 2 }}>
          {toSuggestion.street} {toSuggestion.city}
        </Text>
        {this.state.showConf ? (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={handleConfirm}
              style={[styles.btn, { backgroundColor: "#aaffaa" }]}
            >
              <Text>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.setState(prev => ({
                  showConf: !prev.showConf
                }))
              }
              style={styles.btn}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={this.handleSetRoute} style={styles.btn}>
            <Text>Set Route</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    );
  }
}

export default MapInput;

const styles = StyleSheet.create({
  input: {
    paddingLeft: 30,
    marginTop: 15,
    backgroundColor: "#aaa",
    height: 45,
    // borderColor: "#aaa",
    // borderWidth: 2,
    borderRadius: 10,
    width: "80%"
  },
  inputContainer: {
    flex: 0.4,
    backgroundColor: "#2f3948",
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
    backgroundColor: "#D89E6B"
  }
});
