import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";

import { Colors } from "../consts/colors";
import { navigate } from "../navigation/root_navigation";

import Header from "../components/header";
import SettingsIcon from "../components/icons/settings";

import TopView from "./profile_views/top.view";
import Debates from "./profile_views/debates";

import globalHook from "../hooks/global.hook";

export default function MyProfile() {
  const { useGlobalState } = globalHook();
  const { user } = useGlobalState();

  const isFocused = useIsFocused();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={user.username || "User not found!"}
        textStyle={{ fontSize: 18 }}
        rightIcon={<SettingsIcon width={24} height={24} fill="black" />}
        rightIconEvent={() => navigate("Settings")}
        backgroundStyle={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.lightGrey,
        }}
      />
      {user ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<TopView userData={user} />}
          ListFooterComponent={isFocused && <Debates debates={user.debates} />}
        />
      ) : (
        <ActivityIndicator
          size="large"
          animating={true}
          color="grey"
          style={{ marginTop: 40 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1 },
});
