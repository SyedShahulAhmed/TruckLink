import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import authService from '../../appwriteconfig'; // ✅ Adjust the path if needed

const DriverSignup = () => {
  const [fullName, setFullName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      return showToast('All fields are required');
    }

    if (password !== confirmPassword) {
      return showToast('Passwords do not match');
    }

    try {
      await authService.createAccount(email, password, fullName);
      showToast('Signup successful!');
      router.replace('/Driver/DriverLayout'); // ✅ Change route as per your driver layout
    } catch (err) {
      console.error('Signup Error:', err);
      showToast('Signup failed');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold text-blue-600 mb-8">Driver Signup</Text>

      <TextInput
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        value={number}
        onChangeText={setNumber}
      />

      <TextInput
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6"
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        onPress={handleSignup}
        className="bg-blue-600 w-full py-3 rounded-full"
      >
        <Text className="text-white text-center text-lg font-semibold">
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DriverSignup;
