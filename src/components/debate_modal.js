import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { navigate } from "../navigation/root_navigation";

import { reportDebate } from "../hooks/debate.hooks";
import { reportUser } from "../hooks/user.hooks";
import globalHook from "../hooks/global.hook";

import ModalButton from "./modal_button";

export default function DebateModal({ data, cancelEvent, inDebate }) {
  const { addFavourites, removeFavourites, useGlobalState } = globalHook();
  const { user } = useGlobalState();

  console.log(data.proponent);
  const goToDebate = () => {
    navigate("Discussion", {
      data,
    });
    cancelEvent();
  };

  const reportDebateEvent = () => {
    reportDebate(data.id);
    Alert.alert(
      "Reported Succesfully",
      "Thank you for sharing with us. The debate will be examined by our team."
    );
    cancelEvent();
  };

  const reportUserEvent = (uid) => {
    reportUser(uid);
    Alert.alert(
      "Reported Succesfully",
      "Thank you for sharing with us. The debate will be examined by our team."
    );
    cancelEvent();
  };

  const shareEvent = () => {
    Alert.alert("Opps", "Sharing is not supporting yet.");
    cancelEvent();
  };

  const addFavouriteEvent = () => {
    addFavourites(data.id);
  };
  const removeFavouriteEvent = () => {
    removeFavourites(data.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <ModalButton
          text="Report the debate"
          textStyle={{ color: "red" }}
          onPress={reportDebateEvent}
        />
        {!inDebate && <ModalButton text="Go to debate" onPress={goToDebate} />}
        {inDebate && (
          <ModalButton
            text="Report the proponent"
            textStyle={{ color: "red" }}
            onPress={() => reportUserEvent(data.proponent.uid)}
          />
        )}
        {inDebate && data.opponent?.uid && (
          <ModalButton
            text="Report the opponent"
            textStyle={{ color: "red" }}
            onPress={() => reportUserEvent(data.opponent.uid)}
          />
        )}
        {user?.favourites.includes(data.id) ? (
          <ModalButton
            text="Remove from Favourites"
            onPress={removeFavouriteEvent}
          />
        ) : (
          <ModalButton text="Add to Favourites" onPress={addFavouriteEvent} />
        )}
        <ModalButton text="Share" onPress={shareEvent} />
        <ModalButton text="Cancel" noBorder onPress={cancelEvent} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 16,
  },
  buttonsContainer: {
    width: "100%",
  },
});
