// app/Driver/DriverTrucks.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { Client, Databases, Account, Query } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67f2633d0020c81c1df0");

const databases = new Databases(client);
const account = new Account(client);

const DATABASE_ID = "6805f5d8002f3dc7748e";
const COLLECTION_ID = "6805f60600379ccd5abe";

const DriverTrucks = () => {
  const router = useRouter();
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const user = await account.get(); // Get logged-in user
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
          Query.equal("ownerId", user.$id),
        ]);
        setTrucks(res.documents);
      } catch (err) {
        console.error("Error fetching trucks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrucks();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F9F9F9]">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#F9F9F9] py-6 px-4">
      <Text className="text-4xl font-bold text-[#1E3A8A] mb-4">My Trucks 🚚</Text>

      {trucks.length > 0 ? (
        <FlatList
          data={trucks}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="bg-white p-4 mb-3 rounded-xl flex-row items-center shadow-md"
              onPress={() => {
                // router.push(`/Driver/TruckDetails/${item.$id}`)
              }}
            >
              <Image
                source={{ uri: item.image }}
                className="w-24 h-24 rounded-lg mr-4"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text className="text-lg font-bold text-[#1E3A8A]">
                  {item.name}
                </Text>
                <Text className="text-sm text-gray-600">Type: {item.type}</Text>
                <Text className="text-sm text-gray-600">Capacity: {item.capacity}</Text>
                <Text className="text-sm text-gray-600">Address: {item.address}</Text>
                <Text
                  className={`mt-1 text-sm font-semibold ${
                    item.isAvailable ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.isAvailable ? "Available ✅" : "Not Available ❌"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text className="text-gray-500 italic mt-10 text-center">
          No trucks found. Tap below to add one!
        </Text>
      )}

      <TouchableOpacity
        onPress={() => router.push("/Driver/AddTruck")}
        className="w-full bg-[#1E90FF] py-4 rounded-xl flex-row items-center justify-center mt-4 shadow-md"
      >
        <Text className="text-white font-semibold text-xl mr-2">Add New Truck</Text>
        <FontAwesome5 name="plus-circle" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default DriverTrucks;
