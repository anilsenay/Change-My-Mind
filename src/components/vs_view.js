import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

import { navigate } from "../navigation/root_navigation";
import { Colors } from "../consts/colors";

const User = ({ username, imageSrc }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => navigate("Profile", { username: username })}
    >
      <View style={styles.userContainer}>
        <Image
          source={{ uri: imageSrc }}
          resizeMode="contain"
          style={styles.userImage}
        />
        <Text style={styles.usernameText} numberOfLines={1}>
          {username}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function VsView({ proponent, opponent }) {
  return (
    <View style={styles.userViewContainer}>
      <User username={proponent.username} imageSrc={proponent.imageSrc} />
      <View style={{ marginHorizontal: 6 }}>
        <Text style={styles.vsText}>VS</Text>
      </View>
      <User username={opponent.username} imageSrc={opponent.imageSrc} />
    </View>
  );
}

const styles = StyleSheet.create({
  userViewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  userContainer: {
    marginRight: "auto",
    marginLeft: "auto",
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
});
