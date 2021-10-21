import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Button, LogBox } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from "react-native-vector-icons/Ionicons";
import { showMessage, hideMessage } from "react-native-flash-message";


const Home = ({navigation}) => {
  
    const [sessions,setSessions] = useState(new Array());
    const [sessionsPerLoad] = useState(12)
    const [startAfter,setStartAfter] = useState(Object)
    const [lastPost,setLastPost] = useState(false)
  
  
    //read docs
    const getSessions = async (sessionsPerLoad) => {
  
      const sessionArray = [];
  
      const querySnap = await firestore()
        .collection('sessions')
        .orderBy('createdAt', 'desc')
        .limit(sessionsPerLoad)
        .get()
      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      console.log("KKKIIO",querySnap)
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
        .orderBy('createdAt', 'desc')
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

    const NavigateToHome2 = (item) => {
      console.log("ITEM==",item)
      item.characterNumber > item.participants ? navigation.navigate('Home2', {item})
      : showMessage({
          message: "Simple message",
          type: "info",
        });
    }
  
    const RenderCard = ({item})=>{
      return(
        <TouchableOpacity onPress={()=>NavigateToHome2(item)}>
        <View style={{padding: 10}}>
          <Text>Title= {item.title}</Text>
          <Text>CreatedBy= {item.createdBy}</Text>
          <Text>Description= {item.description}</Text>
          <Text>Category= {item.category}</Text>
          <Text>createdbyuid= {item.createdByUid}</Text>
          <Text>At= {item.createdAt.toLocaleString()}</Text>
          <Text>fav Color= {item.favcolor}</Text>
          <Text>characterNumber= {item.characterNumber}</Text>
          <Text>status= {item.status}</Text>
        </View>
        </TouchableOpacity>
  
      )
    }
  
  
  return(
    <View>
      <FlatList
        data={sessions}
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

export default Home
