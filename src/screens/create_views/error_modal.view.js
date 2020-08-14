import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../consts/colors";

const isEmpty = (obj) => {
  for (var i in obj) return false;
  return true;
};

export default function ErrorModal({ errors }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Error</Text>
      </View>
      <View style={styles.content}>
        {isEmpty(errors) ? (
          <Text style={styles.contentText}>* Fields should not be empty</Text>
        ) : (
          Object.getOwnPropertyNames(errors).map((item) => {
            return (
              <Text style={styles.contentText} key={item}>
                {errors[item]}
              </Text>
            );
          })
        )}
      </View>
      <View style={styles.footerButton}>
        <Text style={styles.footerText}>I Understand</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 0,
  },
  content: {
    padding: 16,
  },
  header: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 0.8,
  },
  contentText: {
    color: "red",
    marginVertical: 5,
  },
  footerButton: {
    borderTopColor: Colors.lightGrey,
    borderTopWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  footerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
