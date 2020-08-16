import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { pop } from "../navigation/root_navigation";

import Header from "../components/header";
import BackIcon from "../components/icons/back";
import Dots from "./discussion_views/dots.view";
import Users from "./discussion_views/users.view";
import Info from "./discussion_views/info.view";

export default function Discussion({ route }) {
  const { data } = route?.params;
  console.log(data);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Discussion"
        leftIcon={<BackIcon width={24} height={24} fill="black" />}
        leftIconEvent={() => pop()}
        rightIcon={<Dots onPress={() => console.log("dots")} />}
      />
      <Info data={data} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1 },
});
