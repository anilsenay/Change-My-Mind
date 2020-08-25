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

import { increaseView } from "../hooks/debate.hooks";
import debatesHook from "../hooks/debates.hook";

export default function Discussion({ route }) {
  const { data } = route?.params;

  const { getDebate, removeDebateState, useDebatesState } = debatesHook();
  const { current_debate } = useDebatesState();

  const newData = current_debate?.isFetched && {
    ...current_debate.data,
    proponent: data.proponent,
    opponent: data.opponent,
  };
  console.log(newData);

  useEffect(() => {
    getDebate(data.id);
    increaseView(data.id);

    return removeDebateState();
  }, []);

  useEffect(() => {
    return () => removeDebateState();
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
