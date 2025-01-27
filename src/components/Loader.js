import React from 'react';
import {
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { colors } from './../Styles/appStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontAwesome5 } from '@expo/vector-icons';

const Loader = ({ visible = false }) => {
  const { width, height } = useWindowDimensions();
  const spinValue = new Animated.Value(0);

  // Spin Animation
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (!visible) return null;

  return (
    <View style={[styles.overlay, { height, width }]}> 
      <Animated.View style={styles.loaderContainer}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <FontAwesome5 name="atom" size={40} color="rgb(67, 126, 244)" />
        </Animated.View>
        <View style={styles.textContainer}>
          {/* <ActivityIndicator size="large" color={colors.blue} /> */}
          <Text style={styles.loadingText}>Please Wait...</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    height: 120,
    width: 220,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  loadingText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '500',
    color: colors.darkgrey,
  },
});

export default Loader;
