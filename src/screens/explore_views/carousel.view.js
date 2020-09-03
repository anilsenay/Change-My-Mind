import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "../../consts/colors";

export default function CarouselView({ headerText }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{headerText}</Text>
        <TouchableOpacity style={{ padding: 8 }}>
          <Text style={styles.viewAllText}>Wiew all</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: "auto",
  },
  viewAllText: {
    color: Colors.darkPurple,
  },
});
