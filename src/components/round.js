import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { format } from "date-fns";

import { Colors } from "../consts/colors";
import VoteIcon from "./icons/vote";

import { getCurrentUserId } from "../hooks/user.hooks";

const LikeButton = ({ reverse, isActive, type, count }) => {
  return (
    <View
      style={{
        alignItems: "center",
        marginRight: 16,
      }}
    >
      <TouchableOpacity style={styles.voteIcon}>
        <VoteIcon
          width={24}
          height={24}
          fill="black"
          style={reverse && { transform: [{ rotate: "180deg" }] }}
          secondaryColor={
            isActive
              ? type === "like"
                ? Colors.green
                : Colors.orange
              : Colors.lightGrey
          }
        />
      </TouchableOpacity>
      <Text style={styles.likeCounter}>{count}</Text>
    </View>
  );
};

const Argument = ({ photo, type, like_dislike_data, argument, date }) => {
  const isLiked = like_dislike_data.likes.includes(getCurrentUserId());
  const isDisliked = like_dislike_data.dislikes.includes(getCurrentUserId());
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <View style={styles.argContainer}>
        {type === "proponent" && (
          <View style={styles.photoContainer}>
            <Image source={{ uri: photo }} style={styles.userImage} />
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.argumentText}>{argument}</Text>
          <View style={styles.argumentFooter}>
            <LikeButton
              isActive={isLiked}
              type="like"
              count={like_dislike_data.likes.length}
            />
            <LikeButton
              isActive={isDisliked}
              type="dislike"
              count={like_dislike_data.dislikes.length}
              reverse
            />

            <Text style={styles.footerDate}>
              {format(new Date(date), "dd-MM-yyyy - HH:mm")}
            </Text>
          </View>
        </View>
        {type === "opponent" && (
          <View style={styles.photoContainerReverse}>
            <Image source={{ uri: photo }} style={styles.userImage} />
          </View>
        )}
      </View>
    </View>
  );
};

export default function Round({ roundNumber, opponent, proponent, data }) {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginBottom: 8 }}>
        <Text style={styles.title}>Round {roundNumber}</Text>
      </View>
      <Argument
        photo={proponent.imageSrc}
        type="proponent"
        argument={data?.proponent_msg}
        date={data.proponent_date}
        like_dislike_data={{
          likes: data.proponent_like,
          dislikes: data.proponent_dislike,
        }}
        isLiked={data?.proponent_like.includes(getCurrentUserId())}
        isDisliked={data?.proponent_dislike.includes(getCurrentUserId())}
      />
      <View style={styles.vsContainer}>
        <View style={styles.vsSeperator} />
        <Text style={styles.vsText}>VS</Text>
      </View>
      {opponent ? (
        <Argument
          photo={opponent.imageSrc}
          type="opponent"
          date={data.opponent_date}
          argument={data?.opponent_msg}
          like_dislike_data={{
            likes: data.opponent_like,
            dislikes: data.opponent_dislike,
          }}
          isLiked={data?.opponent_like.includes(getCurrentUserId())}
          isDisliked={data?.opponent_dislike.includes(getCurrentUserId())}
        />
      ) : (
        <Text style={styles.waitingText}>Waiting for opponent's argument</Text>
      )}
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
    paddingTop: 20,
    flexDirection: "row",
    marginRight: "auto",
    alignItems: "flex-end",
    width: "100%",
  },
  voteIcon: {
    padding: 8,
    backgroundColor: Colors.purple + "55",
    borderRadius: 100,
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
  waitingText: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 40,
    textAlign: "center",
    color: Colors.grey,
  },
  likeCounter: {
    fontSize: 12,
    color: Colors.grey,
  },
});
