import React, {useEffect,useState} from 'react'
import { Button } from 'react-native'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const Auth = () => {
    const [user,setUser] = useState('')
    const [userEmail, setUserEmail] = React.useState('');
    const [userId, setUserId] = React.useState('');

    googleLogin = async () => {
        try{
              // Get the users ID token
              const { idToken } = await GoogleSignin.signIn();

              // Create a Google credential with the token
              const googleCredential = auth.GoogleAuthProvider.credential(idToken);

              // Sign-in the user with the credential
              return auth().signInWithCredential(googleCredential);
        }catch(error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
              alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
              alert('Signin in progress');
              // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              alert('PLAY_SERVICES_NOT_AVAILABLE');
              // play services not available or outdated
            } else {
              // console.log("Error COde = " || error.code)
              alert('Something other happened');
              // some other error happened
            }
          }
    }

    // useEffect(()=>{

    //     GoogleSignin.configure({
    //         webClientId: '844083278230-cnr2phpqq6hndc0l2jt9js5k38114osi.apps.googleusercontent.com',
    //       }); 

        // const unregister = auth().onAuthStateChanged(userExist=>{
        //     if(userExist) {
        //         console.log('userExsists=',userExist)
        //       // setUser(userExist)
        //       auth().lastSign
        //       // console.log('USer Exists')
        //       // console.log('USER=',user)
        //       // setUserEmail(userExist.email);
        //       // setUserId(userExist.uid);
              
        //     } 
        //     else {
        //       setUser('')
        //       console.log('User doesnt exissts')
        //     }
          // })
    //       return ()=>{
    //         unregister()
    //       }
    // },[]);

    return (
        <Button
          title="Google Sign-In"
          onPress={() => googleLogin().then(() => console.log('Signed in with Google!'))}
        />
      );
}

export default Auth
