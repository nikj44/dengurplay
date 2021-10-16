import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";

const Home2 = ({route, navigation}) => {
    const {item} = route.params
    const [newStatus,setNewStatus] = useState(0)
    const [newParticipants,setNewParticipants] = useState(1)

    const getUser = async () => {

      const user = auth().currentUser;
      if (user) {
        const uid = user.uid
        const userInfo = await firestore().collection('users').
                                           doc(uid).get()
        const username = userInfo._data.username
        return({username, uid})
      }

       else{
         alert('User is not signed in')
       }
    }

    const pressFunction = async (item) => {
      setNewParticipants(item.participants + 1)
      if(newParticipants > 1){
         setNewStatus(1)
      }
      try{
        const gotUser = await getUser()
        firestore().
        collection('main')
        .doc(item.sessionID)
        .set({
            title: item.title,
            description: item.description,
            category: item.category,
            characterNumber: item.characterNumber,
            createdAt: firestore.FieldValue.serverTimestamp(),
            createdBy: item.createdBy,
            createdByUid: item.createdByUid,
            favcolor: item.favcolor,
            status: newStatus,
            participants: newParticipants,
        })

        firestore().
        collection('users')
        .doc(gotUser.uid)
        .collection('ongoing')
        .add({
            title: item.title,
            description: item.description,
            category: item.category,
            characterNumber: item.characterNumber,
            createdAt: firestore.FieldValue.serverTimestamp(),
            createdBy: item.createdBy,
            createdByUid: item.createdByUid,
            favcolor: item.favcolor,
            status: newStatus,
            participants: newParticipants,
        })

      } catch(err){
        console.log("Errr", err)
        alert(err)
      }
      navigation.navigate('Chat2', {item});
    } 

    return (
      <View style={styles.container}>
        <Text>I'm HomeScreen2</Text>
        <Text>Title = {item.title}</Text>
        <Text>Description = {item.description}</Text>
        <Text>ID = {item.sessionID}</Text>
        <Button
          title="Chat"
          onPress={() => {
            pressFunction(item)
          }}
        />
      </View>
    );
}

export default Home2

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });