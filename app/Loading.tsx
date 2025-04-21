import { useEffect } from "react";
import { View, Text, Image, Animated, Easing } from "react-native";
import { useRouter } from "expo-router";
import './global.css'

const Loading = () => {
  const router = useRouter();

  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
        router.replace("/StartingPage");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-[#002855] items-center justify-center px-2">
      <Animated.View
        className="flex-row items-center"
        style={{ opacity: fadeAnim }}
      >
        {/* Truck Logo */}
        <Animated.Image
         source={require('../assets/truck.png')}
          style={{
            width: 100,
            height: 100,
            marginRight: 5,
            transform: [{ scale: scaleAnim }],
            tintColor: "#ffffff", // Forces a brighter white tone on the image
          }}
        />

        {/* App Name */}
        <Text
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: "#ffffff",
            letterSpacing: 1,
          }}
        >
          Trucklink
        </Text>
      </Animated.View>
    </View>
  );
};

export default Loading;
