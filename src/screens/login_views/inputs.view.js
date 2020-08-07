import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import * as firebase from "firebase";
import { Notifier, Easing } from "react-native-notifier";

import * as yup from "yup";
import { Formik } from "formik";

import { Colors } from "../../consts/colors";

import GradientButton from "../../components/gradient_button";
import PasswordIcon from "../../components/icons/password";
import EmailIcon from "../../components/icons/email";
import ErrorMessage from "../../components/error_message";
import CheckboxView from "../register_views/checkbox.view";

export default function Inputs({ type }) {
  const showErrorMessage = (errorMessage) => {
    Notifier.showNotification({
      title: (type === "login" ? "Login" : "Register") + " Failed",
      description: errorMessage,
      duration: 3000,
      showAnimationDuration: 800,
      showEasing: Easing.bounce,
      Component: ErrorMessage,
      componentProps: {
        alertType: "error",
      },
      hideOnPress: true,
    });
  };

  async function signInWithEmail(email, password) {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() =>
        console.log("login with mail as " + firebase.auth().currentUser)
      )
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          showErrorMessage("Weak Password!");
        } else {
          showErrorMessage(errorMessage);
        }
      });
  }
  async function createUserWithEmail(email, password) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => console.log("user created as " + firebase.auth().currentUser))
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          showErrorMessage("Weak Password!");
        } else {
          showErrorMessage(errorMessage);
        }
      });
  }

  const submitEvent = (email, password) => {
    type === "login"
      ? signInWithEmail(email, password)
      : createUserWithEmail(email, password);
  };
  return (
    <Formik
      initialValues={{ email: "", password: "", checkbox: false }}
      onSubmit={(values) => submitEvent(values.email, values.password)}
      validationSchema={yup.object().shape({
        email: yup
          .string("Type your email")
          .email()
          .required("* Email is a required field"),
        password: yup
          .string("No password provided.")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .required("* Password is a required field")
          .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
            `Password must contain at least :\n• minimum eight characters,\n• one upper case English letter,\n• one lower case English letter\n• one number`
          ),
        checkbox: yup.boolean().oneOf([true], "* Must Accept Privacy Policy"),
      })}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        touched,
        isValid,
        values,
        errors,
      }) => (
        <View style={styles.container}>
          <Text style={styles.labels}>E-mail</Text>
          <View
            style={
              touched.email && !isValid && errors.email
                ? [styles.inputAreaContainer, styles.redBorder]
                : styles.inputAreaContainer
            }
          >
            {!values.email && (
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
                values.email
                  ? styles.input
                  : [styles.input, { paddingLeft: 50 }]
              }
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
          </View>
          {touched.email && !isValid && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
          <Text style={styles.labels}>Password</Text>
          <View
            style={
              touched.password && !isValid && errors.password
                ? [styles.inputAreaContainer, styles.redBorder]
                : styles.inputAreaContainer
            }
          >
            {!values.password && (
              <PasswordIcon
                width={24}
                height={24}
                fill={Colors.grey + "88"}
                style={styles.icon}
              />
            )}
            <TextInput
              placeholder="Press here to type your Password"
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
              style={
                values.password
                  ? styles.input
                  : [styles.input, { paddingLeft: 50 }]
              }
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
          </View>
          {touched.password && !isValid && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          {type === "register" && (
            <CheckboxView
              error={
                touched.checkbox && !isValid && errors.checkbox
                  ? errors.checkbox
                  : null
              }
              value={values.checkbox}
              onValueChange={() => {
                setFieldValue("checkbox", !values.checkbox);
              }}
            />
          )}
          <GradientButton
            style={{ marginTop: 40 }}
            text={type === "login" ? "LOGIN" : "REGISTER"}
            title="Submit"
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
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
  redBorder: {
    borderWidth: 1,
    borderColor: "#ff1744",
  },
  container: {
    width: "100%",
  },
  labels: {
    marginVertical: 4,
    color: Colors.grey,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
});
