import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Profile from "./profile.screen";

import globalHook from "../hooks/global.hook";

export default function MyProfile() {
  const { useGlobalState } = globalHook();
  const { user } = useGlobalState();
  return user && <Profile user={user} />;
}

const styles = StyleSheet.create({});
