/* @flow weak */

import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const HomeScreen2 = ({route, navigation}) => {
  const {item} = route.params
  return (
    <View style={styles.container}>
      <Text>I'm HomeScreen2</Text>
      <Text>Title = {item.title}</Text>
      <Text>Description = {item.description}</Text>
      <Text>ID = {item.sessionID}</Text>
      <Button
        title="Chat"
        onPress={() => {
          navigation.navigate('ChatScreen1', {item});
        }}
      />
    </View>
  );
};

export default HomeScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
