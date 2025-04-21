import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

const DriverHomeScreen = () => {
  const router = useRouter();
  const pathname = usePathname(); // Track the current route

  return (
    <View className="flex-1 bg-[#F9F9F9] py-6 justify-start items-center">
      {/* Header Section */}
      <Text className="text-4xl font-bold text-[#1E3A8A] text-center mb-2 tracking-tight drop-shadow-md">
        Welcome Back, Driver 🚚
      </Text>
      <Text className="text-[#4A5C82] text-center mb-6 text-lg opacity-80 italic">
        Let’s hit the road and boost your earnings!
      </Text>

      {/* Truck Image */}
      <View className="relative w-[90%] h-60 mb-6 rounded-2xl overflow-hidden shadow-lg">
        <Image
          source={require('../../assets/truckdriver.jpg')}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute top-0 left-0 w-full h-full bg-black/20" />
      </View>

      {/* Add Truck Availability Button */}
      <TouchableOpacity
        onPress={() => router.push("/Driver/AddTruck")}
        className="w-[90%] bg-[#1E90FF] py-4 rounded-xl flex-row items-center justify-center px-4 mb-4 shadow-md"
      >
        <Text className="text-white font-semibold text-xl mr-2">
          Add Truck Details
        </Text>
        <FontAwesome5 name="truck" size={24} color="white" />
      </TouchableOpacity>

      {/* Earnings Section */}
      <View className="w-[90%] bg-[#FFCC00] p-5 rounded-xl mb-6 flex-row items-center shadow-md">
        <Image
         source={require('../../assets/earningimg.png')}
          className="w-16 h-16 mr-4"
          resizeMode="contain"
        />
        <View>
          <Text className="text-lg font-medium text-[#2E3A59]">
            Your Total Earnings
          </Text>
          <Text className="text-4xl font-bold text-[#E63946] mt-1">
            ₹12,540
          </Text>
          <Text className="text-[#4A5C82] mt-1 italic text-sm">
            Keep going — more jobs ahead! 🚀
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DriverHomeScreen;
