import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

const profiledata = {
  id: '1',
  username: 'rog1',
  coins: 200,
  diamonds: 5,
  age: 22,
  gender: 'M',
  image: 'https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/tivvhptvbuc6cs3l_1596777854.jpeg'
};

const Profile = ({navigation}) => {
  return(
    <View style={styles.styler}>
      <Text>ID = {profiledata.id}</Text>
      <Text>Hello {profiledata.username}</Text>
      <Text>COINS = {profiledata.coins}</Text>
      <Text>AGE = {profiledata.age}</Text>
      <Text>DIAMONDS = {profiledata.diamonds}</Text>
      <Text>Profile = </Text>
      <Image style={{width: 100, height: 100, borderRadius: 75}} source={require('../assets/images/profile.jpg')} />
      <Button title="Profile2" onPress={() => navigation.push('Profile2')} />
      </View>
      );
  }

  const styles = StyleSheet.create({
    styler: {
      backgroundColor: '#E05D5D',
    }
  });

  export default Profile
