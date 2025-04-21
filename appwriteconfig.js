// app/appwrite/authService.js

import { Client, Account, ID, Databases } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your endpoint
  .setProject('67f2633d0020c81c1df0'); // Replace with your project ID

const account = new Account(client);
const databases = new Databases(client);

const authService = {
  createAccount: async (email, password, name) => {
    try {
      const userAccount = await account.create(ID.unique(), email, password, name);
      return userAccount;
    } catch (error) {
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await account.deleteSession('current');
    } catch (error) {
      throw error;
    }
  },

  getAccount: async () => {
    try {
      return await account.get();
    } catch (error) {
      throw error;
    }
  },

  // Added: Generic DB document creation functionality
  createDocument: async (databaseId, collectionId, data) => {
    try {
      const document = await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        data
      );
      return document;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
