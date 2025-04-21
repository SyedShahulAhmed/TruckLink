import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";


const ChooseRole = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gradient-to-br from-blue-200 to-blue-400 p-4">
      {/* Top Half - Image */}
      <View className="flex-1 justify-center items-center mb-4">
        <Image  
        source={require('../assets/chooserole.png')}className="w-full h-full" resizeMode="contain" />
      </View>

      {/* Bottom Half - Content */}
      <View className="flex-1 justify-start items-center px-4">
        {/* Title */}
        <Text className="text-4xl font-bold text-gray-800 mb-3 text-center leading-snug">
          How Would You Like to Proceed?
        </Text>

        {/* Description */}
        <Text className="text-lg text-gray-600 mb-6 text-center">
          Choose your role to continue:
        </Text>

        {/* Truck Driver Button */}
        <TouchableOpacity
          onPress={() => router.push("/Driver/DriverLogin")}
          className="w-4/5 bg-blue-600 py-4 rounded-full mb-4"
          style={{ elevation: 0, borderWidth: 1, borderColor: "#ffffff50" }}
        >
          <Text className="text-white text-center font-semibold text-xl tracking-wide">
            🚛 Truck Driver
          </Text>
        </TouchableOpacity>

        {/* User Button */}
        <TouchableOpacity
          onPress={() => router.push("/User/UserLogin")}
          className="w-4/5 bg-green-500 py-4 rounded-full"
          style={{ elevation: 0, borderWidth: 1, borderColor: "#ffffff50" }}
        >
          <Text className="text-white text-center font-semibold text-xl tracking-wide">
            👤 User
          </Text>
        </TouchableOpacity>

        {/* Subtle Footer Text */}
        <Text className="text-gray-500 mt-8 text-sm text-center">
          Your choice helps us tailor the best experience for you! 🚀
        </Text>
      </View>
    </View>
  );
};

export default ChooseRole;
