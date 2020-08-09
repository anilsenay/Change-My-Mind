import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth } from "firebase";

import { Colors } from "../../consts/colors";

import EmailIcon from "../../components/icons/email";
import GradientButton from "../../components/gradient_button";
import BackIcon from "../../components/icons/back";
import { ScrollView } from "react-native-gesture-handler";

export default function ForgotPassView({ goBack }) {
  const [email, setEmail] = useState();

  const resetEvent = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(function () {
        console.log("sent");
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.goBackView} onPress={goBack}>
        <BackIcon fill="black" width={24} height={24} />
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>
      <View style={styles.imageHere} />
      <Text style={styles.title}>Forgot your password?</Text>
      <Text style={styles.description}>
        Enter your registered email below to receive password reset instruction
      </Text>
      <View style={styles.inputAreaContainer}>
        {!email && (
          <EmailIcon
            width={24}
            height={24}
            fill={Colors.grey + "88"}
            style={styles.icon}
          />
        )}
        <TextInput
          placeholder="Press here to type your Email"
          textContentType="emailAddress"
          style={
            email?.length > 0
              ? styles.input
              : [styles.input, { paddingLeft: 50 }]
          }
          onChangeText={(e) => setEmail(e)}
          value={email}
        />
      </View>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <GradientButton
          style={{ marginTop: 20 }}
          text="Send"
          title="Submit"
          onPress={resetEvent}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 24,
    paddingTop: 50,
  },
  title: {
    fontSize: 18,
    color: Colors.grey,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    color: Colors.grey,
    textAlign: "center",
    marginBottom: 26,
  },
  inputAreaContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: Colors.lightGrey,
    marginBottom: 10,
  },
  input: {
    padding: 10,
    paddingHorizontal: 20,
    paddingLeft: 20,
    width: "100%",
  },
  icon: {
    position: "absolute",
    zIndex: 2,
    marginLeft: 16,
  },
  imageHere: {
    width: 150,
    height: 150,
    backgroundColor: Colors.purple,
    borderRadius: 100,
    marginBottom: 30,
  },
  goBackView: {
    flexDirection: "row",
    position: "absolute",
    top: 8,
    left: 8,
    alignItems: "center",
    padding: 16,
  },
  goBackText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
