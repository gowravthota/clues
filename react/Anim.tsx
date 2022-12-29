import React, { useEffect,useRef } from 'react';
import { Animated, Easing, ImageBackground } from 'react-native';
import styles from './Style';

const INPUT_RANGE_START = 0;
const INPUT_RANGE_END = 1;
const OUTPUT_RANGE_START = -281;
const OUTPUT_RANGE_END = 0;
const ANIMATION_TO_VALUE = 1;
const ANIMATION_DURATION = 30000;


export default function BackgroundAnimation() {
  const initialValue = 0;
  const translateValue = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    const translate = () => {
      translateValue.setValue(initialValue);
      Animated.timing(translateValue, {
        toValue: ANIMATION_TO_VALUE,
        duration: ANIMATION_DURATION,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => translate());
    };

    translate();
  }, [translateValue]);

  const translateAnimation = translateValue.interpolate({
    inputRange: [INPUT_RANGE_START, INPUT_RANGE_END],
    outputRange: [OUTPUT_RANGE_START, OUTPUT_RANGE_END],
  });

  const AnimetedImage = Animated.createAnimatedComponent(ImageBackground);

  return (
    <AnimetedImage 
        resizeMode="repeat" 
        style={[styles.background,{
            transform: [
                {
                  translateX: translateAnimation,
                },
                {
                  translateY: translateAnimation,
                },
              ],
        }]}
        source={require('./assets/glass2.png')} />
  )
}