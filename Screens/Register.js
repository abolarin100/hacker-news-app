import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setEmail,
  setPassword,
  setRegistrationStatus,
} from '../redux/slices/userSlice';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'UserDatabase.db'});

const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const {email, password} = useSelector(state => state.user);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);

    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT);',
      );

      tx.executeSql(
        'INSERT INTO Users (email, password) VALUES (?, ?);',
        [email, password],
        () => {
          dispatch(setRegistrationStatus('success'));
          setLoading(false);
          Alert.alert('Success', 'Account created successfully!');
          navigation.replace('Login');
        },
        (_, error) => {
          dispatch(setRegistrationStatus('error'));
          setLoading(false);
          Alert.alert('Error', 'This email is already registered.');
          console.error(error);
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => dispatch(setEmail(text))}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => dispatch(setPassword(text))}
        value={password}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0096C1" />
      ) : (
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Create account</Text>
        </TouchableOpacity>
      )}

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Already have an account?</Text>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signupLink}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
    padding: 8,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#0096C1',
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    paddingVertical: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0096C1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#0096C1',
    fontSize: 16,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 5,
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '600',
  },
  signupButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  signupLink: {
    fontSize: 14,
    color: '#0096C1',
    fontWeight: '600',
  },
});

export default Register;
