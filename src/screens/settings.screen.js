import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { pop } from "../navigation/root_navigation";
import { Notifier, Easing } from "react-native-notifier";

import Header from "../components/header";
import SettingsButton from "../components/settings_button";
import BackIcon from "../components/icons/back";
import { ErrorMessage, SuccessMessage } from "../components/error_message";

import { Colors } from "../consts/colors";

import * as firebase from "firebase";

export default function Settings() {
  const logoutEvent = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        Notifier.showNotification({
          title: "Succesful",
          description: "You logged out succesfully",
          duration: 5000,
          showAnimationDuration: 800,
          showEasing: Easing.bounce,
          Component: status === "Success" ? SuccessMessage : ErrorMessage,
          componentProps: {
            alertType: "error",
          },
          hideOnPress: true,
        });
      })
      .catch(function (error) {
        // An error happened.
      });
  };

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
        <SettingsButton text="Your Favourites" />
        <SettingsButton
          text="Logout"
          textStyle={{ color: "red" }}
          onPress={logoutEvent}
        />
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
