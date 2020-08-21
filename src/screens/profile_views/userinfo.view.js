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

export default function UserInfo({ userData }) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Image source={{ uri: userData.imageSrc }} style={styles.userImage} />
          <View style={styles.infoVertical}>
            <InfoItem data={userData.debates.length} text="Debates" />
            <InfoItem data={userData.stats.won} text="Won" />
          </View>
          <View style={styles.infoVertical}>
            <InfoItem data={userData.followers.length} text="Followers" />
            <InfoItem data={userData.stats.lost} text="Lost" />
          </View>
          <View style={styles.infoVertical}>
            <InfoItem data={userData.following.length} text="Following" />
            <InfoItem data={userData.stats.ongoing} text="Ongoing" />
          </View>
        </View>
        <Text style={styles.usernameText}>{userData.profile_name}</Text>
        <Text style={styles.biographyText}>{userData.biography}</Text>
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
