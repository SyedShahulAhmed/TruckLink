export default {
  expo: {
    name: "TruckLink",
    slug: "TruckLink",
    version: "1.0.0",
    orientation: "portrait",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.trucklink.app",
    },
    web: {
      bundler: "metro",
      output: "static",
    },
    plugins: [
      "expo-router",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "c63d5edf-288c-44d0-8383-e0697900d80b",
      },
    },
  },
};
