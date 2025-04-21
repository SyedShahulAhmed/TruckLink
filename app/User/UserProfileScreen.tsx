import { View, Text, TouchableOpacity, Image, ToastAndroid } from "react-native";
import { FontAwesome5, Feather, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import authService from "../../appwriteconfig"; // Adjust path as needed

const UserProfileScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // ✅ Fetch logged-in user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const account = await authService.getAccount();
        setUser(account);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        ToastAndroid.show("Session expired. Redirecting...", ToastAndroid.SHORT);
        router.replace("/User/UserLogin"); // Redirect if no session
      }
    };

    fetchUser();
  }, []);

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      await authService.logout();
      ToastAndroid.show("Logged out successfully!", ToastAndroid.SHORT);
      router.replace("/ChooseRole"); // Back to role selection or login
    } catch (error) {
      console.error("Logout error:", error);
      ToastAndroid.show("Logout failed!", ToastAndroid.SHORT);
    }
  };

  return (
    <View className="flex-1 bg-white py-6 px-4">
      {/* Profile Header */}
      <View className="items-center mb-4">
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
          className="w-24 h-24 rounded-full mb-2"
        />
        <Text className="text-2xl font-semibold text-[#333]">
          {user ? user.name : "Loading..."}
        </Text>
        <Text className="text-gray-500 mb-3">
          {user ? user.email : "Loading..."}
        </Text>
        <TouchableOpacity className="bg-[#1E90FF] px-4 py-2 rounded-lg">
          <Text className="text-white font-medium text-sm">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Options */}
      <View className="space-y-2 mb-4">
        {[
          { icon: "user", label: "My Details", path: "/details" },
          { icon: "heart", label: "Favourites", path: "/favourites" },
          { icon: "bell", label: "Notifications", path: "/notifications" },
          { icon: "question-circle", label: "Help & Support", path: "/support" },
          { icon: "info-circle", label: "About App", path: "/about" },
          { icon: "shield-alt", label: "Privacy Policy", path: "/privacy" },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center mb-3 bg-[#F5F5F5] p-3 rounded-lg"
            onPress={() => router.push(item.path)}
          >
            <FontAwesome5 name={item.icon} size={18} color="#1E90FF" />
            <Text className="text-lg font-medium text-[#333] ml-3">
              {item.label}
            </Text>
            <Feather name="chevron-right" size={20} color="#bbb" style={{ marginLeft: "auto" }} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        className="w-full bg-[#FF6B6B] py-3 rounded-lg flex-row items-center justify-center mt-6"
      >
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text className="text-white font-medium text-lg ml-2">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfileScreen;
