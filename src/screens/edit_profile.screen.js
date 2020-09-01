import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";

import { pop } from "../navigation/root_navigation";
import { Colors } from "../consts/colors";

import BackIcon from "../components/icons/back";
import TickIcon from "../components/icons/tick";
import Header from "../components/header";

import globalHook from "../hooks/global.hook";
import { updateUser, isUsernameExist, uploadImage } from "../hooks/user.hooks";

export default function EditProfile() {
  const [focus, setFocus] = useState();
  const [uploading, setUploading] = useState(false);

  const { useGlobalState, setLoggedUser } = globalHook();
  const { user } = useGlobalState();

  const [values, setValues] = useState({
    username: user.username,
    profile_name: user.profile_name,
    biography: user.biography,
  });
  const [errors, setErrors] = useState({
    username: null,
    profile_name: null,
    biography: null,
  });

  const checkField = (field) => {
    if (field === "username") {
      setErrors({
        ...errors,
        username: null,
      });
      if (values.username.length < 3) {
        setErrors({
          ...errors,
          username: "* Username must be minimum 3 character\n",
        });
      }
      if (values.username.length > 20) {
        setErrors({
          ...errors,
          username: "* Username can be maximum 20 character\n",
        });
      }
      isUsernameExist(values.username).then((query) => {
        query.docs.length !== 0 &&
          values.username !== user.username &&
          setErrors({
            ...errors,
            username: "* This username is already exists!\n",
          });
      });
    } else if (field === "profile_name") {
      setErrors({
        ...errors,
        profile_name: null,
      });
      if (values.profile_name.length < 3) {
        setErrors({
          ...errors,
          profile_name: "* Profile Name must be minimum 3 character\n",
        });
      }
      if (values.profile_name.length > 20) {
        setErrors({
          ...errors,
          profile_name: "* Profile Name can be maximum 20 character\n",
        });
      }
    } else if (field === "biography") {
      setErrors({
        ...errors,
        biography: null,
      });
      if (values.profile_name.length >= 50) {
        setErrors({
          ...errors,
          biography: "* Your biography text can be maximum 50 character",
        });
      }
    } else {
      return !errors.username && !errors.profile_name && !errors.biography;
    }

    return undefined;
  };

  const submitEvent = () => {
    isUsernameExist(values.username).then((query) => {
      if (
        (query.docs.length === 0 || values.username === user.username) &&
        checkField() &&
        !uploading
      ) {
        updateUser(values);
        setLoggedUser({ ...user, ...values });
        pop();
      }
    });
  };

  const choosePhoto = async () => {
    setUploading(true);
    const { uri, cancelled } = await ImagePicker.launchImageLibraryAsync();
    !cancelled &&
      uploadImage(uri)
        .then((e) => {
          e.ref.getDownloadURL().then((url) => {
            updateUser({ imageSrc: url });
            setLoggedUser({ ...user, imageSrc: url });
          });
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => setUploading(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Edit Profile"
        leftIcon={<BackIcon width={24} height={24} fill="black" />}
        leftIconEvent={() => pop()}
        rightIcon={<TickIcon width={24} height={24} fill={Colors.purple} />}
        rightIconEvent={submitEvent}
        backgroundStyle={styles.headerStyle}
      />

      <TouchableWithoutFeedback onPress={() => setFocus(null)}>
        <ScrollView style={styles.formContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: user.imageSrc }} style={styles.userImage} />
            <TouchableWithoutFeedback onPress={choosePhoto}>
              <Text style={styles.photoText}>Change profile photo</Text>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.labels, { marginTop: 0 }]}>Username</Text>
            <TextInput
              style={
                focus === "username"
                  ? [styles.input, styles.inputBlur]
                  : styles.input
              }
              onChangeText={(e) => setValues({ ...values, username: e })}
              onBlur={() => checkField("username")}
              onFocus={() => setFocus("username")}
              value={values.username}
            />
            {errors.username && (
              <Text style={{ color: "red" }}>{errors.username}</Text>
            )}
            <Text style={styles.labels}>Profile Name</Text>
            <TextInput
              style={
                focus === "profile_name"
                  ? [styles.input, styles.inputBlur]
                  : styles.input
              }
              onChangeText={(e) => setValues({ ...values, profile_name: e })}
              onBlur={() => checkField("profile_name")}
              onFocus={() => setFocus("profile_name")}
              value={values.profile_name}
            />
            {errors.profile_name && (
              <Text style={{ color: "red" }}>{errors.profile_name}</Text>
            )}
            <Text style={styles.labels}>Biography</Text>
            <TextInput
              style={
                focus === "biography"
                  ? [styles.input, styles.inputBlur]
                  : styles.input
              }
              onChangeText={(e) => setValues({ ...values, biography: e })}
              onBlur={() => checkField("biography")}
              onFocus={() => setFocus("biography")}
              value={values.biography}
            />
            {errors.biography && (
              <Text style={{ color: "red" }}>{errors.biography}</Text>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  headerStyle: {
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  inputContainer: {
    paddingHorizontal: 4,
  },
  input: {
    width: "100%",
    flex: 3,
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    paddingLeft: 12,
    height: 45,
  },
  inputBlur: {
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: Colors.purple + "AA",
    borderRadius: 10,
  },
  labels: {
    flex: 1,
    marginLeft: 4,
    marginBottom: 4,
    marginTop: 20,
    color: Colors.grey,
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  photoText: {
    color: Colors.darkPurple,
    fontWeight: "bold",
    fontSize: 16,
    padding: 10,
  },
});
