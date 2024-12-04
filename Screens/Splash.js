import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Text, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const Splash = () => {
  const navigation = useNavigation();
  const getRef = useRef(null);
  const yourRef = useRef(null);
  const fadeValue = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeIn = Animated.timing(fadeValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    });

    const slideUp = Animated.timing(translateY, {
      toValue: -1000,
      duration: 1000,
      useNativeDriver: true,
    });

    const animateText = async () => {
      await getRef.current.animate(
        [
          {opacity: 0, translateX: -200},
          {opacity: 1, translateX: 0},
        ],
        500,
      );

      await yourRef.current.animate(
        [
          {opacity: 0, translateX: 200},
          {opacity: 1, translateX: 0},
        ],
        1000,
      );

      Animated.sequence([fadeIn, slideUp]).start(() => {
        navigation.navigate('Login');
      });
    };

    animateText();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        
        <Animated.View
          style={[
            styles.textContainer,
            { transform: [{translateY}]},
          ]}>
          <Animatable.Text ref={getRef} style={styles.text}>
          Hacker
        </Animatable.Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.textContainer,
            {opacity: fadeValue, transform: [{translateY}]},
          ]}>
          <Animatable.Text ref={yourRef} style={styles.text}>
            News
          </Animatable.Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0096C1FA',
  },

  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontFamily: 'WorkSans_Bold',
    color: 'white',
    marginBottom: 16,
    opacity: 0,
    marginHorizontal: 2.5,
  },
});

export default Splash;
