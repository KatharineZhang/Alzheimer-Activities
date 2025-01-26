import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';

type levelFilterType = {
  socialLvl: bigint, // low - 0, medium - 1, high - 2
  cogEngagement: bigint, // low - 0, medium - 1, high - 2
  sensoryLvl: bigint, // low - 0, medium - 1, high - 2
  physLvl: bigint, // low - 0, medium - 1, high - 2
  InOrOut: bigint // Indoor is 1, outdoor is 0, either is 2

};


type activity= {
  levelFilters: levelFilterType,
  Rank: bigint, // low - 0, medium - 1, high - 2
  Description: string,
  Steps: string[],
  Materials: string[]
};


// Dummy list of images for now
const images = [
  require('../images/image0.jpg'),
  require('../images/image1.jpg'),
  require('../images/image2.jpg'),
  require('../images/image3.jpg'),
];

const ActivitySuggestionsScreen = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const translateX = useSharedValue(0);

  const onSwipe = (direction: 'left' | 'right') => {
    translateX.value = withTiming(direction === 'left' ? -500 : 500, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    }, () => {
      runOnJS(setCurrentImageIndex)((prevIndex) => (prevIndex + 1) % images.length);
      translateX.value = 0;
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Activity Suggestions</Text>
        </View>

        <View style={styles.swipeContainer}>
          <Animated.Image source={images[currentImageIndex]} style={[styles.activityImage, animatedStyle]} />
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => onSwipe('left')} style={styles.thumbsButton}>
            <Text style={styles.thumbsText}>👎</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSwipe('right')} style={styles.thumbsButton}>
            <Text style={styles.thumbsText}>👍</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menuButton: {
    padding: 10,
    backgroundColor: '#512663',
    borderRadius: 5,
  },
  menuIcon: {
    fontSize: 24,
    color: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Fuzzy Bubbles',
    color: '#342758',
  },
  swipeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  activityImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  thumbsButton: {
    backgroundColor: '#342758',
    padding: 15,
    borderRadius: 50,
  },
  thumbsText: {
    fontSize: 30,
    color: '#ffffff',
  },
});

export default ActivitySuggestionsScreen;
