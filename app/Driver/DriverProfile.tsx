import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { FontAwesome5, Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import authService from "../../appwriteconfig"; // ✅ Adjust the path if needed

const DriverProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch current logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const account = await authService.getAccount();
        setUser(account);
      } catch (error) {
        console.log("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Handle logout
  const handleLogout = async () => {
    try {
      await authService.logout();
      router.replace("/ChooseRole");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white py-6 px-4">
      {/* Profile Header */}
      <View className="items-center mb-6">
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
          className="w-24 h-24 rounded-full mb-2"
        />
        <Text className="text-2xl font-semibold text-[#333]">
          {user?.name || "Driver"}
        </Text>
        <Text className="text-gray-500 mb-3">{user?.email}</Text>
        <TouchableOpacity className="bg-[#1E90FF] px-5 py-2 rounded-lg shadow-md">
          <Text className="text-white font-medium text-base">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Options */}
      <View className="space-y-3 mb-6">
        {[
          { icon: "id-card", label: "My Details" },
          { icon: "bell", label: "Notifications" },
          { icon: "question-circle", label: "Help" },
          { icon: "info-circle", label: "About" },
          { icon: "shield-alt", label: "Privacy Policy" },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center bg-[#F5F5F5] p-4 rounded-lg shadow-sm"
          >
            <FontAwesome5 name={item.icon} size={20} color="#1E90FF" />
            <Text className="text-lg font-medium text-[#333] ml-4">
              {item.label}
            </Text>
            <Feather
              name="chevron-right"
              size={22}
              color="#bbb"
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        className="w-full bg-[#FF6B6B] py-4 rounded-lg flex-row items-center justify-center shadow-lg"
      >
        <Ionicons name="log-out-outline" size={22} color="white" />
        <Text className="text-white font-semibold text-lg ml-2">
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DriverProfile;
