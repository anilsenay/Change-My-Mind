import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as firebase from "firebase";

import SearchIcon from "../../components/icons/search";
import CloseIcon from "../../components/icons/close";
import { Colors } from "../../consts/colors";
import BackIcon from "../../components/icons/back";

import FeedItem from "../../components/feed_item";

export default function SearchModal({ visible, setVisible }) {
  const [focus, setFocus] = useState(false);
  const [debates, setDebates] = useState([]);
  const inputRef = useRef(null);

  const searchEvent = (keyword) => {
    keyword.length > 0
      ? firebase
          .firestore()
          .collection("Debate")
          .where("title", ">=", keyword)
          .where("title", "<=", keyword + "\uf8ff")
          .get()
          .then((query) => {
            const data = query.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
                start_date: doc.data().start_date.toDate(),
                update_date: doc.data().update_date.toDate(),
                finish_date: doc.data().finish_date?.toDate(),
              };
            });
            setDebates(data);
          })
      : setDebates([]);
  };

  return (
    <Modal
      visible={visible}
      animated
      animationType={"slide"}
      statusBarTranslucent={true}
    >
      <SafeAreaView container={styles.container}>
        <View style={styles.header}>
          {focus ? (
            <TouchableOpacity
              onPress={() => {
                setFocus(false);
                inputRef.current.blur();
              }}
              style={{ marginRight: 8 }}
            >
              <BackIcon width={24} height={24} fill="black" />
            </TouchableOpacity>
          ) : (
            <SearchIcon width={24} height={24} fill="black" />
          )}
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            onFocus={() => setFocus(true)}
            onChangeText={(e) => searchEvent(e)}
            ref={inputRef}
          />
          {!focus && (
            <TouchableOpacity onPress={() => setVisible(false)}>
              <CloseIcon width={20} height={20} fill="black" />
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={debates}
          style={styles.itemsContainer}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FeedItem itemData={item} onPress={() => setVisible(false)} />
          )}
          ListFooterComponent={<View style={{ marginBottom: 16 }} />}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginTop: 8,
  },
  searchInput: {
    marginRight: "auto",
    fontSize: 18,
    marginLeft: 8,
  },
  itemsContainer: {
    paddingVertical: 16,
  },
});
