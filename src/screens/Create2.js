
import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, ActivityIndicator} from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";

const Create2 = () => {
    // console.log('User',user)
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [category,setCategory] = useState('fantasy');
    const [totalPar, setTotalPar] = useState(2);
    const [loading,setLoading] = useState(false);
    const [status,setStatus] = useState(0);
    const [currPar,setCurrPar] = useState(1);
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
    const newCreate = async () => {
      setLoading(true)
      if(!title || !description || !category || !totalPar){
          alert("Fill all the details")
          setLoading(false)
          return
        }
      try{
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
      } catch(err){
        alert(err)
        console.log('main error',err)
        setLoading(false)
      }
    }

return(
  <ScrollView>
    <Text style={styles.text}>Create your roleplay room</Text>
    <View style={styles.box1}>
    <Image style={styles.img} source={require("../assets/images/profile.jpg")} />
    <TextInput
      label="Title"
      value={title}
      onChangeText={(text)=>setTitle(text)}
      mode="outlined"
      style={styles.title}
      />
    </View>
    <View style={styles.box2}>
    <TextInput
      label="Description"
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
      onPress={()=>newCreate()}
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
  