
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, ActivityIndicator} from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";
import ColorPicker from 'react-native-wheel-color-picker'

const Create2 = () => {
    // console.log('User',user)
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [category,setCategory] = useState('fantasy');
    // const [character1,setCharacter1] = useState('');
    // const [character2,setCharacter2] = useState('');
    // const [gender1,setGender1] = useState('male');
    // const [gender2,setGender2] = useState('female');
    const [characterNumber, setCharacterNumber] = useState(2);
    const [loading,setLoading] = useState(false);
    const [username,setUsername] = useState('');
    const [color,setColor] = useState("#00ff37");

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
      if(!title || !description || !category || !characterNumber){
          alert("Fill all the details")
          setLoading(false)
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
            characterNumber: characterNumber,
            createdAt: firestore.FieldValue.serverTimestamp(),
            createdBy: gotUser.username,
            createdByUid: gotUser.uid,
            favcolor: color
            })
          
          firestore().
            collection('users')
            .doc(gotUser.uid)
            .collection('usersessions')
            .add({
              title: title,
              description: description,
              category: category,
              characterNumber: characterNumber,
              createdAt: firestore.FieldValue.serverTimestamp(),
              createdBy: gotUser.username,
              favcolor: color
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
      selectedValue={characterNumber}
      onValueChange={(itemValue)=>setCharacterNumber(itemValue)}
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
    <Text style={{paddingLeft: 20}}>Favorite Color</Text>
    <ColorPicker
        color={color}
        onColorChange={()=>setColor(color)}
        sliderSize={40}
        thumbSize={40}
        noSnap={true}
      />
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
  