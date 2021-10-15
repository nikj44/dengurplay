/* @flow weak */

import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, ActivityIndicator} from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";

const CreateScreen = ({user}) => {
    // console.log('User',user)
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [category,setCategory] = useState('fantasy');
    const [character1,setCharacter1] = useState('');
    const [character2,setCharacter2] = useState('');
    const [gender1,setGender1] = useState('male');
    const [gender2,setGender2] = useState('female');
    const [loading,setLoading] = useState(false);
    const [username,setUsername] = useState('');

    if(loading){
      return <ActivityIndicator size="large" color="green"/>
    }

    // https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user


    const getUser = async () => {

      const user = auth().currentUser;
      if (user) {
        const uid = user.uid
        const userInfo = await firestore().collection('users').
                                           doc(uid).get()
        const username = userInfo._data.username
        return({username, uid})
      }
      //get username from users collection
       //pass username in the session
       // also pass the session details in the user collection > sessions subcollection
       //readt that subcollection in create screen 2
       else{
         alert('User is not signed in')
       }
    }


    const newCreate = async () => {
      setLoading(true)
      if(!title || !description || !category || !character1
        || !character2 || !gender1 || !gender2){
          alert("Fill all the details")
          return
        }
      try{
        const gotUser = await getUser()
        firestore().
          collection('sessions')
          .add({
            title: title,
            description: description,
            category: category,
            character1_name: character1,
            character2_name: character2,
            character1_gender: gender1,
            character2_gender: gender2,
            createdAt: firestore.FieldValue.serverTimestamp(),
            createdBy: gotUser.username,
            createdByUid: gotUser.uid
            })
          
          firestore().
            collection('users')
            .doc(gotUser.uid)
            .collection('usersessions')
            .add({
              title: title,
              description: description,
              category: category,
              character1_name: character1,
              character2_name: character2,
              character1_gender: gender1,
              character2_gender: gender2,
              createdAt: firestore.FieldValue.serverTimestamp(),
              createdBy: gotUser.username,
              })
          setLoading(false)
      } catch(err){
        alert(err)
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
      style={styles.description}
      />
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
    <TextInput
      value={character1}
      onChangeText={(newValue)=>setCharacter1(newValue)}
      placeholder="Character you'll play"
      mode="outlined"
      label="Character Name"
      style={{width: 300}}
    />
    <Picker
      selectedValue={gender1}
      onValueChange={(itemValue)=>setGender1(itemValue)}
      mode="dropdown"
    >
      <Picker.Item label="Male" value="male" />
      <Picker.Item label="Female" value="female" />
      <Picker.Item label="Other" value="other" />
    </Picker>
    <TextInput
      value={character2}
      onChangeText={(newValue)=>setCharacter2(newValue)}
      placeholder="Character your partner play"
      mode="outlined"
      label="Character Name"
      style={{width: 300}}
    />
    <Picker
      selectedValue={gender2}
      onValueChange={(itemValue)=>setGender2(itemValue)}
      mode="dropdown"
    >
      <Picker.Item label="Male" value="male" />
      <Picker.Item label="Female" value="female" />
      <Picker.Item label="Other" value="other" />
    </Picker>
    <View style={{paddingHorizontal:50, marginTop:20}}>
    <Button
      mode="contained"
      style={{width:250}}
      onPress={()=>newCreate()}
      >Start RP
    </Button>
    </View>
    </View>
  </ScrollView>
  );
};

export default CreateScreen;

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
