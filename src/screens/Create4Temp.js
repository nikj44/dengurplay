import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Create3 = () => {
    const [sessions,setSessions] = useState(new Array());
    const [status, setStatus] = useState(0);
    const [currPar,setCurrPar] = useState(0);
    const [sessionsPerLoad] = useState(12)
    const [startAfter,setStartAfter] = useState(Object)
    const [lastPost,setLastPost] = useState(false)

    // const [sessionID,setSessionID] = useState('')
  
    const getUser = async () => {
      const user =  auth().currentUser;
      const userInfo = await firestore().collection('users').
                                             doc(user.uid).get()
          const username = userInfo._data.username
          const uid = userInfo._data.uid
          const profileNum = userInfo._data.profileNum
          return({username, uid, profileNum})
    }
  
    const getUserSessions = async (sessionsPerLoad) => {
  
      const sessionArray = [];
      const gotUser = await getUser()
  
      const querySnap = await firestore()
      .collection('users')
      .doc(gotUser.uid)
      .collection('usersessions')
      .limit(sessionsPerLoad)
      .get()
    
      // console.log('Last Visible 0 = ',lastVisible)
      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      // console.log('Last Visible 1= ',lastVisible)

      querySnap.forEach((doc)=> {
        let sessionData = doc.data()
        sessionData.sessionID = doc.id
        sessionArray.push(sessionData)
      })
      // console.log('poppy', sessionArray)
      return {sessionArray, lastVisible}
    }

    const getMoreUserSessions = async (startAfter,sessionsPerLoad) => {
  
      const sessionArray = [];
      const gotUser = await getUser()
  
      const querySnap1 = await firestore()
      .collection('users')
      .doc(gotUser.uid)
      .collection('usersessions')
      .startAfter(startAfter)
      .limit(sessionsPerLoad)
      .get()
    
      const lastVisible = querySnap1.docs[querySnap1.docs.length - 1]
      console.log('Last Visible 2= ',lastVisible)

      querySnap1.forEach((doc)=> {
        let sessionData = doc.data()
        sessionData.sessionID = doc.id
        sessionArray.push(sessionData)
      })
      return {sessionArray, lastVisible}
    }

    useEffect(()=>{
        getUserSession()
      },[])

      const getUserSession = async () => {
        const sessionsData = await getUserSessions(sessionsPerLoad)
        setSessions([...sessions, ...sessionsData.sessionArray])
        // console.log('Sessions',sessions)
        setStartAfter(sessionsData.lastVisible)
        // console.log('Last VIsible',sessionsData.lastVisible)
      }
    
      const getMoreUserSession = async () => {
        if(!lastPost){
          const sessionsData = await getMoreUserSessions(startAfter,sessionsPerLoad)
          setSessions([...sessions, ...sessionsData.sessionArray])
          // console.log('More Session',sessions)
          setStartAfter(sessionsData.lastVisible)
          sessionsData.sessionArray.length==0 ? setLastPost(true):setLastPost(false)
        }
      }

    const copySession = async (item) => {
      const hello = await getUser()

      const docRef = await firestore()
            .collection('sessions')
            .add({
              title: item.title,
              description: item.description,
              category: item.category,
              createdAt: firestore.FieldValue.serverTimestamp(),
              crByUsername: hello.username,
              crByUid: hello.uid,
              crByProfile: hello.profileNum,
              totalPar: item.totalPar,
              currPar: currPar,
              status: status,
              })

              //Add in User=> Ongoing for Chat Tab
              await firestore()
               .collection('users')
              .doc(hello.uid)
              .collection('ongoing')
              .add({
                title: item.title,
                description: item.description,
                category: item.category,
                totalPar: item.totalPar,
                currPar: currPar,
                createdAt: firestore.FieldValue.serverTimestamp(),
                crByUsername: hello.username,
                crByUid: hello.uid,
                crByProfile: hello.profileNum,
                status: status,
                sID: docRef.id
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
  
    const RenderCard = ({item})=>{
      return(
        <TouchableOpacity onPress={()=> copySessionAlert(item)}>
        <View style={{padding: 10}}>
          <Text>Title= {item.title}</Text>
          <Text>Description= {item.description}</Text>
        </View>
        </TouchableOpacity>
      )
    }
  
    return(
      <View style={styles.container}>
       <FlatList
          data={sessions}
          renderItem={({item})=><RenderCard item={item} />}
          keyExtractor={(item)=>item.sessionID}
          onEndReached={getMoreUserSession}
          onEndReachedThreshold={0.01}
          scrollEventThrottle={150}
          ListFooterComponent={()=>
          !lastPost && <ActivityIndicator />}
       />
      </View>
    );
}

export default Create3

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  
//Big Change
