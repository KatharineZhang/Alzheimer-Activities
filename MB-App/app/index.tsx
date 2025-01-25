import React, { useState } from 'react';
import { View, Text, Button, Image, TextInput, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const API_URL = 'http://localhost:3001';  // Replace with your server URL

const UploadImageScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [activity, setActivity] = useState<string>('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri || !activity) {
      Alert.alert('Error', 'Please select an image and enter an activity.');
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'uploaded_image.jpg', // You can change the extension based on the image type
      type: 'image/jpeg',  // Ensure this is correct based on the file selected
    } as any);
    formData.append('activity', activity);

    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Success', 'Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Image</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter activity"
        value={activity}
        onChangeText={setActivity}
      />

      <Button title="Pick an Image" onPress={pickImage} />

      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

      <Button title="Upload Image" onPress={uploadImage} color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    width: '80%',
  },
  imagePreview: {
    width: '80%',
    height: 200,
    marginBottom: 16,
    resizeMode: 'contain',
  },
});

export default UploadImageScreen;
