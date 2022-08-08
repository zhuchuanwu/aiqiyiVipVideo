import React from "react";
import { TouchableOpacity, Text } from "react-native";

function RightButton(props) {
  const { title, onPress, disable } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        if (disable) return;
        onPress();
      }}
    >
      <Text style={[{ color: "red" }]}>{title}</Text>
    </TouchableOpacity>
  );
}

export default RightButton;
