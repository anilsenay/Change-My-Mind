import React, { useState } from "react";
import { View, Animated, StyleSheet, TouchableOpacity } from "react-native";
import { PlusIcon } from "../navigation/tabBar_icons";
import { Colors } from "../consts/colors";
import { push } from "../navigation/root_navigation";

const NavigationAddButton = () => {
  const { container, addButton, iconContainer } = styles;

  const [scaleValue] = useState(new Animated.Value(0));

  const onButtonClicked = () => {
    // Don't forget about the callback function for Animated.timing.
    // After we finish scaling, we need to set the scale value back to 0;
    // If we don't do that, when we go back to the Home screen our button will still be scaled
    Animated.timing(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 500,
    }).start(() => {
      push("Create");
      setTimeout(() => scaleValue.setValue(0), 500);
    });
    // push("Create");
  };

  const scaleValueInterpolation = scaleValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 15, 30],
  });

  return (
    <View style={container}>
      <Animated.View
        style={[
          iconContainer,
          { transform: [{ scale: scaleValueInterpolation }] },
        ]}
      />
      <TouchableOpacity style={addButton} onPress={onButtonClicked}>
        <PlusIcon height={20} width={20} fill={"white"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -24,
    marginHorizontal: 8,
  },
  addButton: {
    width: 52,
    height: 52,
    flexDirection: "row",
    backgroundColor: Colors.purple,
    borderRadius: 52,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
    zIndex: 2,
  },
  iconContainer: {
    backgroundColor: "white",
    borderRadius: 100,
    position: "absolute",
    top: 0,
    left: 0,
    width: 52,
    height: 52,
    zIndex: 1,
  },
});

export default NavigationAddButton;
