import React, { ReactNode } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Animated,
  useWindowDimensions,
  RefreshControl,
  RefreshControlProps,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ThemedText } from './ThemedText';

interface ParallaxScrollViewProps {
  children: ReactNode;
  title?: string;
  headerImage?: ReactNode;
  headerBackgroundColor?: {
    light: string;
    dark: string;
  };
  stickyHeader?: ReactNode;
  refreshControl?: React.ReactElement<RefreshControlProps>;
}

const HEADER_HEIGHT = 200;
const STICKY_HEADER_HEIGHT = 60;

export default function ParallaxScrollView({
  children,
  title,
  headerImage,
  headerBackgroundColor,
  stickyHeader,
  refreshControl,
}: ParallaxScrollViewProps) {
  const { width } = useWindowDimensions();
  const { dark } = useTheme();
  const scrollY = new Animated.Value(0);

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2, HEADER_HEIGHT],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const stickyHeaderOpacity = scrollY.interpolate({
    inputRange: [HEADER_HEIGHT - STICKY_HEADER_HEIGHT, HEADER_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{ translateY: headerTranslateY }],
            backgroundColor: dark
              ? headerBackgroundColor?.dark
              : headerBackgroundColor?.light,
          },
        ]}
      >
        {headerImage && (
          <Animated.View style={[styles.headerImage, { opacity: imageOpacity }]}>
            {headerImage}
          </Animated.View>
        )}
        {title && (
          <Animated.View
            style={[styles.titleContainer, { opacity: titleOpacity }]}
          >
            <ThemedText style={styles.title}>{title}</ThemedText>
          </Animated.View>
        )}
      </Animated.View>

      {stickyHeader && (
        <Animated.View
          style={[
            styles.stickyHeader,
            {
              opacity: stickyHeaderOpacity,
              backgroundColor: dark
                ? headerBackgroundColor?.dark
                : headerBackgroundColor?.light,
            },
          ]}
        >
          {stickyHeader}
        </Animated.View>
      )}

      <ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        refreshControl={refreshControl}
      >
        <View style={{ height: HEADER_HEIGHT }} />
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  headerImage: {
    ...StyleSheet.absoluteFillObject,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: STICKY_HEADER_HEIGHT,
    zIndex: 1,
  },
});
