// import React,{useState,useEffect} from 'react';
// import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
// import { TextInput, Button  } from 'react-native-paper';
// import profiledata from '../data/profiledata';
// import firestore from '@react-native-firebase/firestore';


// const UserData = (props) => {

//     const [username, setUsername] = useState('');
//     const [coins, setCoins] = useState(200);
//     const [diamonds, setDiamonds] = useState(0);
//     const [profileNum,setProfileNum] = useState(1);

//     const submitInfo = async () => {
//       if(!username || !profileNum){
//         alert("Please fill all the details")
//         return
//       }
//       try{
//           await firestore().collection('users').doc(props.uid).set({
//             username:username,
//             email:props.email,
//             uid:props.uid,
//             coins:coins,
//             diamonds:diamonds,
//             profileNum:profileNum,
//             })
//       }catch(err){
//         alert("Someting went wrong")
//         console.log('Errrr',err)
//       }
//     }

//     const ProfilePic = ({item}) => {
//       return (
//         <TouchableOpacity onPress={()=>setProfileNum(item.picOption)}>
//           <View style={{ flex: 1}}>
//           {/* <Text>{item.picOption}</Text> */}
//           {/* <Text>{item.picUrl}</Text> */}
//           <Image
//           style={{ width: 80, height: 80, borderRadius: 100, borderWidth: 5}}
//           source={item.picUrl} />
//           </View>
//           </TouchableOpacity>
//         )
//       }

//     return (
//         <View>
//           <View>

//           <Text>Enter details !!</Text>
//           <TextInput
//             label="Username"
//             value={username}
//             onChangeText={(text)=>setUsername(text)}
//             mode="outlined"
//             />
//             {/* <Text>{props.email}</Text>
//             <Text>{props.uid}</Text> */}
//           </View>
//           <View>
//           <FlatList
//               keyExtractor={item=> item.picOption}
//               numColumns={4}
//               // style={{flex: 1}}
//               data={profiledata}
//               renderItem={ProfilePic}
//             />
//             </View>
//             <Button mode="contained" onPress={()=>submitInfo()}>Continue</Button>
//            </View>
//     )
// }

// export default UserData
