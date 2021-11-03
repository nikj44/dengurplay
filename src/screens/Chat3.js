import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet, Button, Modal} from 'react-native';
import { GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat'
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

const Chat3 = ({navigation, route}) => {
    // console.log("mooko", route)
    const [messages, setMessages] = useState([]);
    const {item} = route.params
    const createdByUid = item.crByUid
    const sessionID = item.key
    // console.log('item session id',item)
    const [modalOpen,setModalOpen] = useState(false);
  
    const user =  auth().currentUser
    const userUid = user.uid
  
    // const getAllMessages = async () => {
    //   const querySnap = await firestore().collection('main')
    //   .doc(sessionID)
    //   .collection('messages')
    //   .orderBy('createdAt','desc')
    //   .get()
    // const allmsg = querySnap.docs.map(docSnap=>{
    //   return{
    //     ...docSnap.data(),
    //     createdAt:docSnap.data().createdAt.toDate()
    //   }
    //   })
    //   setMessages(allmsg)
    // }
    useEffect(async () => {
      // getAllMessages()
      console.log('first session id',sessionID)
       const messageRef = await firestore().collection('main')
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
          return () => {
            setMessages({}); // This worked for me
          };
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
       console.log('second session id',sessionID)
       firestore()
       .collection('main')
       .doc(sessionID)
       .collection('messages')
       .add({...mymsg,createdAt:firestore.FieldValue.serverTimestamp()})
      }

      const userleaves = () => {
        
                  //delete session from users ongoing session
        firestore()
        .collection('users')
        .doc(user.uid)
        .collection('ongoing')
        .doc(sessionID)
        .delete()

        console.log('ITEM KEY',item.key)
        firestore()
        .collection('sessions')
        .doc(item.key)
        .update({
        currPar: firestore.FieldValue.increment(-1)
        })


        try{
          navigation.navigate('MainTab')
          console.log('navigation success')
        }catch{
          console.log('navigation failed')
        }

        //no need to use participants = left = 0 or 1
        //read current # of participants for session
        //and substract participants -1
        //if particiapnts  <1 then remoce it from homescreen as well
        // firestore()
        // .collection(main)
        // .doc(sessionID)
        // .get()

      }

    return(
      <>
      <View style={{flex:0.12, flexDirection:"row"}}>
        <Text style={{marginLeft: 80, fontSize: 20, flex: 0.7, justifyContent:"flex-start" }}>Chat 2 Heading</Text>
        {/* <Button style={{flex: 1, justifyContent:"flex-end"}} title='Hello' /> */}
        <Icon
        name="ellipsis-vertical-outline"
        size={34}
        color="black"
        style={{justifyContent:"flex-end", flex: 0.3, marginLeft: 60}}
        onPress={()=>setModalOpen(true)}/>
      </View>
      <Modal
          animationType='slide'
          transparent={true}
          backdropColor = {'white'}
          backdropOpacity = {1}
          style={styles.modalContainer}
          visible={modalOpen}
          >
            <View style={styles.modalContent}>
              <Icon name='close-circle-outline'
                size={24}
                onPress={()=>setModalOpen(false)} />
                <Button 
                  title="Leave Chat"
                  onPress={()=>userleaves()}
                  style={{margin: 100}}
                  />
                  <Button 
                    title="Stay"
                    onPress={()=>setModalOpen(false)}
                    style={{margin: 100}}
                    />
              {/* <Text>
                Hello from the Modal
              </Text> */}
            </View>
          </Modal>
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
            },
            left: {
              backgroundColor: "blue"
            }
          }}
        />
            }}
            renderInputToolbar={(props)=>{
         //Add the extra styles via containerStyle
        return <InputToolbar {...props}
        containerStyle={{borderTopWidth: 1.5, borderTopColor: 'green'}}
        textInputStyle={{ color:"black" }}
        />
      }}
        />
        </>
    );
}

export default Chat3

const styles = StyleSheet.create({
  modalContent: {
    flex: 0,
    height: 200,
    width: 250,
    // padding: 22,
    // justifyContent: "center",
    alignItems: "center",
    // borderRadius: 4,
    // borderColor: "blue",
    backgroundColor: '#00ffff',
    margin: 50,
  },
  // modalContainer: {
  //   backgroundColor: 'blue',
    // padding: 20,
  //   height: 200,
  //   width: 250,
  //   flex: 0,

  // }
})

//create leave status particiapants function 
//cretae modal                                                  - Done     
//modal working                                                 - Done
//create onsnapshot in other than home pages
// on homepage onsnapshot will be there 
//alert cancel functioanlity
//profile pic show everywhere
//stop badwords in chat                                         - Done
//show username in chat
//auth only google
//create activity indicator custom and use everywhere
//work on ui
//create comments everywhere
//show profile pic in profile tab
//test everything
//chat message color - take some common color
//coin system - + color ( more coins to highligh the session)                                       
// ads
//inapp purchases - lets do inapp next release only ads this time - Done)

// userleaves me problem aa rahi
// home 2 aur chat se chat 2 par pahuch rahe hai 
// so make two chat2 one for home and one for chat tab