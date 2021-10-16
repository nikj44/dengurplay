import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import HomeScreen1 from '../screens/homescreen.js';
import HomeScreen2 from '../screens/homescreen2.js';
import Profile1 from '../screens/profilescreen.js';
import Profile2 from '../screens/profilescreen2.js';
import CreateScreen1 from '../screens/createscreen.js';
import CreateScreen2 from '../screens/createscreen2.js';
import CreateScreen3 from '../screens/createscreen3.js';
import ChatScreen1 from '../screens/chatscreen.js';
import ChatScreen2 from '../screens/chatscreen2.js';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from '../screens/loginscreen.js';
import SignupScreen from '../screens/signupscreen.js';
//
// <Screen name="Profile1" component={Profile1} options={{ title: 'Profile',
// headerRight:()=><Icon
// name="log-out-outline"
// size={34}
// color="black"
// style={{marginRight:10}}
// onPress={()=>auth().signOut()}
// />}} />

const MainComponent = () => {
  const [user,setUser] = useState('')
const {Navigator, Screen } = createStackNavigator();

const ProfileStack = () => {
  return (
    <Navigator headermode="none">
    <Screen name="Profile2" component={Profile2} options={{ title: 'Profile2',
      headerRight:()=><Icon
      name="log-out-outline"
      size={34}
      color="black"
      style={{marginRight:10}}
      onPress={()=>auth().signOut()}
    />}} />
    </Navigator>
  );
};

const CreateScreenStack = () => {
  return (
    <Navigator headermode="none">
      <Screen name="CreateScreen1" component={CreateScreen1} options={{ title: 'Create'}} />
      <Screen name="CreateScreen2" component={CreateScreen2} options={{title: 'Create 2'}} />
      <Screen name="CreateScreen3" component={CreateScreen3} otpions={{title: 'Create 3'}} />
    </Navigator>
  );
};

// <Screen name="ChatScreen1" component={ChatScreen1} options={{ title: 'Chat'}} />

const ChatScreenStack = () => {
  return (
    <Navigator headermode="none">
      <Screen name="ChatScreen2" component={ChatScreen2} options={{title: 'Chat 2'}} />
    </Navigator>
  );
};

const HomeStack = () => {
  return (
    <Navigator headermode="none">
      <Screen name="HomeScreen1" component={HomeScreen1} options={{ title: 'Home1'}} />
      <Screen name="HomeScreen2" component={HomeScreen2} options={{title: 'Home2'}} />
      <Screen name="ChatScreen1" component={ChatScreen1} options={{ title: 'Chat'}} />


    </Navigator>
  );
};



const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={HomeStack} options={{headerShown: false, tabBarIcon: () => {
        return(<Icon name="home-outline" color="black" size={25} />);}
      }}/>
      <Tab.Screen name="CreateTab" component={CreateScreenStack} options={{headerShown: false, tabBarIcon: () => {
        return(<Icon name="add-circle-outline" color="black" size={25} />);}
      }}/>
      <Tab.Screen name="ChatTab" component={ChatScreenStack} options={{headerShown: false, tabBarIcon: () => {
        return(<Icon name="chatbox-ellipses-outline" color="black" size={25} />);}
      }}/>
      <Tab.Screen name="ProfileTab" component={ProfileStack} options={{headerShown: false, tabBarIcon: () => {
        return(<Icon name="person-outline" color="black" size={25} />);}}} />
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return(
    <Navigator>
      <Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
      <Screen name="Signup" component={SignupScreen} options={{headerShown: false}} />
    </Navigator>
  );
};


  useEffect(()=>{
      const unregister = auth().onAuthStateChanged(userExist=>{
        if(userExist) setUser(userExist)
        else setUser('')
      })
      return ()=>{
        unregister()
      }
  },[])
  return (

    <NavigationContainer>
    {user?
      <MyTabs />
    :
      <AuthStack />
    }
    </NavigationContainer>
  );
};

export default MainComponent;
