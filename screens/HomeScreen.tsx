import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import ContactUsScreen from "./ContactUsScreen";
import GenerateStoryScreen from "./GenerateStoryScreen";
import AppInfo from "./AboutUsScreen";
import HistoricScreen from "./HistoricScreen";

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
          } else if (route.name === "Sobre nós") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Histórico") {
            iconName = focused ? "reader" : "reader-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#097E79",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Criar História" component={GenerateStoryScreen} />
      <Tab.Screen name="Histórico" component={HistoricScreen} />
      <Tab.Screen name="Fale Conosco" component={ContactUsScreen} />
      <Tab.Screen name="Sobre nós" component={AppInfo} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
