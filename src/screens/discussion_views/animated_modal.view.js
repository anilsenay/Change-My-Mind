import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Animated,
  PanResponder,
} from "react-native";

export default class AnimatedModal extends Component {
  state = {
    translateValue: new Animated.Value(0),
  };

  constructor(props) {
    super(props);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        this.state.translateValue.setValue(Math.max(0, 0 + gestureState.dy));
      },
      onPanResponderRelease: (e, gesture) => {
        const shouldOpen = gesture.vy <= 0;
        Animated.spring(this.state.translateValue, {
          toValue: shouldOpen ? 0 : 420,
          velocity: gesture.vy,
          tension: 2,
          friction: 8,
          useNativeDriver: true,
          restSpeedThreshold: 120,
          restDisplacementThreshold: 120,
        }).start(() => {
          this.props.closeModal();
        });
      },
    });
  }

  render() {
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[
          styles.container,
          { transform: [{ translateY: this.state.translateValue }] },
        ]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
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
});
