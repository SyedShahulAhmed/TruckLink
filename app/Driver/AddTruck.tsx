// app/Driver/AddTruck.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import authService from "../../appwriteconfig";

const AddTruck = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  const databaseId = "6805f5d8002f3dc7748e";
  const collectionId = "6805f60600379ccd5abe";
  const handleAddTruck = async () => {
    if (!name || !type || !capacity || !address || !image) {
      alert("Please fill in all fields!");
      return;
    }
  
    try {
      const user = await authService.getAccount(); // Make sure this returns the user
      if (!user) {
        alert("User not logged in.");
        return;
      }
  
      const truckData = {
        name,
        type,
        capacity,
        address,
        image,
        isAvailable,
        ownerId: user.$id, // 💡 Important
      };
  
      await authService.createDocument(databaseId, collectionId, truckData);
      alert("Truck added successfully!");
      router.back();
    } catch (e) {
      console.log("Error adding truck:", e);
      alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <ScrollView className="flex-1 bg-[#F9F9F9] px-4 py-6">
      <Text className="text-4xl font-bold text-[#1E3A8A] mb-4">Add New Truck 🚚</Text>

      <Text className="text-lg font-semibold text-gray-700 mb-1">Truck Name</Text>
      <TextInput
        className="w-full bg-white p-4 mb-4 rounded-xl shadow-md text-lg"
        placeholder="e.g. Lucy Lucifer"
        value={name}
        onChangeText={setName}
      />

      <Text className="text-lg font-semibold text-gray-700 mb-1">Truck Type</Text>
      <TextInput
        className="w-full bg-white p-4 mb-4 rounded-xl shadow-md text-lg"
        placeholder="e.g. Cargo Truck"
        value={type}
        onChangeText={setType}
      />

      <Text className="text-lg font-semibold text-gray-700 mb-1">Capacity</Text>
      <TextInput
        className="w-full bg-white p-4 mb-4 rounded-xl shadow-md text-lg"
        placeholder="e.g. 20 Tonnes"
        value={capacity}
        onChangeText={setCapacity}
      />

      <Text className="text-lg font-semibold text-gray-700 mb-1">Address</Text>
      <TextInput
        className="w-full bg-white p-4 mb-4 rounded-xl shadow-md text-lg"
        placeholder="e.g. Location or Garage Address"
        value={address}
        onChangeText={setAddress}
      />

      <Text className="text-lg font-semibold text-gray-700 mb-1">Truck Image URL</Text>
      <TextInput
        className="w-full bg-white p-4 mb-4 rounded-xl shadow-md text-lg"
        placeholder="Paste image URL here"
        value={image}
        onChangeText={setImage}
      />

      {image ? (
        <Image
          source={{ uri: image }}
          className="w-full h-48 rounded-xl mb-4 shadow-md"
          resizeMode="cover"
        />
      ) : (
        <Text className="text-gray-500 italic text-center mb-4">No image preview</Text>
      )}

      <View className="flex-row items-center justify-between bg-white px-4 py-3 rounded-xl mb-4 shadow-md">
        <Text className="text-lg font-semibold text-gray-700">Is Available?</Text>
        <Switch
          value={isAvailable}
          onValueChange={setIsAvailable}
          trackColor={{ true: "#1E90FF", false: "#ccc" }}
        />
      </View>

      <TouchableOpacity
        onPress={handleAddTruck}
        className="w-full bg-[#1E90FF] py-4 rounded-xl flex-row items-center justify-center mt-4 shadow-md"
      >
        <Text className="text-white font-semibold text-xl mr-2">Add Truck</Text>
        <FontAwesome5 name="plus-circle" size={24} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddTruck;
