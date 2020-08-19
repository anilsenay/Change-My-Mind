import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Colors } from "../../consts/colors";
import ProfileButton from "../../components/profile_button";

const InfoItem = ({ data, text }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.dataText}>{data || "0"}</Text>
      <Text style={styles.dataLabelText}>{text}</Text>
    </View>
  );
};

export default function UserInfo() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Image
            source={{ uri: "https://picsum.photos/200" }}
            style={styles.userImage}
          />
          <View style={styles.infoVertical}>
            <InfoItem data={null} text="Debates" />
            <InfoItem data={null} text="Won" />
          </View>
          <View style={styles.infoVertical}>
            <InfoItem data={null} text="Followers" />
            <InfoItem data={null} text="Lost" />
          </View>
          <View style={styles.infoVertical}>
            <InfoItem data={null} text="Following" />
            <InfoItem data={null} text="Ongoing" />
          </View>
        </View>
        <Text style={styles.usernameText}>Name Surname</Text>
        <Text style={styles.biographyText}>Biography</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 16,
  },
  infoContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: "auto",
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  dataText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  dataLabelText: {
    fontSize: 14,
    color: Colors.grey,
  },
  usernameText: {
    fontWeight: "bold",
    letterSpacing: 0.6,
    paddingTop: 4,
  },
  biographyText: {
    color: Colors.grey,
  },
});
