import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { Colors } from "../../consts/colors";
import GradientButton from "../../components/gradient_button";
import AnimatedModal from "./animated_modal.view";

const Header = ({ text }) => {
  return (
    <View style={styles.header}>
      <View style={styles.slideStripe} />
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{text}</Text>
    </View>
  );
};

export default function ArgumentModal({
  isVisible,
  setVisible,
  text,
  sendEvent,
}) {
  const [value, setValue] = useState("");
  const [blur, setBlur] = useState(false);
  const [showError, setShowError] = useState(false);

  const buttonEvent = () => {
    if (value.length <= 5000 && value.length >= 10) sendEvent(text, value);
    else {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }
  };

  return (
    <Modal animationType="fade" visible={isVisible} transparent={true}>
      <TouchableWithoutFeedback onPress={setVisible}>
        <View style={styles.modalContainer}></View>
      </TouchableWithoutFeedback>
      <AnimatedModal closeModal={() => setVisible(false)}>
        <Header text={text} />
        <Text style={{ color: Colors.grey, marginVertical: 8 }}>
          Your argument
        </Text>
        <TextInput
          style={blur ? [styles.inputArea, styles.inputBlur] : styles.inputArea}
          multiline
          onChangeText={(e) => setValue(e)}
          onFocus={() => setBlur(true)}
          value={value}
        />
        <Text style={styles.wordCounter}>{value.length}/5000</Text>
        {showError && (
          <Text style={{ color: "red", marginTop: 8 }}>
            * Your argument can be minimum 10 and maximum 5000 characters for
            each round
          </Text>
        )}
        <GradientButton
          style={styles.buttonStyle}
          text="Send"
          title="Submit"
          onPress={buttonEvent}
        />
      </AnimatedModal>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#00000033",
  },
  container: {
    flex: 1,
    width: "100%",
    height: 420,
    position: "absolute",
    bottom: 0,
    padding: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  inputArea: {
    width: "100%",
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    height: 200,
    textAlignVertical: "top",
    paddingBottom: 20,
  },
  inputBlur: {
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: Colors.purple + "AA",
    borderRadius: 10,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
    paddingBottom: 16,
    marginBottom: 8,
  },
  slideStripe: {
    width: 50,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.lightGrey,
    marginTop: -8,
    marginBottom: 8,
  },
  buttonStyle: {
    borderRadius: 8,
    position: "absolute",
    bottom: 16,
    left: 16,
  },
  wordCounter: {
    textAlign: "right",
    color: "grey",
    fontSize: 12,
    marginTop: -20,
    marginRight: 4,
  },
});
