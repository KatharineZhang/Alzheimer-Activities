import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


const Home: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [activity, setActivity] = useState<string>('');
  const [uploadedImages, setUploadedImages] = useState<{ image_url: string; activity: string }[]>([]);

  const API_URL = ' 10.18.126.241:3001';

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
      name: 'uploaded_image.jpg',
      type: 'image/jpeg',
    } as any);
    formData.append('activity', activity);
  
    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Success', 'Image uploaded successfully!');
      fetchImages(); // Refresh the image list after upload
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image.');
    }
  };
  
  const fetchImages = async () => {
    try {
      const response = await axios.get<{ images: { image_url: string; activity: string }[] }>(
        `${API_URL}/images`
      );
      setUploadedImages(response.data.images);
    } catch (error) {
      console.error('Error fetching images:', error);
      Alert.alert('Error', 'Failed to fetch images.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload and View Images</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter activity"
        value={activity}
        onChangeText={setActivity}
      />

      <Button title="Pick an Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}

      <Button title="Upload Image" onPress={uploadImage} color="#4CAF50" />
      <Button title="View Uploaded Images" onPress={fetchImages} color="#2196F3" />

      {uploadedImages.length > 0 && (
        <View style={styles.imageList}>
          <Text style={styles.subheader}>Uploaded Images:</Text>
          {uploadedImages.map((img, index) => (
            <View key={index} style={styles.imageItem}>
              <Image source={{ uri: img.image_url }} style={styles.imageThumbnail} />
              <Text style={styles.imageText}>{img.activity}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',  // Ensure the container content is centered vertically
      alignItems: 'center',      // Ensure the container content is centered horizontally
      padding: 16,
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',  // Ensure the text is centered
      marginBottom: 20,     // Add margin to create space but ensure the text stays in view
      width: '100%',        // Make sure the width is 100% so it stays within the container bounds
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 8,
      marginBottom: 16,
      width: '80%',  // Limit the width to ensure proper layout
    },
    previewImage: {
      width: '80%',  // Adjust the width for proper display
      height: 200,
      resizeMode: 'contain',
      marginVertical: 16,
    },
    imageList: {
      marginTop: 16,
      alignItems: 'center',  // Center the list of images
      width: '100%',  // Ensure the image list respects the screen width
    },
    subheader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center',  // Center the subheader text
      width: '100%',  // Ensure it's not overflowing the container
    },
    imageItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      justifyContent: 'center',  // Center each image item
    },
    imageThumbnail: {
      width: 50,
      height: 50,
      marginRight: 8,
    },
    imageText: {
      fontSize: 16,
    },
  });  
  
  

export default Home;
