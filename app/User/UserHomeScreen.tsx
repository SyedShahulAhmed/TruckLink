import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const cities = [
  "Visakhapatnam", "Vijayawada", "Guntur", "Nellore",
  "Kurnool", "Rajahmundry", "Tirupati", "Kadapa",
  "Anantapur", "Srikakulam"
];

const priceMap = {};

// Loop to create every combination of source and destination
cities.forEach((source) => {
  cities.forEach((destination) => {
    if (source !== destination) {
      const route = `${source}-${destination}`;
      // Add a static price for each route (example price, modify accordingly)
      priceMap[route] = Math.floor(Math.random() * (200 - 50 + 1)) + 50; // Random price between 50 and 200
    }
  });
});


const UserHomeScreen = () => {
  const router = useRouter();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("1");

  const handlePriceCheck = () => {
    if (!source || !destination || !weight) {
      alert("Please fill in all fields!");
      return;
    }

    if (source === destination) {
      alert("Source and destination cannot be the same.");
      return;
    }

    const routeKey = `${source}-${destination}`;
    const reverseKey = `${destination}-${source}`;
    const basePrice = priceMap[routeKey] || priceMap[reverseKey];

    if (!basePrice) {
      alert("No route found between selected cities.");
      return;
    }

    const totalPrice = basePrice * parseFloat(weight);
    alert(`Price from ${source} to ${destination} for ${weight}kg: ₹${totalPrice.toFixed(2)}`);
  };

  return (
    <View style={styles.container}>
      {/* Price Checker Section */}
      <View style={styles.card}>
        <Text style={styles.title}>Cargo Price Checker</Text>
        <Text style={styles.subtitle}>Fast, reliable, and affordable transport!</Text>

        {/* Source Picker */}
        <Text style={styles.inputLabel}>From</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={source}
            onValueChange={(itemValue) => setSource(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Source" value="" />
            {cities.map((city) => (
              <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>
        </View>

        {/* Destination Picker */}
        <Text style={styles.inputLabel}>To</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={destination}
            onValueChange={(itemValue) => setDestination(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Destination" value="" />
            {cities.map((city) => (
              <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>
        </View>

        {/* Weight Input */}
        <Text style={styles.inputLabel}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Weight"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />

        {/* Check Price Button */}
        <TouchableOpacity style={styles.checkButton} onPress={handlePriceCheck}>
          <Text style={styles.checkButtonText}>Check Price</Text>
          <FontAwesome name="search" size={20} color="white" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>

      {/* Main Content Section */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={require('../../assets/truck.png')} style={styles.truckImage} resizeMode="contain" />
        <Text style={styles.quoteText}>"Deliver smarter, faster, and safer with us!"</Text>
      </ScrollView>
    </View>
  );
};

// 🔥 Styling Section - Modern Look
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    elevation: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1d4ed8",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    color: "#64748b",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
  },
  inputLabel: {
    color: "#475569",
    fontWeight: "600",
    marginBottom: 5,
  },
  pickerContainer: {
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    marginBottom: 12,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    color: "#334155",
  },
  input: {
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    borderColor: "#cbd5e1",
    borderWidth: 1,
    color: "#334155",
  },
  checkButton: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2563eb",
    shadowOpacity: 0.5,
    elevation: 8,
  },
  checkButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  truckImage: {
    width: 280,
    height: 150,
    marginBottom: 10,
  },
  quoteText: {
    color: "#64748b",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 15,
  },
});

export default UserHomeScreen;
