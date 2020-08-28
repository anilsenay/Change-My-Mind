import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import {
  formatDistanceToNowStrict,
  differenceInDays,
  format,
  isThisYear,
} from "date-fns";

import { Colors } from "../consts/colors";

import VsView from "./vs_view";
import { getUser } from "../hooks/user.hooks";
import { navigate } from "../navigation/root_navigation";

export default function Debate({ itemData }) {
  const proponentData = getUser(itemData.proponent).data;
  const opponentData = getUser(itemData.opponent).data;

  const borderColor =
    itemData.status === "Opponent won"
      ? Colors.red
      : itemData.status === "Proponent won"
      ? Colors.green
      : Colors.grey;
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigate("Discussion", {
          data: {
            id: itemData.id,
            proponent: proponentData,
            opponent: opponentData,
          },
        })
      }
    >
      <View style={[styles.container, { borderLeftColor: borderColor }]}>
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={3}>
              {itemData.title}
            </Text>
          </View>
          <VsView proponent={itemData.proponent} opponent={itemData.opponent} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Started:{" "}
            {isThisYear(new Date(itemData.start_date))
              ? differenceInDays(new Date(), new Date(itemData.start_date)) <= 7
                ? format(new Date(itemData.start_date), "dd MMMM")
                : formatDistanceToNowStrict(new Date(itemData.start_date), {
                    addSuffix: true,
                  })
              : format(new Date(itemData.start_date), "dd.LL.yyyy")}
          </Text>
          <Text style={styles.footerText}>
            Updated:{" "}
            {formatDistanceToNowStrict(new Date(itemData.update_date), {
              addSuffix: true,
            })}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
    padding: 12,
    borderLeftColor: Colors.grey,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    marginLeft: 1,
  },
  infoContainer: {
    flexDirection: "column",
    marginRight: 8,
  },
  footer: {
    marginTop: -8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleContainer: {
    flex: 1,
    flexGrow: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 4,
    marginBottom: 12,
    textAlign: "center",
  },
  footerText: {
    color: Colors.grey,
    fontSize: 12,
  },
});
