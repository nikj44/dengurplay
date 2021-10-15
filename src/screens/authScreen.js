import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const authScreen = ({}) => (
  <View style={styles.container}>
    <Text>I'm authScreent</Text>
  </View>
);

export default authScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
