import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, Alert
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Create3 = () => {
    const [sessions,setSessions] = useState(new Array());
  
    const getUser = async () => {
      const user =  auth().currentUser;
      const userInfo = await firestore().collection('users').
                                             doc(user.uid).get()
          const username = userInfo._data.username
          const uid = userInfo._data.uid
          return({username, uid})
    }
  
    const getUserSessions = async() => {
  
      const sessionArray = [];
      const gotUser = await getUser()
  
      const querySnap = await firestore().collection('users')
      .doc(gotUser.uid)
      .collection('usersessions')
      .get()
     
      querySnap.forEach((doc)=>{
        let sessionsData = doc.data()
        sessionsData.sessionID = doc.id
        sessionArray.push(sessionsData)
      })
      const sessionsData = sessionArray
      setSessions([...sessions, ...sessionsData])
    }
  
    const copySession = async(item) => {
      const hello = await getUser()
      console.log("jaaa", item)
      console.log('Item JaAAA',item)
      console.log('title',item.title)
      console.log('title',item.description)
      console.log('title',item.category)
      console.log('title',hello.username)
      console.log('title',hello.uid)
      console.log('title',item.favcolor)
      console.log('title',item.characterNumber)
      firestore().
            collection('sessions')
            .add({
              title: item.title,
              description: item.description,
              category: item.category,
              createdAt: firestore.FieldValue.serverTimestamp(),
              createdBy: hello.username,
              createdByUid: hello.uid,
              characterNumber: item.characterNumber,
              favcolor: item.favcolor
              })
    }
  
    const copySessionAlert = (item) => {
      Alert.alert(
        "Copy this session",
        "This session will be as it is copied.",
        [{
          text: "Sure",
          onPress: () => copySession(item),
        }]
      )
    }
  
    useEffect(()=>{
      getUserSessions()
    },[])
  
    const RenderCard = ({item})=>{
      return(
        <TouchableOpacity
          onPress={()=>copySessionAlert(item)}>
        <View style={{padding: 10}}>
          <Text>Title= {item.title}</Text>
          <Text>Description= {item.description}</Text>
        </View>
        </TouchableOpacity>
      )
    }
  
    return(
      <View style={styles.container}>
        <Text>Hello Jain</Text>
       <FlatList
          data={sessions}
          renderItem={({item})=><RenderCard item={item} />}
          keyExtractor={(item)=>item.sessionID+new Date()}
       />
      </View>);
}

export default Create3

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  
