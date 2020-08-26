import React from "react";
import { StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "../consts/colors";
import { pop } from "../navigation/root_navigation";

import Header from "../components/header";
import BackIcon from "../components/icons/back";
import Dots from "../components/vertical_dots";

import TopView from "./profile_views/top.view";
import Debates from "./profile_views/debates";

import globalHook from "../hooks/global.hook";

export default function MyProfile() {
  const { useGlobalState } = globalHook();
  const { user } = useGlobalState();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={user.username || "User not found!"}
        textStyle={{ fontSize: 18 }}
        leftIcon={!user && <BackIcon width={24} height={24} fill="black" />}
        leftIconEvent={() => pop()}
        rightIcon={<Dots onPress={() => console.log("dots")} />}
        backgroundStyle={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.lightGrey,
        }}
      />
      {user ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <TopView userData={user} />
          <Debates debates={user.debates} />
        </ScrollView>
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
