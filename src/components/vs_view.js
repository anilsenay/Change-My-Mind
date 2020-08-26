import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

import { navigate, navigateTab } from "../navigation/root_navigation";
import { Colors } from "../consts/colors";

import { getCurrentUserId, getUser } from "../hooks/user.hooks";

const User = ({ data }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        getCurrentUserId() === data.uid
          ? navigateTab("MyProfile")
          : navigate("Profile", { uid: data.uid, username: data.username })
      }
    >
      <View style={styles.userContainer}>
        <Image
          source={{ uri: data?.imageSrc }}
          resizeMode="contain"
          style={styles.userImage}
        />
        <Text style={styles.usernameText} numberOfLines={1}>
          {data.username}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function VsView({ proponent, opponent }) {
  const proponentData = proponent?.username
    ? proponent
    : getUser(proponent).data;
  const opponentData = opponent
    ? opponent?.username
      ? opponent
      : getUser(opponent).data
    : null;

  return (
    <View style={styles.userViewContainer}>
      {proponentData?.username && <User data={proponentData} />}
      <View>
        <Text style={styles.vsText}>VS</Text>
      </View>
      {opponentData?.username ? (
        <User data={opponentData} />
      ) : (
        <View style={styles.emptyUser}>
          <Text style={styles.waitingText}>Waiting for Opponent</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  userViewContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  userContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  userImage: {
    width: 36,
    height: 36,
    borderRadius: 50,
    marginBottom: 4,
  },
  usernameText: {
    fontWeight: "bold",
    fontSize: 13,
  },

  vsText: {
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.grey + "66",
    marginHorizontal: 8,
  },
  emptyUser: {
    flex: 1,
    alignItems: "center",
  },
  waitingText: {
    width: 80,
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.grey,
  },
});
