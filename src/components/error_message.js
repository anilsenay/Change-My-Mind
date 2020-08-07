import React from "react";
import { Text, View, SafeAreaView } from "react-native";

export default function ErrorMessage({ title, description }) {
  return (
    <SafeAreaView style={{ backgroundColor: "#CF463F" }}>
      <View
        style={{
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", paddingTop: 10 }}>
          {title}
        </Text>
        <Text style={{ color: "white", textAlign: "center" }}>
          {description}
        </Text>
      </View>
    </SafeAreaView>
  );
}
