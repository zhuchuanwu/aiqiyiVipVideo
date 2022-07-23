import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { colors, t, TailwindColors } from "react-native-tailwindcss";
import { Ionicons } from "@expo/vector-icons";
import NavigationService from "../../navigation/NavigationService";
interface NavigationLeftButtonProps {
  onPress?: () => void;
  style?: ViewStyle;
  leftColor?: string;
}

export default function NavigationLeftButton({
  onPress,
  style,
  leftColor,
}: NavigationLeftButtonProps): React.ReactElement {
  return (
    <TouchableOpacity
      style={[t.mL4]}
      onPress={() => (onPress ? onPress() : NavigationService.goBack())}
    >
      <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
    </TouchableOpacity>
  );
}
