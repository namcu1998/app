import React from "react";
import { View, Text, TextInput, Picker } from "react-native";
import { FONTS, COLORS, SIZES, images, icons } from "../constants";
import * as elements from "react-native-elements";

export default class addScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pin: 0,
      isActived: false,
      selectedValue: "",
    };
  }

  render() {
    return (
      <View
        style={{
          paddingTop: SIZES.padding,
        }}
      >
        <Text>Add screen</Text>
        <elements.Input
          onChangeText={(value) => {
            this.setState({ name: value });
          }}
          placeholder="name"
          value={this.state.name}
        />
        <TextInput
          onChangeText={(value) => {
            this.setState({ pin: value });
          }}
          value={this.state.pin}
          placeholder="useless placeholder"
          keyboardType="numeric"
          style={{
            height: 20,
            width: "100%",
          }}
        />
        <Picker
          selectedValue={this.state.selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    );
  }
}
