// app/Driver/TrucksScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5, Feather, FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";
import { Client, Databases } from "appwrite";

////////////////////////////////////////////////////////////////////////////////
// 1️⃣ Initialize Appwrite Client & Databases
////////////////////////////////////////////////////////////////////////////////
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67f2633d0020c81c1df0");

const databases = new Databases(client);

////////////////////////////////////////////////////////////////////////////////
// 2️⃣ Load your IDs from expoConfig.extra
////////////////////////////////////////////////////////////////////////////////
const DATABASE_ID   = "6805f5d8002f3dc7748e";
const COLLECTION_ID = "6805f60600379ccd5abe";

const TrucksScreen = () => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
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
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Trucks</Text>

      <ScrollView>
        {trucks.map((truck) => (
          <View key={truck.$id} style={styles.truckCard}>
            {/* Truck Image + Availability Badge */}
            <View style={styles.imageContainer}>
              <Image source={{ uri: truck.image }} style={styles.avatar} />
              {truck.isAvailable && (
                <FontAwesome
                  name="check-circle"
                  size={18}
                  color="green"
                  style={styles.badge}
                />
              )}
            </View>

            {/* Truck Info */}
            <View style={styles.info}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Truck Type</Text>
                <Text style={styles.value}>{truck.type}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Capacity</Text>
                <Text style={styles.value}>{truck.capacity}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Address</Text>
                <Text style={styles.value}>
                  <Feather name="map-pin" size={12} color="#555" />{" "}
                  {truck.address}
                </Text>
              </View>

              <Text style={styles.truckName}>{truck.name}</Text>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <TouchableOpacity style={styles.contactButton}>
                <FontAwesome5 name="phone-alt" size={14} color="#fff" />
                <Text style={styles.contactText}>Get in Contact</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.infoButton}>
                <Text style={styles.infoText}>More info</Text>
                <FontAwesome5
                  name="external-link-alt"
                  size={14}
                  color="#1E90FF"
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {trucks.length === 0 && (
          <Text style={styles.emptyText}>
            No trucks have been added yet.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  title: { fontSize: 28, fontWeight: "800", color: "#333", marginBottom: 10 },

  truckCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    marginBottom: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#1E90FF",
  },
  badge: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 2,
    elevation: 3,
  },
  info: { width: "100%", marginBottom: 10 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    paddingBottom: 5,
  },
  label: { color: "#64748b", fontSize: 12, fontWeight: "600" },
  value: { fontSize: 14, fontWeight: "600", color: "#1E293B" },
  truckName: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#1F2937",
    textAlign: "center",
    marginTop: 10,
    letterSpacing: 0.5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E90FF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  contactText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 5,
    fontSize: 14,
  },
  infoButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E90FF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  infoText: {
    color: "#1E90FF",
    fontWeight: "600",
    marginRight: 5,
    fontSize: 14,
  },
  emptyText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 16,
    marginTop: 20,
  },
});

export default TrucksScreen;
