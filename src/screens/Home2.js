import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";

const Home2 = ({route, navigation}) => {
    const {item} = route.params
    console.log('item from home 2',item)
    const [newStatus,setNewStatus] = useState(0)
    const [totalPar,setTotalPar] = useState(1)
    // const [currPar,setCurrPar] = useState(0)

    const getUser = async () => {

      const user = auth().currentUser;
      if (user) {
        const uid = user.uid
        const userInfo = await firestore().collection('users').
                                           doc(uid).get()
        const username = userInfo._data.username
        return({username, uid})
      }

       else{
         alert('User is not signed in')
       }
    }

    const pressFunction = async (item) => {
      // setCurrPar(item.currPar + 1)
      // if(currPar > 1){
      //    setNewStatus(1)
      // }
      try{
        const gotUser = await getUser()
        console.log('ITEM KEY1',item.key)
      //   //if doc is there already then get current user, and 
      //   // add + 1 to it, else write full document with current user =1
      //   if(
      //     firestore()
      //     .collection('main')
      //     .doc(item.key)
      //     .get()
      //     .then((doc)=> {
      //       if (doc.exists) {
      //         const sessionData = doc.data()
      //         const current = sessionData.currentPar
      //         setCurrPar(current)
      //       }else {
                                                      firestore().
                                                      collection('main')
                                                      .doc(item.key)
                                                      .set({
                                                          title: item.title,
                                                          description: item.description,
                                                          category: item.category,
                                                          currPar: item.currPar,
                                                          createdAt: firestore.FieldValue.serverTimestamp(),
                                                          crByUsername: item.crByUsername,
                                                          crByUid: item.crByUid,
                                                          status: newStatus,
                                                          totalPar: item.totalPar,
                                                          // currentPar: 
                                                      })
        //     }
        //   })
        // )

        firestore()
        .collection('sessions')
        .doc(item.key)
        .update({
          currPar: firestore.FieldValue.increment(1)
        })


        firestore().
        collection('users')
        .doc(gotUser.uid)
        .collection('ongoing')
        .doc(item.key)
        .set({
            title: item.title,
            description: item.description,
            category: item.category,
            currPar: item.currPar,
            createdAt: firestore.FieldValue.serverTimestamp(),
            crByUsername: item.crByUsername,
            crByUid: item.crByUid,
            // status: newStatus,
            totalPar: item.totalPar,
        })

        //if session already exists in users. ongoing, then dont increment coins, else increment coins
        //20 coins
        await firestore()
        .collection('users')
        .doc(gotUser.uid)
        .collection('ongoing')
        // .doc(item.key)
        .get()
        .then(doc => {
          if(!doc.exists){
            firestore()
            .collection('users')
            .doc(gotUser.uid)
            .update({
              coins: firestore.FieldValue.increment(20)
            })
          }
        })

      } catch(err){
        console.log("Errr", err)
        alert(err)
      }
      navigation.navigate('Chat3', {item});
    } 

    return (
      <View style={styles.container}>
        <Text>I'm HomeScreen2</Text>
        <Text>Title = {item.title}</Text>
        <Text>Description = {item.description}</Text>
        <Text>ID = {item.key}</Text>
        <Button
          title="Chat"
          onPress={() => {
            pressFunction(item)
          }}
        />
      </View>
    );
}

export default Home2

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });