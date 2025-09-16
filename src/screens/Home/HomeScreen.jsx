import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
  TextInput,
} from "react-native";
import HeaderWithProfile from "../../components/HeaderWithProfile";
import { dynamicHeight, dynamicWidth } from "../../constants/metrics";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderWithProfile />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}
        style={styles.keyboardView}
      >
        <View style={styles.heroContainer}>
          <Text style={styles.headingText}>Little Lemon</Text>
          <View style={styles.subHeroCantainer}>
            <View style={styles.insideHeroCantainer}>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 25,
                  fontWeight: "500",
                  marginTop: 5,
                }}
              >
                Chicago
              </Text>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: "500",
                  letterSpacing: 1,
                  marginTop: 25,
                }}
              >
                We are a family owned Mediterranean restaurant, focused on
                traditional recipies served with a modern twist. 
              </Text>
            </View>
            <View style={styles.heroImageView}>
              <Image style={styles.heroImage} source={require("../../image/banner.png")} />
            </View>
          </View>
          <View style={styles.searchView}>
            <Ionicons name="search" size={25} color="#000" style={{paddingLeft:11, marginTop: 7}} />
            <TextInput style={{flex:1, paddingLeft:20, paddingRight:20, fontSize: 18}} placeholder="Search"/>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  keyboardView: {
    flex: 1
  },
  heroContainer: {
    backgroundColor: "#485E58",
    height: dynamicHeight(0.35),
    padding: 10
  },
  subHeroCantainer: {
    flex: 1,
    flexDirection: "row",
    width: dynamicWidth(1)
  },
  insideHeroCantainer: {
    flexDirection: "column",
    width: dynamicWidth(0.65)
  },
  headingText: {
    fontSize: 40,
    color: "#F4CE13",
    fontWeight: "700",
    letterSpacing: 1,
  },
  heroImageView: {
    width: dynamicWidth(0.35),
    height: dynamicHeight(0.2),
    justifyContent: 'center',
    borderRadius: 10
  },
  heroImage: {
    height: dynamicHeight(0.15),
    width: dynamicWidth(0.3),
    borderRadius: 10
  },
  searchView: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#EAEAEA',
    borderRadius: 10
  }
});
