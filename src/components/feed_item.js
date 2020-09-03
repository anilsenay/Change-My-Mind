import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { navigate } from "../navigation/root_navigation";

import {
  formatDistanceToNowStrict,
  differenceInDays,
  format,
  isThisYear,
} from "date-fns";

import { Colors } from "../consts/colors";
import { categoriesWithEmoji } from "../consts/filter_categories";

import VsView from "./vs_view";
import CustomModal from "./modal";
import DebateModal from "./debate_modal";

import { getUser } from "../hooks/user.hooks";

const CategoryHeader = ({ categoryName, setVisible }) => {
  return (
    <View style={styles.categoryView}>
      <Text style={styles.categoryText}>
        {categoriesWithEmoji[categoryName]} {" " + categoryName}
      </Text>
      <TouchableOpacity
        style={styles.dotButton}
        onPress={() => setVisible(true)}
      >
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </TouchableOpacity>
    </View>
  );
};

const Footer = ({ startTime, updateTime }) => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        Started:{" "}
        {isThisYear(new Date(startTime))
          ? differenceInDays(new Date(), new Date(startTime)) <= 7
            ? format(new Date(startTime), "dd MMMM")
            : formatDistanceToNowStrict(new Date(startTime), {
                addSuffix: true,
              })
          : format(new Date(startTime), "dd.LL.yyyy")}
      </Text>
      <Text style={[styles.footerText, { marginLeft: "auto" }]}>
        Updated:{" "}
        {formatDistanceToNowStrict(new Date(updateTime), { addSuffix: true })}
      </Text>
    </View>
  );
};

export default function FeedItem({ itemData, onPress }) {
  const {
    title,
    category,
    proponent,
    opponent,
    start_date,
    update_date,
    finish_date,
    status,
    headerSrc,
  } = itemData;

  const [visible, setVisible] = useState(false);

  const proponentData = getUser(proponent).data;
  const opponentData = getUser(opponent).data;

  return (
    <View style={styles.container}>
      <CustomModal visible={visible} setModalVisible={setVisible}>
        <DebateModal
          cancelEvent={() => setVisible(false)}
          data={{
            id: itemData.id,
            proponent: proponentData,
            opponent: opponentData,
          }}
        />
      </CustomModal>
      <TouchableWithoutFeedback
        onPress={() => {
          navigate("Discussion", {
            data: {
              id: itemData.id,
              proponent: proponentData,
              opponent: opponentData,
            },
          });
          onPress && onPress();
        }}
      >
        <View style={styles.itemContainer}>
          {headerSrc && (
            <Image
              source={{ uri: headerSrc }}
              resizeMode="cover"
              style={styles.headerImage}
            />
          )}
          <View style={styles.itemArea}>
            <CategoryHeader categoryName={category} setVisible={setVisible} />
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
            <VsView proponent={proponentData} opponent={opponentData} />
            <Footer startTime={start_date} updateTime={update_date} />
            <View style={styles.footerButton}>
              <Text style={styles.footerBtnText}>
                {status === "open"
                  ? opponent
                    ? "Vote"
                    : "CHANGE HIS/HER MIND!"
                  : "THIS DEBATE HAS BEEN OVER"}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingVertical: 16,
  },
  itemContainer: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.lightGrey,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  itemArea: {
    paddingHorizontal: 16,
  },
  categoryView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  categoryText: {
    color: "grey",
    textTransform: "uppercase",
  },
  dotButton: {
    marginLeft: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginRight: -8,
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: Colors.grey + "55",
    borderRadius: 5,
    marginRight: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 8,
  },
  userViewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  userContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  userImage: {
    width: 36,
    height: 36,
    borderRadius: 50,
    marginBottom: 4,
  },
  usernameText: {
    fontWeight: "bold",
    fontSize: 13,
  },
  pointText: {
    color: "grey",
    fontSize: 12,
  },
  vsText: {
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.grey + "66",
  },
  footer: {
    flexDirection: "row",
  },
  footerText: {
    fontSize: 12,
    color: "grey",
  },
  footerButton: {
    borderTopColor: Colors.lightGrey,
    borderTopWidth: 1,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 8,
  },
  footerBtnText: {
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  headerImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});
