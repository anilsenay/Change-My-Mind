import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { pop } from "../navigation/root_navigation";

import Header from "../components/header";
import BackIcon from "../components/icons/back";
import Dots from "../components/vertical_dots";

import Info from "./discussion_views/info.view";
import Rounds from "./discussion_views/rounds.view";
import PostButton from "./discussion_views/post_button.view";

import { Colors } from "../consts/colors";

import { increaseView } from "../hooks/debate.hooks";
import debatesHook from "../hooks/debates.hook";
import { getCurrentUserId, getUser } from "../hooks/user.hooks";
import { useIsFocused } from "@react-navigation/native";
import FinishView from "./discussion_views/finish.view";
import CustomModal from "../components/modal";
import DebateModal from "../components/debate_modal";

export default function Discussion({ route }) {
  const [isRefreshed, setRefreshed] = useState(false);
  const [activeRound, setActiveRound] = useState(1);
  const [visible, setVisible] = useState(false);

  const { data } = route?.params;

  const { getDebate, removeDebateState, useDebatesState } = debatesHook();
  const { current_debate } = useDebatesState();

  const newData = current_debate?.isFetched && {
    ...current_debate.data,
    proponent: data.proponent || current_debate.data.proponent,
    opponent: data.opponent || current_debate.data.opponent,
  };
  console.log("newdata", newData);

  useEffect(() => {
    getDebate(data.id);
    increaseView(data.id);

    return removeDebateState();
  }, [isRefreshed]);

  useEffect(() => {
    return () => removeDebateState();
  }, []);

  const refreshEvent = () => {
    setRefreshed(!isRefreshed);
  };
  console.log("active round", activeRound);
  const isFocused = useIsFocused();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Discussion"
        leftIcon={<BackIcon width={24} height={24} fill="black" />}
        leftIconEvent={() => pop()}
        rightIcon={<Dots onPress={() => setVisible(true)} />}
        backgroundStyle={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.lightGrey,
        }}
      />
      {newData?.title && isFocused ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollStyle}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={refreshEvent} />
          }
        >
          <Info data={newData.id ? newData : data} />
          <Rounds
            opponent={newData.opponent || data.opponent}
            proponent={newData.proponent || data.proponent}
            rounds={newData.rounds ? newData.rounds : null}
            roundNumber={newData.round_number}
            setActiveRound={setActiveRound}
          />

          <FinishView />

          {getCurrentUserId() !==
            (newData.proponent.uid || data.proponent?.uid) &&
            !newData.opponent && (
              <PostButton join refreshEvent={refreshEvent} />
            )}
          {getCurrentUserId() ===
            (newData.proponent.uid || data.proponent?.uid) &&
            newData.rounds?.length !== activeRound && <PostButton isNewRound />}
        </ScrollView>
      ) : (
        <ActivityIndicator
          size="large"
          animating={true}
          color="grey"
          style={{ marginTop: 40 }}
        />
      )}
      <CustomModal visible={visible} setModalVisible={setVisible}>
        <DebateModal
          cancelEvent={() => setVisible(false)}
          data={{
            id: newData.id,
            proponent: newData.proponent || data.proponent,
            opponent: newData.opponent || data.opponent,
          }}
          inDebate
        />
      </CustomModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1 },
});
