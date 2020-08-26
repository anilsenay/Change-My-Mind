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

import { getCurrentUserId } from "../hooks/user.hooks";

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
  return (
    <View style={styles.userViewContainer}>
      {proponent?.username && <User data={proponent} />}
      <View>
        <Text style={styles.vsText}>VS</Text>
      </View>
      {opponent?.username ? (
        <User data={opponent} />
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
  },
  waitingText: {
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.grey,
  },
});
