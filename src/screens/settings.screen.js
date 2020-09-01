import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { pop } from "../navigation/root_navigation";

import Header from "../components/header";
import SettingsButton from "../components/settings_button";
import BackIcon from "../components/icons/back";

import { Colors } from "../consts/colors";

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Settings"
        leftIcon={<BackIcon width={24} height={24} fill="black" />}
        leftIconEvent={() => pop()}
        textStyle={{ fontSize: 22 }}
        backgroundStyle={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.lightGrey,
        }}
      />
      <View style={styles.bodyContainer}>
        <SettingsButton text="Language" />
        <SettingsButton text="Notifications" />
        <SettingsButton text="Logout" textStyle={{ color: "red" }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  bodyContainer: {
    paddingHorizontal: 16,
  },
});
