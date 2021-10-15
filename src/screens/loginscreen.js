/* @flow weak */

import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';


const LoginScreen = ({navigation}) => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);


if(loading){
  return <ActivityIndicator size="large" color="green"/>
}

const userLogin = async () => {
  setLoading(true)
  if(!email || !password){
    alert("Please fill all the details")
    return
  }
  try{
    const result = await auth().signInWithEmailAndPassword(email, password)
        setLoading(false)
  }catch(err){
    alert("Someting went wrong")
  }
}

return (
  <KeyboardAvoidingView behavior="position">
  <View style={styles.box1}>
    <Text style={styles.text}>Welcome to Dengur Play</Text>
    <Image style={styles.img} source={require('../assets/images/dengur.png')} />
  </View>
  <View style={styles.box2}>
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
        onPress={()=>userLogin()}
      >Login</Button>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}><Text style={{textAlign: "center"}}>Don't have account ?</Text></TouchableOpacity>
  </View>
  </KeyboardAvoidingView>
);
};

export default LoginScreen;

const styles = StyleSheet.create({
  box1: {
    alignItems: 'center',
  },
  box2: {
    paddingHorizontal: 40,
    justifyContent: 'space-evenly',
    height: '50%',
  },
  text: {
    fontSize: 24,
    color: 'green',
    margin: 10,
  },
  img: {
    width: 200,
    height: 200,
  },
});
