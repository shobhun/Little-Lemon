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
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { dynamicWidth } from "../../constants/metrics";
import ConfirmationPopup from "../../components/ConfirmationPopup";
import { useNavigation } from "@react-navigation/native";
import { deleteKey } from "../../storage/storage";

const ProfileScreen = () => {
  // Constant created, to use and update the values using useContext hook.
  const { user, setUser } = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);
  const navigation = useNavigation();

  const performLogout = () => {
    setShowPopup(!showPopup);
    console.log("You are about to logout!");
  };

  const confirmYes = () => {
    setUser(null);
    deleteKey("Personal_Details");
    navigation.reset({index:0, routes: [{name: "Animation"}]});
    console.log("logout Done!");
  };

  const confirmNo = () => {
    setShowPopup(!showPopup);
    console.log("Dont Logout from the application!");
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
              source={require("../../image/user.png")}
            />
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Pressable
                style={[
                  styles.btnSave,
                  { width: dynamicWidth(0.27), marginLeft: 20 },
                ]}
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
            value={user.firstName}
          />
          <Text style={styles.textHeader}>Last Name</Text>
          <TextInput
            style={styles.inputField}
            editable={false}
            value={user.lastName}
          />
          <Text style={styles.textHeader}>Email</Text>
          <TextInput
            style={styles.inputField}
            editable={false}
            value={user.email}
          />
          <Text style={styles.textHeader}>Phone Number</Text>
          <TextInput style={styles.inputField} editable />
          <Text style={styles.textEmailHeading}>Email Notifications</Text>
          <BouncyCheckbox style={styles.checkBox} text="Order Status" />
          <BouncyCheckbox style={styles.checkBox} text="Password Changes" />
          <BouncyCheckbox style={styles.checkBox} text="Special Offers" />
          <BouncyCheckbox style={styles.checkBox} text="Newsletter" />
          <Pressable style={styles.btnLogout} onPress={performLogout}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>Log Out</Text>
          </Pressable>
          <View style={styles.btnView}>
            <Pressable
              style={[styles.btnDiscard, { width: dynamicWidth(0.4) }]}
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
            <Pressable style={[styles.btnSave, { width: dynamicWidth(0.4) }]}>
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
