import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import BackIcon from "./icons/back";

export default function Header({
  title,
  backgroundStyle,
  textStyle,
  leftIcon,
  leftIconEvent,
  rightIcon,
  rightIconEvent,
  titleAlignment,
}) {
  return (
    <View style={[styles.container, backgroundStyle]}>
      {titleAlignment !== "left" && (
        <TouchableOpacity style={styles.arrowIcon} onPress={leftIconEvent}>
          {leftIcon}
        </TouchableOpacity>
      )}
      <Text
        style={[
          styles.title,
          textStyle,
          {
            marginLeft: titleAlignment === "left" ? 0 : "auto",
            marginRight: titleAlignment === "right" ? 0 : "auto",
          },
        ]}
      >
        {title}
      </Text>
      {titleAlignment !== "right" && (
        <TouchableOpacity
          style={[styles.arrowIcon, { alignItems: "flex-end" }]}
          onPress={rightIconEvent}
        >
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    height: 56,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    color: "black",
    fontSize: 20,
    letterSpacing: 0.8,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
  },
  arrowIcon: {
    height: 56,
    width: 56,
    justifyContent: "center",
  },
  favoriteIcon: {
    position: "absolute",
    top: 20,
    right: 25,
  },
});
