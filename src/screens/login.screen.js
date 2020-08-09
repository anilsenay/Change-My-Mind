import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

import Register from "./register.screen";
import { Colors } from "../consts/colors";

import Inputs from "./login_views/inputs.view";
import Footer from "./login_views/footer.view";
import Modal from "../components/modal";
import ForgotPassView from "./login_views/forgot_pass.view";

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
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <ScrollView style={{ paddingTop: 40, backgroundColor: "white" }}>
        <View style={styles.container}>
          <Inputs type="login" />
          <Modal visible={modalVisible} setModalVisible={setModalVisible}>
            <ForgotPassView goBack={() => setModalVisible(false)} />
          </Modal>
          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.forgotPass}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <Footer text="or login with" />
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
