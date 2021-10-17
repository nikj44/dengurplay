import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat'
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';

const Read2 = ({route}) => {
    // console.log("mooko", route)
    const [messages, setMessages] = useState([]);
    const {item} = route.params
    const createdByUid = item.createdByUid
    const sessionID = item.sessionID
    const [emergencyText,setEmergencyText] = useState("Emergency Text 4")
  
    const user =  auth().currentUser
    const userUid = user.uid
  
    const getAllMessages = async () => {
      const querySnap = await firestore().collection('sessions')
      .doc(sessionID)
      .collection('messages')
      .orderBy('createdAt','desc')
      .get()
    const allmsg = querySnap.docs.map(docSnap=>{
      return{
        ...docSnap.data(),
        createdAt:docSnap.data().createdAt.toDate()
      }
      })
      setMessages(allmsg)
    }
    useEffect(() => {
      //getAllMessages()
       const messageRef = firestore().collection('sessions')
      .doc(sessionID)
      .collection('messages')
      .orderBy('createdAt','desc')
  
      messageRef.onSnapshot((querySnap)=>{
        const allmsg = querySnap.docs.map(docSnap=>{
          const data = docSnap.data()
          if(data.createdAt){
            return{
              ...docSnap.data(),
              createdAt:docSnap.data().createdAt.toDate()
            }
          }else{
            return{
              ...docSnap.data(),
              createdAt:new Date()
            }
          }
  
          })
          setMessages(allmsg)
        })
      }, [])
  
      const onSend = (messageArray) => {
        // console.log('routes',item)
        // console.log('CreatedByUid',createdByUid)
        // console.log('UserUid',userUid)
  
        const msg = messageArray[0]
        const mymsg = {
          ...msg,
           sentBy:user.uid,
           sentTo:createdByUid,
           createdAt: new Date()
        }
       setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
       firestore()
       .collection('sessions')
       .doc(sessionID)
       .collection('messages')
       .add({...mymsg,createdAt:firestore.FieldValue.serverTimestamp()})
      }
    return(
      <GiftedChat
          messages={messages}
          onSend={text => onSend(text)}
          user={{
            _id: user.uid,
          }}
          renderBubble={(props)=>{
          return <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "green"
            }
          }}
        />
            }}
            minComposerHeight={0}
            maxComposerHeight={0}
            minInputToolbarHeight={0}
            renderInputToolbar={() => null}
        />
    );
}

export default Read2
