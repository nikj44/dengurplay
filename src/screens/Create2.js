
import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, ActivityIndicator} from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";
import Navigation from '../navigation/Navigation-Main';
import profiledata from '../data/profiledata';
import { showMessage, hideMessage } from "react-native-flash-message";
import { picFunction } from '../data/profiledata';

const Create2 = ({navigation}) => {
    // console.log('User',user)
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [category,setCategory] = useState('fantasy');
    const [totalPar, setTotalPar] = useState(2);
    const [loading,setLoading] = useState(false);
    const [status,setStatus] = useState(0);
    const [currPar,setCurrPar] = useState(1);
    // const [coins,setCoins] = useState(0);
    const [profileData,setProfileData] = useState('')
    // const [sessionID,setSessionID] = useState('')

    if(loading){
      return <ActivityIndicator size="large" color="green"/>
    }

    const getUser = async () => {
      //take info from user
      const user = auth().currentUser;
      if (user) {
        const uid = user.uid
        const userInfo = await firestore().collection('users').
                                           doc(uid).get()
        const username = userInfo._data.username
        const profileNum = userInfo._data.profileNum
        return({username, uid, profileNum})
      }

       else{
         alert('User is not signed in')
       }
    }

    //Create a session
    const newCreate = async ({navigation}) => {
      const gotUser = await getUser()
      var userCoins = 0
      setLoading(true)
      if(!title || !description || !category || !totalPar){
          alert("Fill all the details")
          setLoading(false)
          return
        }
        //set coins= 20* toitalpar
        var coins = 20 * totalPar
        //read users coins, if its less, give warning, and ask to reduce totalpar
        await firestore()
        .collection('users')
        .doc(gotUser.uid)
        .get()
        .then(docSnap => {
          console.log('querysnapshot',docSnap)
          // setProfileData(docSnap._data)
           userCoins = docSnap._data
           userCoins = userCoins.coins
           console.log('User Coins2',userCoins)
          })
        // const usercoins = profileData.coins
        console.log('User Coins3',userCoins)
        console.log('COins',coins)
        if(coins > userCoins){
          //show warning
          showMessage({
            message: "Coins exceeded",
            description: "Join other rooms to gain coins!😑",
            type: "warning",
            duration: 2500,
          });
          navigation.navigate('MainTab')
        }else{
          //deduct coins
          firestore()
          .collection('users')
          .doc(gotUser.uid)
          .update({
            coins: firestore.FieldValue.increment(-1*coins)
          })

          showMessage({
            message: "Congrats! Room is created",
            description: "Coins deducted! Let's wait for other participants to join  🥰",
            type: "success",
            duration: 2500,
          });
          console.log('COins deducted!')
        
        //or else reduce the number of coins
        //after deducting tell user - couns deducted!!
      try{
        console.log('Performing operations')
        //creating a doc in sessions
        const gotUser = await getUser()
        const docRef = await firestore()
          .collection('sessions')
          .add({
            title: title,
            description: description,
            category: category,
            totalPar: totalPar,
            currPar: currPar,
            createdAt: firestore.FieldValue.serverTimestamp(),
            crByUid: gotUser.uid,
            crByUsername: gotUser.username,
            crByProfile: gotUser.profileNum,
            status: status,
            // sessionID: sessionID,
            })

            // console.log('docref.id',docRef.id)
            // //read document Id
            // await firestore()
            // .collection('sessions')
            // .doc(docRef.id)
            // .update({
            //   sessionID: docRef.id
            //   })
          
          //Add in User=> UserSessions for Create 3
          await firestore()
            .collection('users')
            .doc(gotUser.uid)
            .collection('usersessions')
            .add({
              title: title,
              description: description,
              category: category,
              totalPar: totalPar,
              })

              //Add in User=> Ongoing for Chat Tab
              await firestore()
               .collection('users')
              .doc(gotUser.uid)
              .collection('ongoing')
              .doc(docRef.id)
              .set({
                title: title,
                description: description,
                category: category,
                totalPar: totalPar,
                currPar: currPar,
                createdAt: firestore.FieldValue.serverTimestamp(),
                crByUid: gotUser.uid,
                crByUsername: gotUser.username,
                crByProfile: gotUser.profileNum,
                status: status,
              })

          setLoading(false)
          navigation.navigate('Chat')
      } catch(err){
        alert(err)
        console.log('main error',err)
        setLoading(false)
      }
    }
    }
return(
  <ScrollView>
    <Text style={styles.text}>Create your roleplay room</Text>
    <View style={styles.box1}>
    <Image style={styles.img} source={picFunction(async ()=>await getUser.profileNum)} />
    <TextInput
      label="Title"
      maxLength={20}
      value={title}
      onChangeText={(text)=>setTitle(text)}
      mode="outlined"
      style={styles.title}
      />
    </View>
    <View style={styles.box2}>
    <TextInput
      label="Description"
      maxLength={300}
      value={description}
      onChangeText={(text)=>setDescription(text)}
      mode="outlined"
      multiline
      numberOfLines={4}
      // style={styles.description}
      />
    <Text>Category :-</Text>
    <Picker
      selectedValue={category}
      onValueChange={(itemValue)=>setCategory(itemValue)}
      mode="dropdown"
    >
      <Picker.Item label="Fantasy" value="fantasy" />
      <Picker.Item label="Romance" value="romance" />
      <Picker.Item label="Adventure" value="adventure" />
      <Picker.Item label="Action" value="action" />
      <Picker.Item label="Horror" value="horror" />
    </Picker>
    <Text># of Characters :-</Text>
    <Picker 
      selectedValue={totalPar}
      onValueChange={(itemValue)=>setTotalPar(itemValue)}
      mode="dropdown"
    >
      <Picker.Item label="2" value='2' />
      <Picker.Item label="3" value='3' />
      <Picker.Item label="4" value='4' />
      <Picker.Item label="5" value='5' />
      <Picker.Item label="6" value='6' />
      <Picker.Item label="7" value='7' />
      </Picker>
      </View>
    <View style={{paddingHorizontal:50, marginTop:20}}>
    <Button
      mode="contained"
      style={{width:250, marginBottom: 70}}
      onPress={()=>newCreate({navigation})}
      >Start RP
    </Button>
    </View>
    </ScrollView>
  );

}

export default Create2


const styles = StyleSheet.create({
    text:{
      textAlign: "center",
      fontSize: 20,
      color: 'green',
    },
    img:{
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    box1: {
      flexDirection: "row",
      textAlign: "center",
    },
    title:{
      marginLeft: 20,
      width: 200,
      paddingVertical: 20,
    },
    box2: {
      paddingHorizontal: 20,
    },
  });
  