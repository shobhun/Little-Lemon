import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import HeaderWithProfile from "../../components/HeaderWithProfile";
import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { dynamicWidth } from "../../constants/metrics";
import ConfirmationPopup from "../../components/ConfirmationPopup";
import { useNavigation } from "@react-navigation/native";
import { deleteKey, mergeData } from "../../storage/storage";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = () => {
  // Constant created, to use and update the values using useContext hook.
  const { user, setUser } = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);
  const [phNumber, setPhNumber] = useState(null);
  const [avtar, setAvtar] = useState(null);
  const navigation = useNavigation();
  const orderStatus = useRef(null);
  const passwordChange = useRef(null);
  const specialOffer = useRef(null);
  const newsletter = useRef(null);

  // This function is created to show the change the avtar whenever it being changed from the header!
  // WIP still not working!
  useEffect(() => {
    console.log("Use Effect Hook in Profile Screen");
    setAvtar(user.image);
  }, [user]);

  // The is function called to perform Logout on click of LOGOUT button
  // The confirmation popup will be shown!
  const performLogout = () => {
    setShowPopup(!showPopup);
    console.log("You are about to logout!");
  };

  // This is the function called when we click YES on the logout confirmation popup.
  const confirmYes = () => {
    deleteKey("Personal_Detail");
    setShowPopup(!showPopup);
    navigation.reset({ index: 0, routes: [{ name: "Onboarding" }] });
    console.log("logout Done!");
    setUser("");
  };

  // This is the function called when we click NO on the logout confirmation popup.
  const confirmNo = () => {
    setShowPopup(!showPopup);
    console.log("Don't Logout from the application!");
  };

  // This is the function to save the Profile Data and will be called on click of SAVE button
  const saveProfileData = async () => {
    try {
      console.log("Phone number : " + phNumber + " " + user.phNumber);
      await mergeData(
        "Personal_Detail",
        JSON.stringify({
          image: avtar,
          // The reason why I am doing null check before sending is to asyncStore is incase I dont make any change,
          // the null value of state variable should not be passed.
          // Instead it should take value from user if it exists!
          phNumber: phNumber == null ? user.phNumber : phNumber,
          orderStatus:
            orderStatus.current == null
              ? user.orderStatus
              : orderStatus.current,
          passwordChange:
            passwordChange.current == null
              ? user.passwordChange
              : passwordChange.current,
          specialOffer:
            specialOffer.current == null
              ? user.specialOffer
              : specialOffer.current,
          newsletter:
            newsletter.current == null ? user.newsletter : newsletter.current,
        })
      );

      // This helps me to update all the versions of Context to latest updated data!
      setUser({
        ...user,
        image: avtar,
        phNumber: phNumber == null ? user.phNumber : phNumber,
        orderStatus: orderStatus.current ?? user.orderStatus,
        passwordChange: passwordChange.current ?? user.passwordChange,
        specialOffer: specialOffer.current ?? user.specialOffer,
        newsletter: newsletter.current ?? user.newsletter,
      });

      alert("Data Saved Successfully!");
    } catch (error) {
      console.log("saveProfileData error : " + JSON.stringify(error));
    }
  };

  //Function to discard all the new changes in Profile Section and will be called on DISCARD button click.
  const discardChanges = () => {
    setAvtar(user.image);
    setPhNumber(user.phNumber == null ? null : user.phNumber);
  };

  // Function for changing avtar and will be called on click of CHANGE button
  const changeAvtar = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setAvtar(result.assets[0].uri);
    }
  };

  // Function for removing avtar and will be called on click of REMOVE button
  const removeAvtar = () => {
    setAvtar(null);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderWithProfile />
      {showPopup && (
        <ConfirmationPopup
          isVisible={showPopup}
          onClickYes={confirmYes}
          onClickNo={confirmNo}
          message="Are you sure you want to log out?"
        />
      )}
      <ScrollView>
        <View style={styles.viewConatiner}>
          <Text style={styles.textMainHeading}>Personal Information</Text>
          <Text style={styles.textHeader}>Avatar</Text>
          <View style={styles.btnProfileViewMain}>
            <Image
              style={styles.image}
              source={
                avtar != null ? { uri: avtar } : require("../../image/user.png")
              }
            />
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Pressable
                style={[
                  styles.btnSave,
                  { width: dynamicWidth(0.27), marginLeft: 20 },
                ]}
                onPress={changeAvtar}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                    color: "#FFFFFF",
                    letterSpacing: 1,
                  }}
                >
                  Change
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btnDiscard,
                  { width: dynamicWidth(0.27), marginLeft: 20 },
                ]}
                onPress={removeAvtar}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                    color: "#8A8DA2",
                    letterSpacing: 1,
                  }}
                >
                  Remove
                </Text>
              </Pressable>
            </View>
          </View>
          <Text style={styles.textHeader}>First Name</Text>
          <TextInput
            style={styles.inputField}
            editable={false}
            value={user?.firstName ?? " "}
          />
          <Text style={styles.textHeader}>Last Name</Text>
          <TextInput
            style={styles.inputField}
            editable={false}
            value={user?.lastName ?? " "}
          />
          <Text style={styles.textHeader}>Email</Text>
          <TextInput
            style={styles.inputField}
            editable={false}
            value={user?.email ?? " "}
          />
          <Text style={styles.textHeader}>Phone Number</Text>
          <TextInput
            style={styles.inputField}
            editable
            value={phNumber == null ? user.phNumber : phNumber}
            onChangeText={setPhNumber}
            keyboardType="numeric"
          />
          <Text style={styles.textEmailHeading}>Email Notifications</Text>
          <BouncyCheckbox
            isChecked={user.orderStatus}
            style={styles.checkBox}
            text="Order Status"
            onPress={(value) => {
              orderStatus.current = value;
              console.log("Order Status -> " + value);
            }}
            textStyle={{ textDecorationLine: "none" }}
          />
          <BouncyCheckbox
            isChecked={user.passwordChange}
            style={styles.checkBox}
            text="Password Changes"
            onPress={(value) => {
              passwordChange.current = value;
              console.log("Password Changes -> " + value);
            }}
            textStyle={{ textDecorationLine: "none" }}
          />
          <BouncyCheckbox
            isChecked={user.specialOffer}
            style={styles.checkBox}
            text="Special Offers"
            onPress={(value) => {
              specialOffer.current = value;
              console.log("Special Offers -> " + value);
            }}
            textStyle={{ textDecorationLine: "none" }}
          />
          <BouncyCheckbox
            isChecked={user.newsletter}
            style={styles.checkBox}
            text="Newsletter"
            onPress={(value) => {
              newsletter.current = value;
              console.log("Newsletter -> " + value);
            }}
            textStyle={{ textDecorationLine: "none" }}
          />
          <Pressable style={styles.btnLogout} onPress={performLogout}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>Log Out</Text>
          </Pressable>
          <View style={styles.btnView}>
            <Pressable
              style={[styles.btnDiscard, { width: dynamicWidth(0.4) }]}
              onPress={discardChanges}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#8A8DA2",
                  letterSpacing: 1,
                }}
              >
                Discard
              </Text>
            </Pressable>
            <Pressable
              style={[styles.btnSave, { width: dynamicWidth(0.4) }]}
              onPress={saveProfileData}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#FFFFFF",
                  letterSpacing: 1,
                }}
              >
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  viewConatiner: {
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    margin: 10,
    borderColor: "#ADADAD",
    flexDirection: "column",
    flex: 1,
  },
  btnProfileViewMain: {
    flexDirection: "row",
    alignItems: "center",
  },
  textMainHeading: {
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 10,
  },
  textHeader: {
    marginTop: 30,
    color: "#525252",
    fontWeight: "700",
  },
  inputField: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 5,
    borderColor: "#696969",
    padding: 10,
  },
  textEmailHeading: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 25,
    marginBottom: 15,
  },
  checkBox: {
    marginVertical: 10,
  },
  btnLogout: {
    width: dynamicWidth(0.9),
    height: 50,
    marginVertical: 30,
    alignContent: "center",
    backgroundColor: "#F4CD14",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  image: {
    marginTop: 5,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  btnDiscard: {
    height: 50,
    marginVertical: 10,
    alignContent: "center",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  btnSave: {
    height: 50,
    marginVertical: 10,
    alignContent: "center",
    backgroundColor: "#495D56",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
});
