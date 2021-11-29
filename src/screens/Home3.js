import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Button, LogBox, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from "react-native-vector-icons/Ionicons";
import { showMessage, hideMessage } from "react-native-flash-message";
import auth from '@react-native-firebase/auth';
import { picFunction } from '../data/profiledata';
// import PushNotification from "react-native-push-notification";


const Home3 = ({navigation}) => {

    const [sessions,setSessions] = useState(new Array())
    const [loading, setLoading] = useState(true);

    const user =  auth().currentUser;
    const uid = user.uid
    
    const getSessions = async () => {
        const nowDate = new Date()
        const subscriber =  await firestore()
        .collection('sessions')
        .orderBy('createdAt','desc')
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

          //change type webverison 8 
          //https://firebase.google.com/docs/firestore/query-data/listen#web-version-8_4
           querySnap.docChanges().forEach(async (change)=>{
            if(change.type === "modified") {
              // console.log('Got changes in documents !')
              // console.log("Modified city: ", change.doc.data())
              // console.log('Changed doc',change.doc.id)
              if(change.doc.data().currPar == 0){
                 firestore()
                .collection('sessions')
                .doc(change.doc.id)
                .delete()
              }

              try{
                const minusDate = nowDate - await change.doc.data().createdAt.toDate()
                const minusHours = minusDate/3600000
                if (minusHours > 24 && change.doc.data().currPar == 1){
                   firestore()
                  .collection('sessions')
                  .doc(change.doc.id)
                  .delete()
                }
              }catch(err){
                console.log('Error is in Home 3 Here',err)
              }


              // console.log('todate',change.doc.data().createdAt.toDate() )
              // console.log('todate',nowDate)
              // console.log('date-minus',nowDate - change.doc.data().createdAt.toDate())
              // console.log('date-div1',nowDate - change.doc.data().createdAt.toDate()%(1000*60*60))

              // console.log('date-floor',Math.floor(nowDate - change.doc.data().createdAt.toDate()/1000*60*60))
              // console.log('date-div1',minusDate/(3600000))
              // console.log('date-div1',nowDate - change.doc.data().createdAt.toDate()/(10000))
              // if(change.doc.data().currPar == 1 && nowDate - change.doc.data().createdAt.toDate() > )
            }
          })
        })        
    }


    useEffect(async ()=>{
        await getSessions()
        return () => subscriber(); // This worked for me
        return () => getSessions({});
      },[]);

          
  if (loading) {
    return <ActivityIndicator />;
  }

  const NavigateToHome2 = (item, uid) => {
    console.log("ITEM==",item)
    if(uid == item.crByUid){
      showMessage({
        message: "You only created this room",
        description: "Join this room from Chats",
        type: "warning",
      }); 
    }else if(item.currPar >= item.totalPar){
      showMessage({
            message: "Room is full",
            description: "Pls wait or join other rooms",
            type: "warning",
          });
    }else if(item.totalPar > item.currPar){
      navigation.navigate('Home2', {item})
    }
    // item.totalPar > item.currPar ? navigation.navigate('Home2', {item})
    // : showMessage({
    //     message: "Room is full",
    //     description: "Pls wait or join other rooms",
    //     type: "warning",
    //   });
  }
    

      // const handleNotification = () => {
    //   PushNotification.localNotificationSchedule({
    //     channelId: "test-channel",
    //     title: "Start your story room!",
    //     message: "Create and collab woth others on your imagination!",
    //     bigText: "Enjoy your story time!",
    //     color: "green",

    //     allowWhileIdle: false,
    //   })
    // }
      const SPACING = 20
      const AVATAR_SIZE = 60

      const RenderCard = ({item})=>{
        console.log('pickk',picFunction(item.crByProfile))
        return(
          <TouchableOpacity onPress={()=>NavigateToHome2(item, uid)}>
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
            // keyExtractor={(item)=>item.sessionID}
           />
           </View>
      );
}

export default Home3
