import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";

import { Colors } from "../consts/colors";

import Header from "../components/header";
import Notification from "../components/notification";

import globalHook from "../hooks/global.hook";

const ListHeader = ({ text }) => {
  return (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderText}>{text}</Text>
    </View>
  );
};

export default function Notifications() {
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const { useGlobalState, setNotifications } = globalHook();
  const { user, notifications } = useGlobalState();

  useEffect(() => {
    user &&
      setNotifications(
        user.notifications.slice(
          notifications.length,
          notifications.length + 10
        )
      );
  }, [user]);

  const fetchMore = () => {
    console.log("fething more");
    user.notifications.length !== notifications.length &&
      setNotifications(
        user.notifications.slice(
          notifications.length,
          notifications.length + 10
        )
      );
  };

  const onRefresh = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Notifications"
        titleAlignment="left"
        rightIcon={
          <View style={styles.markAllContainer}>
            <Text style={styles.markAllText}>Mark all as read</Text>
          </View>
        }
      />
      {notifications && isFocused && (
        <FlatList
          style={styles.list}
          showsVerticalScrollIndicator={false}
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Notification key={item.id} data={item} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
            />
          }
          onEndReachedThreshold={0.01}
          onEndReached={fetchMore}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  markAllContainer: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  markAllText: {
    width: 150,
    padding: 8,
    textAlign: "right",
    fontWeight: "bold",
    color: Colors.purple,
  },
  list: {
    flex: 1,
    height: "100%",
  },
  listHeader: {
    marginHorizontal: 16,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 16,
  },
  listHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 2,
  },
});
