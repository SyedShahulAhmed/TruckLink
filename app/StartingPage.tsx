import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    Animated,
    Easing,
  } from "react-native";
  import { useEffect, useRef } from "react";
  import { useRouter } from "expo-router";  
  const StartingPage = () => {
    const router = useRouter();
  
    // Animation setup
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideUp = useRef(new Animated.Value(100)).current;
    
    useEffect(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(slideUp, {
          toValue: 0,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }, []);
  
    return (
      <ImageBackground
      source={require('../assets/background.jpg')}
        className="flex-1 justify-end items-center"
        resizeMode="cover"
      >
        <Animated.View
          className="w-full items-center mb-16 bg-transparent"
          style={{ opacity: fadeAnim, transform: [{ translateY: slideUp }] }}
        >
          <Image
            source={require('../assets/truck.png')}
            style={{
              width: 100,
              height: 100,
              marginBottom: 2,
              tintColor: "#fff",
            }}
          />
  
          <Text className="text-white leading-relaxed text-4xl font-extrabold tracking-wider">
            Welcome to Trucklink
          </Text>
          <Text className="text-gray-200 text-center text-lg leading-relaxed mt-2 mb-8 font-medium">
            Book a truck instantly, get moving in no time
          </Text>
  
          <TouchableOpacity
            onPress={() => router.replace("/ChooseRole")}
            className="w-4/5 bg-white py-4 rounded-full active:scale-95 transition-all duration-150"
          >
            <Text className="text-blue-600 font-semibold text-2xl text-center">
              Get Started
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ImageBackground>
    );
  };
  
  export default StartingPage;
  