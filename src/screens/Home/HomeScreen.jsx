import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import HeaderWithProfile from "../../components/HeaderWithProfile";
import { dynamicHeight, dynamicWidth } from "../../constants/metrics";
import { Ionicons } from "@expo/vector-icons";
import { data } from "../../utils/sampleData";

const HomeScreen = () => {
  const prefImage =
    "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/refs/heads/main/images/";

  // Show single List of Flatlist
  const Items = ({ title, price, description, image }) => {
    return (
      <View style={{ flexDirection: "column", margin: 10  }}>
        <View style={{ flexDirection: "row"}}>
          <View style={{ flexDirection: "column", width: dynamicWidth(0.6) }}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1 }}
            >
              {title}
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 17,
                fontWeight: "500",
                letterSpacing: 1,
                color: "#485E58",
              }}
            >
              {description}
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 17,
                fontWeight: "800",
                letterSpacing: 1,
                color: "#485E58",
              }}
            >
              {"$" + price}
            </Text>
          </View>
          <View
            style={{
              width: dynamicWidth(0.4),
              padding: 10,
              justifyContent: "center"
            }}
          >
            <Image
              style={{ width: 100, height: 100, borderRadius:20 }}
              source={{ uri: prefImage + image }}
            />
          </View>
        </View>
        <View style={{ marginTop:10, height: 2, backgroundColor: "#CCCCCC" }}/>
      </View>
    );
  };

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
              <Image
                style={styles.heroImage}
                source={require("../../image/banner.png")}
              />
            </View>
          </View>
          <View style={styles.searchView}>
            <Ionicons
              name="search"
              size={25}
              color="#000"
              style={{ paddingLeft: 11, marginTop: 7 }}
            />
            <TextInput
              style={{
                flex: 1,
                paddingLeft: 20,
                paddingRight: 20,
                fontSize: 18,
              }}
              placeholder="Search"
            />
          </View>
        </View>
        <View>
          <View style={{ height: dynamicHeight(0.5), padding: 20 }}>
            <Text style={{ fontSize: 25, fontWeight: "bold", marginTop: 10 }}>
              ORDER FOR DELIVERY!
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 15,
              }}
            >
              <View style={{ backgroundColor: "#dae3daff", borderRadius: 10 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#485E58",
                    padding: 15,
                  }}
                >
                  Starters
                </Text>
              </View>
              <View style={{ backgroundColor: "#dae3daff", borderRadius: 10 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#485E58",
                    padding: 15,
                  }}
                >
                  Mains
                </Text>
              </View>
              <View style={{ backgroundColor: "#dae3daff", borderRadius: 10 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#485E58",
                    padding: 15,
                  }}
                >
                  Desserts
                </Text>
              </View>
              <View style={{ backgroundColor: "#dae3daff", borderRadius: 10 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#485E58",
                    padding: 15,
                  }}
                >
                  Drinks
                </Text>
              </View>
            </View>
            <View
              style={{ marginTop: 25, height: 2, backgroundColor: "#CCCCCC" }}
            />
            <View style={{ flex: 1, marginTop: 15 }}>
              <FlatList
                data={data.menu}
                renderItem={({ item }) => (
                  <Items
                    title={item.name}
                    price={item.price}
                    description={item.description}
                    image={item.image}
                  />
                )}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  heroContainer: {
    backgroundColor: "#485E58",
    height: dynamicHeight(0.35),
    padding: 10,
  },
  subHeroCantainer: {
    flex: 1,
    flexDirection: "row",
    width: dynamicWidth(1),
  },
  insideHeroCantainer: {
    flexDirection: "column",
    width: dynamicWidth(0.65),
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
    justifyContent: "center",
    borderRadius: 10,
  },
  heroImage: {
    height: dynamicHeight(0.15),
    width: dynamicWidth(0.3),
    borderRadius: 10,
  },
  searchView: {
    flexDirection: "row",
    height: 40,
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
  },
});
