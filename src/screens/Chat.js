import React, {useState, useEffect} from 'react';
import {
  View,
  Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, Image
} from 'react-native';
import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { picFunction } from '../data/profiledata';

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
        // try{

        querySnap.docChanges().forEach(async (change)=>{
          if(change.type === "modified"){
            if(change.doc.data().currPar == 0){
              firestore()
              .collection('users')
              .doc(gotUser.uid)
              .collection('ongoing')
              .doc(change.doc.id)
              .delete()
            }
            
            const minusDate = nowDate - await change.doc.data().createdAt.toDate()
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

    const SPACING = 20
    const AVATAR_SIZE = 60
    const RenderCard = ({item})=>{
      return(
        <TouchableOpacity
          onPress={()=>navigation.navigate('Chat2', {item} )}>
        <View style={{backgroundColor: '#FFFDD0', marginBottom: SPACING/2, borderRadius: 10, borderWidth: 0.5, borderColor: '#748f8a',
              shadowColor: "008970", 
              shadowOpacity: 0.3,
              shadowRadius: 2,
              elevation: 3,
              shadowOffset: {
                width: 0,
                height: 10,
              }
          }}>
          <View style={{padding: 10, flexDirection: 'row',}}>
           <Image
              style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: 100, borderWidth: 5, marginRight: SPACING}}
              source={picFunction(item.crByProfile)} 
            />
            <View>
              <Text style={{fontSize: 14, fontWeight: 'normal', color: '#748f8a' }}>{item.crByUsername}</Text>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: '#008970'}} numberOfLines={1}>{item.title}</Text>
              {/* <View style={{ justifyContent: 'center'}}> */}
              <Text style={{fontSize: 15, fontWeight: 'normal', color: '#000000', justifyContent: 'center', backgroundColor: '#59ffe6', alignSelf: 'flex-start', borderRadius: 20, paddingHorizontal: 10,}}>{item.category}</Text>
              {/* </View> */}
             </View>
           </View>    
            <Text style={{fontSize: 15, fontWeight: '300', color: "#000000", paddingHorizontal: 20}} numberOfLines={2}>{item.description}</Text>
              {/* horizontal line */}
              <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>
                <View style={{flex: 1, height: 0.5, backgroundColor: '#748f8a',}} />
                {/* <View>
                  <Text style={{width: 50, textAlign: 'center'}}></Text>
                </View> */}
                {/* <View style={{flex: 1, height: 1, backgroundColor: 'black'}} /> */}
                </View>
                
            {/* <Text>createdbyuid= {item.crByUid}</Text> */}
            {/* <Text>Profile= {item.crByProfile}</Text> */}
            <View style={{flexDirection: 'row', marginVertical: 10, justifyContent: 'space-evenly', }}>
               <Text>{item.currPar} out of {item.totalPar} Players</Text>
               <Text style={{color: '#008970'}}>{item.currPar == 1 ? `Active` : 'Ongoing'}</Text>
            </View>
            {/* <Text>presentNumber= {item.currPar}</Text> */}
            {/* <Text>status= {item.status}</Text> */}
            {/* <Text>sessionID= {item.sessionID}</Text> */}
            </View>
        </TouchableOpacity>
      )
    }
  
    return(
      <View style={{backgroundColor: '#59ffe6', flex: 1}}>
       <FlatList
          data={sessions}
          contentContainerStyle={{
            padding: SPACING/2
          }}
          renderItem={({item})=><RenderCard item={item} />}
          // keyExtractor={(item)=>item.sessionID+new Date()}
       />
      </View>);
}

export default Chat

