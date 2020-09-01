import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { Colors } from "../../consts/colors";

import { uploadImage } from "../../hooks/debate.hooks";

export default function UploadHeader({ headerImage, setHeaderImage }) {
  const [uploading, setUploading] = useState(false);

  const choosePhoto = async () => {
    setUploading(true);
    const { uri, cancelled } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [305, 200],
      quality: 0.5,
    });
    !cancelled &&
      uploadImage(uri)
        .then((e) => {
          e.ref.getDownloadURL().then((url) => {
            setHeaderImage(url);
          });
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => setUploading(false));
  };

  return (
    <>
      {!headerImage && (
        <TouchableOpacity style={styles.container} onPress={choosePhoto}>
          <Text style={styles.uploadText}>Upload Header Image</Text>
        </TouchableOpacity>
      )}
      {!headerImage && uploading && (
        <View style={styles.container}>
          <Text style={styles.uploadText}>Uploading...</Text>
        </View>
      )}
      {headerImage && (
        <View style={styles.container}>
          <Text style={styles.uploadText}>Uploaded successfully.</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 4,
    marginBottom: 16,
  },
  uploadText: {
    color: Colors.darkPurple,
    fontWeight: "bold",
    fontSize: 16,
  },
});
