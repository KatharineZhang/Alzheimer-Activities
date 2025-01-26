/* eslint-disable @typescript-eslint/no-require-imports */
import { styles } from "@/assets/styles";
import { useState, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  Animated,
  Pressable,
  ImageSourcePropType,
} from "react-native";
import OnboardingItem from "./components/OnboardingItem";
import Paginator from "@/components/Paginator";
import { Link } from "expo-router";

//Onboarding Page
export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [buttonTitle, setButtonTitle] = useState("Skip");
  const scrollX = useRef(new Animated.Value(0)).current;
  const pagesRef = useRef(null);

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      const firstViewableItem = viewableItems[0];
      if (firstViewableItem.index !== null) {
        setCurrentIndex(firstViewableItem.index); //changes the current index to the index of the viewable item
      }
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current; //next slide must be 50% visible to change the current index

  return (
    <SafeAreaView style={[styles.viewPager, { alignItems: "center" }]}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={pages}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={pagesRef}
        />
      </View>
      
      <Paginator data={pages} scrollX={scrollX}></Paginator>
      <View style={styles.footerButtonContainer}>
      </View>
    </SafeAreaView>
  );
}

const pages: Array<{
  id: string;
  title: string;
  image: ImageSourcePropType;
}> = [
  {
    id: "1",
    title: "Welcome to our app!",
    image: require("./images/placeholder1.jpg"),
  },
  {
    id: "2",
    title: "Discover new features",
    image: require("./images/placeholder2.jpg"),
  },
  {
    id: "3",
    title: "Stay connected with us",
    image: require("./images/placeholder3.jpg"),
  },
  {
    id: "4",
    image: require("./images/placeholder4.jpg"),
    title: "Let's get started!",
  },
];
