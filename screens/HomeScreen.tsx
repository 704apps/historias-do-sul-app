import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import ContactUsScreen from "./ContactUsScreen";
import GenerateStoryScreen from "./GenerateStoryScreen";
import LoadingStoryScreen from "./LoadingStoryScreen";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "default-icon";

          if (route.name === "Criar História") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Fale Conosco") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          } else if (route.name === "Loading") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#097E79",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Criar História" component={GenerateStoryScreen} />
      <Tab.Screen name="Fale Conosco" component={ContactUsScreen} />
      <Tab.Screen name="Loading" component={LoadingStoryScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
