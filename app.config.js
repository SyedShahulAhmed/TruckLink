// app.config.js
import 'dotenv/config';  // loads .env into process.env

export default ({ config }) => ({
  ...config,
  extra: {
    EXPO_PUBLIC_APPWRITE_ENDPOINT: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    EXPO_PUBLIC_APPWRITE_PROJECT_ID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    EXPO_PUBLIC_APPWRITE_DATABASE_ID: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    EXPO_PUBLIC_APPWRITE_COLLECTION_ID: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID,
  },
});
