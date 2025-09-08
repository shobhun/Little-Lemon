import { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { UserContext } from "../../context/UserContext";
import { isEmpty } from "../../utils/validation";

export default function Animation() {
  const {user} = useContext(UserContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(isEmpty(user) ? "Home" : "Onboarding");
    }, 2500);

    return () => clearTimeout(timer); // cleanup
  }, []);
  const navigation = useNavigation();

  return (
    <LottieView
      source={require("../../animations/animation.json")}
      style={{ width: "100%", height: "100%" }}
      autoPlay
      loop={false}
    />
  );
}
