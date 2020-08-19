import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/header";
import BackIcon from "../components/icons/back";
import Dots from "../components/vertical_dots";
import { Colors } from "../consts/colors";
import UserInfo from "./profile_views/userinfo.view";
import TopView from "./profile_views/top.view";
import Debates from "./profile_views/debates";

export default function Profile({ route }) {
  const { username } = route?.params;
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={username || "User not found!"}
        textStyle={{ fontSize: 18 }}
        leftIcon={<BackIcon width={24} height={24} fill="black" />}
        leftIconEvent={() => pop()}
        rightIcon={<Dots onPress={() => console.log("dots")} />}
        backgroundStyle={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.lightGrey,
        }}
      />
      <TopView />
      <Debates />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1 },
});
