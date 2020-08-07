import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Colors } from "../consts/colors";

import Inputs from "./login_views/inputs.view";
import Footer from "./login_views/footer.view";

export default function Register() {
  return (
    <>
      <ScrollView style={{ paddingTop: 40, backgroundColor: "white" }}>
        <View style={styles.container}>
          <Inputs type="register" />
        </View>
        <Footer text="or create account with" />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingBottom: 50,
  },
  forgotButton: {
    padding: 10,
    marginTop: 10,
  },
  forgotPass: {
    color: Colors.grey + "AA",
    fontSize: 16,
  },
});
