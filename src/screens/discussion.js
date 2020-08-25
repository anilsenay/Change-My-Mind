import React, { useEffect } from "react";
import { StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { pop } from "../navigation/root_navigation";

import Header from "../components/header";
import BackIcon from "../components/icons/back";
import Dots from "../components/vertical_dots";

import Info from "./discussion_views/info.view";
import Rounds from "./discussion_views/rounds.view";

import { Colors } from "../consts/colors";

import { getDebate, increaseView } from "../hooks/debate.hooks";

export default function Discussion({ route }) {
  const { data } = route?.params;

  const newData = {
    ...getDebate(data.id).data,
    proponent: data.proponent,
    opponent: data.opponent,
  };
  console.log(newData);

  useEffect(() => {
    increaseView(data.id);
  }, []);

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
      {newData?.title ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollStyle}
        >
          <Info data={newData.id ? newData : data} />
          <Rounds
            opponent={data.opponent}
            proponent={data.proponent}
            rounds={newData.rounds ? newData.rounds : null}
          />
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
