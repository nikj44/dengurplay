import React from 'react';
// import {useNavigation} from '@react-navigation/native';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';

const Create = ({navigation}) => {
  // const navigation = useNavigation();
  return (
    <View style={styles.styler}>
    <Text>Create your RP World!!</Text>
    <Button title="Create New" onPress={()=>navigation.push('Create2')} />
    <Text style={styles.text}>--- OR ---</Text>
    <Button title="Copy from previous session" onPress={() => navigation.push('Create3')} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Create
