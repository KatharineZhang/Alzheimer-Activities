import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const DoneTab = () => {
    return (
        <View style={styles.tabContent}>
            <View style={styles.imageRow}>
                <View style={styles.imageContainer}>
                    <Image source={require('./images/cards.jpg')} style={styles.image} />
                    <Text style={styles.imageName}>cards.jpg</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require('./images/dancing.jpg')} style={styles.image} />
                    <Text style={styles.imageName}>dancing.jpg</Text>
                </View>
            </View>
        </View>
    );
};

const ToDoTab = () => {
    return (
        <View style={styles.tabContent}>
            <View style={styles.imageRow}>
                <View style={styles.imageContainer}>
                    <Image source={require('./images/jenga.jpg')} style={styles.image} />
                    <Text style={styles.imageName}>jenga.jpg</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require('./images/stretching.jpg')} style={styles.image} />
                    <Text style={styles.imageName}>stretching.jpg</Text>
                </View>
            </View>
        </View>
    );
};

const App = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    // Function to change tab
    const handleTabChange = (index: number) => {
        setSelectedTab(index);
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                horizontal
                contentContainerStyle={styles.tabBar}
                showsHorizontalScrollIndicator={false} // Hide scroll indicator
            >
                <TouchableOpacity
                    style={[styles.tabButton, selectedTab === 0 && styles.selectedTab]}
                    onPress={() => handleTabChange(0)}
                >
                    <Text style={[styles.tabText, selectedTab === 0 && styles.selectedTabText]}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, selectedTab === 1 && styles.selectedTab]}
                    onPress={() => handleTabChange(1)}
                >
                    <Text style={[styles.tabText, selectedTab === 1 && styles.selectedTabText]}>To Do</Text>
                </TouchableOpacity>
            </ScrollView>

            {selectedTab === 0 ? <DoneTab /> : <ToDoTab />}
        </View>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#eee',
        paddingVertical: 10,
        justifyContent: 'center', // Center the tabs horizontally
        alignItems: 'center', // Ensure the tabs are centered vertically
        width: '100%', // Make sure the container takes the full width
    },
    tabButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedTab: {
        borderBottomWidth: 3,
        borderBottomColor: '#000',
    },
    selectedTabText: {
        color: '#000',  // Customize the selected tab text color
    },
    tabText: {
        fontSize: 24,
        fontFamily: 'FuzzyBubbles', // Make sure the custom font is loaded
        color: '#333',
    },
    tabContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    tabTitle: {
        fontSize: 30,
        fontFamily: 'FuzzyBubbles', // Custom font
        marginBottom: 20,
    },
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Space out the images
        marginBottom: 20, // Space between rows
        width: '100%', // Ensure the row takes up the full width
    },
    imageContainer: {
        alignItems: 'center', // Center the image and text together
    },
    image: {
        width: 120, // Set a fixed width for the image
        height: 150, // Set a fixed height for the image
        borderRadius: 10,
        marginBottom: 5, // Space between the image and its name
    },
    imageName: {
        fontSize: 14,
        color: '#333',
        fontFamily: 'FuzzyBubbles', // Match the font style if needed
    },
});

export default App;
