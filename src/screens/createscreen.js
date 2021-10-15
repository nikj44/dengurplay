import React from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';

const CreateScreen = ({navigation}) => {
  return (
    <View style={styles.styler}>
    <Text>Create your RP World!!</Text>
    <Button title="Create New" onPress={()=>navigation.push('CreateScreen2')} />
    <Text style={styles.text}>--- OR ---</Text>
    <Button title="Copy from previous session" onPress={() => navigation.push('CreateScreen3')} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreateScreen
