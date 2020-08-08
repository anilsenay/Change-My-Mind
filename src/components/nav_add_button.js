import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PlusIcon } from "../navigation/tabBar_icons";
import { Colors } from "../consts/colors";

const NavigationAddButton = () => {
  const { container, addButton } = styles;

  return (
    <View style={container}>
      <TouchableOpacity style={addButton}>
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
    borderRadius: 16,
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
  },
});

export default NavigationAddButton;
