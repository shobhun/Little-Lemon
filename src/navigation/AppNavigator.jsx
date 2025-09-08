import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "../screens/Onboarding/OnboardingScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import Animation from "../screens/Splash/Animation";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { isEmpty } from "../utils/validation";

const Stack = createStackNavigator();
// Common function to handle the navigation of the application.
const AppNavigator = () => {
  const { user } = useContext(UserContext);

  // Conditional Rendering of the screen based on the login of user!
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {
      isEmpty(user) ? (
        <>
          <Stack.Screen name="Animation" component={Animation} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Animation" component={Animation} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
