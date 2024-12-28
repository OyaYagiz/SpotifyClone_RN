import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import GoogleLogoSvg from '../svg/google-icon.svg';
import FacebookLogoSvg from '../svg/facebook.svg';
import AppleLogoSvg from '../svg/apple-logo.svg';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>

        {/* Spotify Logo */}
        <Entypo name="spotify" color="white" size={80} style={styles.spotifyLogo} />

        <Text style={styles.loginTitle}>
          Millions of Songs. Free on Spotify!
        </Text>
        <View style={{height: 30}} />
        {/* Spotify Login Button */}
        <Pressable style={styles.loginButton}
        onPress={() => navigation.navigate('Main')}>
          <Text style={styles.loginButtonText}>Sign In with Spotify</Text>
        </Pressable>

        {/* Google Login Button */}
        <Pressable style={styles.button}>
          <GoogleLogoSvg width={24} height={24} />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </Pressable>

        {/* Facebook Login Button */}
        <Pressable style={styles.button}>
          <FacebookLogoSvg width={24} height={24} />
          <Text style={styles.buttonText}>Continue with Facebook</Text>
        </Pressable>

        {/* Apple Login Button */}
        <Pressable style={styles.button}>
          <AppleLogoSvg width={24} height={24} />
          <Text style={styles.buttonText}>Continue with Apple</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  spotifyLogo: {
    textAlign: 'center',
    marginBottom: 20,
  },
  loginTitle: {
    color: 'white',
    fontSize: 43,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  
  loginButton: {
    backgroundColor: '#1AD35E',
    padding: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 25,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    
  },
  loginButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#131624',
    padding: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 0.8,
    width: 300,
    marginBottom: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    flex: 1,
  },
});

