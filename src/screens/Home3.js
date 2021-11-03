import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Button, LogBox } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from "react-native-vector-icons/Ionicons";
import { showMessage, hideMessage } from "react-native-flash-message";
import auth from '@react-native-firebase/auth';
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
           querySnap.docChanges().forEach((change)=>{
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
                const minusDate = nowDate - change.doc.data().createdAt.toDate()
                const minusHours = minusDate/3600000
                if (minusHours > 500 && change.doc.data().currPar == 1){
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
      },[]);

          
  if (loading) {
    return <ActivityIndicator />;
  }

  const NavigateToHome2 = (item, uid) => {
    console.log("ITEM==",item)
    if(uid != item.crByUid){
      showMessage({
        message: "You only created this room",
        description: "Join this room from Chats",
        type: "warning",
      }); 
    }else if(item.currPar == item.totalPar){
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


      const RenderCard = ({item})=>{
        return(
          <TouchableOpacity onPress={()=>NavigateToHome2(item, uid)}>
          <View style={{padding: 10}}>
            <Text>Title= {item.title}</Text>
            <Text>CreatedBy= {item.crByUsername}</Text>
            <Text>Description= {item.description}</Text>
            <Text>Category= {item.category}</Text>
            <Text>createdbyuid= {item.crByUid}</Text>
            {/* <Text>createdAt= {item.createdAt.toLocaleString()}</Text> */}
            <Text>characterNumber= {item.totalPar}</Text>
            <Text>presentNumber= {item.currPar}</Text>
            <Text>status= {item.status}</Text>
            {/* <Text>sessionID= {item.sessionID}</Text> */}
          </View>    
          </TouchableOpacity>
        )
      }

      return(
        <View>
          <FlatList
            data={sessions}
            renderItem={({item})=><RenderCard item={item} />}
            // keyExtractor={(item)=>item.sessionID}
           />
           </View>
      );
}

export default Home3
