import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { pop } from "../navigation/root_navigation";

import Header from "../components/header";
import BackIcon from "../components/icons/back";
import Dots from "./discussion_views/dots.view";
import Users from "./discussion_views/users.view";
import Info from "./discussion_views/info.view";
import Rounds from "./discussion_views/rounds.view";
import { Colors } from "../consts/colors";

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
        backgroundStyle={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.lightGrey,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollStyle}
      >
        <Info data={data} />
        <Rounds opponent={data.opponent} proponent={data.proponent} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1 },
});
