import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../consts/colors";
import Users from "./users.view";

export default function Info({ data }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <Users
        opponent={data.opponent}
        proponent={data.proponent}
        round={data.round_number}
      />
      <View style={styles.infoContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.purple + "CC",
    height: 400,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGrey,
  },
  infoContainer: {
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    backgroundColor: "white",
    paddingTop: 12,
    paddingHorizontal: 16,
  },
});
