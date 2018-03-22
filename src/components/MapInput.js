import React, { Component } from "react";
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
    showConf: false
  };

  handleSetRoute = () => {
    const { handleSetRoute } = this.props;
    handleSetRoute(this.state.fromInp, this.state.ToInp);
    this.setState({ showConf: true });
  };

  render() {
    const { handleConfirm } = this.props;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={150}
        style={styles.inputContainer}
      >
        <TextInput
          onChangeText={txt => this.setState({ fromInp: txt })}
          placeholder="From"
          style={styles.input}
          underlineColorAndroid={"rgba(0,0,0,0)"}
        />
        <TextInput
          onChangeText={txt => this.setState({ ToInp: txt })}
          placeholder="To"
          style={styles.input}
          underlineColorAndroid={"rgba(0,0,0,0)"}
        />
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
