import React from 'react';
// import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet} from 'react-native';
import { Button } from 'react-native-paper';

const Create = ({navigation}) => {
  // const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#FFFDD0'}}>
    <Text style={{fontSize: 18, fontWeight: 'bold', color: '#008970', paddingLeft: 70, padding: 20}}>Create your Story Room!!</Text>
    <Button mode='contained' color='#008970' style={{marginHorizontal: 90, borderRadius: 10, }} onPress={()=>navigation.push('Create2')}>Create New</Button>
    <Text style={{margin: 20, alignSelf: 'center'}}>OR</Text>
    <Button mode='contained' color='#008970' style={{marginHorizontal: 20, borderRadius: 10, marginTop: 10}} onPress={() => navigation.push('Create3')} >Copy from previous rooms</Button>
    </View>
  );
};

export default Create

const styles = StyleSheet.create({
  button: {
    color: '#000'
  },
});

