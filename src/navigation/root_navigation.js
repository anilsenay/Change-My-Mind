import * as React from "react";
import { StackActions, TabActions } from "@react-navigation/native";

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}

export function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}

export function pop(number) {
  navigationRef.current?.dispatch(StackActions.pop(number));
}

export function replace(name, params) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export function navigateTab(name) {
  navigationRef.current?.dispatch(TabActions.jumpTo(name));
}
