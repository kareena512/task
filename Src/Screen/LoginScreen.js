import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import TextView from '../Components/TextView';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validate = () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Enter a valid email');
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    }

    return valid;
  };

  const handleLogin = () => {
    if (validate()) {
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <LinearGradient colors={['#0a0a0a', '#1c1c1c']} style={styles.gradient}>
        
        <TextView
          text="Login"
          fontSize={32}
          color="#fff"
          fontWeight="700"
          marginBottom={30}
          alignSelf="center"
        />

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {emailError ? (
          <TextView
            text={emailError}
            fontSize={13}
            color="#ff4d4f"
            marginBottom={5}
            marginLeft={10}
          />
        ) : null}

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
        </View>
        {passwordError ? (
          <TextView
            text={passwordError}
            fontSize={13}
            color="#ff4d4f"
            marginBottom={5}
            marginLeft={10}
          />
        ) : null}

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <TextView
            text="Login"
            fontSize={16}
            fontWeight="600"
            color="#000"
            textAlign="center"
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <TextView
            text="Forgot your password?"
            fontSize={14}
            color="#ccc"
            textAlign="center"
            marginTop={15}
          />
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <TextView text="or connect with" color="#999" marginHorizontal={10} />
          <View style={styles.divider} />
        </View>

        <View style={styles.socialIcons}>
          {['f', 'G', 'in'].map((icon, i) => (
            <TouchableOpacity key={i} style={styles.iconCircle}>
              <TextView text={icon} fontSize={18} fontWeight="700" color="#000" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={{ color: '#ccc' }}>
            Don’t have an account?
            <Text style={styles.signUp}> Sign up</Text>
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  inputWrapper: {
    backgroundColor: '#1a1a1a',
    borderRadius: 30,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    color: '#fff',
    height: 50,
  },
  loginButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 14,
    marginTop: 20,
  },
  forgot: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 15,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  or: {
    color: '#999',
    marginHorizontal: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  signUp: {
    color: '#fff',
    fontWeight: '600',
  },
});
