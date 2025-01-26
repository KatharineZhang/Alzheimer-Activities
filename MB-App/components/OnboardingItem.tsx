import { styles } from "@/assets/styles";
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  ImageSourcePropType,
} from "react-native";

interface OnboardingItemProps {
  item: {
    id: string;
    title: string;
    image: ImageSourcePropType;
  };
}

export default function OnboardingItem({ item }: OnboardingItemProps) {
  const { width, height } = useWindowDimensions();
  return (
    <View style={[styles.container, { width, height, justifyContent: "center", alignItems: "center" }]}>
      <Image
        source={item.image}
        style={{
          width: width * 0.8,
          height: height * 0.5,
          resizeMode: "contain",
        }}
      />
      <Text
        style={{
          fontSize: 24,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        {item.title}
      </Text>
    </View>
  );
}
