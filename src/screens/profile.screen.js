import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "../consts/colors";
import { pop, navigateTab } from "../navigation/root_navigation";

import Header from "../components/header";
import BackIcon from "../components/icons/back";
import Dots from "../components/vertical_dots";

import TopView from "./profile_views/top.view";
import Debates from "./profile_views/debates";

import { getUser } from "../hooks/user.hooks";
import profileHook from "../hooks/profile.hook";

export default function Profile({ route, user }) {
  const [isRefreshed, setRefreshed] = useState(false);

  const { uid, username } = route?.params;
  const userData = getUser(uid).data;

  const { getProfile, useProfileState, removeProfileState } = profileHook();
  const { profile } = useProfileState();

  const newData = profile?.isFetched ? profile.data : null;

  useEffect(() => {
    getProfile(uid);

    return removeProfileState();
  }, [isRefreshed]);

  useEffect(() => {
    return () => removeProfileState();
  }, []);

  const refreshEvent = () => {
    setRefreshed(!isRefreshed);
    console.log("refreshed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={username || "User not found!"}
        textStyle={{ fontSize: 18 }}
        leftIcon={!user && <BackIcon width={24} height={24} fill="black" />}
        leftIconEvent={() => pop()}
        rightIcon={<Dots onPress={() => console.log("dots")} />}
        backgroundStyle={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.lightGrey,
        }}
      />
      {userData ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <TopView
              userData={newData || userData}
              refreshEvent={refreshEvent}
            />
          }
          ListFooterComponent={<Debates debates={userData.debates} />}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={refreshEvent} />
          }
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
