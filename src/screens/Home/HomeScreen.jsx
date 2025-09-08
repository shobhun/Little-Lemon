import { Text, StyleSheet, SafeAreaView } from "react-native";
import HeaderWithProfile from "../../components/HeaderWithProfile";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <HeaderWithProfile/>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

const style = StyleSheet.create({});
