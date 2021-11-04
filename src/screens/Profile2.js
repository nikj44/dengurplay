import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";
import { picFunction } from '../data/profiledata';
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/FontAwesome";


const Profile = () => {
    const [profileData, setProfileData] = useState([])

    const loggedInUser = async () => {
      const user = await auth().currentUser
      // console.log('USERRR',user)
      if (user) {
       firestore()
         .collection('users')
         .doc(user.uid)
         .onSnapshot(documentSnapshot => {
  
         if (documentSnapshot.exists) {
          //  console.log('User data: ', documentSnapshot.data());
            setProfileData(documentSnapshot.data())
          //  console.log('Heehhh',profileData)
         }
       });
     }else{
       console.log('No user exists!')
     }
  }
  
  useEffect(()=>{
    loggedInUser()
  },[])
  
    const AVATAR_SIZE = 150
    const SPACING = 20
    return(
      <View style={{backgroundColor: '#FFFDD0', flex: 1, alignItems: 'center'}}>
      <Image
        style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: 100, borderWidth: 5, marginTop: SPACING}}
        source={picFunction(profileData.profileNum)} 
        />
      <Text style={{marginTop: SPACING, fontSize: 18, fontWeight: 'bold', color: '#008970'}}>Hello {profileData.username}</Text>
      <Text style={{fontSize: 14, fontWeight: 'normal', color: '#748f8a'}}>{profileData.email}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{flexDirection: 'column', margin: 10, marginTop: 20}}>
        <Icon name='coins' size={40} color='#008970' style={{marginLeft: 30}}/>
         <Text style={{marginHorizontal: SPACING, marginVertical: 10}}>{profileData.coins} Coins</Text>
        </View>
        <View style={{flexDirection: 'column', margin: 10}}>
         <Icon2 name='diamond' size={40} color='#008970' style={{marginLeft: 30}} />
         <Text style={{marginHorizontal: SPACING, paddingTop: 10}}>{profileData.diamonds} Diamonds</Text>
         </View>
      </View>
      </View>
        );
}


export default Profile

