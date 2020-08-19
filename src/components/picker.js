import React from "react";
import { StyleSheet, View, Picker as PickerRN } from "react-native";

import { Colors } from "../consts/colors";
import BackIcon from "./icons/back";

export default function Picker({ selectedValue, onValueChange, data }) {
  return (
    <View style={styles.pickerContainer}>
      <PickerRN
        selectedValue={selectedValue}
        style={styles.pickerStyle}
        onValueChange={onValueChange}
      >
        {data.map((item) => {
          return (
            <PickerRN.Item
              key={item.value}
              label={item.label}
              value={item.value}
              color={Colors.grey}
            />
          );
        })}
      </PickerRN>
      <BackIcon
        width={20}
        height={20}
        fill={Colors.grey}
        style={styles.pickerIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: Colors.grey + "88",
    flexDirection: "row",
    alignItems: "center",
  },
  pickerStyle: {
    height: 36,
    width: "100%",
    backgroundColor: Colors.purple + "11",
  },
  pickerIcon: {
    position: "absolute",
    right: 16,
    transform: [{ rotateZ: "270deg" }],
  },
});
