import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { pop } from "../navigation/root_navigation";

import Header from "../components/header";
import BackIcon from "../components/icons/back";
import { Colors } from "../consts/colors";

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Settings"
        leftIcon={<BackIcon width={24} height={24} fill="black" />}
        leftIconEvent={() => pop()}
        textStyle={{ fontSize: 22 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  itemContaniner: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    flex: 3,
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    paddingLeft: 12,
    marginLeft: 4,
    height: 45,
  },
  inputSmall: {
    paddingLeft: 12,
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    height: 45,
    width: 65,
  },
  inputArea: {
    width: "100%",
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    height: 200,
    textAlignVertical: "top",
  },
  inputBlur: {
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: Colors.purple + "AA",
    borderRadius: 10,
  },
  labels: {
    flex: 1,
    marginVertical: 4,
    color: Colors.grey,
    alignItems: "center",
  },
  argumentContainer: {
    borderTopColor: Colors.lightGrey,
    borderTopWidth: 1,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    height: 45,
    flex: 3,
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    justifyContent: "center",
  },
  pickerContainerSmall: {
    height: 45,
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    justifyContent: "center",
    width: 65,
  },
  argumentTitleText: {
    color: Colors.grey,
    fontSize: 16,
    marginVertical: 8,
  },
});
