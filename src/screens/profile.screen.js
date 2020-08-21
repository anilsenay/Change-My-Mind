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

import { getUser } from "../hooks/user.hooks";
import { getDebates } from "../hooks/debate.hooks";

export default function Profile({ route }) {
  const { uid, username } = route?.params;

  const userData = getUser(uid).data;

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
      {userData ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <TopView userData={userData} />
          <Debates debates={userData.debates} />
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
