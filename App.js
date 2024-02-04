import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Importe les différents écrans
import Home from "./app/screens/Home";
import Search from "./app/screens/Search";
import Create from "./app/screens/Create";
// import Community from './app/screens/Community';
import Profile from "./app/screens/Profile";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import Settings from "./app/screens/Settings";
import Privacy from "./app/screens/Privacy";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name == "Home") {
            iconName = focused // if focused, return home sinon return home-outline
              ? "home"
              : "home-outline";
          } else if (route.name == "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name == "Create") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name == "Community") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name == "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={30} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      })}
    >
      {/* énumère chaque écran avec ses composant importé en haut de la page */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarShowLabel: false, headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{ tabBarShowLabel: false, headerShown: false }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        options={{ tabBarShowLabel: false, headerShown: false }}
      />
      {/* <Tab.Screen name="Community" component={Community} options = {{tabBarShowLabel : false,  headerShown: false}} /> */}
      {
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarShowLabel: false,
            headerBackTitleVisible: true,
            headerShown: false,
          }}
        />
      }
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={HomeTab}
          options={{ title: "Join", headerShown: true, headerLeft: null }}
        />
        {/* la navbar n'est pas affiché sur la page login */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Privacy" component={Privacy} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
export { HomeTab };
