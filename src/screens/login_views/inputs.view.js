import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

import * as yup from "yup";
import { Formik } from "formik";

import { Colors } from "../../consts/colors";

import GradientButton from "../../components/gradient_button";

export default function Inputs() {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => console.log(values)}
      validationSchema={yup.object().shape({
        email: yup.string("Type your email").email().required(),
        password: yup
          .string("No password provided.")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .required()
          .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
            `Password must contain at least :\n• minimum eight characters,\n• one upper case English letter,\n• one lower case English letter\n• one number`
          ),
      })}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        isValid,
        values,
        errors,
      }) => (
        <View style={styles.inputContainer}>
          <Text style={styles.labels}>E-mail</Text>
          <TextInput
            placeholder="Press here to type your Email"
            textContentType="emailAddress"
            style={
              touched.email && !isValid && errors.email
                ? [styles.input, styles.redBorder]
                : styles.input
            }
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />
          {touched.email && !isValid && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
          <Text style={styles.labels}>Password</Text>
          <TextInput
            placeholder="Press here to type your Password"
            textContentType="password"
            secureTextEntry
            style={
              touched.password && !isValid && errors.password
                ? [styles.input, styles.redBorder]
                : styles.input
            }
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
          />
          {touched.password && !isValid && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <GradientButton text="LOGIN" title="Submit" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 30,
    backgroundColor: Colors.lightGrey,
    padding: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  redBorder: {
    borderWidth: 1,
    borderColor: "#ff1744",
  },
  inputContainer: {
    width: "100%",
  },
  labels: {
    marginVertical: 4,
    color: Colors.grey,
  },
  errorText: {
    color: "red",
    marginVertical: 8,
  },
});
