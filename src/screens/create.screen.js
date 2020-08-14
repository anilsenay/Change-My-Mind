import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Picker } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { pop } from "../navigation/root_navigation";

import { Formik } from "formik";
import * as yup from "yup";

import Header from "../components/header";
import BackIcon from "../components/icons/back";
import { Colors } from "../consts/colors";
import GradientButton from "../components/gradient_button";
import CustomModal from "../components/modal";

import { categories } from "../consts/filter_categories";
import ErrorModal from "./create_views/error_modal.view";

export default function Create() {
  const [blur, setBlur] = useState();
  const [modalVisable, setModalVisible] = useState(false);

  const submitEvent = (values) => {
    console.log(values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Create Discussion"
        leftIcon={<BackIcon width={24} height={24} fill="black" />}
        leftIconEvent={() => pop()}
      />
      <Formik
        initialValues={{
          topic: "",
          category: categories[0].name,
          rounds: "3",
          respond_hour: "",
          respond_minute: "",
          voting_period: "",
          argument: "",
        }}
        validationSchema={yup.object().shape({
          topic: yup
            .string("* Please set a topic title for your discussion")
            .min(3, "* Topic text must be minimum 3 character")
            .required("* Topic is a required field"),
          respond_hour: yup
            .number("")
            .min(1, "* Respond hour limit must be minimum 1 hour")
            .required("* Respond Hour Limit is a required field"),
          respond_minute: yup
            .number("")
            .max(59, "* Respond minute limit can be maximum 59 minutes.")
            .required("* Respond Minute Limit is a required field"),
          voting_period: yup
            .number("")
            .max(30, "* People should vote within 30 days maximum.")
            .required("* Voting Period is a required field"),
          argument: yup
            .string("* Please write your argument to start a discussion")
            .min(10, "* Your argument is too short")
            .max(
              5000,
              "* Your argument can be maximum 5000 character for each round"
            )
            .required("* Argument is a required field"),
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
          <ScrollView style={styles.formContainer}>
            <View style={styles.itemContaniner}>
              <Text style={styles.labels}>Topic</Text>
              <TextInput
                style={
                  blur === "topic"
                    ? [styles.input, styles.inputBlur]
                    : styles.input
                }
                onChangeText={handleChange("topic")}
                onBlur={handleBlur("topic")}
                onFocus={() => setBlur("topic")}
                value={values.topic}
              />
            </View>
            <View style={styles.itemContaniner}>
              <Text style={styles.labels}>Category</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={values.category}
                  style={styles.pickerStyle}
                  onValueChange={(e) => setFieldValue("category", e)}
                >
                  {categories.map((item) => {
                    return (
                      <Picker.Item
                        key={item.name}
                        label={item.name}
                        value={item.name}
                        color={Colors.grey}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <View style={styles.itemContaniner}>
              <Text style={styles.labels}>Rounds</Text>
              <View style={{ flex: 3 }}>
                <View style={styles.pickerContainerSmall}>
                  <Picker
                    selectedValue={values.rounds}
                    style={styles.pickerStyle}
                    onValueChange={(e) => setFieldValue("rounds", e)}
                  >
                    {["3", "4", "5", "6", "7", "8", "9", "10"].map((item) => {
                      return (
                        <Picker.Item
                          key={item}
                          label={item}
                          value={item}
                          color={Colors.grey}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            </View>
            <View style={styles.itemContaniner}>
              <Text style={styles.labels}>Respond Limit</Text>
              <View
                style={{ flex: 3, flexDirection: "row", alignItems: "center" }}
              >
                <TextInput
                  keyboardType="number-pad"
                  style={
                    blur === "hour"
                      ? [styles.inputSmall, styles.inputBlur]
                      : styles.inputSmall
                  }
                  onChangeText={handleChange("respond_hour")}
                  onBlur={handleBlur("respond_hour")}
                  onFocus={() => setBlur("hour")}
                  value={values.respond_hour}
                />
                <Text style={[styles.labels, { marginLeft: 6 }]}>Hours</Text>
                <TextInput
                  keyboardType="number-pad"
                  style={
                    blur === "minute"
                      ? [styles.inputSmall, styles.inputBlur]
                      : styles.inputSmall
                  }
                  onChangeText={handleChange("respond_minute")}
                  onBlur={handleBlur("respond_minute")}
                  onFocus={() => setBlur("minute")}
                  value={values.respond_minute}
                />
                <Text style={[styles.labels, { marginLeft: 6 }]}>Minutes</Text>
              </View>
            </View>
            <View style={styles.itemContaniner}>
              <Text style={styles.labels}>Voting Period</Text>
              <View
                style={{ flex: 3, flexDirection: "row", alignItems: "center" }}
              >
                <TextInput
                  keyboardType="number-pad"
                  style={
                    blur === "voting"
                      ? [styles.inputSmall, styles.inputBlur]
                      : styles.inputSmall
                  }
                  onChangeText={handleChange("voting_period")}
                  onBlur={handleBlur("voting_period")}
                  onFocus={() => setBlur("voting")}
                  value={values.voting_period}
                />
                <Text style={[styles.labels, { marginLeft: 6 }]}>
                  Days (Max. 30 Days)
                </Text>
              </View>
            </View>
            <View style={styles.argumentContainer}>
              <Text style={styles.argumentTitleText}>Your Argument</Text>
              <TextInput
                style={
                  blur === "argument"
                    ? [styles.inputArea, styles.inputBlur]
                    : styles.inputArea
                }
                multiline
                onChangeText={handleChange("argument")}
                onBlur={handleBlur("argument")}
                onFocus={() => setBlur("argument")}
                value={values.argument}
              />
            </View>
            <GradientButton
              style={{ marginTop: 40, marginBottom: 60 }}
              text="Start Discussion"
              title="Submit"
              onPress={() =>
                touched.topic && isValid
                  ? submitEvent(values)
                  : setModalVisible(true)
              }
            />
            <CustomModal
              visible={modalVisable}
              setModalVisible={setModalVisible}
            >
              <ErrorModal errors={errors} />
            </CustomModal>
          </ScrollView>
        )}
      </Formik>
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
