import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const db = SQLite.openDatabase({name: 'UserDatabase.db'});

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setLoading(true);

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Users WHERE email = ? AND password = ?',
        [email, password],
        (_, result) => {
          setLoading(false);

          if (result.rows.length > 0) {
            navigation.replace('Dashboard');
          } else {
            Alert.alert(
              'Login Failed',
              'Invalid credentials, please try again.',
              [{text: 'OK'}],
            );
          }
        },
        error => {
          setLoading(false);
          console.error(error);
          Alert.alert(
            'Error',
            'An error occurred while logging in. Please try again.',
            [{text: 'OK'}],
          );
        },
      );
    });
  };

  const handleSignup = () => {
    navigation.navigate('CreateAccount');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputP}
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          value={password}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye' : 'eye-off'}
            size={22}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0096C1" />
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      )}

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupLink}>Sign up</Text>
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
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
    padding: 8,
    paddingBottom: 20,
  },
  inputP: {
    marginBottom: 16,
    padding: 8,
    width: '90%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderBottomWidth: 1,
    marginTop: 4,
  },
  eyeIcon: {
    padding: 5,
  },
  loginButton: {
    backgroundColor: '#0096C1',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginBottom: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
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

export default Login;
