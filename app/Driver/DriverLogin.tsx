import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter, Link } from 'expo-router';
import authService from '../../appwriteconfig'; // ✅ Adjust if needed

const DriverLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  // ✅ Auto-redirect if session exists
  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await authService.getAccount();
        if (user) {
          console.log('Session active:', user);
          router.replace('/Driver/DriverLayout');
        }
      } catch (error) {
        console.log('No active session');
      }
    };
    checkSession();
  }, []);

  const handleLogin = async () => {
    try {
      await authService.login(email, password);
      const user = await authService.getAccount();
      console.log('Driver Logged In:', user);
      router.replace('/Driver/DriverLayout');
    } catch (error) {
      console.error('Login error:', error);
      showToast("Login failed. Check credentials.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold text-blue-600 mb-8">Driver Login</Text>

      <TextInput
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-blue-600 w-full py-3 rounded-full"
      >
        <Text className="text-white text-center text-lg font-semibold">
          Login
        </Text>
      </TouchableOpacity>

      {/* Signup Link */}
      <Link href="/Driver/DriverSignup" className="mt-4">
        <Text className="text-blue-500 underline">Don't have an account? Sign up</Text>
      </Link>
    </View>
  );
};

export default DriverLogin;
