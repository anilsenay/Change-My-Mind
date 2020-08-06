import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Register from "./register.screen";
import { Colors } from "../consts/colors";
import {
  FACEBOOK_ID,
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
} from "../consts/firebase.config";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientButton from "../components/gradient_button";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import * as firebase from "firebase";

const Tab = createMaterialTopTabNavigator();

export default function LoginNavigator() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: Colors.darkPurple,
          indicatorStyle: {
            backgroundColor: Colors.purple,
          },
          style: {
            borderBottomWidth: 1,
            borderBottomColor: Colors.purple + "99",
          },
        }}
      >
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Register" component={Register} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

function Login() {
  console.log(
    firebase.auth().currentUser
      ? "Login yapılı as " + JSON.stringify(firebase.auth().currentUser)
      : "Login değil"
  );

  async function loginWithFacebook() {
    await Facebook.initializeAsync(FACEBOOK_ID);

    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile"],
    });

    if (type === "success") {
      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      // Sign in with credential from the Facebook user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((user) => console.log("logged as " + JSON.stringify(user)))
        .catch((error) => {
          // Handle Errors here.
        });
    }
  }

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken
        );
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((user) => console.log("logged as " + user))
          .catch((error) => {
            // Handle Errors here.
          });
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <GradientButton text="LOGIN Fb" onPress={loginWithFacebook} />
      <GradientButton text="LOGIN Google" onPress={signInWithGoogleAsync} />
      <GradientButton text="LOGOUT" onPress={() => firebase.auth().signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
});
