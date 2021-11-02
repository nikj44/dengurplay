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
          return({username, uid})
    }
  
    const getUserSessions = async () => {
  
      const sessionArray = [];
      const gotUser = await getUser()
  
      const querySnap = await firestore()
      .collection('users')
      .doc(gotUser.uid)
      .collection('usersessions')
      .limit(sessionsPerLoad)
      .get()

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
   
      querySnap.forEach((doc)=>{
        let sessionsData = doc.data()
        sessionsData.sessionID = doc.id
        sessionArray.push(sessionsData)
      })
      const sessionsData = sessionArray
      setSessions([...sessions, ...sessionsData])
      setStartAfter(sessionsData.lastVisible)
    }

    const getMoreUserSessions = async () => {
  
      const sessionArray = [];
      const gotUser = await getUser()
  
      const querySnap = firestore()
      .collection('users')
      .doc(gotUser.uid)
      .collection('usersessions')
      .startAfter(startAfter)
      .limit(sessionsPerLoad)
      .get()
    
      const lastVisible = querySnap.docs[querySnap.docs.length - 1]

      querySnap.forEach((doc)=>{
        let sessionsData = doc.data()
        sessionsData.sessionID = doc.id
        sessionArray.push(sessionsData)
      })
    if(!lastPost){  
      const sessionsData = sessionArray
      setSessions([...sessions, ...sessionsData])
      setStartAfter(sessionsData.lastVisible)
        sessionsData.sessionArray.length==0 ? setLastPost(true):setLastPost(false)
    }
  }

    const copySession = async (item) => {
      const hello = await getUser()

              //set coins= 20* toitalpar
              var coins = 20 * item.totalPar
              //read users coins, if its less, give warning, and ask to reduce totalpar
              await firestore()
              .collection('users')
              .doc(gotUser.uid)
              .get()
              .then(docSnap => {
                console.log('querysnapshot',docSnap)
                // setProfileData(docSnap._data)
                 userCoins = docSnap._data
                 userCoins = userCoins.coins
                 console.log('User Coins2',userCoins)
                })
              // const usercoins = profileData.coins
              console.log('User Coins3',userCoins)
              console.log('COins',coins)
              if(coins > userCoins){
                //show warning
                showMessage({
                  message: "Coins exceeded",
                  description: "Join other rooms to gain coins!😑",
                  type: "warning",
                  duration: 2500,
                });
                navigation.navigate('MainTab')
              }else{

                                      //deduct coins
                      firestore()
                      .collection('users')
                      .doc(gotUser.uid)
                      .update({
                        coins: firestore.FieldValue.increment(-1*coins)
                      })
                      console.log('COins deducted!')

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
                title: title,
                description: description,
                category: category,
                totalPar: totalPar,
                currPar: currPar,
                createdAt: firestore.FieldValue.serverTimestamp(),
                crByUsername: hello.username,
                crByUid: hello.uid,
                crByProfile: hello.profileNum,
                status: status,
                sID: docRef.id
              })
              
    }
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
          onEndReached={getMoreUserSessions}
          onEndReachedThreshold={0.01}
          scrollEventThrottle={150}
          ListFooterComponent={()=>
          !lastPost && <ActivityIndicator />}
       />
      </View>);
}

export default Create3

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  
