import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors } from "../../consts/colors";
import { navigate, navigateTab, push } from "../../navigation/root_navigation";
import { getCurrentUserId } from "../../hooks/user.hooks";

const User = ({ username, photo, uid }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => push("Profile", { uid, username })}
    >
      <View style={styles.userContainer}>
        <Image source={{ uri: photo }} style={styles.userImage} />
        <Text style={styles.usernameText}>{username}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function Users({ opponent, proponent, round }) {
  console.log(proponent);
  return (
    <View style={styles.container}>
      <User
        username={proponent.username}
        photo={proponent.imageSrc}
        uid={proponent.uid}
      />
      <View style={styles.textsContainer}>
        <Text
          style={{ fontSize: 24, fontWeight: "bold", color: Colors.darkPurple }}
        >
          VS
        </Text>
        <Text style={{ color: Colors.grey }}>{round} Rounds</Text>
      </View>
      {opponent?.username ? (
        <User
          username={opponent.username}
          photo={opponent.imageSrc}
          uid={opponent.uid}
        />
      ) : (
        <View style={styles.emptyUser}>
          <Text style={styles.waitingText}>Waiting for Opponent</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 24,
    paddingTop: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: "white",
  },
  userContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  usernameText: {
    marginTop: 4,
    color: Colors.grey,
  },
  textsContainer: {
    alignItems: "center",
    marginHorizontal: 16,
  },
  emptyUser: {
    justifyContent: "center",
    width: 100,
    height: 100,
  },
  waitingText: {
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.grey,
  },
});
