import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator
} from 'react-native';
import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Chat = ({navigation, route}) => {
    const [sessions,setSessions] = useState(new Array());
    const [loading, setLoading] = useState(true);
  
    const getUser = async () => {
      const user =  auth().currentUser;
      const userInfo = await firestore().collection('users').
                                             doc(user.uid).get()
          const username = userInfo._data.username
          const uid = userInfo._data.uid
          return({username, uid})
    }
  
    const getOngoingSessions = async() => {
      const nowDate = new Date()
      const sessionArray = [];
      const gotUser = await getUser()
  
      const subscriber =  await firestore()
      .collection('users')
      .doc(gotUser.uid)
      .collection('ongoing')
      .onSnapshot(querySnap => {
        const sessionArray = [];

        querySnap.forEach(documentSnap => {
          sessionArray.push({
            ...documentSnap.data(),
            key: documentSnap.id,
          })
        })
        setSessions(sessionArray)
        setLoading(false)
        try{
        querySnap.docChanges().forEach((change)=>{
          if(change.type === "modified"){
            if(change.doc.data().currPar == 0){
              firestore()
              .collection('users')
              .doc(gotUser.uid)
              .collection('ongoing')
              .doc(change.doc.id)
              .delete()
            }

            const minusDate = nowDate - change.doc.data().createdAt.toDate()
            const minusHours = minusDate/3600000
            if (minusHours > 500 && change.doc.data().currPar == 1){
              firestore()
              .collection('users')
              .doc(gotUser.uid)
              .collection('ongoing')
              .doc(change.doc.id)
              .delete()
            }
          }

        })
      }catch{
        console.log('Error at Chat Page HEre')
      }
      })   
    }
  
    // const copySession = async(item) => {
    //   const hello = await getUser()
    //   console.log("jaaa", item)
    //   console.log('Item JaAAA',item)
    //   console.log('title',item.title)
    //   console.log('title',item.description)
    //   console.log('title',item.category)
    //   console.log('title',hello.username)
    //   console.log('title',hello.uid)
    //   console.log('title',item.favcolor)
    //   console.log('title',item.characterNumber)
    //   firestore().
    //         collection('sessions')
    //         .add({
    //           title: item.title,
    //           description: item.description,
    //           category: item.category,
    //           createdAt: firestore.FieldValue.serverTimestamp(),
    //           createdBy: hello.username,
    //           createdByUid: hello.uid,
    //           characterNumber: item.characterNumber,
    //           favcolor: item.favcolor,
    //           status: status,
    //           })
    // }
  
    // const copySessionAlert = (item) => {
    //   Alert.alert(
    //     "Copy this session",
    //     "This session will be as it is copied.",
    //     [{
    //       text: "Sure",
    //       onPress: () => copySession(item),
    //     }]
    //   )
    // }
  
    useEffect(async ()=>{
      await getOngoingSessions()
      return () => subscriber(); // This worked for me
    },[]);
  
    if (loading) {
      return <ActivityIndicator />;
    }

    const RenderCard = ({item})=>{
      return(
        <TouchableOpacity
          onPress={()=>navigation.navigate('Chat2', {item} )}>
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
          // keyExtractor={(item)=>item.sessionID+new Date()}
       />
      </View>);
}

export default Chat

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  
