import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../consts/colors";
import ProfileButton from "../../components/profile_button";
import UserInfo from "./userinfo.view";

import { navigate } from "../../navigation/root_navigation";

import { getCurrentUserId } from "../../hooks/user.hooks";
import globalHook from "../../hooks/global.hook";

export default function TopView({ userData }) {
  const { useGlobalState } = globalHook();
  const { user } = useGlobalState();

  const isFollowing = user?.following.includes(userData.uid);
  return (
    <View>
      <UserInfo userData={userData} />

      <View style={styles.footer}>
        <View style={styles.buttonsContainer}>
          {userData.uid === getCurrentUserId() ? (
            <ProfileButton
              text="Edit Profile"
              onPress={() => navigate("Edit Profile")}
            />
          ) : (
            <>
              {!isFollowing ? (
                <ProfileButton text="Follow" style={{ marginRight: 16 }} />
              ) : (
                <ProfileButton
                  text="Unfollow"
                  style={{
                    marginRight: 16,
                    backgroundColor: Colors.purple + "AA",
                    borderColor: Colors.darkPurple,
                  }}
                  textStyle={{ color: "white" }}
                />
              )}
              <ProfileButton text="Message" />
            </>
          )}
        </View>
        <View style={styles.rankContainer}>
          <Text style={styles.rankText}>Rank: Beginner</Text>
          <Text style={styles.pointsText}>Points: {userData.stats.points}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: Colors.purple + "AA",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  buttonsContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 16,
    paddingTop: 0,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  rankContainer: {
    padding: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rankText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  pointsText: {
    fontWeight: "bold",
    color: "white",
  },
});
