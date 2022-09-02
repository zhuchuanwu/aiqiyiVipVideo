import { Entypo } from "@expo/vector-icons";
import { isEmpty } from "lodash";
import { observer } from "mobx-react";
import { type } from "os";
import React, { useMemo, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Divider, Portal, Surface } from "react-native-paper";
import { color, t } from "react-native-tailwindcss";
import { useAppStore, useDropDown } from "../mobx";

function DropDown() {
  const {
    position,
    directionX,
    title,
    needDot,
    show,
    targetView,
    setDropdown,
  } = useDropDown();
  const { width, height } = useWindowDimensions();
  const isLanscape = width > height;
  const { setCurrentItem, currentItem } = useAppStore();

  const dropdownRef = useRef<View | null>(null);
  const [setDropdownHeight] = React.useState(0);
  const postion = useMemo(() => {
    if (position.y + 50 + 200 > height) {
      return "top";
    }
    return "bottom";
  }, [position, height]);
  const items = [
    {
      icon: null,
      onPress: () => {
        setCurrentItem({ url: "https://www.iqiyi.com/", title: "爱奇艺" });
      },
      title: "爱奇艺",
    },
    {
      icon: null,
      onPress: () => {
        setCurrentItem({ url: "https://www.mgtv.com/", title: "芒果" });
      },
      title: "芒果TV",
    },
    {
      icon: null,
      onPress: () => {
        setCurrentItem({ url: "https://www.youku.com/", title: "优酷" });
      },
      title: "优酷",
    },
  ];
  return show ? (
    <Portal>
      <TouchableOpacity
        style={[
          t.absolute,
          { width, height, backgroundColor: "rgba(0,0,0,0.5)" },
        ]}
        onPress={() => {
          setDropdown({ show: false, title: "" });
        }}
      />

      <Surface
        style={[
          t.bgWhite,
          t.p4,
          t.w64,
          {
            borderRadius: 16,
            marginLeft: isLanscape ? 0.25 * width : 0.1 * width,
            marginTop: height / 2 - 200,
            width: isLanscape ? 0.5 * width : 0.8 * width,
          },
        ]}
      >
        <View ref={dropdownRef}>
          {/* <View>
            <Text
              style={[t.fontPrimaryBoldHeavy, t.textPrimaryNavyLight, t.text16]}
            >
              我要看
            </Text>
            <Divider style={[t.mY4]} />
          </View> */}

          {items.map(({ icon, title, onPress }) => (
            <TouchableOpacity
              key={title}
              onPress={() => {
                setDropdown({
                  show: false,
                });
                onPress();
              }}
              style={[t.h10, t.justifyCenter]}
            >
              <View style={[t.flexRow, t.itemsCenter]}>
                {icon}
                <Text style={[t.textPrimaryNavyLight, icon && t.mL2]}>
                  {title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Surface>
    </Portal>
  ) : null;
}

export default observer(DropDown);
