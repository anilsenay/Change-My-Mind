import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchIcon from "../../components/icons/search";
import CloseIcon from "../../components/icons/close";
import { Colors } from "../../consts/colors";
import BackIcon from "../../components/icons/back";

export default function SearchModal({ visible, setVisible }) {
  const [focus, setFocus] = useState(false);
  const [blur, setBlur] = useState(false);
  const inputRef = useRef(null);

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
            onBlur={() => setBlur(true)}
            ref={inputRef}
          />
          {!focus && (
            <TouchableOpacity onPress={() => setVisible(false)}>
              <CloseIcon width={20} height={20} fill="black" />
            </TouchableOpacity>
          )}
        </View>
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
});
