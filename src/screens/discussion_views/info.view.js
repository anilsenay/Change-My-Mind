import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Collapsible from "react-native-collapsible";

import {
  formatDistanceToNowStrict,
  differenceInDays,
  format,
  isThisYear,
} from "date-fns";

import { Colors } from "../../consts/colors";
import Users from "./users.view";
import BackIcon from "../../components/icons/back";

const InfoText = ({ label, text }) => {
  return (
    <View style={styles.infoTextContainer}>
      <Text style={styles.infoTextLabel}>{label}</Text>
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
};

export default function Info({ data }) {
  const [hideInfo, setHideInfo] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <Users
        opponent={data.opponent}
        proponent={data.proponent}
        round={data.round_number}
      />
      <Collapsible collapsed={hideInfo}>
        <View style={styles.infoContainer}>
          <View style={styles.infoInnerContainer}>
            <InfoText
              label="Started"
              text={
                isThisYear(new Date(data.start_date))
                  ? differenceInDays(new Date(), new Date(data.start_date)) <= 7
                    ? format(new Date(data.start_date), "dd MMMM")
                    : formatDistanceToNowStrict(new Date(data.start_date), {
                        addSuffix: true,
                      })
                  : format(new Date(data.start_date), "dd.LL.yyyy")
              }
            />
            <InfoText label="Category" text={data.category} />
            <InfoText
              label="Voting Period"
              text={data.voting_period + " days" || "—"}
            />
          </View>
          <View style={styles.seperatorLine} />
          <View style={styles.infoInnerContainer}>
            <InfoText
              label="Last Update"
              text={formatDistanceToNowStrict(new Date(data.update_date), {
                addSuffix: true,
              })}
            />
            <InfoText
              label="Respond Limit"
              text={`${(data.respond_limit / 60) | 0} hours ${
                data.respond_limit % 60
              } minutes`}
            />
            <InfoText
              label="Expires In"
              text={
                formatDistanceToNowStrict(new Date(data.finish_date), {
                  addSuffix: true,
                }) || "—"
              }
            />
          </View>
        </View>
      </Collapsible>
      <TouchableOpacity
        style={styles.hideButton}
        onPress={() => setHideInfo(!hideInfo)}
      >
        <BackIcon
          width={24}
          height={24}
          fill="white"
          style={{ transform: [{ rotate: hideInfo ? "270deg" : "90deg" }] }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.purple + "AA",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 8,
  },
  infoContainer: {
    paddingHorizontal: 12,
    flexDirection: "row",
    marginVertical: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  infoInnerContainer: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    backgroundColor: "white",
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  infoText: {
    color: "white",
    marginTop: 4,
  },
  infoTextLabel: {
    color: "white",
    fontWeight: "bold",
    justifyContent: "center",
    fontSize: 18,
    borderBottomColor: "white",
    borderBottomWidth: 2,
  },
  infoTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 6,
    marginHorizontal: 6,
    borderRadius: 10,
  },
  hideButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  seperatorLine: {
    width: 1,
    height: "92%",
    backgroundColor: "white",
  },
});
