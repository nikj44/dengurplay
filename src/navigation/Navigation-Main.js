import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Auth from '../screens/Auth.js';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from '../screens/loginscreen.js';
import SignupScreen from '../screens/signupscreen.js';
import Home from '../screens/Home';
import Chat from '../screens/Chat';
import Read from '../screens/Read';
import Create from '../screens/Create';
import Profile from '../screens/Profile';
import Create3 from '../screens/Create3.js';
import Create2 from '../screens/Create2.js';
import Home2 from '../screens/Home2.js';
import Home3 from '../screens/Home3.js';
import Chat2 from '../screens/Chat2.js';
import Read2 from '../screens/Read2.js';
import { chatThreeDots } from '../screens/SpecialFunctions.js';
import firestore from '@react-native-firebase/firestore';
import UserData from '../screens/UserData.js';


const Navigation = () => {
    const [user,setUser] = useState('')
    const {Navigator, Screen } = createStackNavigator();
    const [newUser,setNewUser] = useState(null);
    const [newUid,setNewUid] = useState(null);
    const [newEmail,setNewEmail] = useState(null);

const Tab = createBottomTabNavigator();

const MyTabs = () => {

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{tabBarIcon: () => {
        return(<Icon name="home-outline" color="black" size={25} />);},
        title: 'Active RPGs'
      }}/>
      <Tab.Screen name="Read" component={Read} options={{tabBarIcon: () => {
        return(<Icon name="book-outline" color="black" size={25} />);},
        title: 'Read'
    }}/>
      <Tab.Screen name="Create" component={Create} options={{ 
      tabBarIcon: () => {return(<Icon name="add-circle-outline" color="black" size={25} />);},
      title: 'Create'
     }}/>
      <Tab.Screen name="Chat" component={Chat} options={{tabBarIcon: () => {
        return(<Icon name="chatbox-ellipses-outline" color="black" size={25} />);},
        title: 'Chat'
      }}/>
      <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: () => {
        return(<Icon name="person-outline" color="black" size={25} />);},
        title: 'Profile',
        headerRight:()=><Icon
        name="log-out-outline"
        size={34}
        color="black"
        style={{marginRight:10}}
        onPress={()=>auth().signOut()}/>
      }}/>
    </Tab.Navigator>
  );
};

const MainStack = () => {
  return(
    <Navigator>
      <Screen name="MainTab" component={MyTabs} options={{headerShown:false}} />
      <Screen name="Create2" component={Create2} options={{ title: 'Create2'}}/>
      <Screen name="Create3" component={Create3} options={{ title: 'Create3'}}/>
      <Screen name="Home2" component={Home2} options={{ title: 'Home2'}}/>
      <Screen name="Chat2" component={Chat2} options={{ headerShown: false}}/>
      <Screen name="Read2" component={Read2} options={{ title: 'Read2'}}/>
      <Screen name="UserData" component={UserData} options={{ title: 'UserData'}}/>

    </Navigator>
  );
};

// const AuthStack = () => {
//     return(
//       <Navigator>
//         <Screen name="Auth" component={Auth} />
//         <Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
//         <Screen name="Signup" component={SignupScreen} options={{headerShown: false}} />
//       </Navigator>
//     );
//   };

  // const navigationFunc = () => {
  //   // console.log('Userrr',user)
  //   // console.log('newUser',newUser)
  //   console.log('navigationFunc')
  //   if(user = !null && newUser == 1)
  //        <UserData />
  //   else if(user = !null && newUser == 0)
  //       <MainStack />
  //   else if(user = null)
  //        <Auth />
  // }

  useEffect(()=> {
    const unregister = auth().onAuthStateChanged(userExist=>{
      if(userExist) {
        setUser(userExist)
        setNewEmail(userExist.email)
        setNewUid(userExist.uid)
        //here we have to check if the user is new or old
        console.log(userExist.uid)
        const userDoc = firestore().collection('users').doc(userExist.uid).get()
        if(!userDoc.exists) {
          //no user exists navigate to UserData.js
          setNewUser(1)
        }else {
          //user exists navigate to mainstack
          setNewUser(0)
        }
        //if new then Details page
        //if old then main stack
      } 
      else {
        //user hasn't signed in
        setUser('')
        console.log('User doesnt exissts')
      }
    })
    return ()=>{
      unregister()
    }
},[])
return (
  <NavigationContainer>
    {user ?  (newUser==1 ?  <UserData uid={newUid} email={newEmail}/>  : (newUser==0 && <MainStack /> ))  : <Auth />}
  </NavigationContainer>
);
};

export default Navigation;
