import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Button, LogBox } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { showMessage, hideMessage } from "react-native-flash-message";

const Read = ({navigation}) => {
  
    const [sessions,setSessions] = useState(new Array());
    const [sessionsPerLoad] = useState(12)
    const [startAfter,setStartAfter] = useState(Object)
    const [lastPost,setLastPost] = useState(false)
  
  
    //read docs
    const getSessions = async (sessionsPerLoad) => {
  
      const sessionArray = [];
  
      const querySnap = await firestore()
        .collection('main')
        .orderBy('createdAt', 'asc')
        .limit(sessionsPerLoad)
        .get()
      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
  
      querySnap.forEach((doc)=> {
        let sessionData = doc.data()
        sessionData.sessionID = doc.id
        sessionArray.push(sessionData)
      })
      console.log('poppy', sessionArray)
      return {sessionArray, lastVisible}
    }
  
    const getMoreSessions = async (startAfter,sessionsPerLoad) => {
  
      const sessionArray = [];
  
      const querySnap = await firestore()
        .collection('sessions')
        .orderBy('createdAt', 'asc')
        .startAfter(startAfter)
        .limit(sessionsPerLoad)
        .get()
      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
  
      querySnap.forEach((doc)=> {
        let sessionData = doc.data()
        sessionData.sessionID = doc.id
        sessionArray.push(sessionData)
      })
      return {sessionArray, lastVisible}
    }
  
    useEffect(()=>{
      getSession()
      return () => {
        setSessions({}); // This worked for me
      };
    },[])
  
    const getSession = async () => {
      const sessionsData = await getSessions(sessionsPerLoad)
      setSessions([...sessions, ...sessionsData.sessionArray])
      // console.log('Sessions',sessions)
      setStartAfter(sessionsData.lastVisible)
      // console.log('Last VIsible',sessionsData.lastVisible)
    }
  
    const getMoreSession = async () => {
      if(!lastPost){
        const sessionsData = await getMoreSessions(startAfter,sessionsPerLoad)
        setSessions([...sessions, ...sessionsData.sessionArray])
        // console.log('More Session',sessions)
        setStartAfter(sessionsData.lastVisible)
        sessionsData.sessionArray.length==0 ? setLastPost(true):setLastPost(false)
      }
    }

    const SPACING = 20
    const RenderCard = ({item})=>{
      return(
        <TouchableOpacity onPress={()=>navigation.navigate('Read2', {item})}>
        <View 
          style={{backgroundColor: '#FFFDD0', marginBottom: SPACING/2, borderRadius: 10, borderWidth: 0.5, borderColor: '#748f8a',
          shadowColor: "008970", 
          shadowOpacity: 0.3,
          shadowRadius: 2,
          elevation: 3,
          shadowOffset: {
            width: 0,
            height: 10,
          },
          padding: 10,
        }}
        >
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#008970'}} numberOfLines={1}>{item.title}</Text>
          <Text style={{fontSize: 15, fontWeight: 'normal', color: '#000000', justifyContent: 'center', backgroundColor: '#99eedf', alignSelf: 'flex-start', borderRadius: 20, paddingHorizontal: 10,}}>{item.category}</Text>
          <Text style={{fontSize: 15, fontWeight: '300', color: "#000000", paddingHorizontal: 20}} numberOfLines={2}>{item.description}</Text>
        </View>
        </TouchableOpacity>
  
      )
    }
  
  
  return(
    <View style={{backgroundColor: '#99eedf', flex: 1}}>
      <FlatList
        data={sessions}
        contentContainerStyle={{
          padding: SPACING/2
        }}
        renderItem={({item})=><RenderCard item={item} />}
        keyExtractor={(item)=>item.sessionID+new Date()}
        onEndReached={getMoreSession}
        onEndReachedThreshold={0.01}
        scrollEventThrottle={150}
        ListFooterComponent={()=>
          !lastPost && <ActivityIndicator />}
       />
       </View>
  );
}

export default Read
