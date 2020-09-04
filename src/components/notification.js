import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { format } from "date-fns";

import { navigate } from "../navigation/root_navigation";
import { Colors } from "../consts/colors";

import { getUser } from "../hooks/user.hooks";
import { getDebate } from "../hooks/debate.hooks";

export default function Notification({ data }) {
  const { title, message, date, user, debate, isRead } = data;

  const userData = user ? getUser(user).data : null;
  const imageSrc = userData?.imageSrc;

  const onPressEvent = () => {
    debate
      ? navigate("Discussion", {
          data: {
            id: debate,
            proponent: null,
            opponent: null,
          },
        })
      : navigate("Profile", { uid: user, username: userData?.username });
  };
  return (
    <TouchableWithoutFeedback onPress={onPressEvent}>
      <View style={styles.container}>
        {!isRead && <View style={styles.blueDot} />}
        {imageSrc && (
          <Image
            source={{ uri: imageSrc }}
            resizeMode="cover"
            style={styles.image}
          />
        )}
        <View style={styles.texts}>
          <Text style={styles.title}>
            {(userData?.username && userData?.username + " " + title) ||
              "Title"}
          </Text>
          {message?.length > 0 && <Text style={styles.message}>{message}</Text>}
        </View>
        <Text style={styles.date}>
          {format(new Date(date), "dd-MM-yyyy - HH:mm")}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
    minHeight: 52,
  },
  texts: {
    flex: 1,
    marginLeft: 8,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
  },
  date: {
    alignSelf: "flex-end",
    fontSize: 11,
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 36,
  },
  blueDot: {
    position: "absolute",
    top: 8,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: Colors.purple,
  },
});
