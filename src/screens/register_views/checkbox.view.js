import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";

import { Colors } from "../../consts/colors";

export default function CheckboxView({ value, onValueChange, error }) {
  const [checkbox, setChekbox] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <CheckBox value={value} onChange={onValueChange} />
        <Text style={styles.text}>I have read and agree the </Text>
        <Text style={[styles.text, { color: Colors.darkPurple }]}>
          Privacy Policy
        </Text>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  text: {
    color: Colors.grey,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
});
