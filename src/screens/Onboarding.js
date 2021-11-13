import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor,
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace("Auth")}
        onDone={() => navigation.navigate("Auth")}
        pages={[
          {
            backgroundColor: '#008970',
            image: <Image style={{width: 400, height: 200}} source={require('../assets/images/onboarding1.png')} />,
            title: 'Create a new world',
            subtitle: 'Collaborate with others to create your virtual world!',
          },
          {
            backgroundColor: '#FFFDD0',
            image: <Image style={{width: 200, height: 200}} source={require('../assets/images/onboarding2.png')} />,
            title: 'Become someone else',
            subtitle: 'Play different roles and characters',
          },
          {
            backgroundColor: '#59ffe6',
            image: <Image style={{width: 200, height: 220,}} source={require('../assets/images/onboarding3.png')} />,
            title: 'Live alternate life',
            subtitle: "Live different lives in one",
          },
        ]}
      />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});