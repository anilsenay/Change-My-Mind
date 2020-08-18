import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Colors } from "../consts/colors";
import VoteIcon from "./icons/vote";

const argumentTextEx = `Parents should not send their children to preschool for several
reasons. First and foremost, the year is better spent with a full-time
parent. In addition, most children will learn very little at
preschool. Contrary to claims made by preschool advocates, children
are not better equipped because of preschool. They may develop social
skills and hand paintin4g skills sooner, however children that miss
preschool will quickly catch up before they finish the first grade.`;

const Argument = ({ photo, type }) => {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <View style={styles.argContainer}>
        {type === "opponent" && (
          <View style={styles.photoContainer}>
            <Image source={{ uri: photo }} style={styles.userImage} />
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.argumentText}>{argumentTextEx}</Text>
          <View style={styles.argumentFooter}>
            <TouchableOpacity style={styles.voteIcon}>
              <VoteIcon
                width={24}
                height={24}
                fill={Colors.grey}
                secondaryColor={Colors.lightGrey}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.voteIcon, { transform: [{ rotate: "180deg" }] }]}
            >
              <VoteIcon
                width={24}
                height={24}
                fill={Colors.grey}
                secondaryColor={Colors.lightGrey}
              />
            </TouchableOpacity>
            <Text style={styles.footerDate}>18.08.2020 - 23:53</Text>
          </View>
        </View>
        {type === "proponent" && (
          <View style={styles.photoContainerReverse}>
            <Image source={{ uri: photo }} style={styles.userImage} />
          </View>
        )}
      </View>
    </View>
  );
};

export default function Round({ roundNumber, opponent, proponent }) {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginBottom: 8 }}>
        <Text style={styles.title}>Round {roundNumber}</Text>
      </View>
      <Argument photo={opponent.imageSrc} type="opponent" />
      <View style={styles.vsContainer}>
        <View style={styles.vsSeperator} />
        <Text style={styles.vsText}>VS</Text>
      </View>
      <Argument photo={proponent.imageSrc} type="proponent" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: Colors.lightGrey,
    borderTopWidth: 2,
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    backgroundColor: "white",
    position: "absolute",
    top: -16,
    paddingHorizontal: 8,
  },
  argContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: Colors.lightGrey,
  },
  photoContainer: {
    backgroundColor: "white",
    paddingRight: 8,
    borderTopRightRadius: 13,
  },
  photoContainerReverse: {
    backgroundColor: "white",
    paddingLeft: 8,
    borderTopLeftRadius: 13,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  textContainer: {
    padding: 16,
    flex: 1,
    flexWrap: "wrap",
  },
  argumentText: {
    color: Colors.grey,
    lineHeight: 22,
    marginRight: "auto",
  },
  argumentFooter: {
    paddingTop: 16,
    flexDirection: "row",
    marginRight: "auto",
    alignItems: "center",
    width: "100%",
  },
  voteIcon: {
    padding: 8,
    backgroundColor: Colors.purple + "55",
    borderRadius: 100,
    marginRight: 16,
  },
  footerDate: {
    marginLeft: "auto",
    fontSize: 12,
    color: Colors.grey,
  },
  vsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  vsSeperator: {
    width: "100%",
    height: 2,
    backgroundColor: Colors.lightGrey,
    position: "absolute",
  },
  vsText: {
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "white",
    paddingHorizontal: 8,
    color: Colors.grey,
  },
});
