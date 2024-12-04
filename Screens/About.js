import React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const About = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity>
          <Image
            source={require('../images/profile.jpeg')}
            style={styles.profileImage}
          />
        </TouchableOpacity>

        <Text style={styles.nameText}>Jeremiah Atoyebi</Text>
        <Text style={styles.contactText}>Abolarin100@gmail.com</Text>
        <Text style={styles.contactText}>08162799456</Text>

        <View style={styles.separator} />

        <Text style={styles.manageAddressesText}>
          I am a skilled React Native Developer with expertise in building
          cross-platform mobile applications. I enjoy creating applications with
          a seamless user experience while maintaining a clean and reuable
          codebase.{' '}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'white',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 20,
  },
  nameText: {
    alignSelf: 'center',
    marginTop: 10,
    color: '#002D3A',
    fontFamily: 'WorkSans_Bold',
    fontSize: 20,
  },
  contactText: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#002D3A',
    fontSize: 16,
  },
  separator: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#AEAEAE',
  },
  manageAddressesText: {
    fontSize: 16,
    fontFamily: 'WorkSans_Bold',
    marginBottom: 10,
    color: '#002D3A',
    justifyContent: 'space-between',
  },
});

export default About;
