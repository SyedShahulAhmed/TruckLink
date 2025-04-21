import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import authService from '../../appwriteconfig'; // ✅ Adjust this path based on your folder structure

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  const handleLogin = async () => {
    try {
      // 🔍 Try to get the current account
      const currentSession = await authService.getAccount();
  
      if (currentSession) {
        router.replace('/User/UserLayout'); // ⬅️
        return;
      }
    } catch (error) {
      // If no session exists, proceed with login
      try {
        await authService.login(email, password);
        const user = await authService.getAccount();
        showToast('Login successful!');
        router.replace('/User/UserLayout');
      } catch (loginErr) {
        showToast('Login failed. Check credentials.');
      }
    }
  };
  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold text-blue-600 mb-8">User Login</Text>

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

      {/* Sign up link */}
      <Link href="/User/UserSignup" className="mt-4">
        <Text className="text-blue-500 underline">Don't have an account? Sign up</Text>
      </Link>
    </View>
  );
};

export default UserLogin;
