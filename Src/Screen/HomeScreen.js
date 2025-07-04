import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Animated,
  BackHandler,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import TextView from '../Components/TextView';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();

  const bannerImages = [
    'https://marketplace.canva.com/EAFMsNDrnZs/1/0/800w/canva-brown-minimalist-fashion-store-flash-sale-banner-GLK_g3z0wcs.jpg',
    'https://img.freepik.com/premium-vector/skincare-banner-ads-golden-color-tone-glittering-effects_281653-1361.jpg?w=1380',
    'https://mir-s3-cdn-cf.behance.net/project_modules/fs/41c520154223011.633e0a188aa19.jpg',
  ];

  const predefinedCategories = [
    {
      name: 'Fashion',
      image: 'https://www.pngall.com/wp-content/uploads/2016/07/Fashion-PNG-Clipart.png',
    },
    {
      name: 'Laptops',
      image: 'https://www.pngmart.com/files/7/HP-Laptop-PNG-HD.png',
    },
    {
      name: 'Fragrances',
      image: 'https://www.pngall.com/wp-content/uploads/2016/05/Perfume-Download-PNG.png',
    },
    {
      name: 'Skincare',
      image: 'https://i.pinimg.com/originals/3b/07/da/3b07dae475603600fbb1a4bb0bafef6f.png',
    },
    {
      name: 'Smartphones',
      image: 'https://www.pngall.com/wp-content/uploads/5/Apple-iPhone-12-Transparent.png',
    },
    {
      name: 'Watches',
      image: 'https://pngimg.com/uploads/watches/watches_PNG101443.png',
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setCategories(predefinedCategories);
      setLoading(false);
    }, 800);
  }, []);

  
    useEffect(() => {
  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
  return () => backHandler.remove();
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % bannerImages.length;
      scrollViewRef.current?.scrollTo({ x: nextIndex * screenWidth, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Products')}
      style={styles.categoryCard}
    >
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <TextView
        text={item.name}
        fontSize={14}
        fontWeight="500"
        color="#fff"
        alignSelf="center"
      />
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: '100%' }} color="#fff" />;
  }


  return (
    <LinearGradient colors={['#000000', '#1a1a1a']} style={styles.page}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ScrollView>
        <View style={styles.bannerContainer}>
          <Animated.ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
              setCurrentIndex(index);
            }}
          >
            {bannerImages.map((uri, index) => {
              const inputRange = [
                (index - 1) * screenWidth,
                index * screenWidth,
                (index + 1) * screenWidth,
              ];

              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.9, 1, 0.9],
                extrapolate: 'clamp',
              });

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.5, 1, 0.5],
                extrapolate: 'clamp',
              });

              return (
                <Animated.Image
                  key={index}
                  source={{ uri }}
                  resizeMode="cover"
                  style={[styles.bannerImage, { transform: [{ scale }], opacity }]}
                />
              );
            })}
          </Animated.ScrollView>

          <View style={styles.dotsContainer}>
            {bannerImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { backgroundColor: currentIndex === index ? '#fff' : '#555' },
                ]}
              />
            ))}
          </View>
        </View>

        <TextView
          text="Shop by Category"
          fontSize={22}
          fontWeight="bold"
          color="#fff"
          marginBottom={10}
          style={{ paddingHorizontal: 16, marginTop: 10 }}
        />

        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.categoryGrid}
        />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  bannerContainer: {
    marginTop: 15,
  },
  bannerImage: {
    width: screenWidth,
    height: 200,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  categoryGrid: {
    paddingHorizontal: 12,
    paddingBottom: 30,
  },
  categoryCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#111',
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 25,
    height: 140,
    justifyContent: 'center',
    elevation: 3,
  },
  categoryImage: {
    width: 85,
    height: 85,
    marginBottom: 10,
    resizeMode: 'contain',
  },
});

export default HomeScreen;
