import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Button  } from 'react-native-paper';
import {profiledata} from '../data/profiledata';
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
import Create4 from '../screens/Create4Temp.js';
import Read2 from '../screens/Read2.js';
import firestore from '@react-native-firebase/firestore';
import UserData from '../screens/UserData.js';
import CreateScreen3 from '../screens/createscreen3';
import HomeScreen from '../screens/homescreen';
import Chat3 from '../screens/Chat3';
import Profile2 from '../screens/Profile2';
import OnboardingScreen from '../screens/Onboarding';
// import PushNotification from "react-native-push-notification";


const Navigation = () => {
    // these in general
    const [user,setUser] = useState('')
    const [newUser,setNewUser] = useState(null);
    const [newUid,setNewUid] = useState(null);
    const [newEmail,setNewEmail] = useState(null);
    const [temp,setTemp] = useState(null);

    //these for UserData
    const [username, setUsername] = useState(null);
    const [coins, setCoins] = useState(200);
    const [diamonds, setDiamonds] = useState(0);
    const [profileNum,setProfileNum] = useState(1);

    const {Navigator, Screen } = createStackNavigator();

const Tab = createBottomTabNavigator();

//MyTabs = Bottom Navigator
const MyTabs = () => {

  return (
    <Tab.Navigator 
        screenOptions={{
          tabBarActiveTintColor: '#000000',
          tabBarActiveBackgroundColor: '#59ffe6',
          // headerStyle: {
          //   borderColor: 'blue',
          // }
        }}  
        >
      <Tab.Screen name="Home" component={Home3} options={{tabBarIcon: () => {
        return(<Icon name="home-outline" color="black" size={25} />);},
        title: 'Active RPGs',
        headerTitleStyle: {
          color: '#008970',
          marginLeft: 100,
          // height: 40,
        }
      }}/>
      <Tab.Screen name="Read" component={Read} options={{tabBarIcon: () => {
        return(<Icon name="book-outline" color="black" size={25} />);},
        title: 'Read',
        headerTitleStyle: {
          color: '#008970',
          marginLeft: 140
        }
    }}/>
      <Tab.Screen name="Create" component={Create} options={{ 
      tabBarIcon: () => {return(<Icon name="add-circle-outline" color="black" size={25} />);},
      title: 'Create',
      headerTitleStyle: {
        color: '#008970',
        marginLeft: 140
      }
     }}/>
      <Tab.Screen name="Chat" component={Chat} options={{tabBarIcon: () => {
        return(<Icon name="chatbox-ellipses-outline" color="black" size={25} />);},
        title: 'Chat',
        headerTitleStyle: {
          color: '#008970',
          marginLeft: 140
        }
      }}/>
      <Tab.Screen name="Profile" component={Profile2} options={{tabBarIcon: () => {
        return(<Icon name="person-outline" color="black" size={25} />);},
        title: 'Profile',
        headerRight:()=><Icon
        name="log-out-outline"
        size={34}
        color='#008970'
        style={{marginRight:10}}
        onPress={()=>auth().signOut()}/>,
        headerTitleStyle: {
          color: '#008970',
          marginLeft: 140
        }
      }}/>
    </Tab.Navigator>
  );
};

//mainStack = Stack Navigator consisting of Bottom + All other Screens
const MainStack = () => {
  return(
    <Navigator>
      <Screen name="MainTab" component={MyTabs} options={{headerShown:false}} />
      <Screen name="Create2" component={Create2} options={{ title: 'Create2'}}/>
      <Screen name="Create3" component={Create4} options={{ title: 'Create3'}}/>
      <Screen name="Home2" component={Home2} options={{ title: 'Home2'}}/>
      <Screen name="Chat2" component={Chat2} options={{ headerShown: false}}/>
      <Screen name="Chat3" component={Chat3} options={{ headerShown: false}}/>
      <Screen name="Read2" component={Read2} options={{ title: 'Read2'}}/>
      <Screen name="UserData" component={UserData} options={{ title: 'UserData'}}/>

    </Navigator>
  );
};

const LoginStack = () => {
  return(
    <Navigator>
      <Screen name="Onboarding" component={OnboardingScreen} options={{headerShown:false}}/>
      <Screen name="Auth" component={Auth} options={{headerShown:false}} />
    </Navigator>
  );
};


//  const createChannels = () => {
//    PushNotification.createChannel(
//      {
//        channelId:"test-channel",
//        channelName:"Test Channel"
//      }
//    )
//  }

// const AuthStack = () => {
//     return(
//       <Navigator>
//         <Screen name="Auth" component={Auth} />
//         <Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
//         <Screen name="Signup" component={SignupScreen} options={{headerShown: false}} />
//       </Navigator>
//     );
//   };



// //UserData = for inputtig data for new Users
// const UserData = (props) => {

//   // const tempName = props.username
//   // console.log('tempname Line',tempName)

//   // const [tempUser,setTempUser] = useState(tempName)
//   const submitInfo = async () => {
//     // if all Info is not entered
//     if(!username || !profileNum){
//       alert("Please fill all the details")
//       return
//     }
//     try{
//       //If Doc named "User.Uid" exists, then user is not new
//         await firestore().collection('users').doc(newUid).set({
//           username:username,
//           email:newEmail,
//           uid:newUid,
//           coins:coins,
//           diamonds:diamonds,
//           profileNum:profileNum,
//           })
//           setNewUser(0)
//     }catch(err){
//       alert("Someting went wrong")
//       console.log('Errrr',err)
//     }
//   }
    
//   // useEffect(()=>{
//   //   console.log(tempName)
//   // },[tempName])

//     //Component for Profile
//     const ProfilePic = ({item}) => {
//       return (
//         <TouchableOpacity onPress={()=>setProfileNum(item.picOption)}>
//           <View style={{ flex: 1}}>
//           <Image
//           style={{ width: 80, height: 80, borderRadius: 100, borderWidth: 5, margin: 3}}
//           source={item.picUrl} />
//           </View>
//           </TouchableOpacity>
//         )
//       }

//     // UserData Return
//   return (
//       <View style={{backgroundColor: '#FFFDD0', flex: 1}}>
//          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#008970', alignSelf: 'center', marginVertical: 10}}>Enter details !!</Text>
//           {/* <View> */}
//             <TextInput
//             label="Username"
//             value={username}
//             onChangeText={(text)=>setUsername(text)}
//             mode="outlined"
//             style={{marginVertical: 10}}
//             />
//           {/* </View> */}

//             {/* <View> */}
//             <FlatList
//             keyExtractor={item=> item.picOption}
//             numColumns={4}
//             data={profiledata}
//             renderItem={ProfilePic}
//             style={{alignSelf: 'center'}}
//           />
//             {/* </View> */}

//           <Button mode="contained" onPress={()=>submitInfo()}
//           color='#008970' 
//           style={{marginHorizontal: 90, borderRadius: 10, marginBottom:20}}>Continue</Button>
//          </View>
//   )
// }


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
    const unregister = auth().onAuthStateChanged(async userExist=>{
      if(userExist) {
        setUser(userExist)
        setNewEmail(userExist.email)
        setNewUid(userExist.uid)
        //here we have to check if the user is new or old
        console.log(userExist.uid)
        const userDoc = await firestore().collection('users').doc(userExist.uid).get()
        if(!userDoc.exists) {
          console.log('userdoc',userDoc)
          console.log('User not exists navigating to userdata')
          //no user exists navigate to UserData.js
          setNewUser(1)
        }else {
          console.log('User exists navigating to mainstack')
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
    // createChannels()
},[])
return (
  //If User Exists check, (if its new then UserData else Mainstack) else Auth
  <NavigationContainer>
    {user ?  (newUser==1 ?  
        <UserData setNewUser={setNewUser} newEmail={newEmail} newUid={newUid} />  
            : (newUser==0 && 
        <MainStack /> ))  
            : 
        <LoginStack />}
  </NavigationContainer>
);
};

export default Navigation;
