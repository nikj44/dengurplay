import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";

const Profile = () => {
    const [profileData, setProfileData] = useState([])

    const loggedInUser = async () => {
      const user = await auth().currentUser
      // console.log('USERRR',user)
      if (user) {
       firestore()
         .collection('users')
         .doc(user.uid)
         .get()
         .then(documentSnapshot => {
  
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
  
    return(
      <View style={styles.styler}>
      <Text> Hello </Text>
      <Text>Username = {profileData.username}</Text>
      <Text>Email = {profileData.email}</Text>
      <Text>Coins = {profileData.coins}</Text>
      <Text>Diamonds = {profileData.diamonds}</Text>
      </View>
        );
}

const styles = StyleSheet.create({
    styler: {
      backgroundColor: '#FFB830',
    }
  });


export default Profile

