import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FavouriteScreen = () => {
  const navigation = useNavigation(); // Get navigation object

  return (
    <View style={styles.container}>
      <FontAwesome5 name="heart-broken" size={50} color="#FF6B6B" style={styles.icon} />
      <Text style={styles.message}>You don't have any favourites yet!</Text>
      <Text style={styles.subMessage}>Start exploring and add your top picks to favourites.</Text>

      {/* Navigate to TrucksScreen on button press */}
      <TouchableOpacity style={styles.exploreButton} onPress={() => navigation.navigate("TrucksScreen")}>
        <Text style={styles.exploreText}>Explore Trucks</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f0f4f8", padding: 20 },
  icon: { marginBottom: 20 },
  message: { fontSize: 22, color: "#333", fontWeight: "700", marginBottom: 5 },
  subMessage: { fontSize: 16, color: "#555", textAlign: "center", marginBottom: 20 },

  // Explore Button Styling
  exploreButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 2,
  },
  exploreText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

export default FavouriteScreen;
