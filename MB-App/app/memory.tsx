import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const DoneTab = () => {
    return (
        <View style={styles.tabContent}>
            <View style={styles.imageRow}>
                <View style={styles.imageContainer}>
                    <Image source={require('./images/cards.jpg')} style={styles.image} />
                    <Text style={styles.imageName}>Playing Cards</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require('./images/dancing.jpg')} style={styles.image} />
                    <Text style={styles.imageName}>Dancing</Text>
                </View>
            </View>
            <View style={styles.imageRow}>
            <View style={styles.imageContainer}>
                    <Image source={require('./images/jenga.jpg')} style={styles.image} />
                    <Text style={styles.imageName}>Jenga</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require('./images/stretching.jpg')} style={styles.image} />
                    <Text style={styles.imageName}>Stretching</Text>
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
                    <Image source={require('./images/uploadimage2.png')} style={styles.image} />
                    <Text style={styles.imageName}>Bird Watching</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require('./images/uploadimage2.png')} style={styles.image} />
                    <Text style={styles.imageName}>Laundry</Text>
                </View>
            </View>
            <View style={styles.imageRow}>
                <View style={styles.imageContainer}>
                    <Image source={require('./images/uploadimage2.png')} style={styles.image} />
                    <Text style={styles.imageName}>Gardening</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require('./images/uploadimage2.png')} style={styles.image} />
                    <Text style={styles.imageName}>Pet Therapy</Text>
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
            {/* Title Section */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Memory Log</Text>
            </View>

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
    titleContainer: {
        alignItems: 'center',
        marginBottom: 20,  // Adjust margin for spacing
        marginTop: 30,
    },
    title: {
        fontSize: 30,
        fontFamily: 'FuzzyBubbles', // Custom font
        color: '#333',
    },
    tabBar: {
        width: '100%',    // Set width to 200 units
        backgroundColor: '#eee',
        height: 80,   // Set height to 100 units
        paddingVertical: 10,
        justifyContent: 'center', // Center the tabs horizontally
        alignItems: 'center', // Ensure the tabs are centered vertically
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
        fontSize: 20,
        fontFamily: 'FuzzyBubbles', // Make sure the custom font is loaded
        color: '#333',
    },
    tabContent: {
        flex: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
