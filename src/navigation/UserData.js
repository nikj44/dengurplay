
// //UserData = for inputtig data for new Users
// const UserData = (props) => {

//     // const tempName = props.username
//     // console.log('tempname Line',tempName)
  
//     // const [tempUser,setTempUser] = useState(tempName)
//     const submitInfo = async () => {
//       // if all Info is not entered
//       if(!username || !profileNum){
//         alert("Please fill all the details")
//         return
//       }
//       try{
//         //If Doc named "User.Uid" exists, then user is not new
//           await firestore().collection('users').doc(newUid).set({
//             username:username,
//             email:newEmail,
//             uid:newUid,
//             coins:coins,
//             diamonds:diamonds,
//             profileNum:profileNum,
//             })
//             setNewUser(0)
//       }catch(err){
//         alert("Someting went wrong")
//         console.log('Errrr',err)
//       }
//     }
      
//     // useEffect(()=>{
//     //   console.log(tempName)
//     // },[tempName])
  
//       //Component for Profile
//       const ProfilePic = ({item}) => {
//         return (
//           <TouchableOpacity onPress={()=>setProfileNum(item.picOption)}>
//             <View style={{ flex: 1}}>
//             <Image
//             style={{ width: 80, height: 80, borderRadius: 100, borderWidth: 5, margin: 3}}
//             source={item.picUrl} />
//             </View>
//             </TouchableOpacity>
//           )
//         }
  
//       // UserData Return
//     return (
//         <View style={{backgroundColor: '#FFFDD0', flex: 1}}>
//            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#008970', alignSelf: 'center', marginVertical: 10}}>Enter details !!</Text>
//             {/* <View> */}
//               <TextInput
//               label="Username"
//               value={username}
//               onChangeText={(text)=>setUsername(text)}
//               mode="outlined"
//               style={{marginVertical: 10}}
//               />
//             {/* </View> */}
  
//               {/* <View> */}
//               <FlatList
//               keyExtractor={item=> item.picOption}
//               numColumns={4}
//               data={profiledata}
//               renderItem={ProfilePic}
//               style={{alignSelf: 'center'}}
//             />
//               {/* </View> */}
  
//             <Button mode="contained" onPress={()=>submitInfo()}
//             color='#008970' 
//             style={{marginHorizontal: 90, borderRadius: 10, marginBottom:20}}>Continue</Button>
//            </View>
//     )
//   }