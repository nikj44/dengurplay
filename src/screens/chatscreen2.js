/* @flow weak */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const ChatScreen = ({}) => (
  <View style={styles.container}>
    <Text>I'm ChatScreen2</Text>
  </View>
);

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
