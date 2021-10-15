/* @flow weak */

import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const SignupScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [coins, setCoins] = useState(200);
    const [diamonds, setDiamonds] = useState(0);

    if(loading){
      return <ActivityIndicator size="large" color="green"/>
    }

    const userSignup = async () => {
      setLoading(true)
      if(!email || !password || !username){
        alert("Please fill all the details")
        return
      }
      try{
        const result = await auth().createUserWithEmailAndPassword(email, password)
          firestore().collection('users').doc(result.user.uid).set({
            username:username,
            email:result.user.email,
            uid:result.user.uid,
            coins:coins,
            diamonds:diamonds,
            })
            setLoading(false)
      }catch(err){
        alert("Someting went wrong")
        console.log('Errrr',err)
        setLoading(false)
      }
    }

      return(
        <KeyboardAvoidingView behavior="position">
        <View style={styles.box1}>
          <Text style={styles.text}>Welcome to Dengur Play</Text>
          <Image style={styles.img} source={require('../assets/images/dengur.png')} />
        </View>
        <View style={styles.box2}>
          <TextInput
            label="Username"
            value={username}
            onChangeText={(text)=>setUsername(text)}
            mode="outlined"
            />
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text)=>setEmail(text)}
            mode="outlined"
            />
          <TextInput
            label="Password"
            value={password}
            onChangeText={(text)=>setPassword(text)}
            secureTextEntry
            mode="outlined"
            />
            <Button
              mode="contained"
              onPress={()=>userSignup()}
            >Signup</Button>
            <TouchableOpacity onPress={() => {navigation.goBack()}}><Text style={{textAlign: "center"}}>Already have an account ?</Text></TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      );
};

export default SignupScreen;

const styles = StyleSheet.create({
  box1: {
    alignItems: "center"
  },
  box2: {
    paddingHorizontal: 40,
    justifyContent: "space-evenly",
    height: "50%"
  },
  text: {
    fontSize: 24,
    color: 'green',
    margin: 10
  },
  img: {
    width: 200,
    height: 200
  }
});
